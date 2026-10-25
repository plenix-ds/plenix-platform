// Draws the review table from window.PlenixIconInventory (platform/icons/inventory/inventory.js). No markup strings:
// every element is created through the DOM, and SVG drawings are set as path data.
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var inv = window.PlenixIconInventory;
  var KEYLINES = { 24: { circle: [100, 860, 100, 860], square: [140, 820, 140, 820], portrait: [180, 780, 100, 860], landscape: [100, 860, 180, 780] } };

  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function svg(cls, viewBox) { var s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', viewBox || '0 -960 960 960'); s.setAttribute('class', 'ig-icon ' + cls); s.setAttribute('aria-hidden', 'true'); return s; }
  function path(d, cls) { var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); if (cls) { p.setAttribute('class', cls); p.setAttribute('vector-effect', 'non-scaling-stroke'); } return p; }
  function drawing(d, cls) { var s = svg(cls); s.appendChild(path(d)); return s; }
  function sample(node, label) { var w = el('div', 'ig-sample'); w.appendChild(node); w.appendChild(el('span', null, label)); return w; }

  // The 24 drawing at 96px, over its 24-pixel grid and its keyline.
  function enlarged(d, shape) {
    var s = svg('ig-s96');
    var g = '';
    for (var i = 1; i < 24; i++) g += 'M' + i * 40 + ' -960V0M0 ' + (i * 40 - 960) + 'H960';
    s.appendChild(path(g, 'ig-grid'));
    s.appendChild(path(d));
    var k = KEYLINES[24][shape];
    if (k) {
      var kd = shape === 'circle'
        ? 'M' + k[0] + ' -480a380 380 0 1 0 760 0a380 380 0 1 0 -760 0'
        : 'M' + k[0] + ' ' + (k[2] - 960) + 'H' + k[1] + 'V' + (k[3] - 960) + 'H' + k[0] + 'Z';
      s.appendChild(path(kd, 'ig-keyline'));
    }
    return s;
  }
  // The library's own file, read as data: only its viewBox and shapes' geometry are copied, as an outline drawing.
  function found(text) {
    var doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    var src = doc.documentElement;
    var s = svg('ig-s96 ig-found', src.getAttribute('viewBox') || '0 0 24 24');
    var allowed = { path: ['d'], rect: ['x', 'y', 'width', 'height', 'rx', 'ry'], circle: ['cx', 'cy', 'r'], line: ['x1', 'y1', 'x2', 'y2'], polyline: ['points'], polygon: ['points'], ellipse: ['cx', 'cy', 'rx', 'ry'], g: [] };
    var paint = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'transform'];
    (function copy(from, to) {
      for (var i = 0; i < from.children.length; i++) {
        var c = from.children[i], tag = c.localName;
        if (!allowed[tag]) continue;
        var n = document.createElementNS(NS, tag);
        allowed[tag].concat(paint).forEach(function (a) { var v = c.getAttribute(a); if (v != null && !/url\(|javascript:/i.test(v)) n.setAttribute(a, v === 'currentColor' ? 'currentColor' : v); });
        to.appendChild(n);
        copy(c, n);
      }
    })(src, s);
    return s;
  }
  function verdict(check, key) {
    var c = check && check[key];
    if (!c) return el('span', 'ig-none', '—');
    return el('span', c.pass ? 'ig-pass' : 'ig-fail', c.pass ? 'pass' : 'fails: ' + c.fail.join(', '));
  }

  var body = document.getElementById('rows');
  inv.icons.forEach(function (r) {
    var D = r.drawings || {};
    var tr = el('tr');
    var who = el('td');
    who.appendChild(el('div', 'ig-name', r.name));
    who.appendChild(el('div', 'ig-meta', r.library + ' · ' + r.icon));
    who.appendChild(el('div', 'ig-meta', r.license));
    who.appendChild(el('div', 'ig-meta', r.why));
    tr.appendChild(who);

    var today = el('td'), tc = el('div', 'ig-cell');
    if (D.material20) {
      tc.appendChild(sample(drawing(D.material20, 'ig-s16'), '16'));
      tc.appendChild(sample(drawing(D.material20, 'ig-s20'), '20'));
      tc.appendChild(sample(drawing(D.material24, 'ig-s24'), '24'));
      tc.appendChild(sample(drawing(D.materialFilled24, 'ig-s24'), 'filled'));
      tc.appendChild(sample(enlarged(D.material24, (r.restyle && r.restyle[24] && r.restyle[24].shape) || 'square'), '24 at 4×'));
    } else tc.appendChild(el('span', 'ig-none', 'Material has none'));
    today.appendChild(tc); tr.appendChild(today);

    var f = el('td'), fc = el('div', 'ig-cell');
    if (D.found) fc.appendChild(sample(found(D.found), 'as found, 4×'));
    fc.appendChild(sample(verdict(r.check, 'found'), ''));
    f.appendChild(fc); tr.appendChild(f);

    var o = el('td'), oc = el('div', 'ig-cell');
    if (D.outline20) {
      oc.appendChild(sample(drawing(D.outline20, 'ig-s16'), '16'));
      oc.appendChild(sample(drawing(D.outline20, 'ig-s20'), '20'));
      oc.appendChild(sample(drawing(D.outline24, 'ig-s24'), '24'));
      oc.appendChild(sample(drawing(D.filled20, 'ig-s20'), 'filled 20'));
      oc.appendChild(sample(drawing(D.filled24, 'ig-s24'), 'filled 24'));
      oc.appendChild(sample(enlarged(D.outline24, r.restyle && r.restyle[24] && r.restyle[24].shape), '24 at 4×'));
      oc.appendChild(sample(enlarged(D.filled24, r.restyle && r.restyle[24] && r.restyle[24].shape), 'filled 24 at 4×'));
    }
    o.appendChild(oc); tr.appendChild(o);

    var c = el('td');
    ['outline20', 'filled20', 'outline24', 'filled24'].forEach(function (k) { var line = el('div'); line.appendChild(el('span', 'ig-meta', k + ' ')); line.appendChild(verdict(r.check, k)); c.appendChild(line); });
    if (r.restyle && r.restyle[24]) c.appendChild(el('div', 'ig-meta', 'filled: ' + r.restyle[24].fill));
    tr.appendChild(c);
    body.appendChild(tr);
  });
})();
