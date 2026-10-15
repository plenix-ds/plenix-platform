const fs=require('fs');const R='D:/Documents/Projects/Projects_Applications/Plenix/platform/tokens/';
function add(file,group,after,entries){const p=R+file+'.tokens.json';const j=JSON.parse(fs.readFileSync(p,'utf8'));const g=j[group];if(!(after in g))throw new Error('no '+after);const out={};for(const k in g){out[k]=g[k];if(k===after)for(const[n,v]of entries){if(n in g)throw new Error('exists '+n);out[n]=v;}}j[group]=out;fs.writeFileSync(p,JSON.stringify(j,null,2)+'\n');}
add('reference','plx-ref','motion-delay-stagger',[
 ['motion-delay-long-press',{$value:'0.5s',$type:'duration'}],
 ['motion-delay-dismiss',{$value:'1.5s',$type:'duration'}],
]);
add('semantic','plx-sys','safe-area-end',[
 ['touch-long-press-delay',{$value:'{plx-ref.motion-delay-long-press}',$type:'duration',$description:'How long a finger rests on a control before it counts as a long press (Android\'s long-press timeout is 400 to 500ms); a long press shows a tooltip on touch (Platforms Standard 6.5)'}],
 ['touch-dismiss-delay',{$value:'{plx-ref.motion-delay-dismiss}',$type:'duration',$description:'How long a tooltip opened by a long press stays after the finger lifts (Material 3 › Tooltips: 1.5s)'}],
]);
add('components','plx-comp','tooltip-bubble-duration',[
 ['tooltip-long-press-delay',{$value:'{plx-sys.touch-long-press-delay}',$type:'duration',$description:'On touch (a coarse pointer, no hover) the tooltip shows after a long press of this length; Tooltip.jsx reads it'}],
 ['tooltip-touch-dismiss-delay',{$value:'{plx-sys.touch-dismiss-delay}',$type:'duration',$description:'A tooltip opened by a long press hides this long after the finger lifts; Tooltip.jsx reads it'}],
]);
add('components','plx-comp','action-bar-stick',[
 ['action-bar-block-size',{$value:'calc({plx-sys.control-height-standard} + {plx-sys.space-inset-sm} * 2 + {plx-sys.border-width-thin})',$type:'dimension',$description:'The height of a one-row ActionBar (its padding, its line and a standard button): the scroll padding at the bottom of a scrolling area with a stuck bar, so a focused element is never hidden behind it (WCAG 2.2 SC 2.4.11; Platforms Standard 8.1)'}],
]);
