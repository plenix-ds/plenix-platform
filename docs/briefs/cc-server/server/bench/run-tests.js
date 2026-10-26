// Prints shard N (1-8) of the recorded test run, like a test runner would.
const fs = require("fs");
const n = Number((process.argv.find(a => /^\d+$/.test(a))) || 1);
const lines = fs.readFileSync(__dirname + "/test-run.log", "utf8").split("\n");
const start = (n - 1) * 250, end = n === 8 ? lines.length : n * 250;
process.stdout.write(lines.slice(start, end).join("\n") + "\n");
