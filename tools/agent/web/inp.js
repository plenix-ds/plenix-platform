const fs=require('fs');const R='D:/Documents/Projects/Projects_Applications/Plenix/';
function ed(f,pairs){let s=fs.readFileSync(R+f,'utf8');for(const[a,b]of pairs){if(!s.includes(a))throw new Error(f+' missing '+a.slice(0,60));s=s.replace(a,b);}fs.writeFileSync(R+f,s);}
ed('platform/components/Input/Input.jsx',[
[`     Input.className: more classes on the <input>`,`     Input.inputMode, autoComplete, enterKeyHint, autoCapitalize, spellCheck: the on-screen keyboard and autofill hints
       (Platforms Standard 3.5 and 6.2); a type of "email", "url", "tel" or "search" brings its matching defaults (below)
     Input.className: more classes on the <input>`],
[`     Inside a Field, the label, description and error are connected for you.`,`     Inside a Field, the label, description and error are connected for you.
     Keyboard hints by type, each overridden by its own prop: email and url get their inputMode, no capitals and no spell
     check; tel gets inputMode "tel"; search gets inputMode "search" and enterKeyHint "search".`],
[`import { cx } from '../../utils/cx.js';
`,`import { cx } from '../../utils/cx.js';

// the keyboard a type brings on a touch screen (Platforms Standard 3.5: the right type, inputmode and autocomplete)
const TYPE_HINTS = {
  email: { inputMode: 'email', autoCapitalize: 'off', spellCheck: false },
  url: { inputMode: 'url', autoCapitalize: 'off', spellCheck: false },
  tel: { inputMode: 'tel' },
  search: { inputMode: 'search', enterKeyHint: 'search' },
};
`],
[`aria-invalid={invalid || undefined} {...rest} />;
});

export const Textarea`,`aria-invalid={invalid || undefined} {...TYPE_HINTS[type]} {...rest} />;
});

export const Textarea`],
]);
ed('platform/components/SearchField/SearchField.jsx',[
[`     ...rest: other attributes go on the input`,`     ...rest: other attributes go on the input (inputMode, enterKeyHint, autoComplete… override the search defaults)`],
[`     The shortcut hint shows only while the field is empty.`,`     The shortcut hint shows only while the field is empty.
     It is type="search" with inputMode "search" and enterKeyHint "search": a touch keyboard shows a Search key.`],
[`<input ref={ref} type="search" className="plx-search__input" aria-label={label} placeholder={placeholder} value={value} onChange={onChange} {...rest} />`,
 `<input ref={ref} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" className="plx-search__input" aria-label={label} placeholder={placeholder} value={value} onChange={onChange} {...rest} />`],
]);
ed('platform/components/Field/Field.jsx',[
[`     children: exactly one control`,`     type, inputMode, autoComplete, enterKeyHint: keyboard and autofill hints handed to the control (Platforms Standard 3.5),
       unless it sets its own
     children: exactly one control`],
[`export function Field({ label, description, error, required = false, info, infoLabel, layout = 'stacked', labelWidth, className, children, ...rest }) {`,
 `export function Field({ label, description, error, required = false, info, infoLabel, layout = 'stacked', labelWidth, type, inputMode, autoComplete, enterKeyHint, className, children, ...rest }) {`],
[`    required: child.props.required !== undefined ? child.props.required : (required || undefined),
  });`,`    required: child.props.required !== undefined ? child.props.required : (required || undefined),
  };
  // keyboard hints given on the Field reach the control, unless it has its own
  const hints = { type, inputMode, autoComplete, enterKeyHint };
  Object.keys(hints).forEach((k) => { if (hints[k] !== undefined && child.props[k] === undefined) props[k] = hints[k]; });
  const control = React.cloneElement(child, props);`],
[`  const control = React.cloneElement(child, {
    id: child.props.id || controlId,`,`  const props = {
    id: child.props.id || controlId,`],
]);
