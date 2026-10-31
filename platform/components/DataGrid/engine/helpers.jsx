/* Plenix · DataGrid engine · the engine's small shared values and functions
   Moved out of DataGridEngine.jsx without any change to the code (issue 688). The engine is documented in DataGridEngine.jsx. */
import React from 'react';
import { valueText } from '../cells.jsx';
import AttachmentIcon from 'plenix-platform/icons/plenix/attachment';
import CalendarIcon from 'plenix-platform/icons/plenix/calendar';
import EdTextIcon from 'plenix-platform/icons/plenix/ed-text';
import FieldCurrencyIcon from 'plenix-platform/icons/plenix/field-currency';
import FieldLongTextIcon from 'plenix-platform/icons/plenix/field-long-text';
import FieldNumberIcon from 'plenix-platform/icons/plenix/field-number';
import FieldSelectIcon from 'plenix-platform/icons/plenix/field-select';
import ImageAN2Icon from 'plenix-platform/icons/plenix/image-a-2';
import LinkIcon from 'plenix-platform/icons/plenix/link';
import PersonIcon from 'plenix-platform/icons/plenix/person';
import SelectIcon from 'plenix-platform/icons/plenix/select';

// Frozen cells inherit the grid direction for logical sticky placement; their values retain automatic bidi.
export const cellDirection = (enabled, content) =>
  enabled ? (
    <span className={GRID + '__cell-direction'} dir="auto">
      {content}
    </span>
  ) : (
    content
  );

export const EMPTY_ROWS = [];

export const words = (template, values) => String(template).replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);

export const GRID = 'plx-data-grid',
  interactive = 'a,button,input,select,textarea,label,[role="button"],[contenteditable="true"],[data-plx-no-row-click]';

export const typeIcons = {
  multi: FieldSelectIcon,
  text: EdTextIcon,
  number: FieldNumberIcon,
  bytes: AttachmentIcon,
  currency: FieldCurrencyIcon,
  date: CalendarIcon,
  select: FieldSelectIcon,
  checkbox: SelectIcon,
  file: AttachmentIcon,
  image: ImageAN2Icon,
  link: LinkIcon,
  person: PersonIcon,
  'long-text': FieldLongTextIcon
};

export const kinds = (c) => [].concat(c.kind || []);

export const typeOf = (c) =>
  c.type ||
  (kinds(c).includes('wrap') ? 'long-text' : c.sorter === 'number' ? 'number' : c.sorter === 'date' ? 'date' : 'text');

export const sorted = (s) => s.map((x) => ({ field: x.id, dir: x.desc ? 'desc' : 'asc' }));

export const lengthName = (v) => {
  const match = /(?:--plx-ref-size-)?(\d+px)/.exec(String(v || ''));
  return match?.[1];
};

const sortCollator = new Intl.Collator(undefined, { numeric: true });

export const compare = (a, b, id) => {
  const x = a.getValue(id),
    y = b.getValue(id);
  if (x == null || y == null) return x == null ? (y == null ? 0 : -1) : 1;
  return sortCollator.compare(valueText(x), valueText(y));
};
