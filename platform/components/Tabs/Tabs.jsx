/* Plenix · Tabs
   Summary: Switch between views of the same thing.
   Usage:
     <Tabs label="Asset details" value={tab} onChange={setTab}
       items={[{ value: 'info', label: 'Info', count: 3, content: <…/> }, …]} />
   Props:
     variant: "contained" (default) | "underline" | "folder" | "segmented"
     items: the tabs, in order: [{ value, label, icon, count, content, disabled }]
     items[].icon: an icon name or element before the label
     items[].count: a count after the label
     items[].content: the tab's panel; without content Tabs draws only the tab list
     items[].disabled: the tab cannot be chosen and keys skip it
     value: the selected tab's value (controlled)
     defaultValue: the first selected tab when uncontrolled; default the first item
     onChange(value): runs when another tab is selected
     label: the accessible name of the tab list
     idBase: the base of the tab and panel ids, for a panel the application renders
     className: more classes on the tabs
     panelClassName: more classes on each panel
   Behavior:
     Arrow keys move and select (wrapping); Home and End go to the first and last.
     Only the selected tab is in the Tab order.
     The open folder tab has no line beneath it.
   Notes:
     "contained" is the standard: folder tabs joined to a bordered panel.
     "folder" (owner, batch 259) is the tab strip alone: the folder tabs over a baseline, the open tab joined to it, and the
     content below with no frame of its own; for tabs inside a pane or a card that is already framed.
     "underline" and "segmented" (a compact switch) stay for compatibility.
     Without content on the items, the application renders the panel; give that panel id={tabsPanelId(idBase, value)}
       and pass idBase so the tabs point at it.
*/
import React from 'react';
import { arrowStep } from '../../utils/direction.js';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';
import { Count } from '../Count/Count.jsx';
import { Icon } from '../Icon/Icon.jsx';

const asIcon = (i) => (typeof i === 'string' ? <Icon name={i} /> : i);
export const tabsPanelId = (base, value) => base + '-panel-' + String(value).replace(/[^a-zA-Z0-9_-]/g, '');

export function Tabs({ variant = 'contained', items, value, defaultValue, onChange, label, idBase, className, panelClassName }) {
  const uid = useUid('plx-tabs');
  const base = idBase || uid;
  const [own, setOwn] = React.useState(defaultValue !== undefined ? defaultValue : (items[0] ? items[0].value : undefined));
  const current = value !== undefined ? value : own;
  const refs = React.useRef({});
  const select = (v) => { if (value === undefined) setOwn(v); if (onChange) onChange(v); };
  const enabled = items.filter((t) => !t.disabled);
  const onKeyDown = (e) => {
    const at = enabled.findIndex((t) => t.value === current);
    let next = null;
    const step = arrowStep(e, e.currentTarget);   // in reading order: right to left reverses Left and Right (batch 213)
    if (step > 0) next = (at + 1) % enabled.length;
    else if (step < 0) next = (at - 1 + enabled.length) % enabled.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = enabled.length - 1;
    else return;
    e.preventDefault();
    const t = enabled[next];
    select(t.value);
    if (refs.current[t.value]) refs.current[t.value].focus();
  };
  const hasPanels = items.some((t) => t.content !== undefined);
  return (
    <div className={cx('plx-tabs', 'plx-tabs--' + variant, className)}>
      <div role="tablist" aria-label={label} className="plx-tabs__list" onKeyDown={onKeyDown}>
        {items.map((t) => {
          const on = t.value === current;
          return (
            <button key={t.value} ref={(el) => { refs.current[t.value] = el; }} type="button" role="tab" id={base + '-tab-' + String(t.value).replace(/[^a-zA-Z0-9_-]/g, '')}
              aria-selected={on} aria-controls={tabsPanelId(base, t.value)} tabIndex={on ? 0 : -1} disabled={t.disabled || undefined}
              className={cx('plx-tabs__tab', on && 'is-selected')} onClick={() => select(t.value)}>
              {t.icon ? <span className="plx-tabs__icon">{asIcon(t.icon)}</span> : null}
              <span className="plx-tabs__label">{t.label}</span>
              {t.count !== undefined ? <Count value={t.count} tone="neutral" /> : null}
            </button>
          );
        })}
      </div>
      {hasPanels ? items.map((t) => (
        <div key={t.value} role="tabpanel" id={tabsPanelId(base, t.value)} aria-labelledby={base + '-tab-' + String(t.value).replace(/[^a-zA-Z0-9_-]/g, '')}
          tabIndex={0} hidden={t.value !== current} className={cx('plx-tabs__panel', panelClassName)}>
          {t.value === current ? t.content : null}
        </div>
      )) : null}
    </div>
  );
}
