'use strict';

/**
 * Prometheus metrics (D-72): request counts, latency and errors per route, the hourly account
 * refresh, and Node.js process numbers. Served at GET /metrics, which answers only with the
 * METRICS_TOKEN bearer token, and is 404 when no token is configured (so it is off on Render).
 */
const crypto = require('crypto');
const client = require('prom-client');

const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

const requests = new client.Counter({
  name: 'http_requests_total',
  help: 'HTTP requests, by method, route and status code',
  labelNames: ['method', 'route', 'status'],
  registers: [registry],
});

const duration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request time, by method and route',
  labelNames: ['method', 'route'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [registry],
});

const syncRuns = new client.Counter({
  name: 'linked_sync_accounts_total',
  help: 'LeetCode, Codeforces and GitHub accounts refreshed, by result',
  labelNames: ['result'],
  registers: [registry],
});

const syncLast = new client.Gauge({
  name: 'linked_sync_last_run_timestamp_seconds',
  help: 'When the last account refresh finished (Unix time)',
  registers: [registry],
});

/**
 * The route pattern, not the raw path, so /api/groups/123 and /api/groups/456 share one label
 * (a label per id would grow without limit). Unmatched paths are grouped together.
 */
function routeLabel(req) {
  if (req.route && req.route.path) return `${req.baseUrl || ''}${req.route.path}`;
  return 'unmatched';
}

function middleware(req, res, next) {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const route = routeLabel(req);
    const seconds = Number(process.hrtime.bigint() - start) / 1e9;
    requests.inc({ method: req.method, route, status: String(res.statusCode) });
    duration.observe({ method: req.method, route }, seconds);
  });
  next();
}

/** True only for the configured bearer token, compared in constant time. */
function tokenOk(header, expected) {
  if (!expected) return false;
  const got = Buffer.from(String(header || '').replace(/^Bearer\s+/i, ''));
  const want = Buffer.from(expected);
  return got.length === want.length && crypto.timingSafeEqual(got, want);
}

async function handler(req, res) {
  if (!tokenOk(req.get('authorization'), process.env.METRICS_TOKEN)) return res.status(404).json({ error: 'Not found' });
  res.set('Content-Type', registry.contentType);
  res.send(await registry.metrics());
}

function recordSync({ synced = 0, failed = 0, skipped = 0 }) {
  syncRuns.inc({ result: 'synced' }, synced);
  syncRuns.inc({ result: 'failed' }, failed);
  syncRuns.inc({ result: 'skipped' }, skipped);
  syncLast.set(Date.now() / 1000);
}

module.exports = { middleware, handler, recordSync, routeLabel, tokenOk, registry };
