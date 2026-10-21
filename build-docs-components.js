// Static release documentation: canonical records stay put; component-name aliases list every matching record.
const fs = require('fs'), path = require('path');
module.exports = function componentDocs(records, docs, platform, destination, render, write) {
  const canonical = new Set(records.filter(r => r.id).map(r => encodeURIComponent(r.id) + '.md'));
  const aliases = new Map(), index = [];
  for (const record of records) {
    if (!record.id) continue;
    const file = record.src && path.resolve(platform, record.src);
    const inside = file && file.startsWith(platform + path.sep);
    const source = inside && fs.existsSync(file) && fs.statSync(file).isFile() ? fs.readFileSync(file, 'utf8') : '';
    const href = encodeURIComponent(record.id) + '.md', title = record.title || record.leaf || record.id;
    write(path.join(destination, href), render(record, docs[record.id] || {}, source));
    const componentNames = [...new Set(String(record.plenix || '').split(',').map(x => x.trim()).filter(x => /^[A-Za-z][A-Za-z0-9]*$/.test(x)))];
    const links = [];
    for (const component of componentNames) {
      const alias = component.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase() + '.md';
      if (canonical.has(alias)) continue;
      if (!aliases.has(alias)) aliases.set(alias, { component, records: [] });
      aliases.get(alias).records.push({ href, title }); links.push(alias);
    }
    index.push({ id: record.id, title, href, componentNames, aliases: links, source: record.src || null });
  }
  for (const [alias, entry] of aliases) write(path.join(destination, alias), '# ' + entry.component + '\n\n' + entry.records.map(r => '- [' + r.title + '](' + r.href + ')').join('\n') + '\n');
  return index;
};
