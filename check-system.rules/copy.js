// Plenix · content lint entry point, loaded by the existing check-system module discovery.
const path = require('path'), copy = require('../check-copy.js');
module.exports = { name: 'copy', check({ add }) { const root = path.resolve(__dirname, '..'); for (const finding of copy.run(root).findings) add('copy-' + finding.rule, path.join(root, finding.file), finding.line, finding.message + ' [' + finding.text + ']'); } };
