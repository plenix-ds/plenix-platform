/* Plenix · Tag, Chip, TagList, TagInput
   Summary: Small gray labels with one look: Tag for a keyword or category, Chip for the same look as a toggle button.
   Usage:
     <TagList label="Keywords">
       <Tag onRemove={() => remove('sky')}>sky</Tag>
       <Chip selected={on} onClick={() => setOn(!on)}>Favorites</Chip>
       <TagInput placeholder="Add a tag" onKeyDown={…} />
     </TagList>
   Props:
     Tag.onRemove(event): shows a × button that runs it
     Tag.removeLabel: the × button's accessible name; default "Remove " + the tag text
     Tag.onRename(text): makes the tag renamable: its text becomes a button; activating it turns it into a field (Enter or leaving it keeps
       the new text, Escape cancels); renameLabel: the button's accessible name (default "Rename " + the tag text)
     Tag.className: more classes on the tag
     Tag.children: the tag text
     Chip.selected: the chip is pressed (aria-pressed); default false
     Chip.onClick(event): runs when the chip is clicked
     Chip.onRemove(event): shows a × button that runs it
     Chip.removeLabel: the × button's accessible name; default "Remove " + the chip text
     Chip.className: more classes on the chip
     Chip.children: the chip text
     TagList.label: the accessible name of the group; without it the list is not a group
     TagList.className: more classes on the list
     TagList.children: the tags or chips
     TagInput.onAdd(text): adds a tag: runs on Enter with the typed text (trimmed; never empty), then the field clears;
       the application ignores a tag it already has
     TagInput.className: more classes on the input
   Behavior:
     The × button is a 24px target in a 16px box.
     Selected chips are filled.
     TagInput is a text field like every other (the input's border, hover, focus and disabled states; owner, batch 268):
       type a tag and press Enter to add it; it appears before the field and its × removes it. Without onAdd the field
       only reports what is typed (onChange, onKeyDown).
     A tag being renamed is a small field with the input's focused border.
   Notes:
     TagList lays tags or chips out in a wrapping row; it sets no outer margin (the parent spaces it).
     TagInput is the "add a tag" field at the end of a TagList.
     Other props reach the element: the tag, the chip's toggle button, the list, or the input.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

function RemoveButton({ label, onClick }) {
  return <button type="button" className="plx-tag__remove" aria-label={label} onClick={onClick}><span aria-hidden="true">×</span></button>;
}

export function Tag({ onRemove, removeLabel, onRename, renameLabel, className, children, ...rest }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const text = typeof children === 'string' ? children : '';
  const done = (keep) => { setEditing(false); if (keep && draft.trim() && draft.trim() !== text) onRename(draft.trim()); };
  return (
    <span className={cx('plx-tag', onRename && 'plx-tag--renamable', editing && 'is-editing', className)} {...rest}>
      {onRename && editing ? (
        <input className="plx-tag__input" value={draft} aria-label={renameLabel || 'Rename ' + (text || 'tag')} autoFocus size={Math.max(4, draft.length)}
          onChange={(e) => setDraft(e.target.value)} onBlur={() => done(true)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); done(true); } else if (e.key === 'Escape') { e.preventDefault(); done(false); } }} />
      ) : onRename ? (
        <button type="button" className="plx-tag__label plx-tag__rename" aria-label={renameLabel || 'Rename ' + (text || 'tag')} onClick={() => { setDraft(text); setEditing(true); }}>{children}</button>
      ) : <span className="plx-tag__label">{children}</span>}
      {onRemove ? <RemoveButton label={removeLabel || 'Remove ' + (typeof children === 'string' ? children : 'tag')} onClick={onRemove} /> : null}
    </span>
  );
}

export function Chip({ selected = false, onRemove, removeLabel, className, children, ...rest }) {
  if (onRemove) {
    return (
      <span className={cx('plx-tag', 'plx-chip', selected && 'plx-chip--selected', className)}>
        <button type="button" className="plx-chip__toggle" aria-pressed={selected} {...rest}>{children}</button>
        <RemoveButton label={removeLabel || 'Remove ' + (typeof children === 'string' ? children : 'filter')} onClick={onRemove} />
      </span>
    );
  }
  return <button type="button" className={cx('plx-tag', 'plx-chip', selected && 'plx-chip--selected', className)} aria-pressed={selected} {...rest}>{children}</button>;
}

export function TagList({ className, children, label, ...rest }) {
  return <div className={cx('plx-tag-list', className)} role={label ? 'group' : undefined} aria-label={label} {...rest}>{children}</div>;
}

export const TagInput = React.forwardRef(function TagInput({ onAdd, onKeyDown, value, onChange, className, ...rest }, ref) {
  const [own, setOwn] = React.useState('');
  const text = value !== undefined ? value : own;
  const change = (e) => { if (value === undefined) setOwn(e.target.value); if (onChange) onChange(e); };
  const keyDown = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented || !onAdd || e.key !== 'Enter') return;
    e.preventDefault();
    const t = String(text).trim();
    if (!t) return;
    onAdd(t);
    if (value === undefined) setOwn('');
    else if (onChange) onChange({ target: { value: '' }, currentTarget: { value: '' } });
  };
  return <input ref={ref} type="text" className={cx('plx-input', 'plx-tag-input', className)} value={text} onChange={change} onKeyDown={keyDown} {...rest} />;
});
