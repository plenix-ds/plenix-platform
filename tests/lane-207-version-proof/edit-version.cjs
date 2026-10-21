// Guarded VersionCompare migration: reject unmatched input.
const fs=require('fs');function rep(f,a,b){const s=fs.readFileSync(f,'utf8');if(s.split(a).length!==2)throw Error('Expected one match: '+f+' '+a);fs.writeFileSync(f,s.replace(a,b));}const css='platform/patterns/VersionCompare/version-compare.css',jsx='platform/patterns/VersionCompare/VersionCompare.jsx',lab='lanes/207-version/design-system/parts/w12A.labs.js';
rep(css,'.plx-version-compare--columns,.plx-version-compare--slider{row-gap:var(--plx-comp-version-compare-gap);}\n','');
rep(css,'.plx-version-compare__picker{flex-basis:var(--plx-comp-version-compare-picker-width);flex-grow:0;min-inline-size:0;}','.plx-version-compare__picker{flex-basis:var(--plx-comp-version-compare-picker-width);flex-grow:0;}');
rep(css,'.plx-version-compare--text .plx-version-compare__diff','.plx-version-compare__diff');
rep(css,'.plx-version-compare__line--added .plx-version-compare__sign','.plx-version-compare__sign--added:where(:not(.plx-version-compare__sign--removed))');
rep(css,'.plx-version-compare__line--removed .plx-version-compare__sign','.plx-version-compare__sign--removed');
rep(css,'   API: VersionCompare.jsx. */','   API: VersionCompare.jsx. The diff exists only in text mode; signs carry their own line kind. Field owns picker minimum width. */');
rep(jsx,'className="plx-version-compare__sign"',"className={cx('plx-version-compare__sign', x.kind === 'add' && 'plx-version-compare__sign--added', x.kind === 'del' && 'plx-version-compare__sign--removed')}");
rep(jsx,'   Behavior:\n','   Behavior:\n     Text-diff signs carry their own line-kind classes; the diff part owns its layout and Field owns picker minimum width.\n');
rep(lab,'class="plx-version-compare__sign" aria-hidden=',"class=\"plx-version-compare__sign' + (l[0] === 'add' ? ' plx-version-compare__sign--added' : l[0] === 'del' ? ' plx-version-compare__sign--removed' : '') + '\" aria-hidden=");
rep(lab,"part: '.plx-version-compare__line--added .plx-version-compare__sign'", "part: '.plx-version-compare__sign--added'");
rep(lab,"part: '.plx-version-compare__line--removed .plx-version-compare__sign'", "part: '.plx-version-compare__sign--removed'");
