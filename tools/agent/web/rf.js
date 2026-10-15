const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/tests/reflow.test.js';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`    (el.closest(EXEMPT) || el.querySelector(EXEMPT) && el.scrollWidth - el.clientWidth <= Math.max(...[...el.querySelectorAll(EXEMPT)].map((x) => x.scrollWidth)) ? out.exempt : out.scroller)
      .push(`,`    // exempt: the scroller is inside two-dimensional content, or such content is what makes it wide
    const wide = (x) => x.getBoundingClientRect().width > el.clientWidth + 1 || x.scrollWidth > el.clientWidth + 1;
    (el.closest(EXEMPT) || [...el.querySelectorAll(EXEMPT)].some(wide) ? out.exempt : out.scroller).push(`);
rep(`    // clipped by an ancestor that hides overflow on purpose (an ellipsis keeps a way to read it: a tooltip or the title)
    let clipped = false;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const c = getComputedStyle(p);
      if (/hidden|clip/.test(c.overflowX)) { const pr = p.getBoundingClientRect(); if (pr.right <= W + 1 && pr.left >= -1) { clipped = getComputedStyle(el).textOverflow === 'ellipsis' || c.textOverflow === 'ellipsis'; if (r.right > pr.right + 1 && !clipped) { clipped = 'lost'; } break; } }
    }
    if (clipped === true) continue;
    if (r.right > W + 1 || r.left < -1 || clipped === 'lost') out['cut-off']`,`    // the nearest ancestor that clips sideways (inside the window, else the window itself): past its edge is lost, unless
    // the text ends in an ellipsis (truncation with a way to read it: a tooltip or the full text elsewhere is the rule)
    let left = 0, right = W, ellipsis = getComputedStyle(el).textOverflow === 'ellipsis';
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const c = getComputedStyle(p); if (c.textOverflow === 'ellipsis') ellipsis = true;
      if (/hidden|clip/.test(c.overflowX)) { const pr = p.getBoundingClientRect(); left = Math.max(left, pr.left); right = Math.min(right, pr.right); break; }
    }
    if (ellipsis) continue;
    if (r.right > right + 1 || r.left < left - 1) out['cut-off']`);
fs.writeFileSync(f,s);
