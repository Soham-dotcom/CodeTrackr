// extension.js
const vscode = require("vscode");
const axios = require("axios");
const os = require("os");
const path = require("path");

// --------- state ----------
const state = {
  timer: undefined,
  lastActivityMs: Date.now(),
  startedMs: undefined,
  bufferedMinutes: 0,
  lastKnownFile: "unknown",
};

// --------- config helpers ----------
function getCfg() {
  const cfg = vscode.workspace.getConfiguration("codetrackr");
  return {
    apiBase: cfg.get("apiBase", "http://127.0.0.1:5050"),
    userId: cfg.get("userId") || safeUsername(),
    apiKey: cfg.get("apiKey") || "",
    flushIntervalSeconds: Math.max(5, cfg.get("flushIntervalSeconds", 30)),
    minFlushMinutes: Math.max(0.1, cfg.get("minFlushMinutes", 0.5)),
  };
}

function safeUsername() {
  try {
    return os.userInfo().username || "unknown";
  } catch {
    return "unknown";
  }
}

// --------- activity tracking ----------
function markActivity(fileNameMaybe) {
  state.lastActivityMs = Date.now();
  if (fileNameMaybe) {
    state.lastKnownFile = fileNameMaybe;
  } else {
    const active = vscode.window.activeTextEditor?.document?.fileName;
    if (active) state.lastKnownFile = active;
  }
}

// --------- backend calls ----------
async function sendActivity(minutes, fileOpened) {
  const { apiBase, userId, apiKey } = getCfg();

  const payload = {
    userId,
    codingTime: Number(minutes.toFixed(3)),
    date: new Date().toISOString(),
    source: "new file",         // matches your backend schema note
    fileOpened: fileOpened || "unknown",
  };

  const headers = apiKey ? { "x-api-key": apiKey } : undefined;

  try {
    const res = await axios.post(`${apiBase}/api/user-activity`, payload, { headers });
    console.log("✅ Uploaded:", res.data);
    vscode.window.setStatusBarMessage("CodeTrackr: flushed ✅", 2000);
  } catch (err) {
    console.error("❌ Upload failed:", err?.message || err);
    vscode.window.setStatusBarMessage("CodeTrackr: flush failed, will retry 🔁", 3000);
    // keep minutes buffered; caller decides
    throw err;
  }
}

// compute minutes since ms timestamp
function minutesSince(ms) {
  return (Date.now() - ms) / 60000;
}

// try to flush if buffered time meets threshold
async function flushIfNeeded(force = false) {
  if (!state.startedMs) return;

  // add any elapsed since lastActivity to buffer in discrete minutes (ceil to avoid zero dribble)
  const elapsedFromStartMin = minutesSince(state.startedMs);
  const totalSinceStart = elapsedFromStartMin;

  // total buffered = minutes since start + carry from earlier failed flushes
  const totalBuffered = state.bufferedMinutes + totalSinceStart;

  const { minFlushMinutes } = getCfg();
  if (!force && totalBuffered < minFlushMinutes) return;

  // pick filename to report
  const fileOpened =
    vscode.window.activeTextEditor?.document?.fileName ||
    state.lastKnownFile ||
    "unknown";
  const baseName = fileOpened ? path.basename(fileOpened) : "unknown";

  try {
    await sendActivity(totalBuffered, baseName);
    // reset start and buffer after successful flush
    state.startedMs = Date.now();
    state.bufferedMinutes = 0;
  } catch {
    // on failure, keep minutes in buffer, and reset start so we don't double-count
    state.bufferedMinutes = totalBuffered;
    state.startedMs = Date.now();
  }
}

// --------- commands ----------
function start(context) {
  if (state.timer) {
    vscode.window.setStatusBarMessage("CodeTrackr: already running ⏱️", 2000);
    return;
  }

  const { flushIntervalSeconds } = getCfg();

  state.startedMs = Date.now();
  markActivity();

  state.timer = setInterval(() => {
    // if user idle > 10 minutes, don't accumulate beyond that until activity
    const idleMin = minutesSince(state.lastActivityMs);
    if (idleMin > 10) {
      // simulate a pause: move the "started" forward so we don't count idle time
      state.startedMs = Date.now();
      return;
    }
    flushIfNeeded(false).catch(() => {});
  }, flushIntervalSeconds * 1000);

  context.subscriptions.push({ dispose: stop });
  vscode.window.setStatusBarMessage("CodeTrackr: started ⏳", 2000);
}

function stop() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = undefined;
  }
  state.startedMs = undefined;
  state.bufferedMinutes = 0;
  vscode.window.setStatusBarMessage("CodeTrackr: stopped 🛑", 2000);
}

async function flushNow() {
  await flushIfNeeded(true);
}

// --------- VS Code hooks ----------
function activate(context) {
  console.log("💻 CodeTrackr extension activated");

  // Register commands EXACTLY as in package.json
  const cmdStart = vscode.commands.registerCommand("codetrackr.start", () => start(context));
  const cmdStop = vscode.commands.registerCommand("codetrackr.stop", () => stop());
  const cmdFlush = vscode.commands.registerCommand("codetrackr.flushNow", () => flushNow());

  context.subscriptions.push(cmdStart, cmdStop, cmdFlush);

  // Listen to user actions to keep "last activity" fresh
  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((doc) => markActivity(doc.fileName)),
    vscode.workspace.onDidChangeTextDocument((evt) => markActivity(evt.document.fileName)),
    vscode.window.onDidChangeActiveTextEditor((ed) => markActivity(ed?.document?.fileName)),
    vscode.workspace.onDidSaveTextDocument((doc) => markActivity(doc.fileName))
  );

  // Optional: auto-start after startup if you like the onStartupFinished activation
  // start(context); // uncomment if you want auto-start
}

function deactivate() {
  stop();
}

module.exports = { activate, deactivate };
