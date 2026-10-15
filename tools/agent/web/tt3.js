const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/platform/components/Tooltip/Tooltip.jsx';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`     and the long press does not open the browser's context menu.`,`     and the long press neither opens the browser's context menu nor activates the control (the click that may follow the
     release is dropped): a long press asks what a control is, it does not use it.`);
rep(`      onContextMenu={(e) => { if (pressed.current) e.preventDefault(); }}`,`      onContextMenu={(e) => { if (pressed.current) e.preventDefault(); }}
      onClickCapture={(e) => { if (pressed.current) { e.preventDefault(); e.stopPropagation(); pressed.current = false; } }}`);
fs.writeFileSync(f,s);
