// extension.js
const vscode = require("vscode");
const os = require("os");

// OPTIONAL: uncomment if your VS Code is old and has no global fetch
// const fetch = require("node-fetch");

let timer;
let seconds = 0;
let activeFile = "unknown";

function activate(context) {
  // Commands
  const start = vscode.commands.registerCommand("codetrackr.start", startTracking);
  const stop  = vscode.commands.registerCommand("codetrackr.stop", stopTracking);
  const flush = vscode.commands.registerCommand("codetrackr.flushNow", flushNow);

  context.subscriptions.push(start, stop, flush);

  // Auto-start
  startTracking();
}

function deactivate() { stopTracking(); }

function cfg() {
  const c = vscode.workspace.getConfiguration();
  return {
    apiBase: c.get("codetrackr.apiBase") || "http://127.0.0.1:5050",
    userId: (c.get("codetrackr.userId") || os.userInfo().username || "anon").toLowerCase(),
    apiKey: c.get("codetrackr.apiKey") || process.env.CODETRACKR_API_KEY || "", // optional
    tickSeconds: 5,               // ↓ fast for testing
    minSecondsBeforeSend: 10      // send after ~10s for testing
  };
}

function startTracking() {
  const { tickSeconds } = cfg();

  if (timer) {
    vscode.window.showInformationMessage("CodeTrackr already running.");
    return;
  }

  vscode.window.showInformationMessage("CodeTrackr tracking started.");
  seconds = 0;
  activeFile = vscode.window.activeTextEditor?.document?.fileName || "unknown";

  // Count time only when VS Code window focused
  timer = setInterval(() => {
    if (vscode.window.state.focused) {
      seconds += tickSeconds;
    }
    maybeFlush();
  }, tickSeconds * 1000);

  // On save or file change, try to flush
  const onSave = vscode.workspace.onDidSaveTextDocument(maybeFlush);
  const onActive = vscode.window.onDidChangeActiveTextEditor((ed) => {
    activeFile = ed?.document?.fileName || "unknown";
    maybeFlush();
  });

  // Clean up on stop
  const disposable = { dispose: stopTracking };
  vscode.workspace.getConfiguration(); // keep API happy
  module.exports.contextSubs = [onSave, onActive, disposable];
}

function stopTracking() {
  if (timer) { clearInterval(timer); timer = null; }
  seconds = 0;
  if (module.exports.contextSubs) {
    module.exports.contextSubs.forEach(s => { try { s.dispose(); } catch {} });
    module.exports.contextSubs = null;
  }
  vscode.window.showInformationMessage("CodeTrackr tracking stopped.");
}

async function maybeFlush() {
  const { minSecondsBeforeSend } = cfg();
  if (seconds < minSecondsBeforeSend) return;
  await flushNow();
}

async function flushNow() {
  try {
    const { apiBase, userId, apiKey } = cfg();
    const minutes = Math.max(1, Math.round(seconds / 60)); // round up to make it obvious
    seconds = 0;

    const payload = {
      userId,
      codingTime: minutes,
      source: "vscode",
      date: new Date().toISOString(),
      fileOpened: activeFile
    };

    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["x-api-key"] = apiKey;

    const res = await fetch(`${apiBase}/api/user-activity`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const t = await res.text();
      console.log("CodeTrackr flush failed", res.status, t);
      vscode.window.showWarningMessage(`CodeTrackr flush failed: ${res.status}`);
      return;
    }

    const data = await res.json();
    console.log("CodeTrackr saved", data);
    vscode.window.setStatusBarMessage(`$(check) CodeTrackr saved ${minutes}m`, 2000);
  } catch (e) {
    console.log("CodeTrackr error", e?.message || e);
    vscode.window.showWarningMessage(`CodeTrackr error: ${e?.message || e}`);
  }
}

module.exports = { activate, deactivate };
