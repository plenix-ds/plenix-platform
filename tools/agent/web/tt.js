const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/platform/components/Tooltip/Tooltip.jsx';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`export function Tooltip(`,`// the last way the person reached for the page: a touch, or a mouse, pen or key. Focus that follows a tap does not open
// the tooltip (a long press does); focus that follows a key does. One listener pair for every tooltip.
let lastInput = 'key';
if (typeof document !== 'undefined') {
  document.addEventListener('pointerdown', (e) => { lastInput = e.pointerType === 'touch' ? 'touch' : 'pointer'; }, true);
  document.addEventListener('keydown', () => { lastInput = 'key'; }, true);
}

export function Tooltip(`);
rep(`  const touch = React.useRef(false);    // a touch is in progress: its focus and emulated mouse events do not open the tooltip
`,``);
rep(`    clear(); touch.current = true; pressed.current = false;`,`    clear(); pressed.current = false;`);
rep(`    if (pressed.current) hide.current = setTimeout(() => setOpen(false), e.type === 'pointercancel' ? 0 : ms(wrap.current, '--plx-comp-tooltip-touch-dismiss-delay'));
    // the compatibility mouse events and the focus of this tap arrive after pointerup: let them pass first
    setTimeout(() => { touch.current = false; }, 0);
`,`    if (pressed.current) hide.current = setTimeout(() => setOpen(false), e.type === 'pointercancel' ? 0 : ms(wrap.current, '--plx-comp-tooltip-touch-dismiss-delay'));
`);
rep(`if (e.pointerType !== 'touch' && !touch.current) setOpen(true);`,`if (e.pointerType !== 'touch') setOpen(true);`);
rep(`onFocus={() => { if (!touch.current) setOpen(true); }}`,`onFocus={() => { if (lastInput !== 'touch') setOpen(true); }}`);
rep(`     A tap does not show it (the tap's focus and the emulated mouse events are ignored), and the long press does not open
     the browser's context menu.`,`     A tap does not show it (focus that follows a touch is ignored; mouse events emulated from touch are not listened to),
     and the long press does not open the browser's context menu.`);
fs.writeFileSync(f,s);
