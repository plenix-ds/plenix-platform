// Plenix · check-system rule "hook-adoption" (issue 262: library components onto the foundation hooks).
//   check-system.rules/hook-adoption.json lists, per hook, the components and patterns that have moved onto it. A listed file must
//   still name the hook (an import and a call): a moved component cannot slide back to its own handling. The lists only grow, in the
//   PR that moves a component. A listed file that no longer exists fails too, so the lists never keep a name that is gone.
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../check-common.js');
const NAME = 'hook-adoption';

module.exports = {
  check({ add }) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'hook-adoption.json'), 'utf8'));
    for (const hook of Object.keys(data).filter((k) => Array.isArray(data[k]))) {
      for (const rel of data[hook]) {
        const file = path.join(ROOT, rel);
        if (!fs.existsSync(file)) { add(NAME, file, 0, rel + ' is listed under ' + hook + ' but does not exist: remove it from hook-adoption.json'); continue; }
        const source = fs.readFileSync(file, 'utf8');
        const uses = new RegExp('\\b' + hook + '\\b').test(source.replace(/\/\*[\s\S]*?\*\//, ''));   // the file header comment does not count
        if (!uses) add(NAME, file, 0, rel + ' must use ' + hook + ' (it moved onto it, issue 262): do not go back to handling this by hand');
      }
    }
  }
};
