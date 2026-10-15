const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/platform/components/Tooltip/Tooltip.jsx';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`// the tooltip (a long press does); focus that follows a key does. One listener pair for every tooltip.
let lastInput = 'key';
if (typeof document !== 'undefined') {
  document.addEventListener('pointerdown', (e) => { lastInput = e.pointerType === 'touch' ? 'touch' : 'pointer'; }, true);
  document.addEventListener('keydown', () => { lastInput = 'key'; }, true);
}
`,`// the tooltip (a long press does); focus that follows a key does. One listener pair for every tooltip, added by the first.
let lastInput = 'key', listening = false;
const listen = () => {
  if (listening) return; listening = true;
  document.addEventListener('pointerdown', (e) => { lastInput = e.pointerType === 'touch' ? 'touch' : 'pointer'; }, true);
  document.addEventListener('keydown', () => { lastInput = 'key'; }, true);
};
`);
rep(`  React.useEffect(() => clear, []);`,`  React.useEffect(() => { listen(); return clear; }, []);`);
fs.writeFileSync(f,s);
