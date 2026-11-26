/**
 * Prometheus metrics (D-72): route labels stay bounded and the endpoint needs its token.
 * Run: node tests/httpMetrics.test.js
 */
const assert = require('assert');
const m = require('../services/httpMetrics');

let passed = 0;
let failed = 0;
const pending = [];
function t(name, fn) {
  pending.push(Promise.resolve().then(fn).then(
    () => { passed++; console.log(`  PASS  ${name}`); },
    (err) => { failed++; console.log(`  FAIL  ${name}\n        ${err.message}`); },
  ));
}

console.log('\nhttpMetrics');

t('the route label is the pattern, not the path with ids', () => {
  assert.strictEqual(m.routeLabel({ baseUrl: '/api/groups', route: { path: '/:groupId/week' } }), '/api/groups/:groupId/week');
  assert.strictEqual(m.routeLabel({ baseUrl: '', route: { path: '/health' } }), '/health');
  assert.strictEqual(m.routeLabel({ baseUrl: '/api', path: '/does/not/exist' }), 'unmatched');
});

t('the token check needs the exact token, and nothing works without one configured', () => {
  assert.strictEqual(m.tokenOk('Bearer abc123', 'abc123'), true);
  assert.strictEqual(m.tokenOk('abc123', 'abc123'), true);
  assert.strictEqual(m.tokenOk('Bearer abc124', 'abc123'), false);
  assert.strictEqual(m.tokenOk('Bearer abc', 'abc123'), false);
  assert.strictEqual(m.tokenOk(undefined, 'abc123'), false);
  assert.strictEqual(m.tokenOk('Bearer anything', ''), false);
  assert.strictEqual(m.tokenOk('Bearer anything', undefined), false);
});

t('a finished request is counted with its route and status', async () => {
  const listeners = {};
  const res = { statusCode: 201, on: (ev, fn) => { listeners[ev] = fn; } };
  const req = { method: 'POST', baseUrl: '/api/events', route: { path: '/' } };
  m.middleware(req, res, () => {});
  listeners.finish();
  const text = await m.registry.metrics();
  assert.match(text, /http_requests_total\{method="POST",route="\/api\/events\/",status="201"\} 1/);
  assert.match(text, /http_request_duration_seconds_count\{method="POST",route="\/api\/events\/"\} 1/);
});

t('the account refresh records its results and when it ran', async () => {
  m.recordSync({ synced: 3, failed: 1, skipped: 2 });
  const text = await m.registry.metrics();
  assert.match(text, /linked_sync_accounts_total\{result="synced"\} 3/);
  assert.match(text, /linked_sync_accounts_total\{result="failed"\} 1/);
  assert.match(text, /linked_sync_last_run_timestamp_seconds \d+/);
});

Promise.all(pending).then(() => {
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed ? 1 : 0);
});
