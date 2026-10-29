// Plenix · check-system rule "hook-adoption" (issue 262: library components onto the foundation hooks).
//   check-system.rules/hook-adoption.json lists, per hook, the components and patterns that have moved onto it. A listed file must
//   still import the hook and call it (import { useReadOnly } from …, then useReadOnly(…)): a mention in a comment, a string or a
//   name that is only declared does not count, so a moved component cannot slide back to its own handling. The lists only grow, in
//   the PR that moves a component. A listed file that no longer exists fails too, so the lists never keep a name that is gone.
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../check-common.js');
const NAME = 'hook-adoption';

// the code with its comments and string contents taken out, so only real code is read
const code = (source) => source
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/(^|[^:\\])\/\/[^\n]*/g, '$1')
  .replace(/'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/g, '""');

module.exports = {
  check({ add }) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'hook-adoption.json'), 'utf8'));
    for (const hook of Object.keys(data).filter((k) => Array.isArray(data[k]))) {
      const imported = new RegExp('import\\s*\\{[^}]*\\b' + hook + '\\b[^}]*\\}\\s*from');
      const called = new RegExp('\\b' + hook + '\\s*\\(|<' + hook + '\\b');   // a hook is called; a component (LiveRegion) is drawn
      for (const rel of data[hook]) {
        const file = path.join(ROOT, rel);
        if (!fs.existsSync(file)) { add(NAME, file, 0, rel + ' is listed under ' + hook + ' but does not exist: remove it from hook-adoption.json'); continue; }
        const source = fs.readFileSync(file, 'utf8');
        // the import line itself holds a string (the path), so it is tested on the source with comments only taken out
        const noComments = source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:\\])\/\/[^\n]*/g, '$1');
        if (!imported.test(noComments)) add(NAME, file, 0, rel + ' must import ' + hook + ' (it moved onto it, issue 262): do not go back to handling this by hand');
        else if (!called.test(code(source))) add(NAME, file, 0, rel + ' imports ' + hook + ' but never calls it: use it, do not just name it');
      }
    }
  }
};
