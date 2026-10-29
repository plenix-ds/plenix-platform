<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="file://ROOT/platform/platform.css">
<script src="file://ROOT/platform/vendor/react.production.min.js"></script><script src="file://ROOT/platform/vendor/react-dom.production.min.js"></script>
<script src="file://ROOT/platform/dist/platform.js"></script></head><body class="plx-app" style="padding:16px;width:640px"><div id="root"></div>
<script>
const h=React.createElement,P=window.Plenix;const opts=[{value:'y',label:'نعم'},{value:'n',label:'لا'}];
function App(){const [v,setV]=React.useState('y');const [c,setC]=React.useState(false);
 return h('div',null,
  h(P.Fieldset,{legend:'Attendance','data-k':'en'},h(P.RadioGroup,{label:'Answer',value:v,onChange:setV,options:[{value:'y',label:'Yes'},{value:'n',label:'No'}]}),h(P.Checkbox,{label:'I confirm','data-k':'en-check'})),
  h(P.Fieldset,{dir:'rtl',lang:'ar',legend:'بيانات الحضور','data-k':'ar'},h(P.RadioGroup,{label:'الإجابة',value:v,onChange:setV,options:opts}),h(P.Checkbox,{label:'أؤكد','data-k':'ar-check'})),
  h(P.Checkbox,{dir:'rtl',lang:'ar',label:'مربع وحده','data-k':'solo-check',checked:c,onChange:(e)=>setC(e.target.checked)}),
  h(P.Switch,{dir:'rtl',lang:'ar',label:'مفتاح','data-k':'solo-switch'}),
  h(P.Radio,{dir:'rtl',lang:'ar',label:'خيار','name':'solo','data-k':'solo-radio'}),
  h(P.Checkbox,{readOnly:true,label:'Read-only','data-k':'ro-check'}));}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
</script></body></html>
