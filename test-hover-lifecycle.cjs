const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const source = fs.readFileSync(`${__dirname}/image-hover.js`, "utf8");
const schedule = source.slice(source.indexOf("  function scheduleClose()"), source.indexOf("  let image, source,"));
const context = vm.createContext({assert});
vm.runInContext(`
let leaveTimer = null, pointerInPanel = false, candidate = null, busy = false;
const host = {style:{display:"block"}};
const LEAVE_DELAY_MS = 1000;
let callback, scheduled = 0, closed = 0;
function setTimeout(fn, ms) { assert.equal(ms, 1000); callback = fn; scheduled++; return scheduled; }
function closePanel() { closed++; }
${schedule}
scheduleClose(); scheduleClose(); assert.equal(scheduled, 1);
callback(); assert.equal(closed, 1);
pointerInPanel = true; scheduleClose(); callback(); assert.equal(closed, 1);
pointerInPanel = false; candidate = {}; scheduleClose(); callback(); assert.equal(closed, 1);
candidate = null; busy = true; scheduleClose(); callback(); assert.equal(closed, 1);
busy = false; scheduleClose(); callback(); assert.equal(closed, 2);
host.style.display = "none"; scheduleClose(); assert.equal(scheduled, 5);
`, context);
assert(!source.includes("if (replay && !busy) playOpenAnimation"));
assert(source.includes("timer = null; leaveTimer = null; candidate = null;"));
console.log("PASS: single close timer, panel interaction, image switching, busy guard, hidden guard, same-image animation guard");
