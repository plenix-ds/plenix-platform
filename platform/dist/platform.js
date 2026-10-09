/*
 * GENERATED FILE — DO NOT EDIT
 * Source: platform/index.js and the modules it imports
 * Build: node build-app.js
 */
(function () {
  var defs = {
  "platform/components/Badge/Badge.jsx": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = Badge;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Badge
   Summary: A small label with bold text: solid (white text on the tone) or soft (the tone's text on its pale fill).
   Usage:
     <Badge tone="success">Published</Badge>
     <Badge tone="danger" size="sm">3</Badge>
     <Badge tone="warning" variant="soft">Draft</Badge>
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"
     variant: "solid" (default; white text on the tone) | "soft" (the tone's text on its pale fill: quieter, for many
       statuses in a dense list)
     size: "md" (default; a 20px label) | "sm" (16px, for counts)
     children: the badge text
     className: more classes on the badge
   Behavior:
     An unknown tone, variant or size falls back to the default.
   Notes:
     Other props (title, aria-*, …) pass through to the <span>.
     A badge is text: give a count enough context nearby or an accessible name on its control.
*/
const TONES = ['neutral', 'info', 'success', 'warning', 'danger'];
const SIZES = ['md', 'sm'];
const VARIANTS = ['solid', 'soft'];
function Badge({
  tone = 'neutral',
  variant = 'solid',
  size = 'md',
  className,
  children,
  ...rest
}) {
  const t = TONES.indexOf(tone) >= 0 ? tone : 'neutral';
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const v = VARIANTS.indexOf(variant) >= 0 ? variant : 'solid';
  const classes = ['plx-badge', 'plx-badge--' + t, v === 'soft' ? 'plx-badge--soft' : null, s === 'sm' ? 'plx-badge--sm' : null, className].filter(Boolean).join(' ');
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: classes
  }, rest), children);
}
  } },
  "platform/components/VisuallyHidden/VisuallyHidden.jsx": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisuallyHidden = VisuallyHidden;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · VisuallyHidden
   Summary: Text for assistive technology only (a name for an icon-only control, a status).
   Usage:
     <button type="button"><Icon name="trash" /><VisuallyHidden>Delete</VisuallyHidden></button>
   Props:
     as: the element; default "span"
     children: the hidden text
     ...rest: other attributes go on the element
*/
function VisuallyHidden({
  as: Tag = 'span',
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    className: "plx-visually-hidden"
  }, rest), children);
}
  } },
  "platform/utils/cx.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cx = cx;
/* Plenix · cx (platform/utils/cx.js): joins class names, skipping empty ones. Internal; not part of the public API. */
function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
  } },
  "platform/components/Count/Count.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Count = Count;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Count
   Summary: A number shown on its own.
   Usage:
     <Count value={24} />
     <Count variant="pill" value={unread} max={99} label={unread + ' unread notifications'} />
   Props:
     value: the number; with no value nothing renders
     variant: "plain" (default; muted tabular figures, e.g. a list row's item count) | "pill" (a 16px solid pill for unread
       or pending counts)
     tone: the pill color: "neutral" | "info" | "success" | "warning" | "danger" (default)
     max: above it the count shows max + "+" (e.g. "99+")
     label: the accessible name when the number alone is unclear ("3 unread notifications")
     moreThan: what screen readers hear for a capped count without a label (default "More than {max}")
     className: more classes on the count
   Notes:
     Other props pass through to the <span>.
*/
function Count({
  value,
  max,
  variant = 'plain',
  tone = 'danger',
  label,
  moreThan = 'More than {max}',
  className,
  ...rest
}) {
  if (value === null || value === undefined || value === '') return null;
  const shown = typeof max === 'number' && Number(value) > max ? max + '+' : String(value);
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-count', 'plx-count--' + variant, variant === 'pill' ? 'plx-count--' + tone : null, className),
    "aria-label": label || (typeof max === 'number' && Number(value) > max ? moreThan.replace('{max}', String(max)) : undefined)
  }, rest), shown);
}
  } },
  "platform/components/Metric/Metric.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Metric = Metric;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Metric
   Summary: A key figure: a large number over its label, with an optional change (03 › Data display › Labels and
     indicators › Metric). Metric.Group lays several out in a row, divided.
   Usage:
     <Metric.Group label="This week">
       <Metric value="1,284" label="Assets added" />
       <Metric value="92%" label="Tagged" change="+4%" changeTone="success" />
       <Metric value="3" label="Failed imports" change="+2" changeTone="danger" />
     </Metric.Group>
   Props:
     value: the figure, already formatted (a number or a string)
     label: what it counts
     unit: a unit after the figure, smaller ("GB", "items")
     change: a change since the last period, already formatted ("+4%", "−12")
     changeTone: "neutral" (default) | "success" | "danger": the change's color (good or bad, not up or down)
     description: one short line under the label
     size: "md" (default) | "lg" (the larger figure for a dashboard's first row)
     className: more classes on the metric
     Metric.Group.label: the accessible name of the group (a list of metrics)
     Metric.Group.className: more classes on the group
   Behavior:
     A group is a list (role="list"); each metric is a list item there.
   Notes:
     The figure uses tabular numbers so metrics side by side line up.
     Other props pass through to the element.
*/
function Metric({
  value,
  label,
  unit,
  change,
  changeTone = 'neutral',
  description,
  size = 'md',
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-metric', 'plx-metric--' + size, className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-metric__figure"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-metric__value"
  }, value), unit ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-metric__unit"
  }, unit) : null, change ? /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-metric__change', 'plx-metric__change--' + changeTone)
  }, change) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-metric__label"
  }, label), description ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-metric__description"
  }, description) : null);
}
Metric.Group = function MetricGroup({
  label,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-metric-group', className),
    role: "list",
    "aria-label": label
  }, rest), _react.default.Children.map(children, c => c ? /*#__PURE__*/_react.default.createElement("div", {
    role: "listitem",
    className: "plx-metric-group__item"
  }, c) : null));
};
  } },
  "platform/components/ProgressBar/ProgressBar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressBar = ProgressBar;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · ProgressBar
   Summary: How far a task or a quantity has come: a track with a fill (11 › Feedback › Loading and progress › Progress bar).
   Usage:
     <ProgressBar value={42} label="Uploading 3 files" showValue />
     <ProgressBar label="Preparing the export" />
     <ProgressBar value={7} max={12} tone="success" size="sm" label="Tasks done" labelHidden />
     <ProgressBar value={60} color={project.color} label="Kitchen Renovation" />
   Props:
     value: how much is done; leave it out while the amount is unknown (the bar is then indeterminate)
     max: the whole (default 100)
     label: what is progressing; always the accessible name, shown above the bar unless labelHidden
     labelHidden: the label is for assistive technology only (default false)
     showValue: shows the percent at the end of the label row, a whole percent in the locale's format ("42%") (default false)
     tone: "info" (default) | "success" | "warning" | "danger" | "neutral"
     color: a color the data brings (a project's color); it fills the bar instead of the tone
     size: "sm" (a 4px track) | "md" (default, an 8px track)
     className: more classes on the wrapper
     locale: the language the percent is formatted in (default: the page's language, document.documentElement.lang)
   Behavior:
     The track is a progressbar (role="progressbar") with aria-valuenow, aria-valuemin and aria-valuemax; without a value it
     has none and its fill runs from start to end again and again.
     People who ask their system for less motion see the indeterminate fill still.
   Notes:
     The fill's width reaches the stylesheet as --plx-comp-progress-bar-value (a percent) and a data color as
     --plx-comp-progress-bar-color: the only way a value or a color from the data enters (no style is written).
     Other props pass through to the wrapper.
*/
function ProgressBar({
  value,
  max = 100,
  label,
  labelHidden = false,
  showValue = false,
  tone = 'info',
  color,
  size = 'md',
  locale,
  className,
  ...rest
}) {
  const loc = locale || typeof document !== 'undefined' && document.documentElement.lang || undefined;
  const known = typeof value === 'number' && !Number.isNaN(value);
  const pct = known ? Math.max(0, Math.min(100, value / (max || 100) * 100)) : null;
  const id = 'plx-pb' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  const showLabel = label && !labelHidden;
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-progress-bar', 'plx-progress-bar--' + size, color ? 'plx-progress-bar--color' : 'plx-progress-bar--' + tone, !known && 'is-indeterminate', className),
    style: {
      '--plx-comp-progress-bar-value': known ? pct + '%' : undefined,
      '--plx-comp-progress-bar-color': color || undefined
    }
  }, rest), showLabel || showValue && known ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-progress-bar__head"
  }, showLabel ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-progress-bar__label",
    id: id
  }, label) : null, showValue && known ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-progress-bar__value"
  }, new Intl.NumberFormat(loc, {
    style: 'percent',
    maximumFractionDigits: 0
  }).format(pct / 100)) : null) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-progress-bar__track",
    role: "progressbar",
    "aria-labelledby": showLabel ? id : undefined,
    "aria-label": showLabel ? undefined : label,
    "aria-valuemin": known ? 0 : undefined,
    "aria-valuemax": known ? max : undefined,
    "aria-valuenow": known ? value : undefined
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-progress-bar__fill"
  })));
}
  } },
  "platform/components/DateBadge/DateBadge.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateBadge = DateBadge;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · DateBadge
   Summary: A day shown as its number and weekday, with today marked (02 › Inputs › Date and time › Calendar).
   Usage:
     <DateBadge day={6} weekday="Tue" today />
     <DateBadge day={7} weekday="Wed" dateTime="2026-10-07" />
   Props:
     day: the day of the month
     weekday: the short weekday name, shown above the number
     today: marks today: the number on the action color (default false)
     dateTime: the date, machine-readable (wraps the badge in <time>)
     className: more classes on the badge
   Behavior:
     Today carries "Today" for assistive technology as well as its look.
   Notes:
     The time grid's day headers and the month view's day cells use it.
*/
function DateBadge({
  day,
  weekday,
  today = false,
  dateTime,
  className,
  ...rest
}) {
  const Tag = dateTime ? 'time' : 'span';
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    className: (0, _cx.cx)('plx-date-badge', today && 'is-today', className),
    dateTime: dateTime
  }, rest), weekday ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-date-badge__weekday"
  }, weekday) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-date-badge__day"
  }, day), today ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, "Today") : null);
}
  } },
  "platform/components/EventChip/EventChip.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventChip = EventChip;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · EventChip
   Summary: An event in a calendar: its title and time on a soft surface with an edge in the event's own color
     (03 › Data display › Specialized displays › Calendar view).
   Usage:
     <EventChip title="Site visit" time="10:00" color={calendar.color} onClick={() => open(e)} />
     <EventChip title="Design review" time="14:00–15:30" fill />
   Props:
     title: the event's name
     time: when, as shown
     color: the event's or its calendar's color (from the data); it draws the start edge
     fill: the chip fills its box (an event placed in a time grid); default false
     onClick(event): makes the chip a button that opens the event
     className: more classes on the chip
   Behavior:
     With onClick it is a button (focus ring, Enter and Space); without, plain text.
   Notes:
     The color reaches the stylesheet as --plx-comp-event-chip-color, the only way a data color enters (no style is written).
     Other props pass through to the element.
*/
function EventChip({
  title,
  time,
  color,
  fill = false,
  onClick,
  className,
  ...rest
}) {
  const Tag = onClick ? 'button' : 'span';
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    type: onClick ? 'button' : undefined,
    onClick: onClick,
    className: (0, _cx.cx)('plx-event-chip', fill && 'plx-event-chip--fill', onClick && 'plx-event-chip--interactive', className),
    style: {
      '--plx-comp-event-chip-color': color || undefined
    }
  }, rest), time ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-event-chip__time"
  }, time) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-event-chip__title"
  }, title));
}
  } },
  "platform/components/Icon/Icon.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = Icon;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Icon
   Summary: One icon of the Plenix set, drawn as a mask in the current text color.
   Usage:
     <Icon name="folder" />
     <Icon name="star" size="sm" filled label="Favorite" />
   Props:
     name: the Plenix icon name (platform/icons/map.json)
     size: "xs" 12px | "sm" 16px | "md" 20px | "lg" 24px | "xl" 48px, a page title (--plx-sys-icon-size-*); without it the icon takes its container's
       grid icon (a control's --plx-sys-control-icon-<role>) or --plx-sys-icon-size
     filled: the filled version (default false)
     label: the accessible name, when the icon alone carries meaning
     className: more classes on the icon
   Behavior:
     The filled version is also drawn automatically inside a current or selected element: aria-current, aria-pressed,
       aria-selected, .is-selected, .is-current.
     A pinned item shows the filled pin, not a filled row.
     Without a label the icon is decorative and hidden from assistive technology; with one it is an image (role="img").
   Notes:
     The set is Material Symbols Sharp, weight 300, used exactly as published (platform/icons/).
     The size names the icon's whole square, which includes the set's own padding (1/12 of the square on each side): the
       system adds none to make up for it.
     Numbers (12 | 14 | 16 | 20 | 24) still render for old markup, but the system check rejects them: they skip the grid.
     Other props pass through to the <span>.
*/
function Icon({
  name,
  size,
  filled = false,
  label,
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-icon', 'plx-icon--' + name, size ? 'plx-icon--size-' + size : null, filled && 'plx-icon--filled', className),
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true
  }, rest));
}
  } },
  "platform/components/RadioTiles/RadioTiles.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioTiles = RadioTiles;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · RadioTiles
   Summary: A choice of one among a few options shown as tiles, each with a preview, a label and a description
     (02 › Inputs › Selection › Selectable card).
   Usage:
     <RadioTiles legend="Header style" value={style} onChange={setStyle}
       options={[{ value: 'solid', label: 'Solid', description: 'The accent color', preview: <…/> }, { value: 'light', label: 'Light' }]} />
   Props:
     legend: what is being chosen (the group's name)
     legendHidden: the legend is for assistive technology only (default false)
     options: [{ value, label, description, preview, disabled }]
     value: the chosen value
     onChange(value): runs when another tile is chosen
     name: the radio group's name (default: a unique one)
     size: "sm" | "md" (default) | "lg": the tiles' minimum width
     className: more classes on the group
   Behavior:
     A native radio group: Tab moves into it, the arrow keys move the choice, Space chooses.
     The chosen tile shows the selected border and a check; a focused tile shows the focus ring.
   Notes:
     The preview is decorative (aria-hidden); the label and description name the option.
*/
function RadioTiles({
  legend,
  legendHidden = false,
  options = [],
  value,
  onChange,
  name,
  size = 'md',
  className,
  ...rest
}) {
  const auto = 'plx-rt' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  return /*#__PURE__*/_react.default.createElement("fieldset", _extends({
    className: (0, _cx.cx)('plx-radio-tiles', 'plx-radio-tiles--' + size, className)
  }, rest), /*#__PURE__*/_react.default.createElement("legend", {
    className: (0, _cx.cx)('plx-radio-tiles__legend', legendHidden && 'plx-visually-hidden')
  }, legend), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-radio-tiles__grid"
  }, options.map(o => {
    const on = o.value === value;
    return /*#__PURE__*/_react.default.createElement("label", {
      key: o.value,
      className: (0, _cx.cx)('plx-radio-tile', on && 'is-selected', o.disabled && 'is-disabled')
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: "plx-radio-tile__input plx-visually-hidden",
      type: "radio",
      name: name || auto,
      value: o.value,
      checked: on,
      disabled: o.disabled,
      onChange: () => {
        if (onChange) onChange(o.value);
      }
    }), o.preview ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-radio-tile__preview",
      "aria-hidden": "true"
    }, o.preview) : null, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-radio-tile__text"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-radio-tile__label"
    }, o.label), o.description ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-radio-tile__description"
    }, o.description) : null), /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-radio-tile__check",
      "aria-hidden": "true"
    }, on ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: "check",
      size: "sm"
    }) : null));
  })));
}
  } },
  "platform/components/StatusDot/StatusDot.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusDot = StatusDot;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · StatusDot
   Summary: A 6px dot that marks a state (active, paused, priority).
   Usage:
     <StatusDot tone="success" label="Active" />
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"
     label: the state in words, read by assistive technology
     className: more classes on the dot
     ...rest: other attributes go on the dot element
   Behavior:
     Without a label the dot is decorative and hidden from assistive technology.
   Notes:
     Without a label, pair the dot with visible text.
*/
function StatusDot({
  tone = 'neutral',
  label,
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-status-dot', 'plx-status-dot--' + tone, className),
    "aria-hidden": label ? undefined : true
  }, rest), label ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, label) : null);
}
  } },
  "platform/components/Loading/Loading.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skeleton = Skeleton;
exports.Spinner = Spinner;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Skeleton, Spinner
   Summary: Loading indicators. Skeleton is a placeholder block with a shimmer; Spinner is a turning ring. (The typing
     dots are a Chat variant: Chat.Typing.)
   Usage:
     <Skeleton width="160px" height="16px" />
     <Spinner size="sm" label="Saving" />
   Props:
     Skeleton.width: the block width, a size token's name ("200px" for --plx-ref-size-200px); none: as wide as its place
     Skeleton.height: the block height, a size token's name ("16px")
     Skeleton.className: more classes on the block
     Spinner.size: "sm" | "md" (default) | "lg"
     Spinner.label: the text announced to assistive technology (default "Loading")
     Spinner.className: more classes on the ring
   Behavior:
     The Skeleton shimmer runs left to right; the block is decorative (aria-hidden).
     Spinner is a status region (role="status"), so its label is announced.
     People who ask their system for less motion see the indicators still.
   Notes:
     Other props pass through to the <span>.
     The old text listed a radius prop for Skeleton; the code takes none (set it with a class).
*/
// a size token's name from "200px" (or the older "var(--plx-ref-size-200px)"); the rule per size is in system/steps.css
const sizeName = v => v ? String(v).replace(/^var\(--plx-ref-size-|\)$/g, '') : undefined;
function Skeleton({
  width,
  height,
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-skeleton', className),
    "aria-hidden": "true",
    "data-plx-width": sizeName(width),
    "data-plx-height": sizeName(height)
  }, rest));
}
function Spinner({
  size = 'md',
  label = 'Loading',
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-spinner', 'plx-spinner--' + size, className),
    role: "status"
  }, rest), /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, label));
}
  } },
  "platform/components/Button/Button.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Loading/Loading.jsx":"platform/components/Loading/Loading.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
exports.ButtonGroup = ButtonGroup;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _Loading = require("../Loading/Loading.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Button, ButtonGroup
   Summary: A button for an action, in one of several emphasis levels and sizes; ButtonGroup joins buttons that act as a set.
   Usage:
     <Button variant="primary" icon="save" onClick={() => …}>Save</Button>
     <Button iconOnly icon="more_horiz" label="More actions" caret expanded={open} />
     <ButtonGroup label="Transfer"><Button>Import</Button><Button>Export</Button></ButtonGroup>
   Props:
     variant: "secondary" (default; white with a border, reversible actions) | "primary" (filled; the main action, usually one
       per view) | "tertiary" (outlined in the action color, no fill; fills on hover) | "ghost" (no fill or border until
       hovered; the lowest emphasis; "quiet", its old name, still works) | "danger" (filled red; destructive) | "danger-secondary"
       (red outline, fills on hover) | "link" (looks like link text)
     size: "md" (default; the standard control role) | "sm" (the toolbar role: compact text, gray) | "xs" (the inline-action
       role: dense row and card actions, never in a toolbar) | "2xs" (the smallest: "Show more" under a list; 11px text, a blue
       tint on hover) | "lg" (the prominent role: page actions)
     icon: an <Icon> (or an icon name) before the label
     iconEnd: an <Icon> (or an icon name) after the label
     iconOnly: a square button with only its icon; give it a label (default false)
     label: the accessible name (aria-label); an icon-only button falls back to string children
     caret: the button opens a menu: a chevron after the label (default false)
     expanded: sets aria-expanded, for a button that opens a menu
     pressed: makes a toggle button (aria-pressed)
     selected: shows the selected state without a toggle role (default false)
     loading: shows a spinner in place of the icon (default false)
     disabled: the button does nothing (default false)
     href: renders a link styled as a button
     type: the button type (default "button")
     onClick(event): runs when the button is clicked, unless disabled or loading
     children: the button label
     className: more classes on the button
     strings: the words it announces, for other languages: { working: "Working" } (the loading spinner's name)
     ref: forwarded to the <button> or <a>
     ButtonGroup.label: the accessible name of the group
     ButtonGroup.children: the buttons
     ButtonGroup.className: more classes on the group
   Behavior:
     Placement can also set the role: a dialog footer gives its buttons the dialog role.
     Selected, pressed and expanded all show the selected state.
     Loading keeps the width and stays focusable but inert (aria-disabled, aria-busy).
     A disabled link loses its href.
   Notes:
     Other props pass through to the <button> or <a> (and to ButtonGroup's <div>).
     For one choice from several, use SegmentedControl instead of ButtonGroup.
*/
const STRINGS = {
  working: 'Working'
};
const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
const Button = exports.Button = /*#__PURE__*/_react.default.forwardRef(function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  iconEnd,
  iconOnly = false,
  label,
  caret = false,
  expanded,
  pressed,
  selected = false,
  loading = false,
  disabled = false,
  href,
  type = 'button',
  className,
  children,
  onClick,
  strings,
  ...rest
}, ref) {
  const t = Object.assign({}, STRINGS, strings);
  const classes = (0, _cx.cx)('plx-button', 'plx-button--' + (variant === 'quiet' ? 'ghost' : variant), size !== 'md' && 'plx-button--size-' + size, iconOnly && 'plx-button--icon-only', caret && 'plx-button--caret', (selected || pressed || expanded) && 'is-selected', loading && 'is-loading', className);
  const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-button__icon"
  }, /*#__PURE__*/_react.default.createElement(_Loading.Spinner, {
    size: "sm",
    label: t.working
  })) : icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-button__icon"
  }, asIcon(icon)) : null, iconOnly ? null : children !== undefined && children !== null ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-button__label"
  }, children) : null, iconEnd ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-button__icon"
  }, asIcon(iconEnd)) : null, caret ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-button__caret",
    "aria-hidden": "true"
  }) : null);
  const a11y = {
    'aria-label': iconOnly ? label || (typeof children === 'string' ? children : undefined) : label,
    'aria-expanded': expanded,
    'aria-pressed': pressed,
    'aria-disabled': disabled || loading ? true : undefined,
    'aria-busy': loading || undefined
  };
  const handle = e => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };
  if (href) return /*#__PURE__*/_react.default.createElement("a", _extends({
    ref: ref,
    href: disabled ? undefined : href,
    className: classes
  }, a11y, {
    onClick: handle
  }, rest), content);
  return /*#__PURE__*/_react.default.createElement("button", _extends({
    ref: ref,
    type: type,
    className: classes,
    disabled: disabled && !loading ? true : undefined
  }, a11y, {
    onClick: handle
  }, rest), content);
});

/* ButtonGroup: joined buttons that act as a set (Import | Export). For one choice from several, use SegmentedControl. */
function ButtonGroup({
  label,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "group",
    "aria-label": label,
    className: (0, _cx.cx)('plx-button-group', className)
  }, rest), children);
}
  } },
  "platform/components/Tooltip/Tooltip.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = Tooltip;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Tooltip
   Summary: A short label for a control, shown on hover and on keyboard focus.
   Usage:
     <Tooltip content="Upload files" placement="bottom"><Button …/></Tooltip>
   Props:
     content: the tooltip text
     placement: "bottom" (default) | "top" | "end"
     disabled: the tooltip neither shows nor describes the trigger (default false); for a label that is shown in full most of
       the time and only needs its tooltip when it is cut short
     className: more classes on the wrapper
     children: the control it labels (one element)
   Behavior:
     It shows on hover and on keyboard focus, and hides on leave, on blur and with Escape.
     The trigger is described by the tooltip (aria-describedby), added to any it already has.
   Notes:
     An icon-only control still needs its own label: the tooltip repeats it visually, it does not replace it.
     Not for essential or interactive content.
*/

function Tooltip({
  content,
  placement = 'bottom',
  disabled = false,
  className,
  children
}) {
  const id = 'plx-tt' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = _react.default.useState(false);
  _react.default.useEffect(() => {
    if (!open) return undefined;
    const esc = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);
  const child = _react.default.Children.only(children);
  const trigger = disabled ? child : /*#__PURE__*/_react.default.cloneElement(child, {
    'aria-describedby': [child.props['aria-describedby'], id].filter(Boolean).join(' ')
  });
  return /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-tooltip', className),
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, trigger, disabled ? null : /*#__PURE__*/_react.default.createElement("span", {
    role: "tooltip",
    id: id,
    className: (0, _cx.cx)('plx-tooltip__bubble', 'plx-tooltip__bubble--' + placement, open && 'is-open')
  }, content));
}
  } },
  "platform/components/Tag/Tag.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Button/Button.jsx":"platform/components/Button/Button.jsx","../Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chip = Chip;
exports.Tag = Tag;
exports.TagInput = void 0;
exports.TagList = TagList;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Button = require("../Button/Button.jsx");
var _Tooltip = require("../Tooltip/Tooltip.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Tag, Chip, TagList, TagInput
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
     TagInput.label: the accessible name of the + button and the field, and the field's placeholder (default "Add a tag")
     TagInput.collapsible: true (default): a + button that reveals the field; false: the field is always shown
     TagInput.className: more classes on the input
   Behavior:
     The × button is a 24px target in a 16px box.
     Selected chips are filled.
     TagInput is a + button at the end of the tag list (owner, batch 271: "it should be a + and clicking that plus
       exposes the text field"): pressing it reveals a text field like every other (the input's border, hover, focus and
       disabled states), focused. Type a tag and press Enter to add it: it appears before the field, the field clears and
       stays open for the next one. Escape, or leaving the field empty, closes it and returns focus to the +. Each tag's
       × removes it. Without onAdd the field only reports what is typed (onChange, onKeyDown).
     A tag being renamed is a small field with the input's focused border.
   Notes:
     TagList lays tags or chips out in a wrapping row; it sets no outer margin (the parent spaces it).
     TagInput is the "add a tag" field at the end of a TagList.
     Other props reach the element: the tag, the chip's toggle button, the list, or the input.
*/
function RemoveButton({
  label,
  onClick
}) {
  return /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-tag__remove",
    "aria-label": label,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"));
}
function Tag({
  onRemove,
  removeLabel,
  onRename,
  renameLabel,
  className,
  children,
  ...rest
}) {
  const [editing, setEditing] = _react.default.useState(false);
  const [draft, setDraft] = _react.default.useState('');
  const text = typeof children === 'string' ? children : '';
  const done = keep => {
    setEditing(false);
    if (keep && draft.trim() && draft.trim() !== text) onRename(draft.trim());
  };
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-tag', onRename && 'plx-tag--renamable', editing && 'is-editing', className)
  }, rest), onRename && editing ? /*#__PURE__*/_react.default.createElement("input", {
    className: "plx-tag__input",
    value: draft,
    "aria-label": renameLabel || 'Rename ' + (text || 'tag'),
    autoFocus: true,
    size: Math.max(4, draft.length),
    onChange: e => setDraft(e.target.value),
    onBlur: () => done(true),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        done(true);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        done(false);
      }
    }
  }) : onRename ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-tag__label plx-tag__rename",
    "aria-label": renameLabel || 'Rename ' + (text || 'tag'),
    onClick: () => {
      setDraft(text);
      setEditing(true);
    }
  }, children) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-tag__label"
  }, children), onRemove ? /*#__PURE__*/_react.default.createElement(RemoveButton, {
    label: removeLabel || 'Remove ' + (typeof children === 'string' ? children : 'tag'),
    onClick: onRemove
  }) : null);
}
function Chip({
  selected = false,
  onRemove,
  removeLabel,
  className,
  children,
  ...rest
}) {
  if (onRemove) {
    return /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _cx.cx)('plx-tag', 'plx-chip', selected && 'plx-chip--selected', className)
    }, /*#__PURE__*/_react.default.createElement("button", _extends({
      type: "button",
      className: "plx-chip__toggle",
      "aria-pressed": selected
    }, rest), children), /*#__PURE__*/_react.default.createElement(RemoveButton, {
      label: removeLabel || 'Remove ' + (typeof children === 'string' ? children : 'filter'),
      onClick: onRemove
    }));
  }
  return /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button",
    className: (0, _cx.cx)('plx-tag', 'plx-chip', selected && 'plx-chip--selected', className),
    "aria-pressed": selected
  }, rest), children);
}
function TagList({
  className,
  children,
  label,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-tag-list', className),
    role: label ? 'group' : undefined,
    "aria-label": label
  }, rest), children);
}
const TagInput = exports.TagInput = /*#__PURE__*/_react.default.forwardRef(function TagInput({
  onAdd,
  onKeyDown,
  value,
  onChange,
  label = 'Add a tag',
  collapsible = true,
  id,
  className,
  onBlur,
  ...rest
}, ref) {
  const [own, setOwn] = _react.default.useState('');
  const [open, setOpen] = _react.default.useState(!collapsible);
  const text = value !== undefined ? value : own;
  const inputRef = _react.default.useRef(null),
    plusRef = _react.default.useRef(null);
  _react.default.useImperativeHandle(ref, () => inputRef.current || plusRef.current);
  const wasOpen = _react.default.useRef(open);
  _react.default.useEffect(() => {
    // opening focuses the field; closing returns focus to the + (only after a change, never on mount)
    if (wasOpen.current === open) return;
    wasOpen.current = open;
    if (open && inputRef.current) inputRef.current.focus();else if (!open && plusRef.current && plusRef.current.focus) plusRef.current.focus();
  }, [open]);
  const setText = v => {
    if (value === undefined) setOwn(v);else if (onChange) onChange({
      target: {
        value: v
      },
      currentTarget: {
        value: v
      }
    });
  };
  const change = e => {
    if (value === undefined) setOwn(e.target.value);
    if (onChange) onChange(e);
  };
  const keyDown = e => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented) return;
    if (e.key === 'Escape' && collapsible) {
      e.preventDefault();
      setText('');
      setOpen(false);
      return;
    }
    if (!onAdd || e.key !== 'Enter') return;
    e.preventDefault();
    const t = String(text).trim();
    if (!t) return;
    onAdd(t);
    setText('');
  };
  const blur = e => {
    if (onBlur) onBlur(e);
    if (collapsible && !String(text).trim()) setOpen(false);
  };
  if (!open) {
    return /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
      content: label
    }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
      ref: plusRef,
      id: id,
      size: "xs",
      icon: "add",
      iconOnly: true,
      label: label,
      className: (0, _cx.cx)('plx-tag-input__add', className),
      onClick: () => setOpen(true)
    }));
  }
  return /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: inputRef,
    id: id,
    type: "text",
    "aria-label": rest['aria-labelledby'] ? undefined : label,
    placeholder: label,
    className: (0, _cx.cx)('plx-input', 'plx-tag-input', className),
    value: text,
    onChange: change,
    onKeyDown: keyDown,
    onBlur: blur
  }, rest));
});
  } },
  "platform/components/Kbd/Kbd.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Kbd = Kbd;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Kbd
   Summary: A key or shortcut ("Ctrl K").
   Usage:
     <Kbd>Ctrl K</Kbd>
     <Kbd onAccent>/</Kbd>
   Props:
     onAccent: the version for the blue header (default false)
     children: the key or shortcut text
     className: more classes on the <kbd>
   Notes:
     It uses the data font at a 16px label height.
     Other props pass through to the <kbd>.
*/
function Kbd({
  onAccent = false,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("kbd", _extends({
    className: (0, _cx.cx)('plx-kbd', onAccent && 'plx-kbd--on-accent', className)
  }, rest), children);
}
  } },
  "platform/components/Avatar/Avatar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = Avatar;
exports.initialsOf = initialsOf;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Avatar
   Summary: A person's picture, or their initials, in a rounded square (never a circle).
   Usage:
     <Avatar name="Raphael Maher" size="md" />
     <Avatar name="Raphael Maher" src="/people/rm.jpg" label="Raphael Maher" />
   Props:
     name: the person's name; without a picture the avatar shows its initials, from initialsOf(name)
     src: the URL of the person's picture; it replaces the initials
     initials: the text to show, only when there is no name to work from
     size: "2xs" 20px | "xs" 24px | "sm" 28px (default) | "md" 32px | "lg" 40px | "xl" 48px | "2xl" 64px; "2xs" is for inside a small control
       (the account row in a pane footer)
     background: the person's own background color when the data has one (otherwise the theme's avatar colors)
     color: the person's own text color when the data has one (otherwise the theme's avatar colors)
     label: the person's name for assistive technology when no visible name is nearby; without it the avatar is hidden from
       assistive technology
     className: more classes on the avatar
     style: more inline styles on the avatar
   Behavior:
     A picture that fails to load falls back to the initials.
     The corner and the text size follow the size.
     Initials are the first letters of the first and last name ("Raphael Maher" → RM).
     Titles such as "Fr." or "Dr." and parenthesized parts are skipped; one word gives one letter.
     With a label the avatar is an image (role="img") named by the label.
   Notes:
     Other props pass through to the <span>.
     initialsOf(name) is also exported for pages that need the same initials.
*/
const SIZES = [20, 24, 28, 32, 40, 48, 64]; // the scale its classes define (plx-avatar--24 …)
// the names pages use: 2xs 20 (inside a small control: the account row in a pane footer), xs 24, sm 28, md 32, lg 40, xl 48, 2xl 64 (numbers are rejected by the system check)
const NAMED = {
  '2xs': 20,
  xs: 24,
  sm: 28,
  md: 32,
  lg: 40,
  xl: 48,
  '2xl': 64
};

// first- and last-name initials: titles (a word ending in a period, e.g. "Fr.") and parenthesized parts are skipped
function initialsOf(name) {
  const words = String(name || '').replace(/\([^)]*\)/g, ' ').split(/\s+/).filter(w => w && !/\.$/.test(w) && /[A-Za-z0-9]/.test(w));
  if (!words.length) return '';
  const first = words[0].match(/[A-Za-z0-9]/)[0],
    last = words.length > 1 ? words[words.length - 1].match(/[A-Za-z0-9]/)[0] : '';
  return (first + last).toUpperCase();
}
function Avatar({
  name,
  src,
  initials,
  size = 'sm',
  background,
  color,
  label,
  className,
  ...rest
}) {
  const n = NAMED[size] || size;
  const s = SIZES.indexOf(n) >= 0 ? n : NAMED.sm;
  const text = name ? initialsOf(name) : initials;
  // a picture that fails to load falls back to the initials (batch 215)
  const [failed, setFailed] = _react.default.useState(false);
  _react.default.useEffect(() => {
    setFailed(false);
  }, [src]);
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-avatar', 'plx-avatar--' + s, className),
    "data-plx-avatar": "",
    style: {
      '--plx-comp-avatar-own-background': background || undefined,
      '--plx-comp-avatar-own-content': color || undefined
    },
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true
  }, rest), src && !failed ? /*#__PURE__*/_react.default.createElement("img", {
    className: "plx-avatar__image",
    src: src,
    alt: "",
    onError: () => setFailed(true)
  }) : text);
}
  } },
  "platform/components/Divider/Divider.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Divider = Divider;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Divider
   Summary: A 1px rule between groups.
   Usage:
     <Divider />
     <Divider orientation="vertical" />
   Props:
     orientation: "horizontal" (default) | "vertical" (in a row)
     className: more classes on the rule
   Behavior:
     It is a separator (role="separator") with its orientation.
   Notes:
     Other props pass through to the <div>.
*/
function Divider({
  orientation = 'horizontal',
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "separator",
    "aria-orientation": orientation,
    className: (0, _cx.cx)('plx-divider', 'plx-divider--' + orientation, className)
  }, rest));
}
  } },
  "platform/components/Stack/Stack.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inline = Inline;
exports.Stack = Stack;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Stack, Inline
   Summary: Lay children out in a column (Stack) or a row (Inline), spaced by the spacing tokens, never by a margin or a number.
   Usage:
     <Stack gap="md">
       <Inline gap="sm" justify="between">…</Inline>
       <Inline wrap>…</Inline>
     </Stack>
   Props:
     Stack.gap: "none" | "xs" | "sm" | "md" (default) | "lg" | "xl" (--plx-sys-space-stack-*)
     Inline.gap: "none" | "xs" | "sm" (default) | "md" | "lg" | "xl" (--plx-sys-space-inline-*)
     Stack.align: "start" | "center" | "end" | "stretch" | "baseline" (the cross axis)
     Inline.align: the same values; default "center"
     Stack.justify: "start" | "center" | "end" | "between"
     Inline.wrap: an Inline that wraps onto more lines (its lines are --plx-sys-space-stack-xs apart)
     Stack.inset: "none" | "xs" | "sm" | "md" | "lg" | "xl" (padding on every side, --plx-sys-space-inset-*)
     Stack.grow: fills the rest of its parent row or column (it may shrink below its content)
     Stack.scroll: scrolls its own content
     Stack.width: "xs" | "sm" | "md" | "lg" (a fixed width from --plx-sys-field-width-*: a field narrower than its row)
     Stack.maxHeight: "sm" | "md" | "lg" (scrolls past --plx-sys-scroll-max-*)
     Stack.indent: starts one inline step in (a nested group)
     Stack.push: moves itself to the end of its row (a search box at the end of a toolbar)
     Stack.as: the element; "div" by default; ul, ol, section, header, footer, form, fieldset, …
     Stack.className: more classes on the element
     Stack.children: the content to lay out
   Behavior:
     A scrolling Stack or Inline shows its scroll bar on hover.
   Notes:
     Inline takes the same props as Stack.
     Any other prop reaches the element.
     Applications build their layouts from these (and the Platform's patterns) instead of styles.
*/
function layout(kind, {
  as: As = 'div',
  gap,
  align,
  justify,
  wrap,
  inset,
  grow,
  scroll,
  width,
  maxHeight,
  indent,
  push,
  className,
  children,
  ...rest
}, defaults) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: (0, _cx.cx)('plx-' + kind, 'plx-' + kind + '--gap-' + (gap || defaults.gap), (align || defaults.align) && 'plx-layout--align-' + (align || defaults.align), justify && 'plx-layout--justify-' + justify, wrap && 'plx-inline--wrap', inset && 'plx-layout--inset-' + inset, grow && 'plx-grow', scroll && 'plx-layout--scroll', width && 'plx-layout--width-' + width, maxHeight && 'plx-layout--max-' + maxHeight, indent && 'plx-layout--indent', push && 'plx-layout--push', className)
  }, rest), children);
}
function Stack(props) {
  return layout('stack', props, {
    gap: 'md'
  });
}
function Inline(props) {
  return layout('inline', props, {
    gap: 'sm',
    align: 'center'
  });
}
  } },
  "platform/components/Text/Text.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = Text;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Text
   Summary: A run of text in one of the system's text roles, from the type tokens.
   Usage:
     <Text variant="secondary" as="p" truncate>Last edited 2 days ago</Text>
   Props:
     variant: the text role: "body" (default) | "secondary" | "caption" | "data" | "label" | "strong" | "heading"
       | "accent" (a highlighted term, step number or key figure: the accent color) | "success" (a good outcome, the new value in a change)
       | "eyebrow" | "danger" | "link" | "title".
       body: the UI text. secondary: muted, 12px (counts, hints, descriptions). caption: subtle, 11px.
       data: the data font, 11px (IDs, sizes, dates, paths). label: semibold 12px. strong: semibold, the current size.
       heading: a group's title inside a page or dialog, semibold 13px.
       eyebrow: a small uppercase title over a tool panel, 11px, bold, widest spacing, muted.
       danger: the danger color (a required marker). link: the link color, normal weight (an a element in running text).
       title: a page title, the heading font, 20px, bold.
     as: the element; "span" (default) | "p" | "div" | "h1"–"h4" | "dt" | "dd" | "label" | …
     truncate: one line, cut with an ellipsis; default false
     className: more classes on the text
     children: the text
     ...rest: other attributes go on the element
   Notes:
     Applications never set a font, size, weight or color themselves.
     There are no margins in any case, whatever the element.
*/
function Text({
  as: As = 'span',
  variant = 'body',
  truncate = false,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: (0, _cx.cx)('plx-text', 'plx-text--' + variant, truncate && 'plx-text--truncate', className)
  }, rest), children);
}
  } },
  "platform/components/Thumbnail/Thumbnail.jsx": { deps: {"react":null,"../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thumbnail = Thumbnail;
var _react = _interopRequireDefault(require("react"));
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Thumbnail
   Summary: A small picture of a file or an item beside its name (a table's name cell, a list row).
     It shows the picture, or an icon when there is none, in a 28px rounded square on the sunken surface.
   Usage:
     <Thumbnail src={asset.thumbUrl} icon="image" />
   Props:
     src: the picture's URL
     alt: the picture's text alternative; default "" (empty when the name is next to it)
     icon: the icon shown without src; default "document"
   Behavior:
     An image that fails to load falls back to the icon.
     The picture loads lazily.
     The icon is decorative and hidden from assistive technology.
*/

function Thumbnail({
  src,
  alt = '',
  icon = 'document'
}) {
  // an image that fails to load falls back to the icon, as when there is none (batch 215)
  const [failed, setFailed] = _react.default.useState(false);
  _react.default.useEffect(() => {
    setFailed(false);
  }, [src]);
  return src && !failed ? /*#__PURE__*/_react.default.createElement("img", {
    className: "plx-thumbnail",
    src: src,
    alt: alt,
    loading: "lazy",
    onError: () => setFailed(true)
  }) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-thumbnail plx-thumbnail--icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon,
    size: "sm"
  }));
}
  } },
  "platform/components/Notice/Notice.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notice = Notice;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Notice
   Summary: A short message inside a page, a panel or a dialog (an inline message).
     It shows its tone's soft surface and content color, an icon and the text.
   Usage:
     <Notice tone="warning">This folder is shared with 3 people.</Notice>
   Props:
     tone: "info" (default) | "success" | "warning" | "danger"
     icon: an icon name; the tone's icon unless given
     className: more classes on the notice
     children: the message text
     ...rest: other attributes go on the notice element
   Behavior:
     A danger notice has role="alert", so screen readers announce it.
*/
const ICONS = {
  info: 'info-circle',
  success: 'circle-check',
  warning: 'warning',
  danger: 'alert'
};
function Notice({
  tone = 'info',
  icon,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-notice', 'plx-notice--' + tone, className),
    role: tone === 'danger' ? 'alert' : undefined
  }, rest), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon || ICONS[tone]
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notice__text"
  }, children));
}
  } },
  "platform/components/ColorSwatch/ColorSwatch.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorSwatch = ColorSwatch;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · ColorSwatch
   Summary: A color from the data shown as a small round chip (a category's color).
   Usage:
     <ColorSwatch color={category.color} />
     <ColorSwatch color={category.color} label="Blue" pressed={picked === 'blue'} onClick={() => …} />
   Props:
     color: the color value, from the data
     size: "sm" (16px) | "md" (default; 20px)
     shape: "round" (default) | "square" (the compact corner: a swatch inside a button)
     pressed: marks the chosen color (aria-pressed), with onClick
     label: the accessible name of the color, with onClick
     onClick(event): makes the swatch a button that picks the color
     className: more classes on the swatch
   Behavior:
     With onClick it is a button that picks the color; without it the swatch is hidden from assistive technology.
   Notes:
     The color reaches the stylesheet as --plx-comp-color-swatch-value, the only way a data color enters a page.
     Other props pass through to the <button> or <span>.
*/
function ColorSwatch({
  color,
  size = 'md',
  shape = 'round',
  pressed,
  label,
  onClick,
  className,
  ...rest
}) {
  const cls = (0, _cx.cx)('plx-color-swatch', 'plx-color-swatch--' + size, shape === 'square' && 'plx-color-swatch--square', className);
  return onClick ? /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button",
    className: cls,
    style: {
      '--plx-comp-color-swatch-value': color
    },
    "aria-pressed": !!pressed,
    "aria-label": label,
    onClick: onClick
  }, rest)) : /*#__PURE__*/_react.default.createElement("span", _extends({
    className: cls,
    style: {
      '--plx-comp-color-swatch-value': color
    },
    "aria-hidden": "true"
  }, rest));
}
  } },
  "platform/components/DropZone/DropZone.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropZone = DropZone;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · DropZone
   Summary: Where files are dropped (an upload area): a dashed region on the sunken surface.
   Usage:
     <DropZone as="button" active={dragging} onClick={openPicker} onDragOver={…} onDrop={…}>Drop files or click to choose</DropZone>
   Props:
     as: "div" (default) | "button" (opens the file picker on click)
     active: shows the highlight while files are dragged over it (default false)
     overlay: covers its positioned parent while files are dragged over a page (the asset browser), and lets the drop
       reach the page (default false)
     children: the zone's content
     className: more classes on the zone
   Behavior:
     The zone is highlighted while active.
   Notes:
     The page handles the drag and drop events; other props (onDragOver, onDrop, onClick, …) pass through to the element.
*/
function DropZone({
  as: As = 'div',
  active = false,
  overlay = false,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    type: As === 'button' ? 'button' : undefined,
    className: (0, _cx.cx)('plx-drop-zone', active && 'is-active', overlay && 'plx-drop-zone--overlay', className)
  }, rest), children);
}
  } },
  "platform/components/Preview/Preview.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = Preview;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Preview
   Summary: The large picture of the item an inspector shows (or a placeholder with its icon and count).
     It is the sunken surface, rounded, in a standard image shape (4:3 by default), with its content centered.
   Usage:
     <Preview as="button" onClick={openViewer} topStart={<Tag>PNG</Tag>} bottomEnd={<Icon name="expand" />}>
       <img src={src} alt="" />
     </Preview>
   Props:
     as: "div" (default) | "button" (opens the item, e.g. the media viewer)
     aspect: the shape, as a photo's: "4/3" (default) | "3/2" | "1/1" | "16/9" (as MediaCard's)
     topStart: a small mark in the top-start corner (the type)
     bottomEnd: a small mark in the bottom-end corner (an expand icon)
     className: more classes on the preview
     children: the picture or placeholder
     ...rest: other attributes go on the preview element (onClick for a button)
*/
function Preview({
  as: As = 'div',
  aspect = '4/3',
  topStart,
  bottomEnd,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    type: As === 'button' ? 'button' : undefined,
    className: (0, _cx.cx)('plx-preview', As === 'button' && 'plx-preview--button', className),
    "data-plx-aspect": aspect
  }, rest), children, topStart ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-preview__corner plx-preview__corner--top-start"
  }, topStart) : null, bottomEnd ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-preview__corner plx-preview__corner--bottom-end"
  }, bottomEnd) : null);
}
  } },
  "platform/components/Fieldset/Fieldset.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fieldset = Fieldset;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Fieldset
   Summary: A group of related controls with its title (a legend): no border, the legend as secondary text, the controls
     stacked under it.
   Usage:
     <Fieldset legend="Export" gap="sm"><Checkbox label="Originals" /><Checkbox label="Metadata" /></Fieldset>
   Props:
     legend: the title of the group
     gap: the space between the stacked controls: "xs" (default) | "sm" | "md"
     children: the controls
     className: more classes on the <fieldset>
   Notes:
     Other props pass through to the <fieldset>.
*/
function Fieldset({
  legend,
  gap = 'xs',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("fieldset", _extends({
    className: (0, _cx.cx)('plx-fieldset', 'plx-stack', 'plx-stack--gap-' + gap, className)
  }, rest), /*#__PURE__*/_react.default.createElement("legend", {
    className: "plx-fieldset__legend"
  }, legend), children);
}
  } },
  "platform/components/Columns/Columns.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Columns = Columns;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Columns
   Summary: Equal columns side by side (a two- or three-column layout inside a dialog or a page).
   Usage:
     <Columns count={3} divided><Stack>…</Stack><Stack>…</Stack><Stack>…</Stack></Columns>
   Props:
     count: 2 (default) | 3
     divided: a divider between the columns, each column padded (default false; the upload dialog's three steps)
     gap: "none" | "md" (default) | "lg", when not divided
     children: the columns; each child is one column (a Stack)
     className: more classes on the row
   Notes:
     Other props pass through to the <div>.
*/
function Columns({
  count = 2,
  divided = false,
  gap = 'md',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-columns', 'plx-columns--' + count, divided ? 'plx-columns--divided' : 'plx-columns--gap-' + gap, className)
  }, rest), children);
}
  } },
  "platform/components/Breadcrumbs/Breadcrumbs.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Breadcrumbs = Breadcrumbs;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Breadcrumbs
   Summary: Shows where the page sits in a hierarchy, from the top level to the current page.
   Usage:
     <Breadcrumbs label="Breadcrumb"
       items={[{ label: 'UI Inventory', href: '#/' }, { label: 'Forms', href: '#/forms' }, { label: 'Combobox' }]} />
   Props:
     items: the levels, from the top level to the current page: [{ label, href, onClick }]
     items[].href: the link of the level; an item without href is plain text
     items[].onClick: runs when the level's link is clicked
     label: the accessible name of the navigation landmark (default "Breadcrumb")
     className: more classes on the <nav>
   Behavior:
     It is a navigation landmark with an ordered list.
     Every item but the last is a link (or plain text without href).
     The last item is the current page (aria-current="page").
     Separators are drawn by CSS and hidden from assistive technology.
*/

function Breadcrumbs({
  items = [],
  label = 'Breadcrumb',
  className
}) {
  return /*#__PURE__*/_react.default.createElement("nav", {
    "aria-label": label,
    className: (0, _cx.cx)('plx-breadcrumbs', className)
  }, /*#__PURE__*/_react.default.createElement("ol", {
    className: "plx-breadcrumbs__list"
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: i,
      className: "plx-breadcrumbs__item"
    }, last ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-breadcrumbs__current",
      "aria-current": "page"
    }, it.label) : it.href ? /*#__PURE__*/_react.default.createElement("a", {
      className: "plx-breadcrumbs__link",
      href: it.href,
      onClick: it.onClick
    }, it.label) : /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-breadcrumbs__text"
    }, it.label));
  })));
}
  } },
  "platform/components/List/List.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = List;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · List, List.Item
   Summary: A list of short statements, each with a leading icon in a tone (do and don't, features, requirements).
   Usage:
     <List items={[{ icon: 'circle-check', tone: 'success', children: 'Use it for…' }]} />
     <List><List.Item icon="close" tone="danger">Avoid…</List.Item></List>
   Props:
     List.items: the statements: [{ icon, tone, children }]; or pass List.Item children
     List.label: names the list for assistive technology when its heading is not next to it
     List.children: List.Item elements, when there are no items
     List.className: more classes on the <ul>
     List.Item.icon: the icon name
     List.Item.tone: "neutral" (default) | "success" | "danger" | "info" | "warning"
     List.Item.children: the statement
     List.Item.className: more classes on the <li>
   Behavior:
     Items wrap; the icon sits on the first line.
     The icon is decorative and hidden from assistive technology (the text carries the meaning).
*/

function List({
  items,
  label,
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("ul", {
    "aria-label": label,
    className: (0, _cx.cx)('plx-list', className)
  }, items ? items.map((it, i) => /*#__PURE__*/_react.default.createElement(List.Item, {
    key: i,
    icon: it.icon,
    tone: it.tone
  }, it.children)) : children);
}
List.Item = function ListItem({
  icon,
  tone = 'neutral',
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("li", {
    className: (0, _cx.cx)('plx-list__item', 'plx-list__item--' + tone, className)
  }, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-list__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  })) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-list__text"
  }, children));
};
  } },
  "platform/components/CodeBlock/CodeBlock.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Button/Button.jsx":"platform/components/Button/Button.jsx","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeBlock = CodeBlock;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Button = require("../Button/Button.jsx");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · CodeBlock
   Summary: Code or a file's source, in the code font (DM Mono) on the page surface, with a Copy button.
   Usage:
     <CodeBlock title="platform/components/Button/Button.jsx" maxHeight="tall">{text}</CodeBlock>
   Props:
     title: a file name or caption shown above the code (in the data font)
     maxHeight: "none" (default) | "tall" (a box that scrolls, for whole files)
     copy: false hides the Copy button (default true)
     label: the accessible name of the code region (default the title, else strings.code)
     strings: the words it shows and announces, for other languages: { code: "Code", copy: "Copy", copied: "Copied",
       failed: "Could not copy" }
     language: "auto" (default: from the title's extension, else read from the code) | "jsx" | "js" | "css" | "html" | "text"
     children: the code, as a string
     className: more classes on the block
   Behavior:
     The code keeps its own line breaks and scrolls sideways.
     The code is one Tab stop (a focusable region) so a keyboard user can scroll it.
     The code is colored in the usual editor manner: keywords, strings, comments, numbers, functions, tags, attributes and
       properties, custom properties, selectors.
     "text" is not colored.
     Copy puts the code on the clipboard and reads "Copied" with a check for a moment; screen readers hear "Copied" (or
       "Could not copy" when the clipboard refuses).
   Notes:
     The colors come from the --plx-sys-code-* roles.
*/

const KEYWORDS = 'import|from|export|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|in|of|null|undefined|true|false|this|async|await|class|extends|try|catch|finally|throw';
// each rule: [kind, pattern]; the first that matches at a position wins
const RULES = {
  js: [['comment', /\/\*[\s\S]*?\*\/|\/\/[^\n]*/], ['string', /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`/], ['tag', /<\/?[A-Za-z][\w.]*/], ['attribute', /[A-Za-z_][\w-]*(?==(?!=)[{"'])/], ['keyword', new RegExp('\\b(?:' + KEYWORDS + ')\\b')], ['number', /\b\d+(?:\.\d+)?\b/], ['function', /\b[A-Za-z_$][\w$]*(?=\()/]],
  css: [['comment', /\/\*[\s\S]*?\*\//], ['string', /'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"/], ['brace', /[{}]/], ['variable', /--[\w-]+/], ['keyword', /@[\w-]+|!important/], ['attribute', /[\w-]+(?=\s*:)/], ['function', /\b[\w-]+(?=\()/], ['number', /-?\b\d+(?:\.\d+)?(?:px|rem|em|%|ms|s|deg|fr|vh|vw|ch)?\b/]]
};
RULES.jsx = RULES.js;
RULES.html = RULES.js;
function detect(title, text) {
  const ext = title ? (String(title).match(/\.(\w+)$/) || [])[1] : null;
  if (ext) return ext === 'css' ? 'css' : /^(jsx?|mjs|tsx?)$/.test(ext) ? 'jsx' : ext === 'html' ? 'html' : 'text';
  return /^\s*(?:[.#:@\w[\]*-][^{\n]*)\{[^}]*:[^}]*;/m.test(text) && !/=>|import |<[A-Z]/.test(text) ? 'css' : 'jsx';
}

// the code as a list of plain strings and colored spans
function highlight(text, language) {
  const rules = RULES[language];
  if (!rules) return text;
  const all = new RegExp(rules.map(([, re]) => '(' + re.source + ')').join('|'), 'g');
  const out = [];
  let at = 0,
    depth = 0,
    m,
    n = 0;
  const plain = s => {
    if (!s) return;
    out.push(language === 'css' && depth === 0 ? /*#__PURE__*/_react.default.createElement("span", {
      key: n++,
      className: "plx-code-block__tok--selector"
    }, s) : s);
  };
  while (m = all.exec(text)) {
    if (m[0] === '') {
      all.lastIndex++;
      continue;
    }
    plain(text.slice(at, m.index));
    const kind = rules[m.slice(1).findIndex(g => g !== undefined)][0];
    if (kind === 'brace') {
      depth += m[0] === '{' ? 1 : -1;
      if (depth < 0) depth = 0;
      out.push(m[0]);
    } else if (language === 'css' && depth === 0 && kind !== 'comment' && kind !== 'keyword' && kind !== 'string') plain(m[0]);else if (kind === 'tag') {
      const slash = m[0][1] === '/' ? 2 : 1;
      out.push(m[0].slice(0, slash));
      out.push(/*#__PURE__*/_react.default.createElement("span", {
        key: n++,
        className: "plx-code-block__tok--tag"
      }, m[0].slice(slash)));
    } else out.push(/*#__PURE__*/_react.default.createElement("span", {
      key: n++,
      className: 'plx-code-block__tok--' + kind
    }, m[0]));
    at = all.lastIndex;
  }
  plain(text.slice(at));
  return out;
}
const STRINGS = {
  code: 'Code',
  copy: 'Copy',
  copied: 'Copied',
  failed: 'Could not copy'
};
function CodeBlock({
  title,
  maxHeight = 'none',
  copy = true,
  label,
  language = 'auto',
  strings,
  className,
  children
}) {
  const t = Object.assign({}, STRINGS, strings);
  const [copied, setCopied] = _react.default.useState(false);
  const [said, setSaid] = _react.default.useState(''); // what screen readers hear after Copy (batch 213)
  const text = typeof children === 'string' ? children : String(children == null ? '' : children);
  const lang = language === 'auto' ? detect(title, text) : language;
  const colored = _react.default.useMemo(() => highlight(text, lang), [text, lang]);
  const doCopy = () => {
    const done = () => {
      setCopied(true);
      setSaid(t.copied);
      setTimeout(() => {
        setCopied(false);
        setSaid('');
      }, 1500);
    };
    const failed = () => {
      setSaid(t.failed);
      setTimeout(() => setSaid(''), 3000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, failed);else failed();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-code-block', 'plx-code-block--' + maxHeight, className)
  }, title || copy ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-code-block__head"
  }, title ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-code-block__title"
  }, title) : /*#__PURE__*/_react.default.createElement("span", null), copy ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "xs",
    variant: "ghost",
    icon: copied ? 'check' : undefined,
    onClick: doCopy
  }, copied ? t.copied : t.copy) : null, copy ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, {
    role: "status"
  }, said) : null) : null, /*#__PURE__*/_react.default.createElement("pre", {
    className: "plx-code-block__pre",
    tabIndex: 0,
    "aria-label": label || title || t.code
  }, /*#__PURE__*/_react.default.createElement("code", {
    "data-plx-language": lang
  }, colored)));
}
  } },
  "platform/components/SectionHeading/SectionHeading.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionHeading = SectionHeading;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · SectionHeading
   Summary: A small uppercase label that names a group (navigation sections, panel sections, settings).
   Usage:
     <SectionHeading collapsible expanded={open} onToggle={() => setOpen(!open)} controls="recent-body">Recent</SectionHeading>
   Props:
     level: the heading level; default 3; null for a plain label
     collapsible: renders a button that shows or hides the section; default false
     expanded: whether the section is shown (collapsible only); default true
     onToggle(event): runs when the button is clicked (collapsible only)
     controls: the id of the section body (collapsible only)
     actions: controls at the end of the heading
     className: more classes on the heading
     children: the label text
     ...rest: other attributes go on the heading element
   Behavior:
     The chevron turns with expanded.
   Notes:
     It sets no outer margin: the list or panel it sits in spaces it.
*/
function SectionHeading({
  level = 3,
  collapsible = false,
  expanded = true,
  onToggle,
  controls,
  actions,
  className,
  children,
  ...rest
}) {
  const Tag = level ? 'h' + level : 'div';
  if (collapsible) {
    return /*#__PURE__*/_react.default.createElement(Tag, _extends({
      className: (0, _cx.cx)('plx-section-heading', 'plx-section-heading--collapsible', className)
    }, rest), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "plx-section-heading__toggle",
      "aria-expanded": expanded,
      "aria-controls": controls,
      onClick: onToggle
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-section-heading__label"
    }, children), /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-section-heading__chevron",
      "aria-hidden": "true"
    })), actions ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-section-heading__actions"
    }, actions) : null);
  }
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    className: (0, _cx.cx)('plx-section-heading', className)
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-section-heading__label"
  }, children), actions ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-section-heading__actions"
  }, actions) : null);
}
  } },
  "platform/utils/layer.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusables = focusables;
exports.useLayer = useLayer;
exports.useUid = useUid;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · layers (platform/utils/layer.js). Internal; not part of the public API.
   Every open menu, dialog, drawer and media viewer is a layer. Escape closes only the topmost layer, so Escape in a menu
   inside a dialog closes the menu first. A modal layer also keeps Tab inside itself, locks page scroll, moves focus in
   when it opens (initialFocus: a ref, or a function that returns the element) and returns focus to the element that opened it when it closes. */

const stack = [];
let modalCount = 0;
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function focusables(root) {
  if (!root) return [];
  return Array.prototype.filter.call(root.querySelectorAll(FOCUSABLE), el => !el.closest('[hidden]') && el.getClientRects().length > 0);
}
function useLayer(ref, open, {
  modal = false,
  onEscape,
  initialFocus
} = {}) {
  const escape = _react.default.useRef(onEscape);
  escape.current = onEscape;
  _react.default.useEffect(() => {
    if (!open) return undefined;
    const entry = {
      modal
    };
    stack.push(entry);
    const opener = document.activeElement;
    if (modal) {
      if (modalCount === 0) document.documentElement.classList.add('is-scroll-locked');
      modalCount += 1;
      const root = ref.current;
      const wanted = typeof initialFocus === 'function' ? initialFocus() : initialFocus && initialFocus.current;
      const first = wanted || focusables(root)[0] || root;
      if (first) first.focus({
        preventScroll: true
      });
    }
    const onKey = e => {
      if (stack[stack.length - 1] !== entry) return;
      if (e.key === 'Escape') {
        if (escape.current) {
          e.preventDefault();
          e.stopPropagation();
          escape.current();
        }
        return;
      }
      if (!modal || e.key !== 'Tab') return;
      const root = ref.current;
      const items = focusables(root);
      if (!items.length) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = items[0],
        last = items[items.length - 1],
        active = document.activeElement;
      if (!root.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === root)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      stack.splice(stack.indexOf(entry), 1);
      if (modal) {
        modalCount -= 1;
        if (modalCount === 0) document.documentElement.classList.remove('is-scroll-locked');
        if (opener && opener.focus && document.contains(opener)) opener.focus({
          preventScroll: true
        });
      }
    };
  }, [open]);
}
function useUid(prefix) {
  return prefix + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
}
  } },
  "platform/components/CollapsibleSection/CollapsibleSection.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleSection = CollapsibleSection;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · CollapsibleSection
   Summary: A titled section that expands and collapses.
   Usage:
     <CollapsibleSection title="Collections" icon="collection" defaultExpanded actions={<Button…/>}>…</CollapsibleSection>
   Props:
     title: the section title
     icon: an <Icon> (or an icon name) before the title
     expanded: the open state, when controlled
     defaultExpanded: the first open state, when uncontrolled (default true)
     onToggle(next): runs with the new open state when the header is clicked
     actions: controls beside the header, outside its button
     headingLevel: the heading level of the title (default 3; null for a plain label)
     className: more classes on the <section>
     bodyClassName: more classes on the body
     children: the body
   Behavior:
     Controlled with expanded and onToggle(next); uncontrolled with defaultExpanded.
     The header is one button (aria-expanded, pointing at the body).
     The chevron at the end points down while open.
     The body is removed from view, and from the accessibility tree, while collapsed.
   Notes:
     It keeps the legacy section header: an accent uppercase title with an optional icon, a divider beneath it and a
       chevron at the end.
*/

const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
function CollapsibleSection({
  title,
  icon,
  expanded,
  defaultExpanded = true,
  onToggle,
  actions,
  headingLevel = 3,
  className,
  bodyClassName,
  children
}) {
  const id = (0, _layer.useUid)('plx-collapsible-section');
  const [own, setOwn] = _react.default.useState(defaultExpanded);
  const open = expanded !== undefined ? expanded : own;
  const toggle = () => {
    if (expanded === undefined) setOwn(!open);
    if (onToggle) onToggle(!open);
  };
  const Tag = headingLevel ? 'h' + headingLevel : 'div';
  return /*#__PURE__*/_react.default.createElement("section", {
    className: (0, _cx.cx)('plx-collapsible-section', open && 'is-expanded', className)
  }, /*#__PURE__*/_react.default.createElement(Tag, {
    className: "plx-collapsible-section__heading"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-collapsible-section__toggle",
    "aria-expanded": open,
    "aria-controls": id + '-body',
    onClick: toggle
  }, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-collapsible-section__icon",
    "aria-hidden": "true"
  }, asIcon(icon)) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-collapsible-section__title"
  }, title), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-collapsible-section__chevron",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-down"
  }))), actions ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-collapsible-section__actions"
  }, actions) : null), /*#__PURE__*/_react.default.createElement("div", {
    id: id + '-body',
    className: (0, _cx.cx)('plx-collapsible-section__body', bodyClassName),
    hidden: !open
  }, children));
}
  } },
  "platform/components/Input/Input.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Textarea = exports.Select = exports.Input = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Input, Textarea, Select
   Summary: The text field family, at the standard control height.
   Usage:
     <Input value={name} onChange={(e) => …} width="md" />
     <Textarea rows={5} value={notes} onChange={(e) => …} />
     <Select value={fmt} onChange={(e) => …} options={[{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }]} />
   Props:
     Input.invalid: marks the field (aria-invalid); put the message in Field's error
     Input.width: "xs" | "sm" | "md" | "lg" (a field narrower than its row, --plx-sys-field-width-*)
     Input.data: the data font, for codes, hex values, links to copy (default false)
     Input.emphasis: semibold, for a record's title (default false)
     Input.type: the input type (default "text"); "color" gives the native color well (a pointer cursor; size it with width
       or a utility)
     Input.className: more classes on the <input>
     Textarea.invalid: marks the field (aria-invalid)
     Textarea.rows: the visible lines (default 3)
     Textarea.className: more classes on the <textarea>
     Select.invalid: marks the field (aria-invalid)
     Select.options: the choices: [{ value, label, disabled }]; or pass <option>s as children
     Select.children: <option>s, when there are no options
     Select.className: more classes on the wrapper
   Behavior:
     Inside a Field, the label, description and error are connected for you.
   Notes:
     They take every native attribute (value, onChange, placeholder, disabled, readOnly, required…).
     All three forward their ref to the native element.
*/
const Input = exports.Input = /*#__PURE__*/_react.default.forwardRef(function Input({
  invalid,
  width,
  data = false,
  emphasis = false,
  className,
  type = 'text',
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: ref,
    type: type,
    className: (0, _cx.cx)('plx-input', width && 'plx-input--width-' + width, data && 'plx-input--data', emphasis && 'plx-input--emphasis', className),
    "aria-invalid": invalid || undefined
  }, rest));
});
const Textarea = exports.Textarea = /*#__PURE__*/_react.default.forwardRef(function Textarea({
  invalid,
  className,
  rows = 3,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("textarea", _extends({
    ref: ref,
    rows: rows,
    className: (0, _cx.cx)('plx-input', 'plx-textarea', className),
    "aria-invalid": invalid || undefined
  }, rest));
});

/* options: [{ value, label }] or children <option>s */
const Select = exports.Select = /*#__PURE__*/_react.default.forwardRef(function Select({
  invalid,
  options,
  className,
  children,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-select', className)
  }, /*#__PURE__*/_react.default.createElement("select", _extends({
    ref: ref,
    className: "plx-input plx-select__control",
    "aria-invalid": invalid || undefined
  }, rest), options ? options.map(o => /*#__PURE__*/_react.default.createElement("option", {
    key: o.value,
    value: o.value,
    disabled: o.disabled
  }, o.label)) : children));
});
  } },
  "platform/components/Chat/Chat.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx","../Input/Input.jsx":"platform/components/Input/Input.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
var _Button = require("../Button/Button.jsx");
var _Input = require("../Input/Input.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Chat
   Summary: The live messaging surface of a conversation (12 › Collaboration and communication › Chat): its header, the
     thread of messages (mine on the end side, theirs on the start side), the typing dots and the composer.
   Usage:
     <Chat.Header title="Maya Chen" meta="Online" avatar={<Avatar name="Maya Chen" />} actions={<…/>} />
     <Chat.Thread label="Conversation with Maya Chen">
       <Chat.Message author="Maya Chen" time="10:24" avatar={<Avatar name="Maya Chen" size="xs" />}>Are the renders ready?</Chat.Message>
       <Chat.Message mine time="10:26">Uploading them now.</Chat.Message>
       <Chat.Typing label="Maya is typing" />
     </Chat.Thread>
     <Chat.Composer value={text} onChange={setText} onSend={send} />
   Props:
     Chat.Header.title: who or what the conversation is with
     Chat.Header.meta: a short line under the title (presence, members)
     Chat.Header.avatar: an Avatar before the title
     Chat.Header.actions: buttons at the end
     Chat.Thread.label: the accessible name of the thread (default "Conversation")
     Chat.Thread.follow: opens at the newest message and keeps it in view as messages arrive, unless the person scrolled up
       to read (default true)
     Chat.Thread.children: the messages, in order (the oldest first)
     Chat.Message.mine: the message is the person's own (end side, in the action color); default false
     Chat.Message.author: who wrote it (shown above theirs; announced for mine as "You")
     Chat.Message.time: when, as shown; dateTime: the same as a machine-readable date
     Chat.Message.avatar: an Avatar beside their messages
     Chat.Message.children: the message text or content
     Chat.Composer.value / onChange(text): the message being written
     Chat.Composer.onSend(text): runs on Send and on Enter (Shift+Enter starts a new line)
     Chat.Composer.placeholder: default "Write a message"; label: the field's accessible name (default "Message")
     Chat.Composer.sendLabel: default "Send"; disabled: the composer is inert
     Chat.Typing.label: the text announced to assistive technology (default "Typing")
     Chat.Typing.className: more classes on the dots
     className on every part: more classes
   Behavior:
     The thread is a log (role="log", aria-live="polite"): new messages are announced.
     Send is disabled while the message is empty.
     Chat.Typing is a status region (role="status"), so its label is announced.
     The dots pulse one after another; people who ask their system for less motion see them still.
   Notes:
     Other props pass through to the <span>.
     It was TypingIndicator in the loading family (batch 168); the owner placed it under Chat.
*/
function Typing({
  label = 'Typing',
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-chat__typing', className),
    role: "status"
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, label));
}
function Header({
  title,
  meta,
  avatar,
  actions,
  className,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-chat__header', className)
  }, rest), avatar ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-chat__header-avatar"
  }, avatar) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__header-text"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__header-title"
  }, title), meta ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__header-meta"
  }, meta) : null), actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__header-actions"
  }, actions) : null);
}
function Thread({
  label = 'Conversation',
  follow = true,
  className,
  children,
  ...rest
}) {
  // it opens at the newest message and follows new ones, unless the person has scrolled up to read (batch 215)
  const ref = _react.default.useRef(null),
    atEnd = _react.default.useRef(true);
  const count = _react.default.Children.count(children);
  _react.default.useLayoutEffect(() => {
    const el = ref.current;
    if (follow && el && atEnd.current) el.scrollTop = el.scrollHeight;
  }, [count, follow]);
  const onScroll = e => {
    const el = e.currentTarget;
    atEnd.current = el.scrollHeight - el.scrollTop - el.clientHeight <= el.clientHeight / 4;
    if (rest.onScroll) rest.onScroll(e);
  };
  // it scrolls, so it is in the Tab order: the keyboard can scroll it too
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: ref,
    className: (0, _cx.cx)('plx-chat__thread', className),
    role: "log",
    "aria-live": "polite",
    "aria-label": label,
    tabIndex: 0
  }, rest, {
    onScroll: onScroll
  }), children);
}
function Message({
  mine = false,
  author,
  time,
  dateTime,
  avatar,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-chat__message', mine && 'plx-chat__message--mine', className)
  }, rest), !mine && avatar ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-chat__avatar"
  }, avatar) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__bubble"
  }, author && !mine || time ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__meta"
  }, mine ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, "You") : author ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-chat__author"
  }, author) : null, time ? /*#__PURE__*/_react.default.createElement("time", {
    className: "plx-chat__time",
    dateTime: dateTime
  }, time) : null) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-chat__body"
  }, children)));
}
function Composer({
  value = '',
  onChange,
  onSend,
  placeholder = 'Write a message',
  label = 'Message',
  sendLabel = 'Send',
  disabled = false,
  className,
  ...rest
}) {
  const empty = !String(value).trim();
  const send = () => {
    if (!empty && onSend) onSend(value);
  };
  return /*#__PURE__*/_react.default.createElement("form", _extends({
    className: (0, _cx.cx)('plx-chat__composer', className),
    onSubmit: e => {
      e.preventDefault();
      send();
    }
  }, rest), /*#__PURE__*/_react.default.createElement(_Input.Textarea, {
    className: "plx-chat__field",
    rows: 1,
    value: value,
    placeholder: placeholder,
    "aria-label": label,
    disabled: disabled,
    onChange: e => {
      if (onChange) onChange(e.target.value);
    },
    onKeyDown: e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    type: "submit",
    variant: "primary",
    disabled: disabled || empty
  }, sendLabel));
}
const Chat = exports.Chat = {
  Header,
  Thread,
  Message,
  Composer,
  Typing
};
  } },
  "platform/components/EmptyState/EmptyState.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyState = EmptyState;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · EmptyState
   Summary: What a region shows when it has nothing yet, and how to add the first item.
   Usage:
     <EmptyState size="page" icon="folder" title="No assets yet" action={<Button variant="primary">Upload</Button>}>
       Upload files to start.</EmptyState>
   Props:
     size: "inline" (default; a line inside a list or table area) | "page" (a whole view)
     icon: an icon name or an <Icon> (or other mark); hidden from assistive technology
     title: the main line
     action: a button
     children: the explaining text
     className: more classes on the region
   Notes:
     Other props pass through to the <div>.
*/
function EmptyState({
  size = 'inline',
  icon,
  title,
  action,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-empty-state', 'plx-empty-state--' + size, className)
  }, rest), icon ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__icon",
    "aria-hidden": "true"
  }, typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  }) : icon) : null, title ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__title"
  }, title) : null, children ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__text"
  }, children) : null, action ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__action"
  }, action) : null);
}
  } },
  "platform/components/Pagination/Pagination.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = Pagination;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Pagination
   Summary: Page buttons, an optional summary ("1–30 of 120") and an optional per-page choice.
   Usage:
     <Pagination page={2} pageCount={4} onPageChange={setPage}
       total={120} perPage={30} perPageOptions={[30, 60, 120]} onPerPageChange={setPerPage} />
   Props:
     page: the current page, 1-based; default 1
     pageCount: the number of pages; default 1
     onPageChange(page): runs when another page is chosen
     total: the number of items; with it the summary shows
     perPage: the number of items per page
     perPageOptions: the per-page choices; with onPerPageChange the per-page choice shows
     onPerPageChange(n): runs when another per-page number is chosen
     label: the accessible name of the navigation; default strings.label: "Pages"
     className: more classes on the navigation
     strings: the words it shows and announces, for other languages: { label: "Pages", range: "{first}–{last} of {total}",
       previous: "Previous page", next: "Next page", page: "Page {n}", perPage: "Per page" }
     ...rest: other attributes go on the navigation element
   Behavior:
     Shows the first and last page, the current page and its neighbors, with "…" between gaps.
     Previous is disabled on the first page; Next on the last.
     The current page carries aria-current="page".
*/
const STRINGS = {
  label: 'Pages',
  range: '{first}–{last} of {total}',
  previous: 'Previous page',
  next: 'Next page',
  page: 'Page {n}',
  perPage: 'Per page'
};
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? String(vars[k]) : m);
function pagesToShow(page, count) {
  const set = new Set([1, count, page - 1, page, page + 1].filter(p => p >= 1 && p <= count));
  const list = Array.from(set).sort((a, b) => a - b),
    out = [];
  list.forEach((p, i) => {
    if (i && p - list[i - 1] > 1) out.push('gap-' + p);
    out.push(p);
  });
  return out;
}
function Pagination({
  page = 1,
  pageCount = 1,
  onPageChange,
  total,
  perPage,
  perPageOptions,
  onPerPageChange,
  label,
  strings,
  className,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings);
  const go = p => {
    if (p >= 1 && p <= pageCount && p !== page && onPageChange) onPageChange(p);
  };
  const first = total ? (page - 1) * (perPage || 0) + 1 : null;
  const last = total ? Math.min(total, page * (perPage || total)) : null;
  return /*#__PURE__*/_react.default.createElement("nav", _extends({
    className: (0, _cx.cx)('plx-pagination', className),
    "aria-label": label || t.label
  }, rest), total ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-pagination__info"
  }, fill(t.range, {
    first,
    last,
    total
  })) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-pagination__pages"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-pagination__page plx-pagination__step",
    "aria-label": t.previous,
    disabled: page <= 1,
    onClick: () => go(page - 1)
  }, "\u2039"), pagesToShow(page, pageCount).map(p => typeof p === 'string' ? /*#__PURE__*/_react.default.createElement("span", {
    key: p,
    className: "plx-pagination__gap",
    "aria-hidden": "true"
  }, "\u2026") : /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    key: p,
    className: "plx-pagination__page",
    "aria-current": p === page ? 'page' : undefined,
    "aria-label": fill(t.page, {
      n: p
    }),
    onClick: () => go(p)
  }, p)), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-pagination__page plx-pagination__step",
    "aria-label": t.next,
    disabled: page >= pageCount,
    onClick: () => go(page + 1)
  }, "\u203A")), perPageOptions && onPerPageChange ? /*#__PURE__*/_react.default.createElement("label", {
    className: "plx-pagination__per-page"
  }, /*#__PURE__*/_react.default.createElement("span", null, t.perPage), /*#__PURE__*/_react.default.createElement("select", {
    className: "plx-pagination__select",
    value: perPage,
    onChange: e => onPerPageChange(Number(e.target.value))
  }, perPageOptions.map(n => /*#__PURE__*/_react.default.createElement("option", {
    key: n,
    value: n
  }, n)))) : null);
}
  } },
  "platform/utils/direction.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrowStep = arrowStep;
exports.isRtl = isRtl;
/* Plenix · Writing direction (platform/utils/direction.js)
   Summary: The arrow keys in reading order. In a right-to-left page Arrow Right moves back and Arrow Left forward, as the
     eye reads; Up and Down are the same in both directions.
   Usage:
     const step = arrowStep(e, e.currentTarget);   // +1, -1 or 0
     if (step) { e.preventDefault(); move(index + step); }
   Props:
     isRtl(el): true when the element is laid out right to left (its computed direction)
     arrowStep(event, el, { vertical }): +1 for the next item, -1 for the previous one, 0 for another key; with vertical:
       false, Up and Down are ignored (a horizontal-only control)
*/
function isRtl(el) {
  return !!el && typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
}
function arrowStep(event, el, opts) {
  const vertical = !opts || opts.vertical !== false;
  const rtl = isRtl(el);
  switch (event.key) {
    case 'ArrowRight':
      return rtl ? -1 : 1;
    case 'ArrowLeft':
      return rtl ? 1 : -1;
    case 'ArrowDown':
      return vertical ? 1 : 0;
    case 'ArrowUp':
      return vertical ? -1 : 0;
    default:
      return 0;
  }
}
  } },
  "platform/components/Rating/Rating.jsx": { deps: {"react":null,"../../utils/direction.js":"platform/utils/direction.js","../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rating = Rating;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../../utils/direction.js");
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Rating
   Summary: 1 to max stars as a radio group, for rating an item.
   Usage:
     <Rating value={rating} onChange={setRating} />
   Props:
     value: the number of stars; 0 = none (default)
     onChange(value): runs when the rating changes
     max: the number of stars; default 5
     label: the accessible name; default "Rating"
     readOnly: shows the stars as a picture that cannot be changed; default false
     className: more classes on the rating
     ...rest: other attributes go on the rating element
   Behavior:
     Arrow keys move the rating; Space or Enter chooses a star.
     Choosing the current value again clears it.
     Read-only, it is announced as "Rating: 3 of 5".
*/
function Rating({
  value = 0,
  onChange,
  max = 5,
  label = 'Rating',
  readOnly = false,
  className,
  ...rest
}) {
  const stars = Array.from({
    length: max
  }, (_, i) => i + 1);
  const starRefs = _react.default.useRef({});
  const focusNext = _react.default.useRef(0); // the star the keyboard chose: focus moves there once the value has changed
  _react.default.useEffect(() => {
    const el = focusNext.current && starRefs.current[focusNext.current];
    if (el) el.focus();
    focusNext.current = 0;
  }, [value]);
  if (readOnly) {
    return /*#__PURE__*/_react.default.createElement("span", _extends({
      className: (0, _cx.cx)('plx-rating', 'plx-rating--read-only', className),
      role: "img",
      "aria-label": label + ': ' + value + ' of ' + max
    }, rest), stars.map(n => /*#__PURE__*/_react.default.createElement("span", {
      key: n,
      className: (0, _cx.cx)('plx-rating__star', n <= value && 'plx-rating__star--on'),
      "aria-hidden": "true"
    }, "\u2605")));
  }
  const choose = n => onChange && onChange(n === value ? 0 : n);
  // the arrow keys in reading order (Up is more, Down is less); focus follows the chosen star, as in a radio group (batch 213)
  const onKey = (e, n) => {
    const step = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : (0, _direction.arrowStep)(e, e.currentTarget, {
      vertical: false
    });
    if (!step) return;
    e.preventDefault();
    const next = Math.min(max, Math.max(1, n + step));
    focusNext.current = next;
    if (onChange) onChange(next);
  };
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-rating', className),
    role: "radiogroup",
    "aria-label": label
  }, rest), stars.map(n => /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    key: n,
    ref: el => {
      starRefs.current[n] = el;
    },
    role: "radio",
    "aria-checked": n === value,
    "aria-label": n + (n === 1 ? ' star' : ' stars'),
    tabIndex: (value ? n === value : n === 1) ? 0 : -1,
    className: (0, _cx.cx)('plx-rating__star', n <= value && 'plx-rating__star--on'),
    onClick: () => choose(n),
    onKeyDown: e => onKey(e, n)
  }, "\u2605")));
}
  } },
  "platform/components/RowButton/RowButton.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · RowButton
   Summary: A whole row or tile that is one button, holding any layout (an avatar, two lines of text, a time).
   Usage:
     <RowButton selected onClick={open}>…</RowButton>
   Props:
     selected: marks the row whose details are shown (aria-current="true"); default false
     current: an aria-current value instead, e.g. "date" for today in a calendar
     pressed: makes it a toggle (aria-pressed)
     expanded: a row that opens a panel below it (aria-expanded)
     hover: false: no hover fill (for tiles that draw their own surface); default true
     className: more classes on the button
     style: lays out the content
     children: the content, in any layout
     ...rest: other attributes go on the button (onClick)
   Behavior:
     It is a native button with no look of its own beyond the states: a hover fill, a selected fill and the focus ring.
     A pressed button shows the selected fill too.
   Notes:
     Use it when a Button's single centered label cannot hold the content: list rows that open a record, calendar day cells, compact project tiles.
     Lay out the content with the style prop or children; the button is a block that fills its column and aligns to the start.
*/
const RowButton = exports.RowButton = /*#__PURE__*/_react.default.forwardRef(function RowButton({
  selected = false,
  current,
  pressed,
  expanded,
  hover = true,
  className,
  children,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("button", _extends({
    ref: ref,
    type: "button",
    "aria-current": current || (selected ? 'true' : undefined),
    "aria-pressed": pressed,
    "aria-expanded": expanded
  }, rest, {
    className: (0, _cx.cx)('plx-row-button', hover && 'plx-row-button--hover', (selected || pressed) && 'is-selected', className)
  }), children);
});
  } },
  "platform/components/SegmentedControl/SegmentedControl.jsx": { deps: {"react":null,"../../utils/direction.js":"platform/utils/direction.js","../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SegmentedControl = SegmentedControl;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../../utils/direction.js");
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · SegmentedControl
   Summary: One choice from a few short options, shown together (S | M | L; Light | Dark | System).
     It sets a value (a radio group).
   Usage:
     <SegmentedControl label="Theme" value={theme} onChange={setTheme}
       options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'system', label: 'System' }]} />
   Props:
     options: the choices, in order: [{ value, label, icon, ariaLabel }]
     options[].icon: an icon name; optional
     options[].ariaLabel: the accessible name of an icon-only option; default its value
     value: the chosen value
     onChange(value): runs when another option is chosen
     label: the group's accessible name
     size: "md" (default) | "sm"
     className: more classes on the group
     ...rest: other attributes go on the group element
   Behavior:
     Arrow keys move to the next or previous option and choose it, wrapping around; Home and End go to the first and last.
     Only the chosen option is in the Tab order.
   Notes:
     To switch between panels of content, use Tabs (variant "segmented").
*/
function SegmentedControl({
  options,
  value,
  onChange,
  label,
  size = 'md',
  className,
  ...rest
}) {
  const refs = _react.default.useRef([]);
  const index = Math.max(0, options.findIndex(o => o.value === value));
  const move = (e, i) => {
    let n = null;
    const step = (0, _direction.arrowStep)(e, e.currentTarget); // in reading order: right to left reverses Left and Right (batch 213)
    if (step > 0) n = (i + 1) % options.length;
    if (step < 0) n = (i - 1 + options.length) % options.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = options.length - 1;
    if (n === null) return;
    e.preventDefault();
    onChange(options[n].value);
    if (refs.current[n]) refs.current[n].focus();
  };
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    role: "radiogroup",
    "aria-label": label,
    className: (0, _cx.cx)('plx-segmented', size === 'sm' && 'plx-segmented--sm', className)
  }, rest), options.map((o, i) => /*#__PURE__*/_react.default.createElement("button", {
    key: o.value,
    ref: el => {
      refs.current[i] = el;
    },
    type: "button",
    role: "radio",
    "aria-checked": o.value === value,
    tabIndex: i === index ? 0 : -1,
    "aria-label": o.icon && !o.label ? o.ariaLabel || String(o.value) : undefined,
    className: (0, _cx.cx)('plx-segmented__item', o.value === value && 'is-selected'),
    onClick: () => onChange(o.value),
    onKeyDown: e => move(e, i)
  }, o.icon ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: o.icon
  }) : null, o.label ? /*#__PURE__*/_react.default.createElement("span", null, o.label) : null)));
}
  } },
  "platform/utils/overflow.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitAt = void 0;
exports.useOverflow = useOverflow;
exports.useTruncated = useTruncated;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · overflow (platform/utils/overflow.js). Internal; not part of the public API.
   A one-row list whose items move into a "More" menu when they do not fit. The list wraps (flex-wrap) inside a box one
   row high that clips the rest. Its children, in DOM order (which is also the focus order), are the shown items, the
   More control (data-plx-overflow-more) and then the hidden items (each item: data-plx-overflow-item; render them with
   splitAt). useOverflow(listRef, count, key)
   returns how many items are shown: it starts from all of them whenever the width, the count or `key` (anything that
   changes the items' widths, such as their labels) changes, and lowers the number, before the browser paints, until the
   shown items and the More control are all on the first row. Items past that number are made inert. */

const firstRowTop = list => Math.min.apply(null, Array.prototype.map.call(list.children, el => el.offsetTop));
function useOverflow(listRef, count, key) {
  const [fit, setFit] = _react.default.useState(count);
  const [width, setWidth] = _react.default.useState(0);
  _react.default.useLayoutEffect(() => {
    setFit(count);
  }, [count, key, width]);
  _react.default.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(list.clientWidth));
    ro.observe(list);
    return () => ro.disconnect();
  }, []);
  _react.default.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !list.children.length) return;
    const items = list.querySelectorAll(':scope > [data-plx-overflow-item]');
    const more = list.querySelector(':scope > [data-plx-overflow-more]');
    const top = firstRowTop(list);
    let fits = !(more && more.offsetTop !== top);
    for (let i = 0; i < Math.min(fit, items.length); i += 1) if (items[i].offsetTop !== top) fits = false;
    Array.prototype.forEach.call(items, (el, i) => {
      if (i >= fit) {
        el.setAttribute('inert', '');
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.removeAttribute('inert');
        el.removeAttribute('aria-hidden');
      }
    });
    if (!fits && fit > 0) setFit(fit - 1);
  });
  return Math.min(fit, count);
}

/* the list's children in DOM order: the first `fit` items, the More control, the rest */
const splitAt = (items, fit, more) => items.slice(0, fit).concat(more ? [more] : [], items.slice(fit));

/* useTruncated(ref) (batch 270): true while the element's one line of text is cut short (shown with an ellipsis), so
   its full text can be offered in a Tooltip; checked again whenever the element's width changes. */
exports.splitAt = splitAt;
function useTruncated(ref) {
  const [cut, setCut] = _react.default.useState(false);
  _react.default.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const check = () => setCut(el.scrollWidth > el.clientWidth + 1);
    check();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return cut;
}
  } },
  "platform/components/Field/Field.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/overflow.js":"platform/utils/overflow.js","../Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Field = Field;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _overflow = require("../../utils/overflow.js");
var _Tooltip = require("../Tooltip/Tooltip.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Field
   Summary: A label, the control, and its help or error, connected for assistive technology.
   Usage:
     <Field label="Name" description="Shown on the asset" error={msg} required info={<…/>} layout="inline">
       <Input …/>
     </Field>
   Props:
     label: the label text
     description: help text under the control (under the label with "row")
     error: the error message under the control; it marks the field invalid
     required: marks the field and the control required; the label shows " *" (default false)
     info: content for a small (i) button next to the label
     infoLabel: the accessible name of the (i) button (default "About " + the label)
     layout: "stacked" (default; label above) | "inline" (label beside the control: settings rows, a 160px label column) |
       "row" (the description under the label and the control at the end)
     labelWidth: the width of the label column, as a size name (adds plx-field--label-<value>)
     children: exactly one control
     className: more classes on the field
   Behavior:
     The child control gets id, aria-describedby, invalid and required, unless it sets its own.
     The error is announced (role="alert").
     The (i) button shows and hides the info text under the control (aria-expanded).
   Notes:
     Other props pass through to the <div>.
*/
function Field({
  label,
  description,
  error,
  required = false,
  info,
  infoLabel,
  layout = 'stacked',
  labelWidth,
  className,
  children,
  ...rest
}) {
  const id = _react.default.useId();
  const controlId = 'plx-f' + id.replace(/[^a-zA-Z0-9]/g, '');
  const descId = description ? controlId + '-d' : undefined,
    errId = error ? controlId + '-e' : undefined;
  const [showInfo, setShowInfo] = _react.default.useState(false);
  const labelRef = _react.default.useRef(null);
  const cut = (0, _overflow.useTruncated)(labelRef);
  const child = _react.default.Children.only(children);
  const control = /*#__PURE__*/_react.default.cloneElement(child, {
    id: child.props.id || controlId,
    'aria-describedby': [child.props['aria-describedby'], descId, errId].filter(Boolean).join(' ') || undefined,
    invalid: child.props.invalid !== undefined ? child.props.invalid : error ? true : undefined,
    required: child.props.required !== undefined ? child.props.required : required || undefined
  });
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-field', 'plx-field--' + layout, labelWidth && 'plx-field--label-' + labelWidth, error && 'is-invalid', className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__head"
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    content: label,
    disabled: !cut,
    className: "plx-field__label-tip"
  }, /*#__PURE__*/_react.default.createElement("label", {
    ref: labelRef,
    className: "plx-field__label",
    htmlFor: child.props.id || controlId
  }, label, required ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-field__required",
    "aria-hidden": "true"
  }, " *") : null)), info ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-field__info",
    "aria-label": infoLabel || 'About ' + label,
    "aria-expanded": showInfo,
    onClick: () => setShowInfo(!showInfo)
  }, "i") : null, layout === 'row' && description ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__description",
    id: descId
  }, description) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__control"
  }, control, layout !== 'row' && description ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__description",
    id: descId
  }, description) : null, error ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__error",
    id: errId,
    role: "alert"
  }, error) : null, info && showInfo ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__info-text"
  }, info) : null));
}
  } },
  "platform/components/Checkbox/Checkbox.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = void 0;
exports.ChoiceList = ChoiceList;
exports.Radio = void 0;
exports.RadioGroup = RadioGroup;
exports.Switch = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Checkbox, Radio, RadioGroup, ChoiceList, Switch
   Summary: Native choice inputs, so keyboard, forms and assistive technology work as usual.
   Usage:
     <Checkbox checked={on} onChange={(e) => …} label="Include subfolders" description="…" indeterminate={some} />
     <RadioGroup label="Format" value={fmt} onChange={(value) => …}
       options={[{ value: 'png', label: 'PNG', description: '…' }, { value: 'jpg', label: 'JPG' }]} layout="row" />
     <ChoiceList legend="Plan" value={plan} onChange={(value) => …} options={[{ value: 'team', label: 'Team', description: '…' }]} />
     <Switch checked={on} onChange={(e) => …} label="Notifications" />
   Props:
     Checkbox.label: the text beside the box
     Checkbox.description: a second line under the label
     Checkbox.indeterminate: shows the mixed state (default false)
     Checkbox.className: more classes on the row
     Checkbox.checked: whether the box is checked (passed to the <input>)
     Checkbox.onChange(event): runs when the box changes (passed to the <input>)
     Radio.label: the text beside the circle; without it there is no visible text
     Radio.description: a second line under the label
     Radio.className: more classes on the row
     RadioGroup.label: the legend of the group
     RadioGroup.name: the radio name (default a generated one)
     RadioGroup.value: the selected option value
     RadioGroup.onChange(value): runs with the chosen option value
     RadioGroup.options: the choices: [{ value, label, description, disabled }]
     RadioGroup.layout: "column" (default) | "row"
     RadioGroup.className: more classes on the <fieldset>
     ChoiceList.legend: the legend of the list
     ChoiceList.name: the radio name (default a generated one)
     ChoiceList.value: the selected option value
     ChoiceList.onChange(value): runs with the chosen option value
     ChoiceList.options: the choices, shown as cards with descriptions: [{ value, label, description, hidden }]
     ChoiceList.className: more classes on the <fieldset>
     Switch.label: the text beside the switch
     Switch.labelHidden: true hides the label and uses it as the accessible name (default false)
     Switch.className: more classes on the row
     Switch.checked: whether the switch is on (passed to the <input>)
     Switch.onChange(event): runs when the switch changes (passed to the <input>)
   Behavior:
     The whole row (control and label) is the target, at least the inline-action height.
     Switch is a checkbox with role="switch".
     The selected ChoiceList card shows the selected state.
   Notes:
     The Switch track is 36 × 20px and the knob 16px, centered: (track − knob) / 2.
     Checkbox, Radio and Switch pass other props (checked, onChange, name, value, disabled, …) and their ref to the <input>.
     RadioGroup and ChoiceList pass other props to the <fieldset>.
*/
const Checkbox = exports.Checkbox = /*#__PURE__*/_react.default.forwardRef(function Checkbox({
  label,
  description,
  indeterminate = false,
  className,
  ...rest
}, ref) {
  const inner = _react.default.useRef(null);
  _react.default.useImperativeHandle(ref, () => inner.current);
  _react.default.useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return /*#__PURE__*/_react.default.createElement("label", {
    className: (0, _cx.cx)('plx-check', className)
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: inner,
    type: "checkbox",
    className: "plx-check__input"
  }, rest)), label || description ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-check__text"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-check__label"
  }, label), description ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-check__description"
  }, description) : null) : null);
});
const Radio = exports.Radio = /*#__PURE__*/_react.default.forwardRef(function Radio({
  label,
  description,
  className,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("label", {
    className: (0, _cx.cx)('plx-check', className)
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: ref,
    type: "radio",
    className: "plx-check__input"
  }, rest)), label ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-check__text"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-check__label"
  }, label), description ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-check__description"
  }, description) : null) : null);
});
function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
  layout = 'column',
  className,
  ...rest
}) {
  const auto = 'plx-r' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  return /*#__PURE__*/_react.default.createElement("fieldset", _extends({
    className: (0, _cx.cx)('plx-radio-group', 'plx-radio-group--' + layout, className)
  }, rest), label ? /*#__PURE__*/_react.default.createElement("legend", {
    className: "plx-radio-group__legend"
  }, label) : null, options.map(o => /*#__PURE__*/_react.default.createElement(Radio, {
    key: o.value,
    name: name || auto,
    value: o.value,
    label: o.label,
    description: o.description,
    checked: o.value === value,
    onChange: () => onChange(o.value),
    disabled: o.disabled
  })));
}
function ChoiceList({
  legend,
  name,
  value,
  onChange,
  options,
  className,
  ...rest
}) {
  const auto = 'plx-c' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  return /*#__PURE__*/_react.default.createElement("fieldset", _extends({
    className: (0, _cx.cx)('plx-choice-list', className)
  }, rest), legend ? /*#__PURE__*/_react.default.createElement("legend", {
    className: "plx-choice-list__legend"
  }, legend) : null, options.map(o => /*#__PURE__*/_react.default.createElement("label", {
    key: o.value,
    className: (0, _cx.cx)('plx-choice', o.value === value && 'is-selected'),
    hidden: o.hidden || undefined
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    className: "plx-choice__input",
    name: name || auto,
    value: o.value,
    checked: o.value === value,
    onChange: () => onChange(o.value)
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-choice__text"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-choice__label"
  }, o.label), o.description ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-choice__description"
  }, o.description) : null))));
}
const Switch = exports.Switch = /*#__PURE__*/_react.default.forwardRef(function Switch({
  label,
  labelHidden = false,
  className,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("label", {
    className: (0, _cx.cx)('plx-switch', className)
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: ref,
    type: "checkbox",
    role: "switch",
    className: "plx-switch__input",
    "aria-label": labelHidden ? label : undefined
  }, rest)), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-switch__track",
    "aria-hidden": "true"
  }), label && !labelHidden ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-switch__label"
  }, label) : null);
});
  } },
  "platform/components/Combobox/Combobox.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Tag/Tag.jsx":"platform/components/Tag/Tag.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Combobox = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Tag = require("../Tag/Tag.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Combobox
   Summary: A field with a list to choose from, filtered as you type (an ARIA combobox with a listbox).
   Usage:
     <Combobox label="Owner" options={[{ value: 'rm', label: 'Raphael Maher' }]} value={owner} onChange={(value) => …} />
     <Combobox multiple creatable options={tags} values={chosen} onChange={(values) => …} onCreate={(text) => …} />
   Props:
     options: the choices: [{ value, label, group }]; options with a group are listed under its heading, in the order the groups first appear
     value: the chosen value, for a single choice
     values: the chosen values, with multiple
     onChange(value): runs with the chosen value; with multiple it runs with the new array of values
     multiple: allows several values; chosen values show as tags before the field (default false)
     creatable: offers "Create “text”" when nothing matches exactly (default false)
     onCreate(text): runs with the typed text when "Create" is chosen
     placeholder: the hint in the empty field
     label: the accessible name when there is no Field
     invalid: shows the invalid state
     disabled: the field cannot be used
     emptyText: the text when nothing matches (default "No matches")
     id: the id of the input (a Field sets it)
     className: more classes on the combobox
     ref: forwarded to the <input>
   Behavior:
     The list opens on focus and on typing, and closes on a click outside.
     ↓ / ↑ move, Enter chooses, Escape closes.
     Backspace in an empty multiple field removes the last value.
     A single choice closes the list; with multiple, choosing toggles the value and the list stays open.
     A tag's remove button removes its value.
   Notes:
     The list is a menu surface: border only, no shadow (D9).
     Other props pass through to the <input>.
*/
const Combobox = exports.Combobox = /*#__PURE__*/_react.default.forwardRef(function Combobox({
  options = [],
  value,
  values,
  onChange,
  multiple = false,
  creatable = false,
  onCreate,
  placeholder,
  label,
  invalid,
  disabled,
  emptyText = 'No matches',
  className,
  id,
  ...rest
}, ref) {
  const auto = 'plx-cb' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  const listId = auto + '-list';
  const [open, setOpen] = _react.default.useState(false);
  const [text, setText] = _react.default.useState('');
  const [active, setActive] = _react.default.useState(0);
  const wrap = _react.default.useRef(null),
    input = _react.default.useRef(null);
  _react.default.useImperativeHandle(ref, () => input.current);
  const chosen = multiple ? values || [] : value !== undefined && value !== null && value !== '' ? [value] : [];
  const current = !multiple && chosen.length ? options.find(o => o.value === chosen[0]) : null;
  const q = text.trim().toLowerCase();
  const matching = options.filter(o => !q || String(o.label).toLowerCase().indexOf(q) >= 0);
  // grouped options stay together under their group's heading (groups in the order they first appear)
  const groupOrder = [];
  matching.forEach(o => {
    if (groupOrder.indexOf(o.group) < 0) groupOrder.push(o.group);
  });
  const filtered = groupOrder.reduce((all, g) => all.concat(matching.filter(o => o.group === g)), []);
  const canCreate = creatable && q && !options.some(o => String(o.label).toLowerCase() === q);
  const items = filtered.map(o => ({
    kind: 'option',
    o
  })).concat(canCreate ? [{
    kind: 'create'
  }] : []);
  _react.default.useEffect(() => {
    if (!open) return undefined;
    const off = e => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);
  _react.default.useEffect(() => {
    setActive(0);
  }, [q, open]);
  const choose = item => {
    if (!item) return;
    if (item.kind === 'create') {
      if (onCreate) onCreate(text.trim());
      setText('');
      return;
    }
    const v = item.o.value;
    if (multiple) {
      onChange(chosen.indexOf(v) >= 0 ? chosen.filter(x => x !== v) : chosen.concat([v]));
      setText('');
    } else {
      onChange(v);
      setText('');
      setOpen(false);
    }
  };
  const onKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);else setActive(a => Math.min(items.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      if (open && items[active]) {
        e.preventDefault();
        choose(items[active]);
      }
    } else if (e.key === 'Escape') {
      if (open) {
        e.preventDefault();
        setOpen(false);
      }
    } else if (e.key === 'Backspace' && multiple && !text && chosen.length) {
      onChange(chosen.slice(0, -1));
    }
  };
  const optId = i => auto + '-o' + i;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: wrap,
    className: (0, _cx.cx)('plx-combobox', multiple && 'plx-combobox--multiple', open && 'is-open', disabled && 'is-disabled', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-combobox__field plx-input",
    "aria-invalid": invalid || undefined,
    onClick: () => {
      if (!disabled && input.current) input.current.focus();
    }
  }, multiple ? chosen.map(v => {
    const o = options.find(x => x.value === v);
    const t = o ? o.label : v;
    return /*#__PURE__*/_react.default.createElement(_Tag.Tag, {
      key: v,
      onRemove: () => onChange(chosen.filter(x => x !== v)),
      removeLabel: 'Remove ' + t
    }, t);
  }) : null, /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: input,
    id: id,
    className: "plx-combobox__input",
    role: "combobox",
    "aria-expanded": open,
    "aria-controls": listId,
    "aria-autocomplete": "list",
    "aria-activedescendant": open && items[active] ? optId(active) : undefined,
    "aria-label": label,
    disabled: disabled,
    autoComplete: "off",
    value: open || multiple ? text : current ? current.label : '',
    placeholder: multiple && chosen.length ? '' : current && !open ? current.label : placeholder,
    onChange: e => {
      setText(e.target.value);
      setOpen(true);
    },
    onFocus: () => setOpen(true),
    onKeyDown: onKey
  }, rest)), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-combobox__chevron",
    "aria-hidden": "true"
  })), open ? /*#__PURE__*/_react.default.createElement("ul", {
    className: "plx-combobox__list",
    id: listId,
    role: "listbox",
    "aria-multiselectable": multiple || undefined
  }, items.length ? items.map((it, i) => it.kind === 'create' ? /*#__PURE__*/_react.default.createElement("li", {
    key: "create",
    id: optId(i),
    role: "option",
    "aria-selected": false,
    className: (0, _cx.cx)('plx-combobox__option', 'plx-combobox__create', i === active && 'is-active'),
    onMouseDown: e => e.preventDefault(),
    onClick: () => choose(it),
    onMouseEnter: () => setActive(i)
  }, "Create \u201C", text.trim(), "\u201D") : [it.o.group && (i === 0 || !items[i - 1].o || items[i - 1].o.group !== it.o.group) ? /*#__PURE__*/_react.default.createElement("li", {
    key: 'g-' + it.o.group,
    className: "plx-combobox__group",
    role: "presentation"
  }, it.o.group) : null, /*#__PURE__*/_react.default.createElement("li", {
    key: it.o.value,
    id: optId(i),
    role: "option",
    "aria-selected": chosen.indexOf(it.o.value) >= 0,
    className: (0, _cx.cx)('plx-combobox__option', i === active && 'is-active', chosen.indexOf(it.o.value) >= 0 && 'is-selected'),
    onMouseDown: e => e.preventDefault(),
    onClick: () => choose(it),
    onMouseEnter: () => setActive(i)
  }, it.o.label)]) : /*#__PURE__*/_react.default.createElement("li", {
    className: "plx-combobox__empty",
    role: "presentation"
  }, emptyText)) : null);
});
  } },
  "platform/components/SearchField/SearchField.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Kbd/Kbd.jsx":"platform/components/Kbd/Kbd.jsx","../Loading/Loading.jsx":"platform/components/Loading/Loading.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchField = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _Kbd = require("../Kbd/Kbd.jsx");
var _Loading = require("../Loading/Loading.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · SearchField
   Summary: A search input with a search icon, an optional clear button and an optional shortcut hint.
   Usage:
     <SearchField value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery('')} shortcut="Ctrl K" />
   Props:
     value: the search text
     onChange(event): runs when the text changes
     onClear(): runs from the clear button; without it there is no clear button
     placeholder: the placeholder text; default "Search"
     label: the accessible name; default "Search"
     shortcut: a keyboard shortcut hint ("Ctrl K")
     loading: shows a spinner in place of the search icon; default false
     onAccent: the look for the blue header; default false
     className: more classes on the field
     ...rest: other attributes go on the input
   Behavior:
     The clear button shows only while there is text.
     The shortcut hint shows only while the field is empty.
   Notes:
     It has the toolbar control height.
*/
const SearchField = exports.SearchField = /*#__PURE__*/_react.default.forwardRef(function SearchField({
  value,
  onChange,
  onClear,
  placeholder = 'Search',
  label = 'Search',
  shortcut,
  loading = false,
  onAccent = false,
  className,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-search', onAccent && 'plx-search--on-accent', className),
    role: "search"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-search__icon",
    "aria-hidden": "true"
  }, loading ? /*#__PURE__*/_react.default.createElement(_Loading.Spinner, {
    size: "sm",
    label: "Searching"
  }) : /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "search"
  })), /*#__PURE__*/_react.default.createElement("input", _extends({
    ref: ref,
    type: "search",
    className: "plx-search__input",
    "aria-label": label,
    placeholder: placeholder,
    value: value,
    onChange: onChange
  }, rest)), onClear && value ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-search__clear",
    "aria-label": "Clear search",
    onClick: onClear
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "close"
  })) : null, shortcut && !value ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-search__kbd"
  }, /*#__PURE__*/_react.default.createElement(_Kbd.Kbd, {
    onAccent: onAccent
  }, shortcut)) : null);
});
  } },
  "platform/components/Slider/Slider.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slider = Slider;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Slider
   Summary: A value picked from a range by dragging.
   Usage:
     <Slider label="Brightness" value={v} min={0} max={100} step={1} unit="%" onChange={(v) => …} onCommit={(v) => …} />
   Props:
     label: the label above the track
     value: the current value, a number
     min: the lowest value; default 0
     max: the highest value; default 100
     step: the step between values; default 1
     unit: text after the value ("%"); default ""
     onChange(value): follows every move (live preview)
     onCommit(value): runs when the person lets go or finishes with the keys (record the change, e.g. in an undo history)
     disabled: default false
     className: more classes on the slider
     ...rest: other attributes go on the range input
   Behavior:
     It is a native range input, so keys work: arrows, Page Up/Down, Home, End.
     The label and the current value sit above the track.
*/
function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange,
  onCommit,
  disabled = false,
  className,
  ...rest
}) {
  const id = (0, _layer.useUid)('plx-slider');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-slider', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-slider__head"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: id,
    className: "plx-slider__label"
  }, label), /*#__PURE__*/_react.default.createElement("output", {
    htmlFor: id,
    className: "plx-slider__value"
  }, value + unit)), /*#__PURE__*/_react.default.createElement("input", _extends({
    id: id,
    type: "range",
    className: "plx-slider__input",
    min: min,
    max: max,
    step: step,
    value: value,
    disabled: disabled,
    "aria-valuetext": value + unit,
    onChange: e => onChange && onChange(Number(e.target.value)),
    onPointerUp: e => onCommit && onCommit(Number(e.currentTarget.value)),
    onKeyUp: e => {
      if (onCommit && /Arrow|Page|Home|End/.test(e.key)) onCommit(Number(e.currentTarget.value));
    }
  }, rest)));
}
  } },
  "platform/utils/roving.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roveTo = roveTo;
exports.useRovingFocus = useRovingFocus;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Roving focus (platform/utils/roving.js)
   Summary: One Tab stop for a group of controls (a toolbar, a rail): only the current control is in the Tab order
     (tabindex 0), the others are reached with the arrow keys (tabindex -1). The current control is the one last focused,
     else the first. This is the WAI-ARIA toolbar pattern: Tab enters and leaves the group in one step.
   Usage:
     const ref = React.useRef(null);
     useRovingFocus(ref, () => items());          // after every render
     <div ref={ref} onFocus={(e) => roveTo(ref, items(), e.target)}>
   Props:
     useRovingFocus(ref, getItems): keeps exactly one item at tabindex 0 after every render
     roveTo(ref, items, el): makes el the current item (call when focus enters an item)
*/

function apply(items, current) {
  items.forEach(el => {
    const on = el === current;
    if (el.tabIndex !== (on ? 0 : -1)) el.tabIndex = on ? 0 : -1;
    el.setAttribute('data-plx-roving', on ? 'current' : '');
  });
}
function roveTo(ref, items, el) {
  if (!ref.current || items.indexOf(el) < 0) return;
  apply(items, el);
}
function useRovingFocus(ref, getItems) {
  _react.default.useEffect(() => {
    if (!ref.current) return;
    const items = getItems();
    if (!items.length) return;
    const current = items.filter(el => el.getAttribute('data-plx-roving') === 'current')[0] || items[0];
    apply(items, current);
  });
}
  } },
  "platform/components/Toolbar/Toolbar.jsx": { deps: {"react":null,"../../utils/roving.js":"platform/utils/roving.js","../../utils/direction.js":"platform/utils/direction.js","../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolbar = Toolbar;
var _react = _interopRequireDefault(require("react"));
var _roving = require("../../utils/roving.js");
var _direction = require("../../utils/direction.js");
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Toolbar, Toolbar.Group, Toolbar.Spacer
   Summary: One row of controls (role="toolbar").
   Usage:
     <Toolbar label="Asset actions">
       <Toolbar.Group>…</Toolbar.Group>
       <Toolbar.Spacer/>
       <Toolbar.Group>…</Toolbar.Group>
     </Toolbar>
   Props:
     Toolbar.label: its accessible name
     Toolbar.onKeyDown(event): runs first; preventDefault stops the toolbar's own key handling
     Toolbar.className: more classes on the toolbar
     Toolbar.children: the controls, groups and spacers
     Toolbar.Group.className: more classes on the group
     Toolbar.Group.children: the controls in the group
     Toolbar.Spacer: pushes what follows to the end of the row; no props
   Behavior:
     One Tab stop: Tab enters and leaves the toolbar; the current control (the one last used) is in the Tab order.
     Arrow keys move between its controls in reading order (wrapping; reversed in right to left); Home and End jump to the
     first and last.
     Tab leaves the toolbar.
     In a text field, Left and Right move the caret instead.
     In a radio group, only the checked option is a stop.
   Notes:
     Every control in it takes the toolbar control height.
     Other props reach the toolbar or group element.
*/
const FOCUSABLE = 'button:not([disabled]),input:not([disabled]),select:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])';
function Toolbar({
  label,
  className,
  children,
  onKeyDown,
  onFocus,
  ...rest
}) {
  const ref = _react.default.useRef(null);
  const itemsOf = () => ref.current ? Array.prototype.filter.call(ref.current.querySelectorAll(FOCUSABLE), el => el.offsetParent !== null && !el.closest('[role="radiogroup"] [aria-checked="false"]')) : [];
  // one Tab stop: the current control is in the Tab order, the others are reached with the arrows (batch 213)
  (0, _roving.useRovingFocus)(ref, itemsOf);
  const onKey = e => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented || ['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
    if (e.target.tagName === 'INPUT' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return; // the caret moves inside a field
    const items = itemsOf();
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    const step = (0, _direction.arrowStep)(e, ref.current, {
      vertical: false
    }); // in reading order: right to left reverses Left and Right
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + step + items.length) % items.length;
    e.preventDefault();
    items[n].focus();
  };
  const onFocusIn = e => {
    if (onFocus) onFocus(e);
    (0, _roving.roveTo)(ref, itemsOf(), e.target);
  };
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: ref,
    role: "toolbar",
    "aria-label": label,
    className: (0, _cx.cx)('plx-toolbar', className),
    onKeyDown: onKey,
    onFocus: onFocusIn
  }, rest), children);
}
Toolbar.Group = function ToolbarGroup({
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-toolbar__group', className)
  }, rest), children);
};
Toolbar.Spacer = function ToolbarSpacer() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-toolbar__spacer",
    "aria-hidden": "true"
  });
};
  } },
  "platform/components/Menu/Menu.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = Menu;
exports.MenuDivider = MenuDivider;
exports.MenuGroup = MenuGroup;
exports.MenuItem = MenuItem;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Menu, MenuItem, MenuGroup, MenuDivider
   Summary: A list of actions opened from a button (the menu button pattern).
   Usage:
     <Menu trigger={<Button caret>Actions</Button>} placement="bottom-start">
       <MenuItem icon="pencil" onSelect={rename}>Rename</MenuItem>
       <MenuDivider/>
       <MenuItem icon="trash" danger onSelect={remove}>Delete</MenuItem>
     </Menu>
   Props:
     Menu.trigger: the button that opens the menu (one element)
     Menu.label: the accessible name of the menu
     Menu.placement: "bottom-start" (default) | "bottom-end" | "top-start" | "top-end"
     Menu.className: more classes on the anchor around the trigger and menu
     Menu.children: the items: MenuItem, MenuGroup, MenuDivider
     MenuItem.icon: an icon name or element before the label
     MenuItem.danger: shows the item in the danger color (a destructive action); default false
     MenuItem.disabled: skips the item; it cannot be chosen; default false
     MenuItem.checked: makes it a checkbox item, checked or not; leave it out for a plain item
     MenuItem.keepOpen: leaves the menu open after choosing (for choosing several); default false
     MenuItem.href: renders the item as a link
     MenuItem.onSelect(event): runs when the item is chosen
     MenuItem.className: more classes on the item
     MenuItem.children: the item's label
     MenuGroup.label: the label of a set of items
     MenuGroup.children: the items in the set
     MenuDivider: a line between items; no props
   Behavior:
     Enter, Space or Arrow Down on the trigger opens the menu on the first item; Arrow Up opens it on the last.
     Arrow keys, Home and End move between items.
     Escape closes the menu and returns focus to the trigger.
     Tab closes the menu and moves on.
     A click outside closes the menu.
     Choosing an item closes the menu and returns focus to the trigger, unless keepOpen.
     The menu opens on top of everything (batch 272): in the browser's top layer (popover), placed beside its trigger by CSS
       anchor positioning, so no card, pane or scroll area can cover or clip it. The trigger's wrapper scopes the anchor, so
       each menu finds its own trigger; near an edge the menu flips to the other side. A browser without anchor
       positioning draws it inside the wrapper as before.
   Notes:
     Menus are border-only (no shadow, D9); dialogs keep their shadow.
*/
const MenuContext = /*#__PURE__*/_react.default.createContext(null);
const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
const itemsIn = list => list ? Array.prototype.slice.call(list.querySelectorAll('[data-plx-menu-item]:not([aria-disabled="true"])')) : [];

// the top layer and CSS anchor positioning (Chrome 125, Firefox 147, Safari 26), checked once
const TOP_LAYER = typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.supports && CSS.supports('anchor-name', '--plx-a') && typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');
function Menu({
  trigger,
  label,
  placement = 'bottom-start',
  className,
  children
}) {
  const id = (0, _layer.useUid)('plx-menu');
  const [open, setOpen] = _react.default.useState(false);
  const [start, setStart] = _react.default.useState('first');
  const wrap = _react.default.useRef(null),
    list = _react.default.useRef(null),
    button = _react.default.useRef(null);
  const close = _react.default.useCallback(refocus => {
    setOpen(false);
    if (refocus && button.current) button.current.focus();
  }, []);
  (0, _layer.useLayer)(list, open, {
    onEscape: () => close(true)
  });
  // into the top layer as soon as it is in the page (before the first item takes focus)
  _react.default.useLayoutEffect(() => {
    const el = list.current;
    if (open && TOP_LAYER && el && el.showPopover && !el.matches(':popover-open')) el.showPopover();
  }, [open]);
  _react.default.useEffect(() => {
    if (!open) return undefined;
    const items = itemsIn(list.current);
    if (items.length) (start === 'last' ? items[items.length - 1] : items[0]).focus();
    const outside = e => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [open]);
  const openAt = where => {
    setStart(where);
    setOpen(true);
  };
  const child = _react.default.Children.only(trigger);
  const triggerEl = /*#__PURE__*/_react.default.cloneElement(child, {
    ref: button,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? id : undefined,
    expanded: undefined,
    onClick: e => {
      if (child.props.onClick) child.props.onClick(e);
      if (open) close(false);else openAt('first');
    },
    onKeyDown: e => {
      if (child.props.onKeyDown) child.props.onKeyDown(e);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openAt('first');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        openAt('last');
      }
    }
  });
  const onKeyDown = e => {
    const items = itemsIn(list.current);
    const at = items.indexOf(document.activeElement);
    let next = null;
    if (e.key === 'ArrowDown') next = (at + 1) % items.length;else if (e.key === 'ArrowUp') next = (at - 1 + items.length) % items.length;else if (e.key === 'Home') next = 0;else if (e.key === 'End') next = items.length - 1;else if (e.key === 'Tab') {
      setOpen(false);
      return;
    } else return;
    e.preventDefault();
    if (items[next]) items[next].focus();
  };
  return /*#__PURE__*/_react.default.createElement("span", {
    ref: wrap,
    className: (0, _cx.cx)('plx-menu-anchor', className)
  }, triggerEl, open ? /*#__PURE__*/_react.default.createElement(MenuContext.Provider, {
    value: close
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: list,
    id: id,
    role: "menu",
    "aria-label": label,
    popover: TOP_LAYER ? 'manual' : undefined,
    className: (0, _cx.cx)('plx-menu', 'plx-menu--' + placement),
    onKeyDown: onKeyDown
  }, children)) : null);
}
function MenuItem({
  icon,
  danger = false,
  disabled = false,
  checked,
  keepOpen = false,
  href,
  onSelect,
  className,
  children,
  ...rest
}) {
  const close = _react.default.useContext(MenuContext);
  const role = checked === undefined ? 'menuitem' : 'menuitemcheckbox';
  const props = {
    role,
    tabIndex: -1,
    'data-plx-menu-item': '',
    'aria-checked': checked === undefined ? undefined : !!checked,
    'aria-disabled': disabled || undefined,
    className: (0, _cx.cx)('plx-menu__item', danger && 'plx-menu__item--danger', className),
    onClick: e => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onSelect) onSelect(e);
      if (close && !keepOpen) close(true);
    },
    ...rest
  };
  const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, checked !== undefined ? /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-menu__check', checked && 'is-checked'),
    "aria-hidden": "true"
  }) : null, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-menu__icon"
  }, asIcon(icon)) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-menu__label"
  }, children));
  return href && !disabled ? /*#__PURE__*/_react.default.createElement("a", _extends({
    href: href
  }, props), content) : /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button"
  }, props), content);
}
function MenuDivider() {
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "separator",
    className: "plx-menu__divider"
  });
}
function MenuGroup({
  label,
  children
}) {
  const id = (0, _layer.useUid)('plx-mg');
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    "aria-labelledby": id,
    className: "plx-menu__group"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: "plx-menu__group-label"
  }, label), children);
}
  } },
  "platform/components/Dialog/Dialog.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmDialog = ConfirmDialog;
exports.Dialog = Dialog;
exports.Drawer = Drawer;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
var _Button = require("../Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Dialog, ConfirmDialog, Drawer
   Summary: Modal layers. Dialog is a centered window; ConfirmDialog is an alert dialog that asks to confirm an action;
     Drawer is the same shell, docked to a side.
   Usage:
     <Dialog open={open} onClose={close} title="Rename" description="…" size="sm" footer={<>…</>}>…</Dialog>
     <ConfirmDialog open={open} title="Delete 3 assets?" message="…" confirmLabel="Delete" destructive
       onConfirm={() => …} onCancel={() => …} />
     <Drawer open={open} onClose={close} title="Details" side="end" size="md" footer={<>…</>}>…</Drawer>
   Props:
     Dialog.open: whether the layer is shown
     Dialog.onClose(): runs from the close button, Escape and a click on the veil
     Dialog.title: the title at the start of the header; it names the dialog
     Dialog.description: a paragraph at the top of the body; it describes the dialog
     Dialog.icon: an <Icon> (or an icon name) before the title
     Dialog.size: "sm" | "md" (default) | "lg" | "xl" | "full"
     Dialog.footer: the footer actions (their height is the dialog role)
     Dialog.initialFocus: a ref to the element that takes focus when the layer opens
     Dialog.closeLabel: the accessible name of the close button (default "Close")
     Dialog.dismissible: false turns off Escape and the veil click, and hides the close button (default true)
     Dialog.flush: true removes the body padding (default false)
     Dialog.className: more classes on the dialog
     Dialog.children: the body
     Drawer.side: "end" (default) | "start"
     Drawer.size: "sm" | "md" (default) | "lg"
     ConfirmDialog.open: whether the dialog is shown
     ConfirmDialog.title: the question
     ConfirmDialog.message: the explanation under the title
     ConfirmDialog.confirmLabel: the confirm button text (default "Confirm")
     ConfirmDialog.cancelLabel: the cancel button text (default "Cancel")
     ConfirmDialog.destructive: the action destroys something (default false)
     ConfirmDialog.onConfirm(): runs from the confirm button
     ConfirmDialog.onCancel(): runs from the cancel button, the close button, Escape and the veil
     ConfirmDialog.children: more content in the body
   Behavior:
     Focus moves in (initialFocus, else the first control in the body, else the first footer action) and returns to the opener.
     Tab stays inside the layer.
     Escape and a click on the veil close it, unless dismissible is false.
     The page does not scroll while the layer is open.
     A destructive ConfirmDialog starts on Cancel, uses a danger confirm button and the destructive dialog role.
   Notes:
     Drawer takes every Dialog prop (open, onClose, title, description, icon, footer, initialFocus, closeLabel, dismissible,
       flush, className, children), with its own side and size.
     Modal layers follow D3, option C.
     Header and footer are filled bands (--plx-sys-surface-dialog-chrome) with hairline dividers, always shown; the body is white.
     The title is at the start of the header, the close button at its end, the actions in the footer.
     The layer renders in a portal on document.body.
*/
const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
function ModalShell({
  kind,
  open,
  onClose,
  title,
  description,
  icon,
  size,
  side,
  role = 'dialog',
  footer,
  initialFocus,
  closeLabel = 'Close',
  dismissible = true,
  flush = false,
  className,
  children
}) {
  const ref = _react.default.useRef(null);
  const id = (0, _layer.useUid)('plx-dlg');
  const firstFocus = () => {
    if (initialFocus && initialFocus.current) return initialFocus.current;
    const root = ref.current;
    return (0, _layer.focusables)(root.querySelector('.plx-dialog__body'))[0] || (0, _layer.focusables)(root.querySelector('.plx-dialog__footer'))[0] || null;
  };
  (0, _layer.useLayer)(ref, open, {
    modal: true,
    onEscape: dismissible ? onClose : null,
    initialFocus: firstFocus
  });
  if (!open) return null;
  const onVeil = e => {
    if (dismissible && e.target === e.currentTarget && onClose) onClose();
  };
  return /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-modal-layer', 'plx-modal-layer--' + kind, side && 'plx-modal-layer--' + side),
    onMouseDown: onVeil
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    role: role,
    "aria-modal": "true",
    "aria-labelledby": id + 't',
    "aria-describedby": description ? id + 'd' : undefined,
    tabIndex: -1,
    className: (0, _cx.cx)('plx-dialog', kind === 'drawer' && 'plx-drawer', 'plx-' + kind + '--' + size, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-dialog__header"
  }, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-dialog__icon"
  }, asIcon(icon)) : null, /*#__PURE__*/_react.default.createElement("h2", {
    id: id + 't',
    className: "plx-dialog__title"
  }, title), dismissible ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "close",
    label: closeLabel,
    className: "plx-dialog__close",
    onClick: onClose
  }) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-dialog__body', flush && 'plx-dialog__body--flush')
  }, description ? /*#__PURE__*/_react.default.createElement("p", {
    id: id + 'd',
    className: "plx-dialog__description"
  }, description) : null, children), footer ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-dialog__footer"
  }, footer) : null)), document.body);
}
function Dialog({
  size = 'md',
  ...props
}) {
  return /*#__PURE__*/_react.default.createElement(ModalShell, _extends({
    kind: "dialog",
    size: size
  }, props));
}
function Drawer({
  size = 'md',
  side = 'end',
  ...props
}) {
  return /*#__PURE__*/_react.default.createElement(ModalShell, _extends({
    kind: "drawer",
    size: size,
    side: side
  }, props));
}
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  onCancel,
  children
}) {
  const cancel = _react.default.useRef(null);
  return /*#__PURE__*/_react.default.createElement(ModalShell, {
    kind: "dialog",
    size: "sm",
    role: "alertdialog",
    open: open,
    onClose: onCancel,
    title: title,
    description: message,
    initialFocus: destructive ? cancel : undefined,
    className: destructive ? 'plx-dialog--destructive' : undefined,
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Button.Button, {
      ref: cancel,
      onClick: onCancel
    }, cancelLabel), /*#__PURE__*/_react.default.createElement(_Button.Button, {
      variant: destructive ? 'danger' : 'primary',
      onClick: onConfirm
    }, confirmLabel))
  }, children);
}
  } },
  "platform/components/Toast/Toast.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastProvider = ToastProvider;
exports.useToast = useToast;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ToastProvider, useToast
   Summary: A short message about something that just happened, at the end of the screen.
   Usage:
     <ToastProvider>…the application…</ToastProvider>
     const toast = useToast();
     toast.show('Saved', { tone: 'success' });
   Props:
     ToastProvider.duration: the default milliseconds before a toast leaves by itself; default 4000
     ToastProvider.children: the application
     toast.show(message, options): shows a toast and returns its id
     options.tone: "info" (default) | "success" | "warning" | "danger"
     options.duration: milliseconds before it leaves by itself; 0 keeps it until dismissed
     toast.dismiss(id): removes the toast with that id
   Behavior:
     A danger toast stays until dismissed (unless a duration is given) and is announced at once (role="alert").
     The other toasts are announced politely.
     Every toast has a Dismiss button.
   Notes:
     Wrap the application once in ToastProvider; useToast needs it.
     Not for anything the person must act on: use a dialog or an inline message.
*/

const ToastContext = /*#__PURE__*/_react.default.createContext(null);
const TONE_ICON = {
  info: 'circle-info',
  success: 'circle-check',
  warning: 'warning',
  danger: 'alert'
};
let nextId = 1;
function ToastProvider({
  duration = 4000,
  children
}) {
  const [toasts, setToasts] = _react.default.useState([]);
  const remove = _react.default.useCallback(id => setToasts(all => all.filter(t => t.id !== id)), []);
  const dismiss = _react.default.useCallback(id => {
    setToasts(all => all.map(t => t.id === id ? {
      ...t,
      leaving: true
    } : t));
    setTimeout(() => remove(id), 1000);
  }, [remove]);
  const show = _react.default.useCallback((message, {
    tone = 'info',
    duration: ms
  } = {}) => {
    const id = nextId++;
    const wait = ms !== undefined ? ms : tone === 'danger' ? 0 : duration;
    setToasts(all => all.concat({
      id,
      message,
      tone,
      leaving: false
    }));
    if (wait > 0) setTimeout(() => dismiss(id), wait);
    return id;
  }, [dismiss, duration]);
  const api = _react.default.useMemo(() => ({
    show,
    dismiss
  }), [show, dismiss]);
  return /*#__PURE__*/_react.default.createElement(ToastContext.Provider, {
    value: api
  }, children, /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("div", {
    className: "plx-toast-region",
    "aria-live": "polite"
  }, toasts.map(t => /*#__PURE__*/_react.default.createElement("div", {
    key: t.id,
    role: t.tone === 'danger' ? 'alert' : undefined,
    className: (0, _cx.cx)('plx-toast', 'plx-toast--' + t.tone, t.leaving && 'is-leaving'),
    onAnimationEnd: t.leaving ? () => remove(t.id) : undefined
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-toast__icon"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: TONE_ICON[t.tone] || TONE_ICON.info
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-toast__message"
  }, t.message), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-toast__close",
    "aria-label": "Dismiss",
    onClick: () => dismiss(t.id)
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "close"
  }))))), document.body));
}
function useToast() {
  const api = _react.default.useContext(ToastContext);
  if (!api) throw new Error('useToast needs a <ToastProvider> around the application');
  return api;
}
  } },
  "platform/components/Tabs/Tabs.jsx": { deps: {"react":null,"../../utils/direction.js":"platform/utils/direction.js","../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Count/Count.jsx":"platform/components/Count/Count.jsx","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = Tabs;
exports.tabsPanelId = void 0;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../../utils/direction.js");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Count = require("../Count/Count.jsx");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
     The open contained or folder tab draws its own joint with the panel, so no line shows under it at any display scale.
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

const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
const tabsPanelId = (base, value) => base + '-panel-' + String(value).replace(/[^a-zA-Z0-9_-]/g, '');
exports.tabsPanelId = tabsPanelId;
function Tabs({
  variant = 'contained',
  items,
  value,
  defaultValue,
  onChange,
  label,
  idBase,
  className,
  panelClassName
}) {
  const uid = (0, _layer.useUid)('plx-tabs');
  const base = idBase || uid;
  const [own, setOwn] = _react.default.useState(defaultValue !== undefined ? defaultValue : items[0] ? items[0].value : undefined);
  const current = value !== undefined ? value : own;
  const refs = _react.default.useRef({});
  const select = v => {
    if (value === undefined) setOwn(v);
    if (onChange) onChange(v);
  };
  const enabled = items.filter(t => !t.disabled);
  const onKeyDown = e => {
    const at = enabled.findIndex(t => t.value === current);
    let next = null;
    const step = (0, _direction.arrowStep)(e, e.currentTarget); // in reading order: right to left reverses Left and Right (batch 213)
    if (step > 0) next = (at + 1) % enabled.length;else if (step < 0) next = (at - 1 + enabled.length) % enabled.length;else if (e.key === 'Home') next = 0;else if (e.key === 'End') next = enabled.length - 1;else return;
    e.preventDefault();
    const t = enabled[next];
    select(t.value);
    if (refs.current[t.value]) refs.current[t.value].focus();
  };
  const hasPanels = items.some(t => t.content !== undefined);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-tabs', 'plx-tabs--' + variant, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    role: "tablist",
    "aria-label": label,
    className: "plx-tabs__list",
    onKeyDown: onKeyDown
  }, items.map(t => {
    const on = t.value === current;
    return /*#__PURE__*/_react.default.createElement("button", {
      key: t.value,
      ref: el => {
        refs.current[t.value] = el;
      },
      type: "button",
      role: "tab",
      id: base + '-tab-' + String(t.value).replace(/[^a-zA-Z0-9_-]/g, ''),
      "aria-selected": on,
      "aria-controls": tabsPanelId(base, t.value),
      tabIndex: on ? 0 : -1,
      disabled: t.disabled || undefined,
      className: (0, _cx.cx)('plx-tabs__tab', on && 'is-selected'),
      onClick: () => select(t.value)
    }, t.icon ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tabs__icon"
    }, asIcon(t.icon)) : null, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tabs__label"
    }, t.label), t.count !== undefined ? /*#__PURE__*/_react.default.createElement(_Count.Count, {
      value: t.count,
      tone: "neutral"
    }) : null);
  })), hasPanels ? items.map(t => /*#__PURE__*/_react.default.createElement("div", {
    key: t.value,
    role: "tabpanel",
    id: tabsPanelId(base, t.value),
    "aria-labelledby": base + '-tab-' + String(t.value).replace(/[^a-zA-Z0-9_-]/g, ''),
    tabIndex: 0,
    hidden: t.value !== current,
    className: (0, _cx.cx)('plx-tabs__panel', panelClassName)
  }, t.value === current ? t.content : null)) : null);
}
  } },
  "platform/components/Card/Card.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = Card;
exports.MediaCard = MediaCard;
exports.Panel = Panel;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Panel, Card, MediaCard
   Summary: Surfaces. Panel is a titled section of a page or a settings screen; Card is one record in a list or grid;
     MediaCard is an asset tile.
   Usage:
     <Panel title="Storage" description="…" actions={<Button…/>} footer={…} flush headingLevel={2}>…</Panel>
     <Card title="Brand kit" meta="12 assets" actions={<…/>} selected onOpen={() => …}>…</Card>
     <MediaCard src="/a.jpg" alt="" title="hero.jpg" meta="2.4 MB · JPG" badge={<…/>} aspect="4/3"
       selected={sel} onSelectChange={(checked) => …} selectLabel="Select hero.jpg" href="#/asset/1" />
   Props:
     Card.accent: a color from the data (a project's color): a 3px start edge in it (it reaches the stylesheet as --plx-comp-card-accent)
     Panel.title: the heading; it also names the section landmark
     Panel.description: a line of text under the title
     Panel.actions: controls at the end of the header
     Panel.footer: content in a footer below the body
     Panel.flush: true removes the body padding (default false)
     Panel.headingLevel: the heading level of the title (default 2)
     Panel.collapsible: true adds a Collapse/Expand button at the end of the header (default false)
     Panel.defaultExpanded: whether a collapsible panel starts open (default true)
     Panel.expanded: the open state when the parent controls it; onToggle(next) then runs on each press
     Panel.onToggle(next): runs when a collapsible panel opens or closes
     Panel.children: the body
     Panel.className: more classes on the <section>
     Panel.strings: the words it announces, for other languages: { collapse: "Collapse {title}", expand: "Expand {title}",
       section: "section" } ({title} is the title, or the section word when the title is not text)
     Card.title: the card title; with onOpen or href it is the card's link or button
     Card.meta: a line of details under the title
     Card.actions: controls at the end of the header
     Card.selected: shows the selected state; with onOpen or href the card's link or button also gets aria-current="true" (default false)
     Card.href: makes the title a link
     Card.onOpen(): makes the title a button that runs this
     Card.headingLevel: the heading level of the title (default 3)
     Card.children: the body
     Card.className: more classes on the <article>
     MediaCard.src: the image URL; without it the tile shows the icon
     MediaCard.alt: the image's alternative text (default "")
     MediaCard.icon: an <Icon> (or an icon name) shown when there is no image
     MediaCard.title: the asset name; with onOpen or href it is the tile's link or button
     MediaCard.meta: technical data (size, type, date)
     MediaCard.badge: a badge over the media
     MediaCard.aspect: the media shape: "4/3" (default) | "1/1" | "16/9"
     MediaCard.selected: whether the asset is selected (default false)
     MediaCard.selecting: true while anything in the view is selected (default false)
     MediaCard.onSelectChange(checked): runs when the selection box changes; without it there is no selection box
     MediaCard.selectLabel: the accessible name of the selection box (default strings.select: "Select " + the title)
     MediaCard.href: makes the title a link
     MediaCard.onOpen(): makes the title a button that runs this
     MediaCard.actions: controls beside the title
     MediaCard.className: more classes on the <article>
     MediaCard.strings: the words it announces, for other languages: { select: "Select {title}", item: "item" } (the selection
       box's default name; {title} is the title, or the item word when the title is not text)
   Behavior:
     Panel is a section landmark named by its title.
     With onOpen or href the title's target covers the whole card, so the card has one Tab stop; actions stay separately reachable.
     The MediaCard selection box appears on hover, focus and selection, and always while anything is selected (selecting).
     MediaCard images load lazily.
   Notes:
     MediaCard meta is technical data and uses the data font.
     Other props pass through to the outer element.
*/
const PANEL_STRINGS = {
  collapse: 'Collapse {title}',
  expand: 'Expand {title}',
  section: 'section'
};
const MEDIA_CARD_STRINGS = {
  select: 'Select {title}',
  item: 'item'
};
const H = ({
  level,
  ...props
}) => /*#__PURE__*/_react.default.createElement(level ? 'h' + level : 'div', props);
function Panel({
  title,
  description,
  actions,
  footer,
  flush = false,
  headingLevel = 2,
  collapsible = false,
  defaultExpanded = true,
  expanded,
  onToggle,
  strings,
  className,
  children,
  ...rest
}) {
  const t = Object.assign({}, PANEL_STRINGS, strings);
  const id = (0, _layer.useUid)('plx-panel');
  const [own, setOwn] = _react.default.useState(defaultExpanded);
  const open = !collapsible || (expanded === undefined ? own : expanded);
  const toggle = () => {
    if (expanded === undefined) setOwn(!open);
    if (onToggle) onToggle(!open);
  };
  return /*#__PURE__*/_react.default.createElement("section", _extends({
    "aria-labelledby": title ? id : undefined,
    className: (0, _cx.cx)('plx-panel', collapsible && !open && 'is-collapsed', className)
  }, rest), title || actions || collapsible ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-panel__header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-panel__heading"
  }, title ? /*#__PURE__*/_react.default.createElement(H, {
    level: headingLevel,
    id: id,
    className: "plx-panel__title"
  }, title) : null, description ? /*#__PURE__*/_react.default.createElement("p", {
    className: "plx-panel__description"
  }, description) : null), actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-panel__actions"
  }, actions) : null, collapsible ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-panel__toggle",
    "aria-expanded": open,
    "aria-controls": id + '-body',
    "aria-label": (open ? t.collapse : t.expand).split('{title}').join(typeof title === 'string' ? title : t.section),
    onClick: toggle
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-down"
  })) : null) : null, /*#__PURE__*/_react.default.createElement("div", {
    id: id + '-body',
    hidden: !open,
    className: (0, _cx.cx)('plx-panel__body', flush && 'plx-panel__body--flush')
  }, children), footer && open ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-panel__footer"
  }, footer) : null);
}
function Opener({
  href,
  onOpen,
  current,
  className,
  children
}) {
  if (href) return /*#__PURE__*/_react.default.createElement("a", {
    href: href,
    className: className,
    "aria-current": current ? 'true' : undefined
  }, children);
  if (onOpen) return /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: className,
    "aria-current": current ? 'true' : undefined,
    onClick: onOpen
  }, children);
  return /*#__PURE__*/_react.default.createElement("span", {
    className: className
  }, children);
}
function Card({
  title,
  meta,
  actions,
  selected = false,
  href,
  onOpen,
  headingLevel = 3,
  accent,
  className,
  children,
  ...rest
}) {
  const interactive = !!(href || onOpen);
  return /*#__PURE__*/_react.default.createElement("article", _extends({
    className: (0, _cx.cx)('plx-card', interactive && 'plx-card--interactive', selected && 'is-selected', accent && 'plx-card--accent', className),
    style: {
      '--plx-comp-card-accent': accent || undefined
    }
  }, rest), title ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-card__header"
  }, /*#__PURE__*/_react.default.createElement(H, {
    level: headingLevel,
    className: "plx-card__title"
  }, /*#__PURE__*/_react.default.createElement(Opener, {
    href: href,
    onOpen: onOpen,
    current: selected,
    className: "plx-card__opener"
  }, title)), actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-card__actions"
  }, actions) : null) : null, meta ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-card__meta"
  }, meta) : null, children !== undefined && children !== null ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-card__body"
  }, children) : null);
}
function MediaCard({
  src,
  alt = '',
  icon,
  title,
  meta,
  badge,
  aspect = '4/3',
  selected = false,
  selecting = false,
  onSelectChange,
  selectLabel,
  href,
  onOpen,
  actions,
  strings,
  className,
  ...rest
}) {
  const t = Object.assign({}, MEDIA_CARD_STRINGS, strings);
  return /*#__PURE__*/_react.default.createElement("article", _extends({
    className: (0, _cx.cx)('plx-media-card', (href || onOpen) && 'plx-card--interactive', selected && 'is-selected', selecting && 'is-selecting', className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-card__media",
    "data-plx-aspect": aspect
  }, src ? /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: alt,
    loading: "lazy",
    className: "plx-media-card__image"
  }) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-media-card__placeholder"
  }, icon ? typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon,
    size: "lg"
  }) : icon : null), badge ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-media-card__badge"
  }, badge) : null), onSelectChange ? /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    className: "plx-media-card__select",
    checked: selected,
    "aria-label": selectLabel || t.select.split('{title}').join(typeof title === 'string' ? title : t.item),
    onChange: e => onSelectChange(e.target.checked)
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-card__info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-card__text"
  }, /*#__PURE__*/_react.default.createElement(Opener, {
    href: href,
    onOpen: onOpen,
    className: "plx-card__opener plx-media-card__title"
  }, title), meta ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-media-card__meta"
  }, meta) : null), actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-card__actions"
  }, actions) : null));
}
  } },
  "platform/components/DataTable/tabulator.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTabulator = loadTabulator;
exports.prefetchTabulator = prefetchTabulator;
exports.tablePx = tablePx;
/* Plenix · DataTable engine (tabulator.js)
   Summary: Loads the engine every DataTable runs on: Tabulator 6.6.1 (MIT), vendored in platform/vendor/tabulator.
   Usage:
     loadTabulator().then((Tabulator) => new Tabulator(element, options));
     const width = tablePx('--plx-ref-size-36px');
   Props:
     loadTabulator(win): adds Tabulator's core stylesheet and script to the page once (the given window's, default this
       one: a grid in a frame uses its frame's Tabulator), and resolves with that window's Tabulator
     tablePx(token, element): a size token's value in pixels (Tabulator takes column widths as numbers); 0 when unknown
     prefetchTabulator(): fetches the two files into the browser's cache without running them (no-op when loaded)
   Behavior:
     Only the first grid on a page loads the files; later grids reuse the same promise. A page that already loaded
     Tabulator itself is used as is.
     Early load (batch 237): a page whose first screen has a table calls DataTable.preload() (or Table.preload()) as
     its script starts, so Tabulator arrives while React draws the page instead of after the grid mounts. Every other
     page prefetches the files once the browser is idle after load, so the first table anywhere opens from the cache.
     The core stylesheet goes first in the head, so platform.css (the Plenix look, data-table.css) wins over it.
     The vendor folder is found from the Platform script's address (platform/dist/platform.js -> platform/vendor/; a CDN
     build's plenix.js -> ./vendor/); in the npm package bundled into an app (no Plenix script on the page) it is the
     release's CDN copy, https://design-system.lighthouseway.org/cdn/<version>/vendor/ (batch 251);
     window.PlenixVendorBase (a folder URL ending in /) overrides it.
   Notes:
     A failed load rejects; the DataTable shows the reason in place of the grid. */

// the Platform script's own address, read while the bundle runs (document.currentScript is gone afterwards)
const SCRIPT = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : '';

// the same, found among the page's scripts when the bundle ran its modules later
function platformScript() {
  if (SCRIPT) return SCRIPT;
  const s = Array.from(document.scripts).map(x => x.src).find(src => /\/(dist\/platform|plenix)(\.min)?\.js(\?|$)/.test(src));
  return s || '';
}
function vendorBase() {
  if (typeof window !== 'undefined' && window.PlenixVendorBase) return String(window.PlenixVendorBase).replace(/\/?$/, '/');
  const src = platformScript();
  if (src) return new URL(/\/dist\/[^/?]+(\?.*)?$/.test(src) ? '../vendor/' : './vendor/', src).href;
  // the npm package: build-packages.js defines this release's CDN vendor folder (versioned, never changes)
  if (typeof __PLENIX_VENDOR__ !== 'undefined') return __PLENIX_VENDOR__; // eslint-disable-line no-undef
  return 'platform/vendor/';
}

// one load per window: a grid in a frame (the design system's labs) runs on its own window's Tabulator, which only
// accepts elements of its own document
const loading = new WeakMap();
function loadTabulator(win) {
  const w = win || (typeof window !== 'undefined' ? window : null);
  if (!w) return Promise.reject(new Error('Tabulator needs a browser'));
  if (w.Tabulator) return Promise.resolve(w.Tabulator);
  if (loading.has(w)) return loading.get(w);
  const doc = w.document,
    base = vendorBase() + 'tabulator/';
  const p = new Promise((resolve, reject) => {
    // the core stylesheet goes first in the head, so platform.css (Plenix's look) comes after it and wins
    if (!doc.querySelector('link[data-plx-vendor="tabulator"]')) {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + 'tabulator.min.css';
      link.setAttribute('data-plx-vendor', 'tabulator');
      doc.head.insertBefore(link, doc.head.firstChild);
    }
    const script = doc.createElement('script');
    script.src = base + 'tabulator.min.js';
    script.async = true;
    script.setAttribute('data-plx-vendor', 'tabulator');
    script.onload = () => w.Tabulator ? resolve(w.Tabulator) : reject(new Error('Tabulator did not load from ' + script.src));
    script.onerror = () => {
      loading.delete(w);
      reject(new Error('Tabulator could not be loaded from ' + script.src));
    };
    doc.head.appendChild(script);
  });
  loading.set(w, p);
  return p;
}

// the files into the HTTP cache at low priority, not run: the first grid then loads them from the cache
function prefetchTabulator() {
  if (typeof document === 'undefined' || window.Tabulator || loading.has(window)) return;
  if (document.querySelector('link[data-plx-vendor-prefetch="tabulator"]')) return;
  const base = vendorBase() + 'tabulator/';
  ['tabulator.min.js', 'tabulator.min.css'].forEach(f => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = base + f;
    link.setAttribute('data-plx-vendor-prefetch', 'tabulator');
    document.head.appendChild(link);
  });
}

// every page: prefetch once the page has loaded and the browser is idle (a table page has already started the real load)
if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof window.addEventListener === 'function') {
  const idle = () => window.requestIdleCallback ? window.requestIdleCallback(prefetchTabulator, {
    timeout: 3000
  }) : setTimeout(prefetchTabulator, 1000);
  if (document.readyState === 'complete') idle();else window.addEventListener('load', idle, {
    once: true
  });
}

// a token's value on the page, as pixels: '--plx-ref-size-36px' -> 36; the token written inside var() is accepted too
function tablePx(token, el) {
  if (!token || typeof document === 'undefined') return 0;
  const m = /--[\w-]+/.exec(String(token));
  if (!m) return parseFloat(token) || 0;
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(m[0]).trim();
  if (/rem$/.test(v)) return parseFloat(v) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  return parseFloat(v) || 0;
}
  } },
  "platform/components/DataTable/DataTable.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","./tabulator.js":"platform/components/DataTable/tabulator.js"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTable = DataTable;
exports.TableEngine = TableEngine;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _cx = require("../../utils/cx.js");
var _tabulator = require("./tabulator.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · DataTable (and the engine the static Table shares, components/Table)
   Summary: Every table in Plenix: a Tabulator table (6.6.1, MIT, vendored in platform/vendor/tabulator) in the Plenix
     table style (docs/data-table-reference.html, the owner's reference), drawn only with tokens (data-table.css).
   Usage:
     <DataTable label="Assets" data={assets} index="id" selectable
       columns={[
         { title: 'Attachments', field: 'attach', kind: 'icon', icon: 'attachment', sorter: 'number',
           render: (a) => (a.attach ? <Icon name="attachment" label={a.attach + ' attachments'} /> : null) },
         { title: 'Name', field: 'name', kind: 'name', filter: true, width: '--plx-ref-size-240px', editor: 'input' },
         { title: 'Status', field: 'status', kind: 'center', filter: 'list', render: (a) => <Badge tone="success">{a.status}</Badge> },
         { title: 'Size', field: 'size', kind: 'data', hozAlign: 'right', headerHozAlign: 'right', sorter: 'number' }]}
       rowMenu={[{ label: 'Open', icon: 'open', onSelect: (a) => open(a) }, { separator: true },
                 { label: 'Delete', icon: 'trash', danger: true, onSelect: (a) => remove(a) }]}
       options={{ dataTree: true, dataTreeElementColumn: 'name', movableColumns: true }}
       on={{ rowClick: (e, row) => open(row.getData()) }} />
   Props:
     label: names the grid for screen readers (required)
     data: the rows: plain objects, Tabulator's data format (children in _children with options.dataTree)
     columns: Tabulator column definitions (title, field, sorter, editor, hozAlign, frozen, headerSort…), in Tabulator's
       own terms, with these Plenix additions:
     columns[].kind: "name" (the row's name, medium weight) | "data" (technical values: the same DM Sans, size and color as the row, so every cell reads alike; batches 245–246) |
       "icon" (a mark column as wide as the checkbox column; its header shows columns[].icon) | "center" (content
       centered in the row's height: badges, buttons) | "actions" (row action buttons, shown while the row is hovered or
       selected) | "wrap" (long text: it wraps and the row grows; the first line sits where a one-line cell's text does)
     columns[].icon: the Plenix icon name a "kind: icon" column shows in its header (its title is the accessible name)
     columns[].render(data, cell): the cell's content as a React element (badges, buttons, links); state and context work
     columns[].filter: true (contains text) | "list" (one of the column's values): the filter button, shown on hover
     columns[].rowLabel: true: the row header: this column and the columns before it are pinned and shaded like the
       header row (and so is the checkbox column)
     columns[].width, minWidth, maxWidth: a size token ("--plx-ref-size-240px"); a number is read as Tabulator's pixels
     index: the field that identifies a row; default "id"
     selectable: a checkbox column (select all in its header) and row selection; default false. Without it,
       options.selectableRows (Tabulator) selects rows by click (1: one row, as the open row of a list)
     selected: the index values of the selected rows, for a selection kept by the page (bulk actions); with
     onSelectionChange(keys): runs when the person changes the selection (not when selected changes it)
     headerMenu: right-click on a header: sort, clear sort, clear filter, group by, fit, hide, show all; default true
     rowMenu: right-click on a row: [{ label, icon, onSelect(data, row), danger, disabled, separator }], or
       (data) => that list
     empty: shown when no row matches; default "Nothing to show"
     height: the grid's height (a size token, or a Tabulator height such as "100%"); with it, rows render as they scroll
     options: any other Tabulator table option (layout, initialSort, groupBy, dataTree, movableColumns, movableRows…)
     on: Tabulator events, { rowClick(e, row), cellEdited(cell), rowSelectionChanged(data, rows), dataSorted(sorters)… };
       with rowClick, rows are focusable and Enter does what a click does
     onReady(table): the Tabulator instance, once built (for anything Tabulator offers)
     className: more classes on the grid's frame
     DataTable.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Drag and drop (batch 271): a row handle (a column with rowHandle) shows the grab cursor; the row being moved shows
       grabbing.
     The header's sort arrow and filter button show while the header is hovered; a sorted column keeps its arrow and a
     filtered column its button, in the accent color. Right-click opens the header menu or the row menu.
     Hover, selected and selected + hover are three row colors; pinned and row-header cells follow the row.
     The row height and text size follow the density (--plx-sys-data-table-row-height, --plx-sys-data-table-font-size), also a
     density region's; a density change redraws the grid. A grid built while hidden is drawn again when it is shown.
     Cells edit on double-click (Tabulator editors). Group rows and tree rows are Tabulator's (groupBy, dataTree).
     The grid is an ARIA grid: rows, column headers (aria-sort on sorted ones), cells; its scrolling body is one Tab stop.
   Notes:
     Nothing on the grid is styled inline by Plenix: Tabulator writes only its own geometry (widths, heights, offsets).
     The data changes in place (sort, filters, scroll and column widths stay); new columns rebuild the column set.
*/
const SEP = '\u0000';
const LEAD = '--plx-comp-data-table-lead-column-width'; // the checkbox and icon columns
const MIN = '--plx-ref-size-80px'; // a resizable column's smallest width
const INDENT = '--plx-comp-data-table-tree-indent'; // a tree row's indent per level
const STRINGS = {
  empty: 'Nothing to show',
  sortUp: 'Sort A to Z',
  sortDown: 'Sort Z to A',
  clearSort: 'Clear sort',
  clearFilter: 'Clear filter',
  group: 'Group by this column',
  ungroup: 'Ungroup',
  fit: 'Fit to content',
  hide: 'Hide column',
  showAll: 'Show all columns',
  filter: 'Filter',
  any: 'Any',
  contains: 'Contains…',
  clear: 'Clear',
  apply: 'Apply',
  selectRow: 'Select row',
  item: 'item',
  items: 'items',
  failed: 'The grid could not load.'
};
const el = (tag, className, text) => {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text != null) e.textContent = text;
  return e;
};
const iconEl = name => {
  const s = el('span', 'plx-icon plx-icon--' + name);
  s.setAttribute('aria-hidden', 'true');
  return s;
};
// a menu item's label: its icon box, its text; danger in the danger color
function menuLabel(text, icon, danger) {
  const item = el('span', (0, _cx.cx)('plx-data-table__menu-item', danger && 'plx-data-table__menu-item--danger'));
  const box = el('span', 'plx-data-table__menu-icon');
  if (icon) box.appendChild(iconEl(icon));
  item.appendChild(box);
  item.appendChild(el('span', 'plx-data-table__menu-label', text));
  return item;
}
// a copy of the rows as the page gave them (Tabulator writes into the row objects it is given: a field for every column)
const snap = rows => (rows || []).map(r => {
  const o = {
    ...r
  };
  if (Array.isArray(r._children)) o._children = snap(r._children);
  return o;
});
// two row lists with the same rows: same length, each row's fields the same values (children compared the same way)
function sameRows(a, b) {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((r, i) => {
    const s = b[i],
      ka = Object.keys(r),
      kb = Object.keys(s);
    return ka.length === kb.length && ka.every(k => k === '_children' ? sameRows(r[k], s[k]) : r[k] === s[k]);
  });
}
const sizeOf = (v, host) => typeof v === 'string' && /^(var\()?--/.test(v) ? (0, _tabulator.tablePx)(v, host) : v;

// the engine both components run on: props.isStatic makes the static Table (no sorting, filters, menus, selection,
// resizing, moving, editing or row clicks), with its own classes (plx-table…) and stylesheet
// the row checkbox (batch 246): a plain click toggles the row; Shift or Ctrl/Cmd use Tabulator's range and add selection
function rowCheckbox(cell) {
  const row = cell.getRow(),
    table = cell.getTable(),
    box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = row.isSelected();
  box.addEventListener('click', e => {
    e.stopPropagation();
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      e.preventDefault();
      table.modules.selectRow.handleComplexRowClick(row._row, e);
    } else row.toggleSelect();
  });
  table.modules.selectRow.registerRowSelectCheckbox(row, box); // Tabulator keeps it checked as the row is selected
  return box;
}
function TableEngine(props) {
  const isStatic = !!props.isStatic,
    B = isStatic ? 'plx-table' : 'plx-data-table';
  const {
    label,
    data,
    columns,
    index = 'id',
    selectable = false,
    selected,
    headerMenu = true,
    rowMenu,
    empty,
    height,
    options,
    className
  } = props;
  const syncing = _react.default.useRef(false); // the selection is being set from the selected prop
  const frameRef = _react.default.useRef(null);
  const hostRef = _react.default.useRef(null);
  const tableRef = _react.default.useRef(null);
  const builtRef = _react.default.useRef(false);
  const latest = _react.default.useRef(props);
  latest.current = props;
  const cells = _react.default.useRef(new Map()); // React cell containers: row index + SEP + field
  const owners = _react.default.useRef(new Map()); // the same keys: the cell each container belongs to (tree rows included)
  const pending = _react.default.useRef(false);
  const [, bump] = _react.default.useReducer(x => x + 1, 0);
  const [error, setError] = _react.default.useState(null);

  // a container for a React cell, kept per cell so React keeps its state between renders
  const container = id => {
    let e = cells.current.get(id);
    if (!e) {
      e = el('span', B + '__portal');
      cells.current.set(id, e);
      pending.current = true;
      bump();
    }
    return e;
  };
  // once React has filled new cells, Tabulator measures again (column widths, row heights)
  _react.default.useLayoutEffect(() => {
    if (!pending.current || !tableRef.current || !builtRef.current) return undefined;
    const t = tableRef.current;
    const id = requestAnimationFrame(() => {
      if (tableRef.current === t) {
        t.redraw(true);
        pending.current = false;
      }
    });
    return () => cancelAnimationFrame(id);
  });

  // Plenix columns -> Tabulator column definitions
  const defsOf = (cols, host) => {
    const T = () => tableRef.current;
    const lead = (0, _tabulator.tablePx)(LEAD, host);
    const labelAt = cols.findIndex(c => c.rowLabel);
    const filters = field => T().getFilters().filter(f => f.field === field);
    const setFilter = (column, kind, value) => {
      const field = column.getField();
      filters(field).forEach(f => T().removeFilter(f.field, f.type, f.value));
      const on = value !== '' && value != null;
      if (on) T().addFilter(field, kind === 'list' ? '=' : 'like', value);
      column.getElement().classList.toggle('is-filtered', on);
    };
    const close = () => document.body.dispatchEvent(new MouseEvent('click', {
      bubbles: true
    }));
    const filterPopup = c => (e, column, onRendered) => {
      const field = column.getField(),
        active = filters(field)[0];
      const id = 'plx-data-table-filter-' + Math.random().toString(36).slice(2);
      const box = el('div', 'plx-data-table__filter');
      const lab = el('label', 'plx-data-table__filter-label', STRINGS.filter + ' ' + (c.title || field));
      lab.htmlFor = id;
      let input;
      if (c.filter === 'list') {
        input = el('select', 'plx-input plx-data-table__filter-input');
        const values = [];
        (function walk(rows) {
          rows.forEach(r => {
            if (r[field] != null && r[field] !== '') values.push(r[field]);
            if (r._children) walk(r._children);
          });
        })(latest.current.data || []);
        [''].concat(Array.from(new Set(values)).sort()).forEach(v => {
          const o = el('option', null, v === '' ? STRINGS.any : String(v));
          o.value = v;
          input.appendChild(o);
        });
      } else {
        input = el('input', 'plx-input plx-data-table__filter-input');
        input.type = 'text';
        input.placeholder = STRINGS.contains;
      }
      input.id = id;
      input.value = active ? active.value : '';
      const actions = el('div', 'plx-data-table__filter-actions');
      const button = (text, primary, fn) => {
        const b = el('button', (0, _cx.cx)('plx-button', primary ? 'plx-button--primary' : 'plx-button--secondary', 'plx-button--size-sm'), text);
        b.type = 'button';
        b.addEventListener('click', fn);
        return b;
      };
      actions.appendChild(button(STRINGS.clear, false, () => {
        setFilter(column, c.filter, '');
        close();
      }));
      actions.appendChild(button(STRINGS.apply, true, () => {
        setFilter(column, c.filter, input.value);
        close();
      }));
      input.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') {
          setFilter(column, c.filter, input.value);
          close();
        }
      });
      box.appendChild(lab);
      box.appendChild(input);
      box.appendChild(actions);
      onRendered(() => input.focus());
      return box;
    };
    const headerItems = c => () => {
      const items = [];
      if (c.headerSort !== false && c.kind !== 'actions') {
        items.push({
          label: menuLabel(STRINGS.sortUp, 'sort-ascending'),
          action: (e, col) => T().setSort(col.getField(), 'asc')
        });
        items.push({
          label: menuLabel(STRINGS.sortDown, 'sort-descending'),
          action: (e, col) => T().setSort(col.getField(), 'desc')
        });
        items.push({
          label: menuLabel(STRINGS.clearSort, 'close'),
          action: () => T().clearSort()
        });
        items.push({
          separator: true
        });
      }
      if (c.filter) items.push({
        label: menuLabel(STRINGS.clearFilter, 'filter-off'),
        action: (e, col) => setFilter(col, c.filter, '')
      });
      if (c.kind !== 'icon' && c.kind !== 'actions') {
        items.push({
          label: menuLabel(STRINGS.group, 'list-lines'),
          action: (e, col) => T().setGroupBy(col.getField())
        });
        if (T().options.groupBy) items.push({
          label: menuLabel(STRINGS.ungroup, 'list-bullets'),
          action: () => T().setGroupBy(false)
        });
      }
      if (items.length && !items[items.length - 1].separator) items.push({
        separator: true
      });
      if (c.kind !== 'icon' && c.resizable !== false) items.push({
        label: menuLabel(STRINGS.fit, 'expand'),
        action: (e, col) => col.setWidth(true)
      });
      items.push({
        label: menuLabel(STRINGS.hide, 'visibility-off'),
        action: (e, col) => col.hide()
      });
      items.push({
        label: menuLabel(STRINGS.showAll, 'visibility'),
        action: () => T().getColumns().forEach(col => col.show())
      });
      return items;
    };
    return cols.map((c, i) => {
      const {
        kind,
        icon,
        render,
        filter,
        rowLabel,
        ...rest
      } = c;
      const d = {
        ...rest
      };
      if (isStatic) {
        Object.assign(d, {
          headerSort: false,
          resizable: false
        });
        delete d.editor;
        delete d.headerContextMenu;
        delete d.headerPopup;
        delete d.cellClick;
        delete d.rowHandle;
      }
      ['width', 'minWidth', 'maxWidth'].forEach(k => {
        if (d[k] != null) d[k] = sizeOf(d[k], host);
      });
      d.cssClass = (0, _cx.cx)(c.cssClass, kind && B + '__cell--' + kind, (rowLabel || labelAt > i) && B + '__cell--row-label') || undefined;
      if (labelAt >= i) d.frozen = true;
      if (kind === 'icon') {
        Object.assign(d, {
          width: lead,
          minWidth: lead,
          maxWidth: lead,
          resizable: false,
          hozAlign: 'center',
          headerHozAlign: 'center'
        });
        d.titleFormatter = () => {
          const s = el('span', B + '__header-icon');
          s.title = c.title || c.field;
          s.setAttribute('role', 'img');
          s.setAttribute('aria-label', s.title);
          s.appendChild(iconEl(icon || 'circle-info'));
          return s;
        };
      }
      if (kind === 'actions') Object.assign(d, {
        headerSort: false,
        resizable: false,
        hozAlign: 'right'
      });
      if (kind === 'wrap') d.variableHeight = true;
      if (render) d.formatter = cell => {
        const id = String(cell.getRow().getIndex()) + SEP + c.field;
        owners.current.set(id, cell);
        return container(id);
      };
      if (filter && !isStatic) {
        d.headerPopup = filterPopup(c);
        d.headerPopupIcon = iconEl('filter').outerHTML;
      }
      if (headerMenu && !isStatic && d.headerContextMenu === undefined) d.headerContextMenu = headerItems(c);
      return d;
    });
  };

  // the column set's shape: a change rebuilds the columns (the data and the cell contents do not)
  const shape = JSON.stringify(columns.map(c => Object.keys(c).sort().map(k => typeof c[k] === 'function' ? k + '()' : k + '=' + JSON.stringify(c[k]))));
  _react.default.useEffect(() => {
    let alive = true,
      table = null;
    builtRef.current = false;
    // the grid's own window: a grid drawn into a frame runs on that frame's Tabulator; a document that has lost its window
    // (a frame that loaded again meanwhile) gets no grid
    const win = hostRef.current && hostRef.current.ownerDocument.defaultView;
    if (!win) return undefined;
    (0, _tabulator.loadTabulator)(win).then(Tabulator => {
      if (!alive || !hostRef.current || !hostRef.current.ownerDocument.defaultView) return;
      const host = hostRef.current,
        lead = (0, _tabulator.tablePx)(LEAD, host);
      const p = latest.current;
      const placeholder = el('div', B + '__empty tabulator-placeholder-contents', p.empty || STRINGS.empty);
      const rowContextMenu = p.rowMenu ? (e, row) => {
        const cur = latest.current.rowMenu,
          d = row.getData();
        const list = typeof cur === 'function' ? cur(d) : cur;
        return (list || []).map(it => it.separator ? {
          separator: true
        } : {
          label: menuLabel(it.label, it.icon, it.danger),
          disabled: typeof it.disabled === 'function' ? it.disabled(d) : !!it.disabled,
          action: () => it.onSelect && it.onSelect(d, row)
        });
      } : undefined;
      const labelled = p.columns.some(c => c.rowLabel);
      const opts = {
        layout: 'fitColumns',
        index: p.index || 'id',
        placeholder,
        columnDefaults: {
          resizable: true,
          minWidth: (0, _tabulator.tablePx)(MIN, host)
        },
        editTriggerEvent: 'dblclick',
        dataTreeChildIndent: (0, _tabulator.tablePx)(INDENT, host),
        rowContextMenu,
        // the row checkbox toggles its row (batch 246): Tabulator's own one, in the "click" range mode the rows use, makes a
        // plain click mean "only this row", so a checked box could not be unchecked; Shift and Ctrl/Cmd keep their range
        // and add meanings. The header checkbox stays Tabulator's (select all / none).
        rowHeader: p.selectable ? {
          formatter: rowCheckbox,
          titleFormatter: 'rowSelection',
          headerSort: false,
          resizable: false,
          frozen: true,
          width: lead,
          minWidth: lead,
          maxWidth: lead,
          hozAlign: 'center',
          headerHozAlign: 'center',
          cssClass: (0, _cx.cx)('plx-data-table__cell--select', labelled && 'plx-data-table__cell--row-label')
        } : false,
        selectableRows: p.selectable ? true : false,
        selectableRowsRangeMode: 'click',
        // with a rowClick handler, a row is a Tab stop and Enter does what a click does
        rowFormatter: row => {
          const own = latest.current.options && latest.current.options.rowFormatter;
          if (own) own(row);
          const e = row.getElement();
          if (!isStatic && latest.current.on && latest.current.on.rowClick && !e.hasAttribute('data-plx-open')) {
            e.setAttribute('data-plx-open', '');
            e.tabIndex = 0;
            e.addEventListener('keydown', ev => {
              if (ev.key === 'Enter' && ev.target === e) {
                ev.preventDefault();
                e.click();
              }
            });
          }
        },
        // a group row: its value and a count, one cell (Tabulator marks it a row group with no rows: axe aria-required-children)
        groupHeader: (value, count) => {
          const s = el('span', null, String(value));
          s.setAttribute('role', 'gridcell');
          s.appendChild(el('span', 'plx-data-table__group-count', count + ' ' + (count === 1 ? STRINGS.item : STRINGS.items)));
          return s;
        },
        ...Object.fromEntries(Object.entries(p.options || {}).filter(([k]) => k !== 'rowFormatter')),
        data: p.data || [],
        height: p.height ? sizeOf(p.height, host) : p.options && p.options.height
      };
      if (isStatic) Object.assign(opts, {
        rowContextMenu: undefined,
        rowHeader: false,
        selectableRows: false,
        movableColumns: false,
        movableRows: false,
        groupBy: false
      });
      opts.columns = defsOf(p.columns, host);
      table = new Tabulator(host, opts);
      shown.current = snap(opts.data);
      tableRef.current = table;

      // the ARIA tree: Tabulator's scrolling body is a Tab stop (the keyboard scrolls it), and inside role="grid" a Tab stop
      // must be a row or a row group: the scrolling body is the body's row group, Tabulator's inner body layout only; the
      // root's aria-owns (its own descendant) goes; a group header is a row with one cell.
      const aria = () => {
        const holder = host.querySelector('.tabulator-tableholder'),
          body = holder && holder.querySelector('.tabulator-table');
        host.removeAttribute('aria-owns');
        host.setAttribute('aria-label', latest.current.label || '');
        if (holder) {
          holder.setAttribute('role', 'rowgroup');
          holder.tabIndex = 0;
        }
        if (body) body.setAttribute('role', 'presentation');
        host.querySelectorAll('.tabulator-group').forEach(g => g.setAttribute('role', 'row'));
        // the selection kept by the page, once the rows are in (Tabulator builds before it loads them; nothing happens
        // when it already matches)
        if (table) syncSelection(table);
        host.querySelectorAll('.tabulator-row .tabulator-row-header input[type="checkbox"]').forEach((b, n) => {
          if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', STRINGS.selectRow + ' ' + (n + 1));
        });
      };
      table.on('renderComplete', aria);
      table.on('tableBuilt', () => {
        aria();
        builtRef.current = true;
        const on = isStatic ? {} : latest.current.on || {};
        Object.keys(on).forEach(ev => table.on(ev, (...a) => {
          const h = (latest.current.on || {})[ev];
          if (h) h(...a);
        }));
        table.on('rowSelectionChanged', () => {
          const q = latest.current;
          if (!syncing.current && q.onSelectionChange) q.onSelectionChange(table.getSelectedData().map(x => x[q.index || 'id']));
        });
        syncSelection(table);
        if (latest.current.onReady) latest.current.onReady(table);
        bump();
      });
    }).catch(err => {
      if (alive) setError(err);
    });

    // a density or interaction change redraws the rows at their new height
    const mo = new MutationObserver(() => {
      if (tableRef.current && builtRef.current) tableRef.current.redraw(true);
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-plx-density', 'data-plx-density-policy', 'data-plx-interaction']
    });
    const region = frameRef.current && frameRef.current.closest('[data-plx-density]');
    if (region && region !== document.documentElement) mo.observe(region, {
      attributes: true,
      attributeFilter: ['data-plx-density']
    });
    // a grid built while hidden (a closed tab, a section not shown) has no size to lay out in: once it is shown, it is
    // drawn again in full (columns and rows)
    let shownBefore = !!(frameRef.current && frameRef.current.offsetWidth);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      const now = !!(frameRef.current && frameRef.current.offsetWidth);
      if (now && !shownBefore && tableRef.current && builtRef.current) tableRef.current.redraw(true);
      shownBefore = now;
    });
    if (ro && frameRef.current) ro.observe(frameRef.current);
    return () => {
      alive = false;
      mo.disconnect();
      if (ro) ro.disconnect();
      builtRef.current = false;
      if (table) {
        try {
          table.destroy();
        } catch (e) {/* already gone */}
      }
      tableRef.current = null;
      cells.current = new Map();
      owners.current = new Map();
    };
    // built once per column shape; the data is replaced in place below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, selectable, headerMenu, !!rowMenu, typeof height === 'string' ? height : '']);

  // the selection kept by the page (the selected prop) onto the grid
  const syncSelection = table => {
    const want = latest.current.selected;
    if (!want || !table) return;
    const key = latest.current.index || 'id';
    const have = new Set(table.getSelectedData().map(x => String(x[key]))),
      goal = new Set(want.map(String));
    if (have.size === goal.size && Array.from(goal).every(k => have.has(k))) return;
    syncing.current = true;
    table.getSelectedRows().forEach(r => {
      if (!goal.has(String(r.getData()[key]))) r.deselect();
    });
    table.getRows().forEach(r => {
      if (goal.has(String(r.getData()[key])) && !r.isSelected()) r.select();
    });
    syncing.current = false;
  };
  _react.default.useEffect(() => {
    if (builtRef.current) syncSelection(tableRef.current);
  }, [(selected || []).join(SEP)]);

  // new data in place: sort, filters, scroll and column widths stay. Rows equal to the ones shown (a page that builds its
  // rows again on every render) change nothing.
  const shown = _react.default.useRef(null);
  _react.default.useEffect(() => {
    const table = tableRef.current;
    if (!table || !builtRef.current) return;
    if (sameRows(shown.current, data || [])) return;
    shown.current = snap(data);
    // new rows clear Tabulator's selection: that is not the person changing it; the page's selection is applied again
    syncing.current = true;
    table.replaceData(data || []).then(() => {
      syncing.current = false;
      syncSelection(table);
      const keep = new Set();
      (function walk(rows) {
        rows.forEach(r => {
          keep.add(String(r[index]));
          if (r._children) walk(r._children);
        });
      })(data || []);
      let gone = false;
      for (const id of Array.from(cells.current.keys())) if (!keep.has(id.split(SEP)[0])) {
        cells.current.delete(id);
        owners.current.delete(id);
        gone = true;
      }
      if (gone) bump();
    }).catch(() => {
      syncing.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // React content inside Tabulator's cells: rendered here, mounted there
  const portals = [];
  const table = tableRef.current;
  if (table && builtRef.current) {
    cells.current.forEach((node, id) => {
      const [key, field] = id.split(SEP);
      const c = columns.find(x => x.field === field);
      const cell = owners.current.get(id);
      if (c && c.render && cell && key) portals.push(/*#__PURE__*/_reactDom.default.createPortal(c.render(cell.getRow().getData(), cell), node, id));
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: frameRef,
    className: (0, _cx.cx)(B, columns.some(c => c.rowLabel) && B + '--row-header', className)
  }, error ? /*#__PURE__*/_react.default.createElement("div", {
    className: B + '__empty',
    role: "alert"
  }, STRINGS.failed, " ", String(error.message || error)) : null, /*#__PURE__*/_react.default.createElement("div", {
    ref: hostRef,
    className: B + '__table'
  }), portals);
}

// the interactive table: records to sort, filter, select, open, edit, group or nest
function DataTable(props) {
  return /*#__PURE__*/_react.default.createElement(TableEngine, _extends({}, props, {
    isStatic: false
  }));
}
// starts loading the engine before the first grid mounts (a page whose first screen has a table calls it as it starts)
DataTable.preload = () => {
  (0, _tabulator.loadTabulator)().catch(() => {});
};
  } },
  "platform/components/Table/Table.jsx": { deps: {"react":null,"../DataTable/DataTable.jsx":"platform/components/DataTable/DataTable.jsx","../DataTable/tabulator.js":"platform/components/DataTable/tabulator.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = Table;
var _react = _interopRequireDefault(require("react"));
var _DataTable = require("../DataTable/DataTable.jsx");
var _tabulator = require("../DataTable/tabulator.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Table
   Summary: A static table: information in rows and columns, read and nothing else. It looks like a DataTable (the same
     header, lines, type and row heights, from its own tokens) and runs on the same Tabulator engine, with no sorting,
     filters, menus, selection, resizing, moving, editing or row hover.
   Usage:
     <Table label="Fields" data={fields} columns={[
       { title: 'Field', field: 'name', kind: 'name', rowLabel: true, width: '--plx-ref-size-240px' },
       { title: 'Type', field: 'type', kind: 'data' },
       { title: 'Notes', field: 'notes', kind: 'wrap' }]} />
   Props:
     label: names the table for screen readers (required)
     data: the rows: plain objects with an id (or name the field with index)
     columns: Tabulator column definitions (title, field, hozAlign, width…) with the Plenix kinds: "name", "data", "wrap",
       "center", "icon"; render(row) for React content; rowLabel for the row header. Interactive options are ignored.
     index: the field that identifies a row; default "id"
     empty: shown when there are no rows; default "Nothing to show"
     height: a fixed height (a size token) for a long table; rows render as they scroll into view
     options: Tabulator table options that only change the layout (layout, headerVisible…)
     className: more classes on the frame
     Table.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Nothing reacts to the pointer: rows do not highlight, headers do not sort, there is no menu. Links and buttons placed
     in cells work as themselves. Row height and text size follow the density.
   Notes:
     For records people work with (sort, filter, select, open, edit) use DataTable. Its look comes from --plx-sys-table-*
     and --plx-comp-table-* tokens (table.css), separate from the DataTable's, with the same values by default.
*/
function Table(props) {
  return /*#__PURE__*/_react.default.createElement(_DataTable.TableEngine, _extends({}, props, {
    isStatic: true
  }));
}
// starts loading the engine before the first table mounts (see DataTable.preload)
Table.preload = () => {
  (0, _tabulator.loadTabulator)().catch(() => {});
};
  } },
  "platform/patterns/ActionBar/ActionBar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionBar = ActionBar;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ActionBar
   Summary: A page's or a form's buttons in one bar on the right, kept in view at the bottom of the page while it scrolls.
   Usage:
     <ActionBar label="Asset type actions">
       <Button variant="danger-secondary" onClick={remove}>Delete</Button>
       <Button type="submit" variant="primary">Save changes</Button>
     </ActionBar>
   Props:
     label: names the group of buttons for screen readers; default "Actions"
     className: more classes on the bar
     children: the buttons, in reading order, the primary action last (it sits at the right edge); a destructive action
       first, away from the primary
   Behavior:
     The bar sticks to the bottom of the scrolling page (or form) it is in, so its buttons stay reachable on a long page;
     at the end of the page it sits in its place under the content. Buttons wrap to a new line, still on the right, when
     the bar is too narrow.
   Notes:
     Every page or form with actions uses it (the owner, batch 231: buttons on the right, in a bar that sticks to the
     bottom); SettingsSection's actions are drawn in one. Dialogs, panels and side panels keep their own footers (also
     on the right). A toolbar of tools (an editor's Save, Export) is a Toolbar, not an ActionBar.
*/

function ActionBar({
  label = 'Actions',
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    "aria-label": label,
    className: (0, _cx.cx)('plx-action-bar', className)
  }, children);
}
  } },
  "platform/components/NavList/NavList.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../CollapsibleSection/CollapsibleSection.jsx":"platform/components/CollapsibleSection/CollapsibleSection.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavList = NavList;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
var _CollapsibleSection = require("../CollapsibleSection/CollapsibleSection.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · NavList
   Summary: A list of places in a side navigation (settings sections, folders of a screen).
   Usage:
     <NavList label="Settings" value={current} onSelect={go}
       groups={[{ heading: 'Account', items: [{ id, label, icon, count, href }] }]} />
   Props:
     label: the accessible name of the navigation
     items: one ungrouped list of items: [{ id, label, icon, count, href, muted, disabled, onPin, pinned, actions }]
     groups: groups of items, in order: [{ heading, icon, defaultExpanded, collapsible, items }]; use instead of items
     groups[].heading: the group's heading; a CollapsibleSection header (the accent section header with a chevron)
     groups[].icon: an icon in the group heading (optional)
     groups[].defaultExpanded: whether the group starts open; default true
     groups[].collapsible: false keeps the group always open and its heading stays a plain label; default true
     value: the id of the current item
     onSelect(id): runs when an item is chosen
     items[].href: makes the item a link; otherwise it is a button
     items[].icon: an icon name or element before the label; the current item's "folder" shows as "folder-open" (batch 242)
     items[].count: shown right after the name, small, italic and in parentheses ("Branding (326)")
     items[].muted: shows the row in the subtle text color (a place that exists but has nothing in it yet); it still opens
     items[].disabled: disables a button item
     items[].onPin(id): makes the row pinnable; runs from its pin button
     items[].pinned: the row is pinned; its pin button stays shown, filled
     items[].actions: other controls beside the row (a remove button)
     items[].children: makes the item a subgroup: a row with a chevron that folds the rows inside it (same item shape)
     items[].defaultExpanded: whether a subgroup starts open; default false (it also opens while it holds the current item)
     className: more classes on the navigation
     locale: the language the counts are formatted in (default: the page's language, document.documentElement.lang)
     strings: the words it shows and announces, for other languages: { pin: "Pin", unpin: "Unpin", pinItem: "Pin {label}",
       unpinItem: "Unpin {label}" } (pin and unpin are the pin button's tooltip; pinItem and unpinItem its name)
   Behavior:
     The current item carries aria-current="page".
     An item with href is a link; otherwise it is a button and onSelect(id) runs.
     A collapsible group heading folds its rows, the same in every navigation pane.
     A subgroup row is a button with aria-expanded; its chevron points right while closed and down while open, and its
     count follows its name. A subgroup holding the current item opens when that item becomes current; while closed it
     marks its own row as holding the current page.
     The pin button shows while the row is hovered or focused, and stays (filled) while the row is pinned.
   Notes:
     item.actions are siblings of the row's own button, never inside it.
*/
const STRINGS = {
  pin: 'Pin',
  unpin: 'Unpin',
  pinItem: 'Pin {label}',
  unpinItem: 'Unpin {label}'
};
const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
// the current item is the open one: a folder shows as an open folder (filled, like every current icon)
const OPEN_ICONS = {
  folder: 'folder-open'
};
const iconOf = (icon, on) => on && typeof icon === 'string' && OPEN_ICONS[icon] || icon;
const holds = (item, current) => !!item.children && item.children.some(c => c.id === current || holds(c, current));
function SubGroup({
  item,
  current,
  onSelect,
  t,
  loc
}) {
  const inside = holds(item, current);
  const [open, setOpen] = _react.default.useState(!!item.defaultExpanded || inside);
  _react.default.useEffect(() => {
    if (inside) setOpen(true);
  }, [inside, current]);
  const id = (0, _layer.useUid)('plx-nav-sub');
  return /*#__PURE__*/_react.default.createElement("li", {
    className: "plx-nav-list__entry"
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: (0, _cx.cx)('plx-nav-list__item', 'plx-nav-list__item--group', inside && !open && 'is-current-parent'),
    "aria-expanded": open,
    "aria-controls": id,
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__icon"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: open ? 'chevron-down' : 'chevron-right'
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__label"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__name"
  }, item.label), item.count !== undefined ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__count"
  }, "(", item.count, ")") : null)), /*#__PURE__*/_react.default.createElement("ul", {
    id: id,
    "aria-label": item.label,
    hidden: !open,
    className: "plx-nav-list__items plx-nav-list__items--nested"
  }, open ? item.children.map(it => /*#__PURE__*/_react.default.createElement(Item, {
    key: it.id,
    item: it,
    current: current,
    onSelect: onSelect,
    t: t,
    loc: loc
  })) : null));
}
function Item({
  item,
  current,
  onSelect,
  t,
  loc
}) {
  if (item.children) return /*#__PURE__*/_react.default.createElement(SubGroup, {
    item: item,
    current: current,
    onSelect: onSelect,
    t: t,
    loc: loc
  });
  const on = item.id === current;
  const props = {
    className: (0, _cx.cx)('plx-nav-list__item', item.muted && 'plx-nav-list__item--muted', on && 'is-current'),
    'aria-current': on ? 'page' : undefined
  };
  const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, item.icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__icon"
  }, asIcon(iconOf(item.icon, on))) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__label"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__name"
  }, item.label), item.count !== undefined ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__count"
  }, "(", typeof item.count === 'number' ? item.count.toLocaleString(loc) : item.count, ")") : null));
  return /*#__PURE__*/_react.default.createElement("li", {
    className: (0, _cx.cx)('plx-nav-list__entry', (item.actions || item.onPin) && 'plx-nav-list__entry--actions', item.pinned && 'is-pinned')
  }, item.href ? /*#__PURE__*/_react.default.createElement("a", _extends({
    href: item.href
  }, props, {
    onClick: onSelect ? () => onSelect(item.id) : undefined
  }), content) : /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button"
  }, props, {
    disabled: item.disabled || undefined,
    onClick: () => onSelect && onSelect(item.id)
  }), content), item.actions || item.onPin ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-list__actions"
  }, item.onPin ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-nav-list__pin",
    "aria-pressed": !!item.pinned,
    "aria-label": (item.pinned ? t.unpinItem : t.pinItem).split('{label}').join(item.label),
    title: item.pinned ? t.unpin : t.pin,
    onClick: () => item.onPin(item.id)
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: item.pinned ? 'pin-filled' : 'pin'
  })) : null, item.actions) : null);
}
function Group({
  heading,
  items,
  current,
  onSelect,
  collapsible = true,
  icon,
  defaultExpanded = true,
  t,
  loc
}) {
  const id = (0, _layer.useUid)('plx-nav');
  if (heading && collapsible) {
    return /*#__PURE__*/_react.default.createElement(_CollapsibleSection.CollapsibleSection, {
      className: "plx-nav-list__group",
      title: heading,
      icon: icon,
      defaultExpanded: defaultExpanded,
      headingLevel: null
    }, /*#__PURE__*/_react.default.createElement("ul", {
      "aria-label": heading,
      className: "plx-nav-list__items"
    }, items.map(it => /*#__PURE__*/_react.default.createElement(Item, {
      key: it.id,
      item: it,
      current: current,
      onSelect: onSelect,
      t: t,
      loc: loc
    }))));
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-list__group"
  }, heading ? /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: "plx-nav-list__heading"
  }, heading) : null, /*#__PURE__*/_react.default.createElement("ul", {
    "aria-labelledby": heading ? id : undefined,
    className: "plx-nav-list__items"
  }, items.map(it => /*#__PURE__*/_react.default.createElement(Item, {
    key: it.id,
    item: it,
    current: current,
    onSelect: onSelect,
    t: t,
    loc: loc
  }))));
}
function NavList({
  label,
  items,
  groups,
  value,
  onSelect,
  locale,
  strings,
  className
}) {
  const t = Object.assign({}, STRINGS, strings);
  const loc = locale || typeof document !== 'undefined' && document.documentElement.lang || undefined;
  const all = groups || [{
    heading: null,
    items: items || []
  }];
  return /*#__PURE__*/_react.default.createElement("nav", {
    "aria-label": label,
    className: (0, _cx.cx)('plx-nav-list', className)
  }, all.map((g, i) => /*#__PURE__*/_react.default.createElement(Group, {
    key: g.heading || i,
    heading: g.heading,
    items: g.items,
    collapsible: g.collapsible,
    icon: g.icon,
    defaultExpanded: g.defaultExpanded,
    current: value,
    onSelect: onSelect,
    t: t,
    loc: loc
  })));
}
  } },
  "platform/components/Tree/Tree.jsx": { deps: {"react":null,"../../utils/direction.js":"platform/utils/direction.js","../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = Tree;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../../utils/direction.js");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Tree
   Summary: A hierarchy to choose from (folders, categories).
   Usage:
     <Tree label="Folders" nodes={[{ id, label, icon, meta, children: [...] }]} selected={id} onSelect={setId}
       expanded={ids} onExpandedChange={setIds} />
   Props:
     label: the accessible name of the tree
     nodes: the top-level items: [{ id, label, icon, meta, children }]
     nodes[].icon: an icon name or element before the label
     nodes[].openIcon: the icon while the item is open or selected; default: "folder" opens as "folder-open", others stay
     nodes[].meta: extra content at the end of the row
     nodes[].children: the item's child items, in the same shape
     selected: the id of the selected item
     onSelect(id): runs when an item is selected
     expanded: the ids of the open items (controlled)
     defaultExpanded: the ids of the open items at first (uncontrolled); default []
     onExpandedChange(ids): runs when items open or close
     className: more classes on the tree
   Behavior:
     The tree is one Tab stop.
     Arrow Up and Down move through the visible items.
     Arrow Right opens an item or goes to its first child; Arrow Left closes it or goes to the parent.
     Home and End go to the first and last visible item.
     Enter or Space selects.
     Clicking the + box (a closed row) or the − box (an open row) opens or closes it; clicking the row selects.
     An open folder shows the open-folder icon (batch 239). Icons are outline while closed and open and filled while the item
     is open or selected (batch 241), by the item's own state only: a selected item does not fill the icons of the items inside it (batch 240).
*/

const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
// the icon an open item shows: its own openIcon, else an open folder for a folder
const OPEN_ICONS = {
  folder: 'folder-open'
};
const iconOf = (n, isOpen) => isOpen ? n.openIcon || typeof n.icon === 'string' && OPEN_ICONS[n.icon] || n.icon : n.icon;
function visible(nodes, open, parent, out) {
  nodes.forEach(n => {
    out.push({
      node: n,
      parent
    });
    if (n.children && n.children.length && open.has(n.id)) visible(n.children, open, n.id, out);
  });
  return out;
}
function Tree({
  label,
  nodes,
  selected,
  onSelect,
  expanded,
  defaultExpanded = [],
  onExpandedChange,
  className
}) {
  const base = (0, _layer.useUid)('plx-tree');
  const [ownOpen, setOwnOpen] = _react.default.useState(defaultExpanded);
  const open = new Set(expanded !== undefined ? expanded : ownOpen);
  const setOpen = next => {
    const list = Array.from(next);
    if (expanded === undefined) setOwnOpen(list);
    if (onExpandedChange) onExpandedChange(list);
  };
  const flat = visible(nodes, open, null, []);
  const [focusId, setFocusId] = _react.default.useState(null);
  const active = flat.some(v => v.node.id === focusId) ? focusId : flat.some(v => v.node.id === selected) ? selected : flat[0] && flat[0].node.id;
  const refs = _react.default.useRef({});
  const moveTo = id => {
    setFocusId(id);
    if (refs.current[id]) refs.current[id].focus();
  };
  const toggle = id => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id);else next.add(id);
    setOpen(next);
  };
  const onKeyDown = e => {
    const at = flat.findIndex(v => v.node.id === active);
    const cur = flat[at];
    if (!cur) return;
    const kids = cur.node.children && cur.node.children.length;
    if (e.key === 'ArrowDown') {
      if (flat[at + 1]) moveTo(flat[at + 1].node.id);
    } else if (e.key === 'ArrowUp') {
      if (flat[at - 1]) moveTo(flat[at - 1].node.id);
    } else if (e.key === 'Home') moveTo(flat[0].node.id);else if (e.key === 'End') moveTo(flat[flat.length - 1].node.id);
    // the key toward the reading end opens a branch, the other closes it or goes to the parent (right to left mirrors; batch 213)
    else if (e.key === ((0, _direction.isRtl)(e.currentTarget) ? 'ArrowLeft' : 'ArrowRight')) {
      if (kids && !open.has(cur.node.id)) toggle(cur.node.id);else if (kids) moveTo(cur.node.children[0].id);
    } else if (e.key === ((0, _direction.isRtl)(e.currentTarget) ? 'ArrowRight' : 'ArrowLeft')) {
      if (kids && open.has(cur.node.id)) toggle(cur.node.id);else if (cur.parent !== null) moveTo(cur.parent);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (onSelect) onSelect(cur.node.id);
    } else return;
    e.preventDefault();
  };
  const renderNodes = (list, level) => list.map(n => {
    const kids = n.children && n.children.length;
    const isOpen = kids && open.has(n.id);
    return /*#__PURE__*/_react.default.createElement("li", {
      key: n.id,
      ref: el => {
        refs.current[n.id] = el;
      },
      id: base + '-' + n.id,
      role: "treeitem",
      "aria-level": level,
      "aria-expanded": kids ? !!isOpen : undefined,
      "aria-selected": n.id === selected,
      tabIndex: n.id === active ? 0 : -1,
      className: (0, _cx.cx)('plx-tree__item', n.id === selected && 'is-selected'),
      onFocus: e => {
        if (e.target === e.currentTarget) setFocusId(n.id);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "plx-tree__row",
      onClick: () => {
        moveTo(n.id);
        if (onSelect) onSelect(n.id);
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _cx.cx)('plx-tree__toggle', isOpen && 'is-open', !kids && 'is-leaf'),
      "aria-hidden": "true",
      onClick: kids ? e => {
        e.stopPropagation();
        toggle(n.id);
        moveTo(n.id);
      } : undefined
    }), n.icon ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tree__icon"
    }, asIcon(iconOf(n, isOpen || n.id === selected))) : null, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tree__label"
    }, n.label), n.meta !== undefined ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tree__meta"
    }, n.meta) : null), isOpen ? /*#__PURE__*/_react.default.createElement("ul", {
      role: "group",
      className: "plx-tree__group"
    }, renderNodes(n.children, level + 1)) : null);
  });
  return /*#__PURE__*/_react.default.createElement("ul", {
    role: "tree",
    "aria-label": label,
    className: (0, _cx.cx)('plx-tree', className),
    onKeyDown: onKeyDown
  }, renderNodes(nodes, 1));
}
  } },
  "platform/components/MediaViewer/MediaViewer.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../utils/direction.js":"platform/utils/direction.js"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaViewer = MediaViewer;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
var _direction = require("../../utils/direction.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · MediaViewer
   Summary: A full-screen preview of images, one at a time (the lightbox).
   Usage:
     <MediaViewer open={open} onClose={close} items={[{ src, alt, title, meta: ['JPG', '2.4 MB'] }]}
       index={at} onIndexChange={(next) => …} actions={<…/>} />
   Props:
     open: whether the viewer is shown
     onClose(): runs from the close button and Escape
     items: the images: [{ src, alt, title, meta }]
     items[].meta: an array of short technical values shown under the title
     index: the shown item, when controlled
     defaultIndex: the first shown item, when uncontrolled (default 0)
     onIndexChange(next): runs with the new index when the item changes
     label: the accessible name of the viewer (default strings.label: "Preview")
     actions: extra controls under the image (give them the class plx-media-viewer__control)
     className: more classes on the viewer
     strings: the words it shows and announces, for other languages: { label: "Preview", close: "Close preview",
       previous: "Previous", next: "Next", counter: "{index} of {total}" }
   Behavior:
     Arrow Left / Right go to the previous / next item in reading order (in a right-to-left page Arrow Right goes back);
     with more than one item there are also Previous and Next buttons.
     Going past the last item wraps to the first, and back.
     Escape closes.
     Focus stays inside and returns to the opener.
     A counter ("2 of 5") describes the viewer.
     With no items nothing renders.
   Notes:
     The viewer renders in a portal on document.body.
*/

const STRINGS = {
  label: 'Preview',
  close: 'Close preview',
  previous: 'Previous',
  next: 'Next',
  counter: '{index} of {total}'
};
function MediaViewer({
  open,
  onClose,
  items,
  index,
  defaultIndex = 0,
  onIndexChange,
  label,
  actions,
  strings,
  className
}) {
  const t = Object.assign({}, STRINGS, strings);
  const ref = _react.default.useRef(null);
  const id = (0, _layer.useUid)('plx-mv');
  const [own, setOwn] = _react.default.useState(defaultIndex);
  const at = index !== undefined ? index : own;
  (0, _layer.useLayer)(ref, open, {
    modal: true,
    onEscape: onClose
  });
  if (!open || !items.length) return null;
  const go = n => {
    const next = (n + items.length) % items.length;
    if (index === undefined) setOwn(next);
    if (onIndexChange) onIndexChange(next);
  };
  const item = items[at] || items[0];
  const many = items.length > 1;
  const onKeyDown = e => {
    if (!many) return;
    const step = (0, _direction.arrowStep)(e, e.currentTarget, {
      vertical: false
    });
    if (step) {
      e.preventDefault();
      go(at + step);
    }
  };
  return /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": label || t.label,
    "aria-describedby": id + 'c',
    tabIndex: -1,
    className: (0, _cx.cx)('plx-media-viewer', className),
    onKeyDown: onKeyDown
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: id + 'c',
    className: "plx-media-viewer__counter"
  }, t.counter.split('{index}').join(String(at + 1)).split('{total}').join(String(items.length))), /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-media-viewer__control plx-media-viewer__close",
    "aria-label": t.close,
    onClick: onClose
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "close",
    size: "md"
  })), many ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-media-viewer__control plx-media-viewer__nav plx-media-viewer__nav--previous",
    "aria-label": t.previous,
    onClick: () => go(at - 1)
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-down",
    size: "md"
  })) : null, /*#__PURE__*/_react.default.createElement("figure", {
    className: "plx-media-viewer__figure"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-viewer__stage"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: item.src,
    alt: item.alt || '',
    className: "plx-media-viewer__image"
  })), item.title || item.meta ? /*#__PURE__*/_react.default.createElement("figcaption", {
    className: "plx-media-viewer__info"
  }, item.title ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-viewer__title"
  }, item.title) : null, item.meta ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-viewer__meta"
  }, item.meta.map((m, i) => /*#__PURE__*/_react.default.createElement("span", {
    key: i
  }, m))) : null) : null, actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-media-viewer__actions"
  }, actions) : null), many ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-media-viewer__control plx-media-viewer__nav plx-media-viewer__nav--next",
    "aria-label": t.next,
    onClick: () => go(at + 1)
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-down",
    size: "md"
  })) : null), document.body);
}
  } },
  "platform/providers/SessionProvider.jsx": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEMO_SESSION = void 0;
exports.SessionProvider = SessionProvider;
exports.useSession = useSession;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · SessionProvider, useSession
   Summary: Who is signed in, and their notifications, for every Plenix application, from one place.
   Usage:
     <SessionProvider session={…}>{app}</SessionProvider>
     const { account, notifications, setNotifications, pinnedApps, setPinnedApps } = useSession();
   Props:
     session: { account, notifications, pinnedApps } (default: the demo session below, DEMO_SESSION)
     children: the application root or React island
     useSession(): { account: { name, firstName, lastName, email, src }, notifications: [{ id, text, time, unread }],
       setNotifications(next), pinnedApps: [application ids], setPinnedApps(next | (prev) => next) }
   Behavior:
     The pins are remembered in the browser (localStorage plenix.pinnedApps) until the back end stores them.
     Outside a provider useSession() returns the demo session, so a page that has not been wrapped still shows the same person.
   Notes:
     The header's account menu (AppHeader.Account) and the dashboard's notifications (NotificationList) read it.
     Any page that shows the person's details reads it too (useSession().account).
     Wrap the application root, or a React island, once.
     Without a session the demo session below is used, until the back end supplies the real one; no application keeps its own copy.
*/

// the demo session: the sample account and notifications every application shows until the back end sends them
const DEMO_SESSION = exports.DEMO_SESSION = {
  account: {
    name: 'Raphael Maher',
    firstName: 'Raphael',
    lastName: 'Maher',
    email: 'raphael@lighthouseway.org'
  },
  notifications: [{
    id: 1,
    text: 'Fr. Daniel uploaded 12 new assets to Liturgy',
    time: '5 min ago',
    unread: true
  }, {
    id: 2,
    text: 'Maya Chen sent a message: Round 3 concepts — confirm Thursday?',
    time: '10:24 AM',
    unread: true
  }, {
    id: 3,
    text: 'Sarah M. approved your batch download request',
    time: '22 min ago',
    unread: true
  }, {
    id: 4,
    text: 'Task due Mar 8: Deliver logo concepts round 3',
    time: 'Yesterday',
    unread: false
  }, {
    id: 5,
    text: 'Version 3 of Banner Icon Set is now live',
    time: 'Yesterday',
    unread: false
  }],
  // the applications pinned to the header until the person changes them: every application
  pinnedApps: ['home', 'projects', 'messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'assets']
};
const SessionContext = /*#__PURE__*/_react.default.createContext(null);
const PINS_KEY = 'plenix.pinnedApps';
const readPins = fallback => {
  try {
    const v = JSON.parse(localStorage.getItem(PINS_KEY));
    return Array.isArray(v) ? v : fallback;
  } catch (e) {
    return fallback;
  }
};
function SessionProvider({
  session = DEMO_SESSION,
  children
}) {
  const [notifications, setNotifications] = _react.default.useState(session.notifications || []);
  const [pinnedApps, setPins] = _react.default.useState(() => readPins(session.pinnedApps || DEMO_SESSION.pinnedApps));
  _react.default.useEffect(() => {
    setNotifications(session.notifications || []);
  }, [session]);
  const setPinnedApps = _react.default.useCallback(next => setPins(prev => {
    const v = typeof next === 'function' ? next(prev) : next;
    try {
      localStorage.setItem(PINS_KEY, JSON.stringify(v));
    } catch (e) {/* not stored: the pins last for this visit */}
    return v;
  }), []);
  const value = _react.default.useMemo(() => ({
    account: session.account || {},
    notifications,
    setNotifications,
    pinnedApps,
    setPinnedApps
  }), [session, notifications, pinnedApps, setPinnedApps]);
  return /*#__PURE__*/_react.default.createElement(SessionContext.Provider, {
    value: value
  }, children);
}

// the session, or the demo session outside a provider (a page that has not been wrapped still shows the same person)
function useSession() {
  const ctx = _react.default.useContext(SessionContext);
  return ctx || {
    account: DEMO_SESSION.account,
    notifications: DEMO_SESSION.notifications,
    setNotifications: () => {},
    pinnedApps: DEMO_SESSION.pinnedApps,
    setPinnedApps: () => {}
  };
}
  } },
  "platform/providers/apps.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appHref = exports.appById = exports.PLENIX_APPS = void 0;
/* Plenix · applications (platform/providers/apps.js): every Plenix application, in one list for every product. The header
   shows the pinned ones as links and the switcher shows them all (pinned first); the session keeps which are pinned.
   id: the application's id. path: its page, relative to the Plenix folder, where every application has its own folder
   beside platform/ (batch 149). appHref(app, root) turns it into a link from the current page, where root is the
   relative path from that page to the Plenix folder ("../" from an application's page, "../../" from the spec). */
const PLENIX_APPS = exports.PLENIX_APPS = [{
  id: 'home',
  label: 'Dashboard',
  icon: 'home',
  path: 'dashboard/index.html'
}, {
  id: 'projects',
  label: 'Projects',
  icon: 'briefcase',
  path: 'projects/index.html'
}, {
  id: 'messaging',
  label: 'Messages',
  icon: 'message',
  path: 'messages/index.html'
}, {
  id: 'contacts',
  label: 'Contacts',
  icon: 'settings-users',
  path: 'contacts/index.html'
}, {
  id: 'calendar',
  label: 'Calendar',
  icon: 'calendar',
  path: 'calendar/index.html'
}, {
  id: 'tasks',
  label: 'Tasks',
  icon: 'circle-check',
  path: 'tasks/index.html'
}, {
  id: 'notes',
  label: 'Notes',
  icon: 'document',
  path: 'notes/index.html'
}, {
  id: 'bookmarks',
  label: 'Bookmarks',
  icon: 'bookmark',
  path: 'bookmarks/index.html'
}, {
  id: 'files',
  label: 'Files',
  icon: 'folder',
  path: 'files/index.html'
}, {
  id: 'assets',
  label: 'Asset Manager',
  icon: 'image-b',
  path: 'dam/index.html'
}];
const appById = id => PLENIX_APPS.find(a => a.id === id);
exports.appById = appById;
const appHref = (app, root = '') => root + app.path.split('/').map(encodeURIComponent).join('/').replace(/%23/g, '#');
exports.appHref = appHref;
  } },
  "platform/providers/themes.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THEMES = exports.DEFAULT_THEME = void 0;
/* Plenix · Themes (platform/providers/themes.js)
   GENERATED by build-standards.js from platform/standards/themes.json (the design system's themes): edit the JSON, never
   this file.
   Summary: The themes a page can use. The default theme is the current Plenix look; more are added in the design system.
   Usage:
     const { theme, setTheme, themes } = useTheme();   // providers/ThemeProvider.jsx
     PlenixWorkspace.setTheme("default")               // providers/theme-boot.js, before React
   Props:
     THEMES: [{ name, label, description }], the default theme first
     DEFAULT_THEME: the theme a page has when none is chosen
*/
const THEMES = exports.THEMES = [{
  name: "default",
  label: "Default",
  description: "The Plenix look: blue accent header, light gray canvas, white surfaces."
}];
const DEFAULT_THEME = exports.DEFAULT_THEME = "default";
  } },
  "platform/providers/ThemeProvider.jsx": { deps: {"react":null,"./themes.js":"platform/providers/themes.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = void 0;
exports.ThemeProvider = ThemeProvider;
exports.useTheme = useTheme;
var _react = _interopRequireDefault(require("react"));
var _themes = require("./themes.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ThemeProvider, useTheme
   Summary: Gives React components the theme, density and interaction context.
   Usage:
     <ThemeProvider>{app}</ThemeProvider>
     const { theme, setTheme, themes } = useTheme();
   Props:
     children: the application root or React island it wraps
     useTheme(): { theme, setTheme(name), themes } — the current theme's name, a way to change it (kept for every page), and
       the themes the design system defines (THEMES, from platform/standards/themes.json)
   Behavior:
     It reads the theme, density and interaction attributes on <html> and follows their changes.
     It sends changes back through the same runtime (window.PlenixWorkspace), so a person's saved choice is never reset.
     Outside a ThemeProvider, useTheme still reads and changes the theme on <html>.
   Notes:
     The attributes on <html> are set before the page draws by platform/providers/theme-boot.js (loaded in <head>, with
       the same saved preference keys as before).
     Wrap an application root, or a React island, in ThemeProvider.
     Read it with useTheme, useDensity and useInteraction.
     The themes are defined in the design system (platform/standards/themes.json); the current look is the "default" theme.
*/

const ThemeContext = exports.ThemeContext = /*#__PURE__*/_react.default.createContext(null);
function readRoot() {
  const root = document.documentElement;
  return {
    theme: root.getAttribute('data-plx-theme') || _themes.DEFAULT_THEME,
    density: root.getAttribute('data-plx-density') || 'standard',
    interaction: root.getAttribute('data-plx-interaction') || 'pointer'
  };
}
// the theme is changed through the runtime when it is there (it remembers the choice), else on <html> directly
function changeTheme(name) {
  if (!_themes.THEMES.some(t => t.name === name)) return;
  if (window.PlenixWorkspace && window.PlenixWorkspace.setTheme) window.PlenixWorkspace.setTheme(name);else document.documentElement.setAttribute('data-plx-theme', name);
}
function ThemeProvider({
  children
}) {
  const [state, setState] = _react.default.useState(readRoot);
  _react.default.useEffect(() => {
    const observer = new MutationObserver(() => setState(readRoot()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-plx-theme', 'data-plx-density', 'data-plx-interaction']
    });
    return () => observer.disconnect();
  }, []);
  const value = _react.default.useMemo(() => ({
    theme: state.theme,
    setTheme: changeTheme,
    themes: _themes.THEMES,
    density: state.density,
    interaction: state.interaction,
    setDensity: d => {
      if (window.PlenixWorkspace) window.PlenixWorkspace.setDensity(d);
    }
  }), [state.theme, state.density, state.interaction]);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: value
  }, children);
}
function useTheme() {
  const ctx = _react.default.useContext(ThemeContext);
  const [own, setOwn] = _react.default.useState(() => ctx ? null : readRoot().theme);
  _react.default.useEffect(() => {
    if (ctx) return undefined;
    const observer = new MutationObserver(() => setOwn(readRoot().theme));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-plx-theme']
    });
    return () => observer.disconnect();
  }, [ctx]);
  return {
    theme: ctx ? ctx.theme : own,
    setTheme: changeTheme,
    themes: _themes.THEMES
  };
}
  } },
  "platform/hooks/useDensity.js": { deps: {"react":null,"../providers/ThemeProvider.jsx":"platform/providers/ThemeProvider.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDensity = useDensity;
var _react = _interopRequireDefault(require("react"));
var _ThemeProvider = require("../providers/ThemeProvider.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useDensity
   Summary: Gives the current page's display density and a way to change it.
   Usage:
     const [density, setDensity] = useDensity();
   Props:
     returns: [density, setDensity]; density is "compact" | "standard" | "comfortable" (the data-plx-density attribute on <html>,
       "standard" when unset); setDensity(value) changes it through the workspace runtime (window.PlenixWorkspace)
   Behavior:
     Inside a ThemeProvider it reads the provider and re-renders when the density changes.
     Outside one it reads <html> directly, with no re-render on change.
*/

function useDensity() {
  const ctx = _react.default.useContext(_ThemeProvider.ThemeContext);
  if (ctx) return [ctx.density, ctx.setDensity];
  const set = d => {
    if (window.PlenixWorkspace) window.PlenixWorkspace.setDensity(d);
  };
  return [document.documentElement.getAttribute('data-plx-density') || 'standard', set];
}
  } },
  "platform/patterns/AppHeader/AppHeader.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Count/Count.jsx":"platform/components/Count/Count.jsx","../../components/Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../providers/SessionProvider.jsx":"platform/providers/SessionProvider.jsx","../../providers/apps.js":"platform/providers/apps.js","../../utils/layer.js":"platform/utils/layer.js","../../hooks/useDensity.js":"platform/hooks/useDensity.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppHeader = AppHeader;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Tooltip = require("../../components/Tooltip/Tooltip.jsx");
var _Icon = require("../../components/Icon/Icon.jsx");
var _Count = require("../../components/Count/Count.jsx");
var _Avatar = require("../../components/Avatar/Avatar.jsx");
var _Menu = require("../../components/Menu/Menu.jsx");
var _Button = require("../../components/Button/Button.jsx");
var _SessionProvider = require("../../providers/SessionProvider.jsx");
var _apps = require("../../providers/apps.js");
var _layer = require("../../utils/layer.js");
var _useDensity = require("../../hooks/useDensity.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · AppHeader
   Summary: The header across the top of every Plenix application (a banner landmark), after the Carbon UI shell header.
     Left to right it goes from the product to the global: the header name and switcher, the header links, then search,
     the application's action and the utilities at the end.
   Usage:
     <AppHeader tone="accent" currentApp="assets" appsRoot="../" onOpenApp={(app) => handled}
       action={<AppHeader.Action icon="hdr-upload" onClick={() => …}>Upload</AppHeader.Action>}
       search={<SearchField onAccent …/>}
       account={<AppHeader.Account current="account" myAccount={{ href }} settings={{ href }} density extra={<…/>} />} />
     <AppHeader.Item icon={…} label="Projects" current count={3} href="…" onClick={() => …} />
     <AppHeader.Switcher currentApp="assets" appsRoot="../" onOpenApp={(app) => …} brand={…} />
   Props:
     tone: "accent" (default) | "frost" | "plain"; sets the bar's colors and those of everything inside it
     appName: the application's name in the header name (default: the current application's name)
     brand: replaces the header name's content (default: "Plenix" over the application's name)
     brandHref: makes the header name a link when there is no switcher
     currentApp: the open application's id (see PLENIX_APPS), or null on a screen that is not an application (Settings);
       when it is given (also null) the header name is the switcher and the pinned header links show
     appsRoot: the relative path from this page to the folder that holds every application (default "")
     onOpenApp(app): return true when the page opens the application itself (a section of the same page); otherwise the link opens it
     nav: replaces the header links (default: the pinned applications)
     navLabel: the header links' accessible name (default "Pinned applications")
     action: the application's action (AppHeader.Action), a labeled button between search and the utilities
     search: the search field (a SearchField onAccent), shown when search is asked for; without it there is no search
     actions: other utilities, before the account
     account: the account menu (AppHeader.Account), last in the utilities
     switcher: true or false overrides whether the header name is the application switcher (default: when currentApp is given)
     className: more classes on the header
     AppHeader.Item.icon: the icon
     AppHeader.Item.label: its accessible name and tooltip; include the count in it when there is one
     AppHeader.Item.current: marks the open place (aria-current); default false
     AppHeader.Item.count: a count pill on the icon (up to 99)
     AppHeader.Item.href: makes it a link; otherwise it is a button
     AppHeader.Item.onClick: runs on click
     AppHeader.Item.tooltip: shows the label as a tooltip (default true)
     AppHeader.Item.className: more classes
     AppHeader.Item.ref: forwarded to the link or button, so it can be a Menu trigger
     AppHeader.Account.name: the person's name (default: the session's)
     AppHeader.Account.email: the person's email (default: the session's)
     AppHeader.Account.src: the person's picture (default: the session's)
     AppHeader.Account.placement: "header" (default; the avatar at the end of the header's utilities; the menu opens below it)
       | "pane" (in the navigation pane's footer, NavPane footer, a row "avatar | name ˅"; the same menu opens above)
     AppHeader.Account.current: "account" | "settings"; marks the open place in the menu
     AppHeader.Account.myAccount: { href | onSelect }; the My Account item shows when the page gives it
     AppHeader.Account.settings: { href | onSelect }; the Settings item shows when the page gives it
     AppHeader.Account.density: true adds the Display density choices with their icons (Compact, Standard, Comfortable;
       the current one checked); default false
     AppHeader.Account.extra: further items after a divider (Sign out)
     AppHeader.Action.icon: an icon name (such as "hdr-upload") or an icon element, header-sized
     AppHeader.Action.children: the button's label
     AppHeader.Action.onClick: runs on click
     AppHeader.Switcher.currentApp: the open application's id, marked in the switcher
     AppHeader.Switcher.appsRoot: as for AppHeader (default "")
     AppHeader.Switcher.onOpenApp(app): as for AppHeader
     AppHeader.Switcher.apps: the applications offered (default PLENIX_APPS)
     AppHeader.Switcher.brand: the header name, drawn as the trigger; without brand it is an icon button
   Behavior:
     The header name shows "Plenix" over the application's name with a chevron; it opens the application switcher.
     The switcher shows the pinned applications first, then the others (each application once, batch 243), five to a
     row with no scrolling; pin or unpin from there.
     The switcher is a dialog: it focuses its first link, and Escape, a click outside or focus leaving it closes it.
     The header links are the applications the person pinned (from the switcher), as icon links with tooltips; the current one is marked.
     On a phone the header links leave the header; the switcher in the header name still has them.
     The end is right-aligned: search always first and furthest left, then the application's action, then the utilities with no gaps.
     Search is an icon until asked for, then a field that opens to its left without moving any other icon.
     Ctrl K (Cmd K) opens search from anywhere on the page; Escape or Close search closes it.
     An empty search field closes when focus leaves it.
     The account menu shows the name, email and picture from the session.
   Notes:
     Settings is reached from the account menu, never from a separate button.
     Notifications are not in the header: they are a section of the page (NotificationList on the dashboard).
     Other props go on the header element (AppHeader) or the button (AppHeader.Item, AppHeader.Action).
*/
function AppHeader({
  tone = 'accent',
  appName,
  brand,
  brandHref,
  currentApp,
  appsRoot = '',
  onOpenApp,
  nav,
  navLabel = 'Pinned applications',
  action,
  search,
  actions,
  account,
  switcher,
  className,
  ...rest
}) {
  const {
    pinnedApps
  } = (0, _SessionProvider.useSession)();
  const [searching, setSearching] = _react.default.useState(false);
  const panel = _react.default.useRef(null),
    toggle = _react.default.useRef(null);
  const refocus = _react.default.useRef(false);
  const searchId = (0, _layer.useUid)('plx-header-search');
  const close = () => {
    refocus.current = true;
    setSearching(false);
  };
  _react.default.useEffect(() => {
    if (!searching) {
      // the search button is hidden while the field is open; give it focus back once it shows again
      // (on the next frame: an Escape is a discrete event, so this runs before the button's hidden style is cleared)
      if (refocus.current && toggle.current) {
        const t = toggle.current;
        requestAnimationFrame(() => t.focus());
      }
      refocus.current = false;
      return undefined;
    }
    const input = panel.current && panel.current.querySelector('input');
    if (input) input.focus();
    const esc = e => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [searching]);
  // Ctrl K (Cmd K) opens search from anywhere on the page
  _react.default.useEffect(() => {
    if (!search) return undefined;
    const key = e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearching(true);
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [search]);
  // an empty field closes when focus leaves it
  const onPanelBlur = e => {
    if (panel.current && panel.current.contains(e.relatedTarget)) return;
    const input = panel.current && panel.current.querySelector('input');
    if (!input || !input.value) setSearching(false);
  };
  const inApps = currentApp !== undefined; // the application said where it is (null: a screen that is not an application)
  const app = currentApp ? (0, _apps.appById)(currentApp) : null;
  const name = appName || (app ? app.label : null);
  const brandEl = brand || (name ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__name"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__product"
  }, "Plenix"), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__app"
  }, name)) : 'Plenix');
  const open = a => e => {
    if (onOpenApp && onOpenApp(a) === true) e.preventDefault();
  };
  const pinned = nav || (inApps ? _apps.PLENIX_APPS.filter(a => pinnedApps.indexOf(a.id) >= 0).map(a => /*#__PURE__*/_react.default.createElement(AppHeader.Item, {
    key: a.id,
    icon: /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: a.icon
    }),
    label: a.label,
    current: a.id === currentApp,
    href: (0, _apps.appHref)(a, appsRoot),
    onClick: open(a)
  })) : null);
  const showSwitcher = switcher !== undefined ? switcher : inApps;
  return /*#__PURE__*/_react.default.createElement("header", _extends({
    className: (0, _cx.cx)('plx-app-header', 'plx-app-header--' + tone, searching && 'is-searching', className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-header__start"
  }, showSwitcher ? /*#__PURE__*/_react.default.createElement(AppHeader.Switcher, {
    currentApp: currentApp,
    appsRoot: appsRoot,
    onOpenApp: onOpenApp,
    brand: brandEl
  }) : brandHref ? /*#__PURE__*/_react.default.createElement("a", {
    href: brandHref,
    className: "plx-app-header__brand"
  }, brandEl) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__brand"
  }, brandEl), pinned && (!Array.isArray(pinned) || pinned.length) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__divider",
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("nav", {
    "aria-label": navLabel,
    className: "plx-app-header__nav"
  }, pinned)) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-header__end"
  }, search ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-header__search-slot"
  }, /*#__PURE__*/_react.default.createElement("button", {
    ref: toggle,
    type: "button",
    className: "plx-app-header__item plx-app-header__search-toggle",
    "aria-label": "Search",
    "aria-expanded": searching,
    "aria-controls": searchId,
    "aria-keyshortcuts": "Control+K Meta+K",
    onClick: () => setSearching(true)
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "hdr-search"
  })), searching ? /*#__PURE__*/_react.default.createElement("div", {
    ref: panel,
    id: searchId,
    className: "plx-app-header__search",
    role: "search",
    onBlur: onPanelBlur
  }, search, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-app-header__item plx-app-header__search-close",
    "aria-label": "Close search",
    onClick: close
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "close"
  }))) : null) : null, action ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-header__action"
  }, action) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-header__utilities"
  }, actions, account)));
}
AppHeader.Item = /*#__PURE__*/_react.default.forwardRef(function AppHeaderItem({
  icon,
  label,
  current = false,
  count,
  href,
  onClick,
  tooltip = true,
  className,
  ...rest
}, ref) {
  const props = {
    ref,
    className: (0, _cx.cx)('plx-app-header__item', current && 'is-current', className),
    'aria-label': label,
    'aria-current': current ? 'page' : undefined,
    onClick,
    ...rest
  };
  const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon, count ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__count",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_Count.Count, {
    value: count,
    variant: "pill",
    max: 99
  })) : null);
  const el = href ? /*#__PURE__*/_react.default.createElement("a", _extends({
    href: href
  }, props), content) : /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button"
  }, props), content);
  return tooltip ? /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    content: label
  }, el) : el;
});
AppHeader.Account = function AppHeaderAccount({
  name: nameProp,
  email: emailProp,
  src: srcProp,
  placement = 'header',
  current,
  myAccount = {},
  settings = {},
  density = false,
  extra
}) {
  const {
    account
  } = (0, _SessionProvider.useSession)(); // who is signed in: the session, unless the application names someone
  const name = nameProp || account.name,
    email = emailProp || account.email,
    src = srcProp || account.src;
  const [dens, setDens] = (0, _useDensity.useDensity)();
  const inPane = placement === 'pane';
  const label = 'Account and settings for ' + name;
  // no tooltip: it would cover the open menu, which names itself
  const trigger = inPane ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    caret: true,
    className: "plx-app-header__account-row",
    "aria-label": label
  }, /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    name: name,
    src: src,
    size: "2xs"
  }), name) : /*#__PURE__*/_react.default.createElement(AppHeader.Item, {
    icon: /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
      name: name,
      src: src
    }),
    label: label,
    current: !!current,
    tooltip: false,
    className: "plx-app-header__item--account"
  });
  const has = o => !!(o.href || o.onSelect);
  const choices = typeof window !== 'undefined' && window.PlenixWorkspace ? window.PlenixWorkspace.densities() : DENSITY_CHOICES;
  return /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: "Account",
    placement: inPane ? 'top-start' : 'bottom-end',
    trigger: trigger
  }, /*#__PURE__*/_react.default.createElement(_Menu.MenuGroup, {
    label: email ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, name, /*#__PURE__*/_react.default.createElement("br", null), email) : name
  }, has(myAccount) ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: "settings-profile",
    href: myAccount.href,
    onSelect: myAccount.onSelect,
    "aria-current": current === 'account' ? 'page' : undefined
  }, "My account") : null, has(settings) ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: "gear",
    href: settings.href,
    onSelect: settings.onSelect,
    "aria-current": current === 'settings' ? 'page' : undefined
  }, "Settings") : null), density ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null), /*#__PURE__*/_react.default.createElement(_Menu.MenuGroup, {
    label: "Display density"
  }, choices.map(d => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: d.value,
    role: "menuitemradio",
    icon: 'density-' + d.value,
    checked: dens === d.value,
    onSelect: () => setDens(d.value)
  }, d.label)))) : null, extra ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null), extra) : null);
};
// the density choices when the workspace script is not on the page
const DENSITY_CHOICES = [{
  value: 'compact',
  label: 'Compact'
}, {
  value: 'standard',
  label: 'Standard'
}, {
  value: 'comfortable',
  label: 'Comfortable'
}];
AppHeader.Action = function AppHeaderAction({
  icon,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(_Button.Button, _extends({
    icon: typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: icon
    }) : icon
  }, rest), children);
};
AppHeader.Switcher = function AppHeaderSwitcher({
  currentApp,
  appsRoot = '',
  onOpenApp,
  apps = _apps.PLENIX_APPS,
  brand
}) {
  const {
    pinnedApps,
    setPinnedApps
  } = (0, _SessionProvider.useSession)();
  const [open, setOpen] = _react.default.useState(false);
  const wrap = _react.default.useRef(null),
    panel = _react.default.useRef(null),
    trigger = _react.default.useRef(null);
  const id = (0, _layer.useUid)('plx-switcher');
  const close = refocus => {
    setOpen(false);
    if (refocus && trigger.current) trigger.current.focus();
  };
  (0, _layer.useLayer)(panel, open, {
    onEscape: () => close(true)
  });
  _react.default.useEffect(() => {
    if (!open) return undefined;
    const out = e => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', out);
    // focus leaving it (Tab past the last application) closes it too: it never stays open behind the page (batch 213)
    document.addEventListener('focusin', out);
    const first = panel.current && panel.current.querySelector('a');
    if (first) first.focus();
    return () => {
      document.removeEventListener('mousedown', out);
      document.removeEventListener('focusin', out);
    };
  }, [open]);
  const pinnedList = apps.filter(a => pinnedApps.indexOf(a.id) >= 0);
  const pin = a => setPinnedApps(prev => prev.indexOf(a.id) >= 0 ? prev.filter(x => x !== a.id) : prev.concat([a.id]));
  const tile = a => {
    const on = pinnedApps.indexOf(a.id) >= 0;
    return /*#__PURE__*/_react.default.createElement("li", {
      key: a.id,
      className: (0, _cx.cx)('plx-app-switcher__tile', on && 'is-pinned', a.id === currentApp && 'is-current')
    }, /*#__PURE__*/_react.default.createElement("a", {
      className: "plx-app-switcher__open",
      href: (0, _apps.appHref)(a, appsRoot),
      "aria-current": a.id === currentApp ? 'page' : undefined,
      onClick: e => {
        if (onOpenApp && onOpenApp(a) === true) e.preventDefault();
        setOpen(false);
      }
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-app-switcher__icon",
      "aria-hidden": "true"
    }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: a.icon
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-app-switcher__label"
    }, a.label)), /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "plx-app-switcher__pin",
      "aria-pressed": on,
      "aria-label": (on ? 'Unpin ' : 'Pin ') + a.label + (on ? ' from' : ' to') + ' the header',
      onClick: () => pin(a)
    }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: on ? 'pin-filled' : 'pin'
    })));
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: wrap,
    className: (0, _cx.cx)('plx-app-switcher', brand && 'plx-app-switcher--brand')
  }, brand ? /*#__PURE__*/_react.default.createElement("button", {
    ref: trigger,
    type: "button",
    className: "plx-app-header__brand plx-app-header__switch",
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": id,
    "aria-label": (typeof brand === 'string' ? brand : 'Plenix' + (currentApp && (0, _apps.appById)(currentApp) ? ' ' + (0, _apps.appById)(currentApp).label : '')) + ', switch application',
    onClick: () => setOpen(!open)
  }, brand, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-down",
    className: "plx-app-header__switch-chevron"
  })) : /*#__PURE__*/_react.default.createElement(AppHeader.Item, {
    ref: trigger,
    icon: /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: "app-switcher"
    }),
    label: "Applications",
    tooltip: false,
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": id,
    onClick: () => setOpen(!open)
  }), open ? /*#__PURE__*/_react.default.createElement("div", {
    ref: panel,
    id: id,
    role: "dialog",
    "aria-label": "Applications",
    className: "plx-app-switcher__panel"
  }, pinnedList.length ? /*#__PURE__*/_react.default.createElement("section", {
    className: "plx-app-switcher__pinned",
    "aria-labelledby": id + '-pinned'
  }, /*#__PURE__*/_react.default.createElement("h2", {
    id: id + '-pinned',
    className: "plx-app-switcher__heading"
  }, "Pinned to the header"), /*#__PURE__*/_react.default.createElement("ul", {
    className: "plx-app-switcher__grid"
  }, pinnedList.map(tile))) : null, apps.length > pinnedList.length ? /*#__PURE__*/_react.default.createElement("section", {
    "aria-labelledby": id + '-all'
  }, /*#__PURE__*/_react.default.createElement("h2", {
    id: id + '-all',
    className: "plx-app-switcher__heading"
  }, pinnedList.length ? 'More applications' : 'All applications'), /*#__PURE__*/_react.default.createElement("ul", {
    className: "plx-app-switcher__grid"
  }, apps.filter(a => pinnedApps.indexOf(a.id) < 0).map(tile))) : null) : null);
};
  } },
  "platform/patterns/FilterBar/FilterBar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/overflow.js":"platform/utils/overflow.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterBar = FilterBar;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _overflow = require("../../utils/overflow.js");
var _Button = require("../../components/Button/Button.jsx");
var _Menu = require("../../components/Menu/Menu.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · FilterBar
   Summary: A row of filters above a list or grid; each filter opens a menu of choices.
   Usage:
     <FilterBar label="Filters"
       filters={[{ id: 'type', label: 'Type', options: [{ value: 'png', label: 'PNG', count: 12 }], value: ['png'], multiple: true }]}
       onChange={(id, value) => …} onClearAll={() => …} actions={<…/>} />
   Props:
     label: the accessible name of the row of filters (default strings.label: "Filters")
     filters: the filters, in order: [{ id, label, options: [{ value, label, count }], value, multiple }]
     filters[].multiple: true: value is an array of option values and the menu stays open while choosing; false: value is one option value (or null) and choosing closes the menu
     onChange(id, value): runs when a filter's value changes
     onClearAll(): runs from "Clear all"; without it there is no "Clear all"
     actions: controls at the end of the row (a sort menu, a view switch)
     className: more classes on the row
     strings: the words it shows and announces, for other languages: { label: "Filters", more: "More filters", clearAll:
       "Clear all", one: "{label}: {value}", several: "{label} · {count}" } (one and several build a set filter's button text)
   Behavior:
     A filter with a value shows it in its button ("Type: PNG", or "Type · 2" for several) and the selected state.
     Filters that do not fit on the row move into a "More filters" menu: the same choices, grouped by filter.
     "Clear all" appears when any filter is set.
*/

const isSet = f => f.multiple ? (f.value || []).length > 0 : f.value !== null && f.value !== undefined && f.value !== '';
const STRINGS = {
  label: 'Filters',
  more: 'More filters',
  clearAll: 'Clear all',
  one: '{label}: {value}',
  several: '{label} · {count}'
};
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? String(vars[k]) : m);
const summary = (f, t) => {
  if (!isSet(f)) return f.label;
  if (f.multiple) {
    const v = f.value;
    if (v.length > 1) return fill(t.several, {
      label: f.label,
      count: v.length
    });
    const o = f.options.find(x => x.value === v[0]);
    return fill(t.one, {
      label: f.label,
      value: o ? o.label : v[0]
    });
  }
  const o = f.options.find(x => x.value === f.value);
  return fill(t.one, {
    label: f.label,
    value: o ? o.label : f.value
  });
};
function choices(f, onChange) {
  return f.options.map(o => {
    const on = f.multiple ? (f.value || []).indexOf(o.value) >= 0 : f.value === o.value;
    const pick = () => {
      if (f.multiple) onChange(f.id, on ? f.value.filter(v => v !== o.value) : (f.value || []).concat(o.value));else onChange(f.id, on ? null : o.value);
    };
    return /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
      key: o.value,
      checked: on,
      keepOpen: !!f.multiple,
      onSelect: pick
    }, o.label, o.count !== undefined ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-filter-bar__count"
    }, o.count) : null);
  });
}
function FilterBar({
  label,
  filters,
  onChange,
  onClearAll,
  actions,
  strings,
  className
}) {
  const t = Object.assign({}, STRINGS, strings);
  const list = _react.default.useRef(null);
  const fit = (0, _overflow.useOverflow)(list, filters.length, filters.map(f => summary(f, t)).join('|'));
  const hidden = filters.slice(fit);
  const anySet = filters.some(isSet);
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    "aria-label": label || t.label,
    className: (0, _cx.cx)('plx-filter-bar', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: list,
    className: "plx-filter-bar__filters"
  }, (0, _overflow.splitAt)(filters.map(f => /*#__PURE__*/_react.default.createElement("span", {
    key: f.id,
    "data-plx-overflow-item": "",
    className: "plx-filter-bar__slot"
  }, /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: f.label,
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "sm",
      caret: true,
      selected: isSet(f)
    }, summary(f, t))
  }, choices(f, onChange)))), fit, hidden.length ? /*#__PURE__*/_react.default.createElement("span", {
    key: "plx-more",
    "data-plx-overflow-more": "",
    className: "plx-filter-bar__slot"
  }, /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: t.more,
    placement: "bottom-end",
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "sm",
      caret: true,
      selected: hidden.some(isSet)
    }, t.more)
  }, hidden.map((f, i) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: f.id
  }, i ? /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null) : null, /*#__PURE__*/_react.default.createElement(_Menu.MenuGroup, {
    label: f.label
  }, choices({
    ...f,
    multiple: true,
    value: f.multiple ? f.value : isSet(f) ? [f.value] : []
  }, (id, v) => onChange(id, f.multiple ? v : v.filter(x => x !== f.value)[0] || null))))))) : null)), anySet && onClearAll ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    onClick: onClearAll
  }, t.clearAll) : null, actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-filter-bar__actions"
  }, actions) : null);
}
  } },
  "platform/patterns/SearchWorkspace/SearchWorkspace.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/SearchField/SearchField.jsx":"platform/components/SearchField/SearchField.jsx","../../components/SegmentedControl/SegmentedControl.jsx":"platform/components/SegmentedControl/SegmentedControl.jsx","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","../../components/Tag/Tag.jsx":"platform/components/Tag/Tag.jsx","../../components/EmptyState/EmptyState.jsx":"platform/components/EmptyState/EmptyState.jsx","../FilterBar/FilterBar.jsx":"platform/patterns/FilterBar/FilterBar.jsx","../../utils/layer.js":"platform/utils/layer.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchWorkspace = SearchWorkspace;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Button = require("../../components/Button/Button.jsx");
var _SearchField = require("../../components/SearchField/SearchField.jsx");
var _SegmentedControl = require("../../components/SegmentedControl/SegmentedControl.jsx");
var _Menu = require("../../components/Menu/Menu.jsx");
var _Tag = require("../../components/Tag/Tag.jsx");
var _EmptyState = require("../../components/EmptyState/EmptyState.jsx");
var _FilterBar = require("../FilterBar/FilterBar.jsx");
var _layer = require("../../utils/layer.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · SearchWorkspace
   Summary: The Advanced Search workspace (level 3 of Plenix search), a view of the main work area like Categories or Files.
     It is normal browsing with more powerful filtering, never a form of field / operator / value rows.
   Usage:
     <SearchWorkspace title="Search results" query={query} onQueryChange={setQuery} placeholder="Search…"
       filters={[…]} onFilterChange={(id, value) => …} onClearAll={() => …} count={128} noun="asset"
       sort={{ value, options, onChange }} view={{ value, options, onChange }} onSave={() => …}
       headStart={<…/>} headEnd={<…/>} bulk={<BulkActions…/>}>{results}</SearchWorkspace>
   Props:
     title: strings.title ("Search", the default) before a query, "Search results" after one, or a saved search's name (the capability decides)
     query: the search field's text (default "")
     onQueryChange(next): runs when the search field changes; Enter or typing updates the results (the capability filters)
     placeholder: the search field's placeholder (default strings.placeholder: "Search…")
     filters: FilterBar filters: [{ id, label, options, value, multiple }]
     onFilterChange(id, value): runs when a filter changes or its chip is removed
     onClearAll(): runs from Clear all, beside the chips of the set filters
     count: the number of results, for the result count line (default 0)
     noun: the word for one result in both count lines, as in "128 assets" (default strings.result: "result")
     plural: the word for several (default: noun + "s", or strings.results: "results" without a noun)
     sort: { value, options, onChange }; a Sort menu (optional)
     view: { value, options, onChange }; a Grid / Table switch (optional)
     onSave(): shows Save search (only capabilities that keep saved searches)
     headStart: extra controls at the start of the title row (a menu button, a details toggle)
     headEnd: extra controls at the end of the title row
     bulk: a BulkActions bar shown above the results
     className: more classes
     children: the results
     locale: the language the count is formatted in (default: the page's language, document.documentElement.lang)
     strings: the words it shows and announces, for other languages: { title: "Search", placeholder: "Search…", result:
       "result", results: "results", searchField: "Search {nouns}", save: "Save search", filters: "Filters", activeFilters:
       "Active filters", chip: "{label}: {value}", remove: "Remove {text}", clearAll: "Clear all", view: "View", grid: "Grid",
       table: "Table", sort: "Sort", sortValue: "Sort: {value}", noMatchQuery: "Nothing matches “{query}”.",
       noMatchQueryFilters: "Nothing matches “{query}” with these filters.", noMatchFilters: "Nothing matches these filters." }
   Behavior:
     Set filters are repeated as removable chips under the toolbar ("Type: PNG ×") with Clear all.
     The count line is announced politely.
     When count is 0 the results area says there is nothing to show for the query.
   Notes:
     The application shell (header, left navigation, a details panel where the capability has one) stays, and only the center changes.
     Pressing Enter in the header search opens it with the query kept.
*/

const STRINGS = {
  title: 'Search',
  placeholder: 'Search…',
  result: 'result',
  results: 'results',
  searchField: 'Search {nouns}',
  save: 'Save search',
  filters: 'Filters',
  activeFilters: 'Active filters',
  chip: '{label}: {value}',
  remove: 'Remove {text}',
  clearAll: 'Clear all',
  view: 'View',
  grid: 'Grid',
  table: 'Table',
  sort: 'Sort',
  sortValue: 'Sort: {value}',
  noMatchQuery: 'Nothing matches “{query}”.',
  noMatchQueryFilters: 'Nothing matches “{query}” with these filters.',
  noMatchFilters: 'Nothing matches these filters.'
};
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? String(vars[k]) : m);
const label = (f, v) => {
  const o = (f.options || []).find(x => x.value === v);
  return o ? o.label : String(v);
};
function SearchWorkspace({
  title,
  query = '',
  onQueryChange,
  placeholder,
  filters = [],
  onFilterChange,
  onClearAll,
  count = 0,
  noun,
  plural,
  sort,
  view,
  onSave,
  headStart,
  headEnd,
  bulk,
  locale,
  strings,
  className,
  children
}) {
  const t = Object.assign({}, STRINGS, strings);
  const loc = locale || typeof document !== 'undefined' && document.documentElement.lang || undefined;
  const id = (0, _layer.useUid)('plx-search-ws');
  const field = _react.default.useRef(null);
  // the query typed here is applied as the person types; Enter keeps focus in the field
  const chips = [];
  filters.forEach(f => {
    if (f.multiple) (f.value || []).forEach(v => chips.push({
      f,
      v,
      text: fill(t.chip, {
        label: f.label,
        value: label(f, v)
      }),
      remove: () => onFilterChange(f.id, (f.value || []).filter(x => x !== v))
    }));else if (f.value !== null && f.value !== undefined && f.value !== '') chips.push({
      f,
      v: f.value,
      text: fill(t.chip, {
        label: f.label,
        value: label(f, f.value)
      }),
      remove: () => onFilterChange(f.id, null)
    });
  });
  const nouns = count === 1 ? noun || t.result : plural || (noun ? noun + 's' : t.results);
  const counted = count.toLocaleString(loc) + ' ' + nouns;
  return /*#__PURE__*/_react.default.createElement("section", {
    "aria-labelledby": id + '-title',
    className: (0, _cx.cx)('plx-search-ws', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-ws__head"
  }, headStart, /*#__PURE__*/_react.default.createElement("h2", {
    id: id + '-title',
    className: "plx-search-ws__title"
  }, title === undefined ? t.title : title), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-search-ws__count",
    "aria-live": "polite"
  }, counted), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-search-ws__spacer"
  }), onSave ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    icon: "save",
    onClick: onSave
  }, t.save) : null, headEnd), /*#__PURE__*/_react.default.createElement("div", {
    role: "search",
    className: "plx-search-ws__query"
  }, /*#__PURE__*/_react.default.createElement(_SearchField.SearchField, {
    ref: field,
    label: fill(t.searchField, {
      nouns
    }),
    placeholder: placeholder === undefined ? t.placeholder : placeholder,
    value: query,
    onChange: e => onQueryChange && onQueryChange(e.target.value),
    onClear: () => onQueryChange && onQueryChange('')
  })), filters.length ? /*#__PURE__*/_react.default.createElement(_FilterBar.FilterBar, {
    label: t.filters,
    filters: filters,
    onChange: onFilterChange
  }) : null, chips.length ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-ws__active",
    role: "group",
    "aria-label": t.activeFilters
  }, chips.map(c => /*#__PURE__*/_react.default.createElement(_Tag.Chip, {
    key: c.f.id + ':' + c.v,
    selected: true,
    onRemove: c.remove,
    removeLabel: fill(t.remove, {
      text: c.text
    })
  }, c.text)), onClearAll ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "xs",
    variant: "link",
    onClick: onClearAll
  }, t.clearAll) : null) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-ws__bar"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-search-ws__results"
  }, counted), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-search-ws__spacer"
  }), view ? /*#__PURE__*/_react.default.createElement(_SegmentedControl.SegmentedControl, {
    label: t.view,
    value: view.value,
    onChange: view.onChange,
    options: view.options || [{
      value: 'grid',
      label: t.grid
    }, {
      value: 'table',
      label: t.table
    }]
  }) : null, sort ? /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: t.sort,
    placement: "bottom-end",
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "sm",
      icon: "sort",
      caret: true,
      "aria-label": fill(t.sortValue, {
        value: sort.value
      })
    }, fill(t.sortValue, {
      value: sort.value
    }))
  }, sort.options.map(o => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: o,
    checked: sort.value === o,
    onSelect: () => sort.onChange(o)
  }, o))) : null), bulk, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-ws__body"
  }, count ? children : /*#__PURE__*/_react.default.createElement(_EmptyState.EmptyState, {
    size: "inline"
  }, query ? fill(chips.length ? t.noMatchQueryFilters : t.noMatchQuery, {
    query
  }) : t.noMatchFilters)));
}
  } },
  "platform/patterns/DataToolbar/DataToolbar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Toolbar/Toolbar.jsx":"platform/components/Toolbar/Toolbar.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataToolbar = DataToolbar;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Toolbar = require("../../components/Toolbar/Toolbar.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · DataToolbar
   Summary: The toolbar row above a list or grid (view switch, sort, size, export).
   Usage:
     <DataToolbar label="View options" start={<>…</>} end={<>…</>} />
   Props:
     label: the toolbar's accessible name
     start: a group of controls at the start of the row
     end: a group of controls at the end of the row
     children: controls after the start group
     className: more classes
   Behavior:
     It is a Toolbar: arrow keys move between the controls (one Tab stop sequence).
     Controls take the toolbar role height.
*/

function DataToolbar({
  label,
  start,
  end,
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement(_Toolbar.Toolbar, {
    label: label,
    className: (0, _cx.cx)('plx-data-toolbar', className)
  }, start ? /*#__PURE__*/_react.default.createElement(_Toolbar.Toolbar.Group, {
    className: "plx-data-toolbar__group"
  }, start) : null, children, /*#__PURE__*/_react.default.createElement(_Toolbar.Toolbar.Spacer, null), end ? /*#__PURE__*/_react.default.createElement(_Toolbar.Toolbar.Group, {
    className: "plx-data-toolbar__group"
  }, end) : null);
}
  } },
  "platform/patterns/BulkActions/BulkActions.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/overflow.js":"platform/utils/overflow.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulkActions = BulkActions;
exports.SelectionSummary = SelectionSummary;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _overflow = require("../../utils/overflow.js");
var _Button = require("../../components/Button/Button.jsx");
var _Menu = require("../../components/Menu/Menu.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · SelectionSummary, BulkActions
   Summary: What is selected, and what can be done with it. SelectionSummary counts the selection; BulkActions is the bar
     shown while something is selected.
   Usage:
     <SelectionSummary count={3} total={120} noun="asset" plural="assets" onSelectAll={() => …} onClear={() => …} />
     <BulkActions count={3} total={120} noun="asset" onSelectAll={() => …} onClear={() => …}
       actions={[{ id: 'download', label: 'Download', icon: 'download', onSelect: () => … }]} />
   Props:
     SelectionSummary.count: how many are selected
     SelectionSummary.total: how many can be selected
     SelectionSummary.noun: the word for one item (default "item")
     SelectionSummary.plural: the word for several (default: noun + "s")
     SelectionSummary.onSelectAll(): runs from "Select all <total>"; without it (or without total) there is no Select all
     SelectionSummary.onClear(): runs from "Clear selection"; without it there is no Clear selection
     SelectionSummary.className: more classes
     SelectionSummary.strings: the words it shows, for other languages: { selected: (n, word) => n + " " + word + " selected",
       selectAll: (n) => "Select all " + n, clear: "Clear selection" } (word is the noun or plural, chosen by count)
     BulkActions.count: how many are selected; nothing renders at 0
     BulkActions.total: as for SelectionSummary
     BulkActions.noun: as for SelectionSummary
     BulkActions.plural: as for SelectionSummary
     BulkActions.onSelectAll(): as for SelectionSummary
     BulkActions.onClear(): as for SelectionSummary
     BulkActions.actions: the actions, in order: [{ id, label, icon, danger, single, onSelect, items }]
     BulkActions.actions[].danger: a destructive action, drawn as such
     BulkActions.actions[].single: the action applies to one item only, so it is disabled while more than one is selected
     BulkActions.actions[].items: [{ id, label, danger, single, onSelect }]; makes the action a menu button (a group of related actions)
     BulkActions.label: the toolbar's accessible name (default strings.label: "Selection actions")
     BulkActions.className: more classes
     BulkActions.strings: as for SelectionSummary, plus { label: "Selection actions", more: "More", moreLabel: "More actions" }
   Behavior:
     SelectionSummary reads "3 assets selected", announced politely.
     "Select all 120" shows when more can be selected.
     BulkActions shows a SelectionSummary, then the actions.
     Actions that do not fit move into a "More actions" menu; a menu button's items appear there as a group.
*/
const off = (a, count) => !!(a.single && count > 1);
const STRINGS = {
  selected: (n, word) => n + ' ' + word + ' selected',
  selectAll: n => 'Select all ' + n,
  clear: 'Clear selection',
  label: 'Selection actions',
  more: 'More',
  moreLabel: 'More actions'
};
function SelectionSummary({
  count,
  total,
  noun = 'item',
  plural,
  onSelectAll,
  onClear,
  strings,
  className
}) {
  const t = Object.assign({}, STRINGS, strings);
  const words = t.selected(count, count === 1 ? noun : plural || noun + 's');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-selection-summary', className)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-selection-summary__count",
    "aria-live": "polite"
  }, words), onSelectAll && total !== undefined && count < total ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "link",
    onClick: onSelectAll
  }, t.selectAll(total)) : null, onClear ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    onClick: onClear
  }, t.clear) : null);
}
function BulkActions({
  count,
  total,
  noun,
  plural,
  onSelectAll,
  onClear,
  actions = [],
  label,
  strings,
  className
}) {
  const t = Object.assign({}, STRINGS, strings);
  const list = _react.default.useRef(null);
  const fit = (0, _overflow.useOverflow)(list, actions.length, actions.map(a => a.label).join('|') + (count ? '' : '0'));
  if (!count) return null;
  const hidden = actions.slice(fit);
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "toolbar",
    "aria-label": label || t.label,
    className: (0, _cx.cx)('plx-bulk-actions', className)
  }, /*#__PURE__*/_react.default.createElement(SelectionSummary, {
    count: count,
    total: total,
    noun: noun,
    plural: plural,
    onSelectAll: onSelectAll,
    onClear: onClear,
    strings: strings
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-bulk-actions__divider",
    "aria-hidden": "true"
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: list,
    className: "plx-bulk-actions__list"
  }, (0, _overflow.splitAt)(actions.map(a => /*#__PURE__*/_react.default.createElement("span", {
    key: a.id,
    "data-plx-overflow-item": "",
    className: "plx-bulk-actions__slot"
  }, a.items ? /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: a.label,
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "sm",
      icon: a.icon,
      caret: true
    }, a.label)
  }, a.items.map(it => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: it.id,
    danger: it.danger,
    disabled: off(it, count),
    onSelect: it.onSelect
  }, it.label))) : /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: a.danger ? 'danger-secondary' : 'secondary',
    icon: a.icon,
    disabled: off(a, count),
    onClick: a.onSelect
  }, a.label))), fit, hidden.length ? /*#__PURE__*/_react.default.createElement("span", {
    key: "plx-more",
    "data-plx-overflow-more": "",
    className: "plx-bulk-actions__slot"
  }, /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: t.moreLabel,
    placement: "bottom-end",
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "sm",
      caret: true
    }, t.more)
  }, hidden.map(a => a.items ? /*#__PURE__*/_react.default.createElement(_Menu.MenuGroup, {
    key: a.id,
    label: a.label
  }, a.items.map(it => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: it.id,
    danger: it.danger,
    disabled: off(it, count),
    onSelect: it.onSelect
  }, it.label))) : /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: a.id,
    icon: a.icon,
    danger: a.danger,
    disabled: off(a, count),
    onSelect: a.onSelect
  }, a.label)))) : null)));
}
  } },
  "platform/patterns/ContentGrid/ContentGrid.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentGrid = ContentGrid;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ContentGrid
   Summary: A responsive grid of cards.
   Usage:
     <ContentGrid size="md" label="Assets"><Card…/><Card…/></ContentGrid>
   Props:
     size: "xs" | "sm" | "md" (default) | "lg"; sets the smallest card width (100, 140, 180, 240px)
     label: names the list
     className: more classes on the grid
     children: the cards; each child is one list item (null, undefined and false are skipped)
   Behavior:
     Columns fill the width.
     The gap follows the density (--plx-sys-card-grid-gap).
*/

function ContentGrid({
  size = 'md',
  label,
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("ul", {
    "aria-label": label,
    className: (0, _cx.cx)('plx-content-grid', 'plx-content-grid--' + size, className)
  }, _react.default.Children.map(children, c => c === null || c === undefined || c === false ? null : /*#__PURE__*/_react.default.createElement("li", {
    className: "plx-content-grid__item"
  }, c)));
}
  } },
  "platform/patterns/PropertyList/PropertyList.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/overflow.js":"platform/utils/overflow.js","../../components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PropertyList = PropertyList;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _overflow = require("../../utils/overflow.js");
var _Tooltip = require("../../components/Tooltip/Tooltip.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · PropertyList
   Summary: Label and value pairs (metadata, details, settings summaries), as a description list.
   Usage:
     <PropertyList layout="columns">
       <PropertyList.Item label="Size" data>2.4 MB</PropertyList.Item>
     </PropertyList>
   Props:
     layout: "columns" (default; label and value side by side on a shared baseline) | "stacked" (label above value)
     className: more classes on the list
     children: the PropertyList.Item pairs
     PropertyList.Item.label: the label
     PropertyList.Item.htmlFor: the id of a control in the item, so the label names it
     PropertyList.Item.description: a line under the label
     PropertyList.Item.data: the value is a technical value (the data font); default false
     PropertyList.Item.className: more classes on the pair
     PropertyList.Item.children: the value
   Notes:
     For an editable value put the control in the item and pass htmlFor (its id) so the label names it.
     A name/value table (reference data, a component's details) is a DataTable, not a PropertyList: every table is a
     Tabulator grid (batch 229).
*/

function PropertyList({
  layout = 'columns',
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("dl", {
    className: (0, _cx.cx)('plx-property-list', 'plx-property-list--' + layout, className)
  }, children);
}
PropertyList.Item = function PropertyListItem({
  label,
  htmlFor,
  description,
  data = false,
  className,
  children
}) {
  const textRef = _react.default.useRef(null);
  const cut = (0, _overflow.useTruncated)(textRef);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-property-list__item', className)
  }, /*#__PURE__*/_react.default.createElement("dt", {
    className: "plx-property-list__label"
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    content: label,
    disabled: !cut,
    className: "plx-property-list__label-tip"
  }, /*#__PURE__*/_react.default.createElement("span", {
    ref: textRef,
    className: "plx-property-list__label-text"
  }, htmlFor ? /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: htmlFor
  }, label) : label)), description ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-property-list__description"
  }, description) : null), /*#__PURE__*/_react.default.createElement("dd", {
    className: (0, _cx.cx)('plx-property-list__value', data && 'plx-property-list__value--data')
  }, children));
};
  } },
  "platform/patterns/RecordPage/RecordPage.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordPage = RecordPage;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · RecordPage, RecordPage.Header
   Summary: The Object / record page structure (11 › Page structures): a header region over the record's body and an
     optional aside. RecordPage.Header is the header region: the title block of a page, panel or record, also used alone.
   Usage:
     <RecordPage header={<RecordPage.Header title="Cross 014.png" meta={<…/>} actions={<…/>} />} aside={<…/>}>…</RecordPage>
     <RecordPage.Header title="General" description="Language, regional formats…" meta={<…/>} media={<…/>} actions={<…/>}
       size="lg" surface="card" headingLevel={1} />
   Props:
     header: the header region (a RecordPage.Header)
     aside: an optional column on the end side (facts, related items)
     children: the record's body (panels, tables)
     className: more classes on the page
     RecordPage.Header.title: the heading
     RecordPage.Header.description: a paragraph under the title
     RecordPage.Header.meta: a line of badges or technical values under the title
     RecordPage.Header.media: a thumbnail or avatar before the text
     RecordPage.Header.actions: controls at the end
     RecordPage.Header.size: "lg" (default; a page or settings screen title, 20px) | "md" (a record or panel title, 15px)
     RecordPage.Header.surface: "none" (default; the header sits on the page) | "card" (a card like the panels below it, with a soft warm
       gradient and the media in the header-card icon color; a page title that leads a column of panels)
     RecordPage.Header.headingLevel: the title's heading level (default 1)
     RecordPage.Header.className: more classes on the header
*/

function Header({
  title,
  description,
  meta,
  media,
  actions,
  size = 'lg',
  surface = 'none',
  headingLevel = 1,
  className
}) {
  const H = 'h' + headingLevel;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-record-page__header', 'plx-record-page__header--' + size, surface === 'card' && 'plx-record-page__header--card', className)
  }, media ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__media"
  }, media) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__text"
  }, /*#__PURE__*/_react.default.createElement(H, {
    className: "plx-record-page__title"
  }, title), description ? /*#__PURE__*/_react.default.createElement("p", {
    className: "plx-record-page__description"
  }, description) : null, meta ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__meta"
  }, meta) : null), actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__actions"
  }, actions) : null);
}
function RecordPage({
  header,
  aside,
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-record-page', className)
  }, header, aside ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__columns"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__body"
  }, children), /*#__PURE__*/_react.default.createElement("aside", {
    className: "plx-record-page__aside"
  }, aside)) : /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-record-page__body"
  }, children));
}
RecordPage.Header = Header;
  } },
  "platform/patterns/ActivityList/ActivityList.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityList = ActivityList;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ActivityList
   Summary: A list of things that happened or arrived (messages, versions, notifications, notes).
   Usage:
     <ActivityList label="Recent emails">
       <ActivityList.Item leading={<Avatar…/>} title="Maya Chen" meta="Round 3 concepts"
         time="10:24 AM" dateTime="2026-10-05T10:24" unread onOpen={() => …} actions={<…/>} />
     </ActivityList>
   Props:
     label: the list's accessible name
     stacked: the meta on its own line under the title, in the smallest type (--plx-ref-font-size-09): for narrow panes
       such as an inspector (batch 260); default false: title and meta on one line
     className: more classes on the list
     children: the ActivityList.Item rows
     ActivityList.Item.leading: content before the text (an avatar, an icon)
     ActivityList.Item.title: the row's title; it opens the item when onOpen or href is given
     ActivityList.Item.meta: a line under the title
     ActivityList.Item.time: the time shown at the row's end
     ActivityList.Item.dateTime: the machine-readable time of the time element
     ActivityList.Item.unread: a dot and a bold title (and "Unread" for screen readers); default false
     ActivityList.Item.selected: the row whose details are shown (aria-current); default false
     ActivityList.Item.onOpen(): runs when the title is activated (the title is a button)
     ActivityList.Item.href: the title is a link that opens the item (instead of onOpen)
     ActivityList.Item.actions: controls at the row's end
     ActivityList.Item.className: more classes on the row
   Behavior:
     Alignment (owner, batch 271): a row's content starts and ends at the list's edges, in line with a section heading and
       its line; a row that opens keeps a small inset for its hover fill, pulled back by the same token.
     With onOpen or href the title opens the item and covers the row: one Tab stop, and the actions stay reachable.
     Row padding follows the density.
*/

function ActivityList({
  label,
  stacked = false,
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("ul", {
    "aria-label": label,
    className: (0, _cx.cx)('plx-activity-list', stacked && 'plx-activity-list--stacked', className)
  }, children);
}
ActivityList.Item = function ActivityListItem({
  leading,
  title,
  meta,
  time,
  dateTime,
  unread = false,
  selected = false,
  onOpen,
  href,
  actions,
  className
}) {
  const opener = href ? /*#__PURE__*/_react.default.createElement("a", {
    href: href,
    className: "plx-activity-list__opener"
  }, title) : onOpen ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-activity-list__opener",
    onClick: onOpen
  }, title) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__opener"
  }, title);
  return /*#__PURE__*/_react.default.createElement("li", {
    className: (0, _cx.cx)('plx-activity-list__item', (href || onOpen) && 'is-interactive', unread && 'is-unread', selected && 'is-selected', className),
    "aria-current": selected ? 'true' : undefined
  }, unread ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__unread"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-visually-hidden"
  }, "Unread")) : null, leading ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__leading"
  }, leading) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__text"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__title"
  }, opener), meta ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__meta"
  }, meta) : null), time ? /*#__PURE__*/_react.default.createElement("time", {
    className: "plx-activity-list__time",
    dateTime: dateTime
  }, time) : null, actions ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-activity-list__actions"
  }, actions) : null);
};
  } },
  "platform/patterns/NotificationList/NotificationList.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../providers/SessionProvider.jsx":"platform/providers/SessionProvider.jsx","../ActivityList/ActivityList.jsx":"platform/patterns/ActivityList/ActivityList.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/EmptyState/EmptyState.jsx":"platform/components/EmptyState/EmptyState.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotificationList = NotificationList;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _SessionProvider = require("../../providers/SessionProvider.jsx");
var _ActivityList = require("../ActivityList/ActivityList.jsx");
var _Button = require("../../components/Button/Button.jsx");
var _EmptyState = require("../../components/EmptyState/EmptyState.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · NotificationList
   Summary: The signed-in person's notifications, as a list (the session's, unless items are given).
   Usage:
     <NotificationList limit={5} onViewAll={() => …} onOpen={(n) => …} />
   Props:
     items: [{ id, text, time, unread }] (default: useSession().notifications)
     onChange(next): runs with the updated list after a read
     onOpen(n): runs when a notification is opened
     onViewAll(): adds a "View all" button that runs it
     limit: how many to show (default: all)
     label: the list's accessible name (default strings.label: "Notifications")
     footer: true (default) shows Mark all read and View all under the list; false when the page puts Mark all read in its
       own header (useSession().setNotifications)
     className: more classes
     strings: the words it shows and announces, for other languages: { label: "Notifications", empty: "No notifications",
       markAllRead: "Mark all read", viewAll: "View all" }
   Behavior:
     Unread ones are marked (ActivityList's unread dot) and bold.
     Opening one marks it read; Mark all read clears them, and is disabled when none are unread.
     Without items, the reads are saved to the session.
     With no notifications it says "No notifications".
   Notes:
     It lives in the page (the dashboard's Notifications section), not in the header: the header carries no notifications.
*/

const STRINGS = {
  label: 'Notifications',
  empty: 'No notifications',
  markAllRead: 'Mark all read',
  viewAll: 'View all'
};
function NotificationList({
  items,
  onChange,
  onOpen,
  onViewAll,
  limit,
  label,
  footer = true,
  strings,
  className
}) {
  const t = Object.assign({}, STRINGS, strings);
  const session = (0, _SessionProvider.useSession)();
  const own = items || session.notifications;
  const unread = own.filter(n => n.unread).length;
  const save = next => {
    if (!items) session.setNotifications(next);
    if (onChange) onChange(next);
  };
  const markAll = () => save(own.map(n => Object.assign({}, n, {
    unread: false
  })));
  const open = n => {
    if (n.unread) save(own.map(x => x.id === n.id ? Object.assign({}, x, {
      unread: false
    }) : x));
    if (onOpen) onOpen(n);
  };
  const shown = limit ? own.slice(0, limit) : own;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-notification-list', className)
  }, shown.length ? /*#__PURE__*/_react.default.createElement(_ActivityList.ActivityList, {
    label: label || t.label
  }, shown.map(n => /*#__PURE__*/_react.default.createElement(_ActivityList.ActivityList.Item, {
    key: n.id,
    title: n.text,
    time: n.time,
    unread: !!n.unread,
    onOpen: () => open(n)
  }))) : /*#__PURE__*/_react.default.createElement(_EmptyState.EmptyState, {
    size: "inline"
  }, t.empty), footer ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notification-list__footer"
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    disabled: !unread,
    onClick: markAll
  }, t.markAllRead), onViewAll ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    onClick: onViewAll
  }, t.viewAll) : null) : null);
}
  } },
  "platform/providers/pageLayouts.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGE_LAYOUTS = exports.DEFAULT_PAGE = void 0;
exports.pageLayout = pageLayout;
/* Plenix · Page layouts (platform/providers/pageLayouts.js)
   GENERATED by build-standards.js from platform/standards/layout.json (the design system's layout standard): edit the
   JSON, never this file.
   Summary: Which layout each kind of page gets. An application says what a page is; the standard decides how it is laid out.
   Usage:
     <AppShell page="settings">…</AppShell>    (or a pattern that is that kind of page, such as SettingsLayout)
     pageLayout("settings")                   // "contained"
   Props:
     PAGE_LAYOUTS: { <kind>: { layout, use } } from the standard
     DEFAULT_PAGE: the kind of page when none is given
     pageLayout(kind): the layout mode of a kind of page (the default kind's for an unknown kind)
*/
const PAGE_LAYOUTS = exports.PAGE_LAYOUTS = {
  workspace: {
    layout: "fluid",
    use: "Lists, grids, browse and search: most application screens (the default)"
  },
  dashboard: {
    layout: "fluid",
    use: "An overview of widgets and sections"
  },
  settings: {
    layout: "contained",
    use: "Settings and preferences (every SettingsLayout page)"
  },
  form: {
    layout: "contained",
    use: "A form on its own page: create or edit one thing"
  },
  detail: {
    layout: "hybrid",
    use: "One record or document, with text to read"
  },
  "master-detail": {
    layout: "multi-pane",
    use: "A list beside the chosen item, each scrolling on its own (mail, chat)"
  },
  editor: {
    layout: "focus",
    use: "One task that needs all the room (image editor)"
  }
};
const DEFAULT_PAGE = exports.DEFAULT_PAGE = "workspace";
function pageLayout(kind) {
  return (PAGE_LAYOUTS[kind] || PAGE_LAYOUTS[DEFAULT_PAGE]).layout;
}
  } },
  "platform/patterns/AppShell/AppShell.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/direction.js":"platform/utils/direction.js","../../providers/pageLayouts.js":"platform/providers/pageLayouts.js"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppShell = AppShell;
exports.LayoutContext = void 0;
exports.PageContent = PageContent;
exports.PanelSplitter = PanelSplitter;
exports.SideNavPortal = SideNavPortal;
exports.useAppLayout = exports.tokenValue = exports.tokenPx = exports.readPref = exports.below = void 0;
exports.useMedia = useMedia;
exports.writePref = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _direction = require("../../utils/direction.js");
var _pageLayouts = require("../../providers/pageLayouts.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · AppShell, PageContent, SideNavPortal
   Summary: The root of an application page, after the Layout grid's shell: the header across the top, a body row with the
     navigation (left), the main region and the inspector panel (right), then the footer across the bottom.
   Usage:
     <AppShell header={<AppHeader…/>} sideNav={<NavPane…/>} panel={<SidePanel…/>} footer={<StatusBar…/>}>
       <PageContent>…</PageContent>
     </AppShell>
     <SideNavPortal><NavPane…/></SideNavPortal>
   Props:
     header: the header across the top (AppHeader)
     sideNav: the navigation on the left (NavPane); without it a screen can fill the area through SideNavPortal
     panel: the inspector panel on the right (SidePanel)
     footer: the footer across the bottom (StatusBar)
     page: what kind of page this is (default "workspace"): "workspace" | "dashboard" | "settings" | "form" | "detail" |
       "master-detail" | "editor". The design system's layout standard (providers/pageLayouts.js) decides its layout mode:
       fluid (full width), contained (one centered column at the 960px form width), hybrid (full width, text at 760px and
       forms at 960px), multi-pane (panes that each scroll on their own) or focus (navigation and inspector hidden).
       An application never sets the mode itself; a pattern that is a kind of page claims it (SettingsLayout: "settings").
     mainId: the main region's id, the skip link's target (default "main")
     mainClassName: more classes on the main region
     className: more classes on the shell
     children: the main region's content
     strings: the words it shows, for other languages: { skip: "Skip to main content" } (the skip link)
     PageContent.as: "section" (default) | "div"
     PageContent.className: more classes on the column
     PageContent.children: the page's parts
     SideNavPortal.children: the navigation (a NavPane) that a screen hands to the shell's navigation area
     useAppLayout(): the layout state for the panes, or null outside an AppShell:
       { mode, open, expanded, width, setWidth, toggle, close, small, hasSideNav, page, layout, claimPage(kind) }
   Behavior:
     The areas are the shell's immediate children.
     The header and the footer always span the full width, above and below both side areas.
     The side areas live between the header and the footer, also when they open as overlays.
     Navigation: --plx-sys-shell-nav-width (240px), resizable 140–320px with the splitter on its edge; the width is remembered.
     The splitters follow the writing direction: in a right-to-left page the edges are mirrored, so dragging and Arrow Left /
       Right move the edge the mirrored way (the key toward the outside widens the area).
     The navigation's own Collapse button (in the pane's header) or Ctrl+[ collapses it to a rail whose Expand button opens
       it again; this is remembered.
     Below 768px the navigation is a rail; Expand opens it over the main region, and Escape or a click outside closes it.
     Inspector panel: see SidePanel (--plx-sys-panel-inspector-width by density; it collapses to a rail).
     The main region fills the rest and scrolls itself; the content grid lives in it.
     The layout mode is data-plx-layout on the shell and on the main region; app-shell.css draws each mode (batch 217).
     The mode comes from the page's kind through the layout standard (providers/pageLayouts.js; batch 218).
     A skip link is the first stop.
     PageContent fills the rest of the main region (beside a SecondaryPane, if any) and scrolls itself.
     PageContent keeps the layout padding (--plx-sys-space-layout-*) and stacks its parts --plx-sys-space-stack-md apart.
     PageContent is positioned, so a DropZone overlay covers it.
   Notes:
     PageContent is the content column of a page inside the main region; other props go on its element.
     SideNavPortal is for a screen that owns its navigation's state (a settings screen, a project list): it hands the
       navigation to the shell's navigation area from inside the main content, where it then behaves as above.
     Outside an AppShell, SideNavPortal renders its children in place.
*/
const STRINGS = {
  skip: 'Skip to main content'
};
// the five layout modes (the Layout foundation; app-shell.css draws them)
const LAYOUTS = ['fluid', 'contained', 'hybrid', 'multi-pane', 'focus'];
const LayoutContext = exports.LayoutContext = /*#__PURE__*/_react.default.createContext(null);
const useAppLayout = () => _react.default.useContext(LayoutContext);
/* the shell's sizes and breakpoints come from the tokens, never from numbers here:
   --plx-sys-shell-nav-width, -min-width, -max-width, --plx-sys-shell-splitter-step, --plx-sys-shell-rail-below,
   --plx-sys-shell-inspector-overlay-below */
exports.useAppLayout = useAppLayout;
const tokenValue = name => typeof document === 'undefined' ? '' : getComputedStyle(document.documentElement).getPropertyValue(name).trim();
exports.tokenValue = tokenValue;
const tokenPx = name => parseFloat(tokenValue(name)) || 0;
// a media query for "narrower than the breakpoint token" (range syntax: the token's value is used as written)
exports.tokenPx = tokenPx;
const below = name => '(width < ' + (tokenValue(name) || '0px') + ')';
exports.below = below;
function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false;
  const [on, setOn] = _react.default.useState(get);
  _react.default.useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query),
      f = () => setOn(mq.matches);
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, [query]);
  return on;
}
const readPref = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v === null || v === undefined ? fallback : v;
  } catch (e) {
    return fallback;
  }
};
exports.readPref = readPref;
const writePref = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {/* not stored: it lasts for this visit */}
};
exports.writePref = writePref;
function AppShell({
  header,
  sideNav,
  panel,
  footer,
  page = 'workspace',
  mainId = 'main',
  mainClassName,
  strings,
  className,
  children
}) {
  // the page's kind, claimed by a pattern on the page when it is that kind of page (SettingsLayout), else the page prop
  const [claimed, setClaimed] = _react.default.useState(null);
  const claimPage = _react.default.useCallback(kind => {
    setClaimed(kind);
    return () => setClaimed(k => k === kind ? null : k);
  }, []);
  const layout = (0, _pageLayouts.pageLayout)(claimed || page); // the design system's layout standard decides the mode
  const t = Object.assign({}, STRINGS, strings);
  const small = useMedia(below('--plx-sys-shell-rail-below'));
  const [expanded, setExpanded] = _react.default.useState(() => readPref('plenix.sideNav.expanded', true));
  const [width, setWidthState] = _react.default.useState(() => readPref('plenix.sideNav.width', null));
  const [overlay, setOverlay] = _react.default.useState(false);
  const [slotEl, setSlotEl] = _react.default.useState(null); // the side-navigation area a screen fills through SideNavPortal
  const [portals, setPortals] = _react.default.useState(0);
  const registerPortal = _react.default.useCallback(() => {
    setPortals(n => n + 1);
    return () => setPortals(n => n - 1);
  }, []);
  const hasSide = !!sideNav || portals > 0;
  const setWidth = _react.default.useCallback(w => {
    setWidthState(w);
    writePref('plenix.sideNav.width', w);
  }, []);
  const toggle = _react.default.useCallback(() => {
    if (small) setOverlay(o => !o);else setExpanded(e => {
      writePref('plenix.sideNav.expanded', !e);
      return !e;
    });
  }, [small]);
  _react.default.useEffect(() => {
    setOverlay(false);
  }, [small]);
  // Ctrl+[ collapses and expands the navigation from anywhere on the page
  _react.default.useEffect(() => {
    if (!hasSide) return undefined;
    const key = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === '[') {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [toggle, hasSide]);
  const mode = !hasSide ? 'none' : small ? overlay ? 'overlay' : 'rail' : expanded ? 'inline' : 'rail';
  const ctx = _react.default.useMemo(() => ({
    hasSideNav: hasSide,
    slotEl,
    registerPortal,
    small,
    mode,
    open: mode === 'inline' || mode === 'overlay',
    expanded: small ? overlay : expanded,
    width,
    setWidth,
    toggle,
    close: () => setOverlay(false),
    page: claimed || page,
    layout,
    claimPage
  }), [hasSide, slotEl, registerPortal, small, mode, overlay, expanded, width, setWidth, toggle, claimed, page, layout, claimPage]);
  return /*#__PURE__*/_react.default.createElement(LayoutContext.Provider, {
    value: ctx
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-app-shell', className),
    "data-plx-layout": LAYOUTS.indexOf(layout) >= 0 ? layout : 'fluid'
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "plx-app-shell__skip",
    href: '#' + mainId
  }, t.skip), header, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-shell__body"
  }, sideNav || /*#__PURE__*/_react.default.createElement("div", {
    ref: setSlotEl,
    className: "plx-app-shell__slot"
  }), /*#__PURE__*/_react.default.createElement("main", {
    id: mainId,
    tabIndex: -1,
    className: (0, _cx.cx)('plx-app-shell__main', mainClassName),
    "data-plx-layout": LAYOUTS.indexOf(layout) >= 0 ? layout : 'fluid'
  }, children), panel), footer));
}

/* the drag handle on a resizable area's inner edge: drag, or the arrow keys (16px), Home and End; double-click or Enter
   collapses the area when it can collapse. edge: "end" (an area at the start: dragging toward the end widens it) or
   "start" (an area at the end). In a right-to-left page the start is on the right, so the drag and Arrow Left / Right
   are mirrored (arrowStep gives the step in reading order). */
function PanelSplitter({
  label,
  value,
  min,
  max,
  onChange,
  onCollapse,
  edge = 'end'
}) {
  const dir = edge === 'end' ? 1 : -1;
  const clamp = w => Math.round(Math.max(min, Math.min(max(), w)));
  const onPointerDown = e => {
    if (e.button !== 0) return;
    e.preventDefault();
    const x0 = e.clientX,
      w0 = value,
      flip = (0, _direction.isRtl)(e.currentTarget) ? -1 : 1;
    const move = ev => onChange(clamp(w0 + (ev.clientX - x0) * dir * flip));
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('is-resizing-columns');
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    document.documentElement.classList.add('is-resizing-columns');
  };
  const onKeyDown = e => {
    const s = tokenPx('--plx-sys-shell-splitter-step');
    const step = (0, _direction.arrowStep)(e, e.currentTarget, {
      vertical: false
    }) * s * dir;
    if (step) {
      e.preventDefault();
      onChange(clamp(value + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(clamp(min));
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(clamp(max()));
    } else if (e.key === 'Enter' && onCollapse) {
      e.preventDefault();
      onCollapse();
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "separator",
    "aria-orientation": "vertical",
    "aria-label": label,
    "aria-valuenow": value,
    "aria-valuemin": min,
    "aria-valuemax": clamp(max()),
    tabIndex: 0,
    className: (0, _cx.cx)('plx-panel-splitter', 'plx-panel-splitter--' + edge),
    onPointerDown: onPointerDown,
    onKeyDown: onKeyDown,
    onDoubleClick: onCollapse || undefined
  });
}
function SideNavPortal({
  children
}) {
  const layout = useAppLayout();
  _react.default.useEffect(() => layout && layout.registerPortal ? layout.registerPortal() : undefined, []);
  if (!layout || !layout.registerPortal) return children; // outside an AppShell: render in place
  return layout.slotEl ? /*#__PURE__*/(0, _reactDom.createPortal)(children, layout.slotEl) : null;
}

/* <PageContent>: the content column of a page inside the main region; see the header comment. */
function PageContent({
  as: As = 'section',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: (0, _cx.cx)('plx-page-content', className)
  }, rest), children);
}
  } },
  "platform/patterns/ToolRail/ToolRail.jsx": { deps: {"react":null,"../../utils/roving.js":"platform/utils/roving.js","../../utils/cx.js":"platform/utils/cx.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolRail = ToolRail;
var _react = _interopRequireDefault(require("react"));
var _roving = require("../../utils/roving.js");
var _cx = require("../../utils/cx.js");
var _Icon = require("../../components/Icon/Icon.jsx");
var _Tooltip = require("../../components/Tooltip/Tooltip.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ToolRail
   Summary: A vertical bar of tools beside a canvas (the image editor).
   Usage:
     <ToolRail label="Tools">
       <ToolRail.Item icon="ed-crop" label="Crop" pressed={tool === 'crop'} onClick={() => …} />
       <ToolRail.Divider />
     </ToolRail>
   Props:
     label: the toolbar's accessible name
     showLabels: each tool shows its name under the icon (no tooltip); default false
     className: more classes
     children: the tools (ToolRail.Item) and dividers (ToolRail.Divider)
     ToolRail.Item.icon: an icon name or element
     ToolRail.Item.label: the tool's name: its accessible name and tooltip
     ToolRail.Item.pressed: the toggle state; leave it out for a plain button
     ToolRail.Item.disabled: default false; the arrow keys skip it
     ToolRail.Item.onClick: runs on click
     ToolRail.Item.className: more classes
   Behavior:
     It is a toolbar with vertical orientation and one Tab stop: Arrow Up / Down, Home and End move between tools; Tab
     enters and leaves the rail.
     Each tool is an icon-only toggle button with a tooltip at its end side.
   Notes:
     The editor page sets the dark mode on its container.
*/

const LabelsContext = /*#__PURE__*/_react.default.createContext(false);
function ToolRail({
  label,
  showLabels = false,
  className,
  children
}) {
  const ref = _react.default.useRef(null);
  const itemsOf = () => ref.current ? Array.prototype.slice.call(ref.current.querySelectorAll('.plx-tool-rail__item:not([disabled])')) : [];
  // one Tab stop: Tab enters and leaves the rail; the arrows move between tools (batch 213)
  (0, _roving.useRovingFocus)(ref, itemsOf);
  const onKeyDown = e => {
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].indexOf(e.key) < 0) return;
    const items = itemsOf();
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    e.preventDefault();
    items[n].focus();
  };
  return /*#__PURE__*/_react.default.createElement(LabelsContext.Provider, {
    value: showLabels
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    role: "toolbar",
    "aria-orientation": "vertical",
    "aria-label": label,
    className: (0, _cx.cx)('plx-tool-rail', showLabels && 'plx-tool-rail--labels', className),
    onKeyDown: onKeyDown,
    onFocus: e => (0, _roving.roveTo)(ref, itemsOf(), e.target)
  }, children));
}
ToolRail.Item = function ToolRailItem({
  icon,
  label,
  pressed,
  disabled = false,
  onClick,
  className
}) {
  const labels = _react.default.useContext(LabelsContext);
  const button = /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: (0, _cx.cx)('plx-tool-rail__item', pressed && 'is-pressed', className),
    "aria-label": labels ? undefined : label,
    "aria-pressed": pressed === undefined ? undefined : !!pressed,
    disabled: disabled || undefined,
    onClick: onClick
  }, typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  }) : icon, labels ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-tool-rail__label"
  }, label) : null);
  return labels ? button : /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    content: label,
    placement: "end"
  }, button);
};
ToolRail.Divider = function ToolRailDivider() {
  return /*#__PURE__*/_react.default.createElement("span", {
    role: "separator",
    className: "plx-tool-rail__divider"
  });
};
  } },
  "platform/patterns/NavPane/NavPane.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavPane = NavPane;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Button = require("../../components/Button/Button.jsx");
var _ToolRail = require("../ToolRail/ToolRail.jsx");
var _AppShell = require("../AppShell/AppShell.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · NavPane
   Summary: The navigation pane, the same on every page of every application. Give it to the AppShell's sideNav (or a
     SideNavPortal); the shell owns its size and state.
   Usage:
     <NavPane label="Categories and collections" title="Asset Manager" actions={<…/>}
       header={<…/>} rail={<…/>} footer={<…/>}>{children}</NavPane>
   Props:
     label: names the navigation landmark (also the rail and the splitter)
     title: the pane's title, the application's or the page's name (Messages, Asset Manager, System Settings)
     actions: the pane's actions in the title row: small icon buttons such as Filter and New
     as: "nav" (default; a navigation landmark) | "div" (when the content brings its own landmark, a NavList)
     header: a second row under the title row, for the pane's own shortcuts (the asset browser's Home and Files)
     footer: a row pinned to the bottom (--plx-comp-pane-footer-height, its divider drawn inside): the app's or section's
       settings, or the way back from a settings screen
     rail: the page's rail items (<ToolRail.Item…/>), shown when the pane is collapsed
     collapseAt: "end" (default; the row's end, facing the main region) | "start" (only for a pane on the right)
     width: its own width outside an AppShell (default: the shell navigation width)
     className: more classes on the pane
     children: the body: NavList groups (whose headings are collapsible section headers), a filter field, buttons
   Behavior:
     Its size follows the Layout grid's shell: --plx-sys-shell-nav-width (240px), resizable 140–320px with the splitter on its edge.
     The first row is the same on every pane: the title, the actions, then the Collapse button at the row's end, on the side
       that faces the main region.
     Collapsed, it is a rail (ToolRail) of the page's rail items with Expand always first, at the top, then a divider.
     Below 768px it is a rail whose Expand opens the pane over the main region; Escape or a click outside closes it.
     The body scrolls; its bar shows on hover.
     Outside an AppShell it is a plain pane (width: its own, or the shell navigation width) with no Collapse button.
   Notes:
     The shared first row dates from batch 153.
     Every page's pane has a footer.
     The content is the page's.
*/

function NavPane({
  label,
  title,
  actions,
  as = 'nav',
  header,
  footer,
  rail,
  collapseAt = 'end',
  width,
  className,
  children
}) {
  const layout = (0, _AppShell.useAppLayout)();
  const ref = _react.default.useRef(null);
  const Tag = as;
  const mode = layout && layout.hasSideNav ? layout.mode : 'static';
  // the overlay is a layer: Escape closes it
  (0, _layer.useLayer)(ref, mode === 'overlay', {
    onEscape: layout ? layout.close : undefined
  });
  const expand = /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail.Item, {
    icon: "panel-left-open",
    label: "Expand sidebar",
    onClick: layout ? layout.toggle : undefined
  });
  const railEl = mode === 'rail' || mode === 'overlay' ? /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail, {
    label: label || 'Navigation',
    className: "plx-nav-pane-rail"
  }, rail ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, expand, /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail.Divider, null), rail) : expand) : null;
  if (mode === 'rail') return railEl;
  // a width only the page or the person knows (the width prop, or the splitter's) reaches the stylesheet as the pane's width token
  const w = mode === 'static' ? width : layout.width;
  const paneWidth = typeof w === 'number' ? w + 'px' : w || undefined;
  const collapse = mode === 'static' ? null : /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-nav-pane__collapse', 'plx-nav-pane__collapse--' + collapseAt)
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    iconOnly: true,
    icon: "panel-left-close",
    label: "Collapse sidebar",
    onClick: layout.toggle
  }));
  const pane = /*#__PURE__*/_react.default.createElement(Tag, {
    ref: ref,
    "aria-label": Tag === 'nav' ? label : undefined,
    className: (0, _cx.cx)('plx-nav-pane', mode !== 'static' && 'plx-nav-pane--' + mode, className),
    style: {
      '--plx-comp-nav-pane-width': paneWidth
    }
  }, title || actions || collapse ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__header"
  }, collapseAt === 'start' ? collapse : null, title ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-pane__title"
  }, title) : null, actions ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-pane__actions"
  }, actions) : null, collapseAt !== 'start' ? collapse : null) : null, header ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__subheader"
  }, header) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__body"
  }, children), footer ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__footer"
  }, footer) : null, mode === 'inline' ? /*#__PURE__*/_react.default.createElement(_AppShell.PanelSplitter, {
    label: 'Resize ' + (label || 'navigation'),
    value: layout.width || (0, _AppShell.tokenPx)('--plx-sys-shell-nav-width'),
    min: (0, _AppShell.tokenPx)('--plx-sys-shell-nav-min-width'),
    max: () => (0, _AppShell.tokenPx)('--plx-sys-shell-nav-max-width'),
    onChange: layout.setWidth,
    edge: "end"
  }) : null);
  // below 768px: the rail stays in place; the pane opens over the main region
  return mode === 'overlay' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, railEl, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-shell__scrim",
    "aria-hidden": "true",
    onMouseDown: layout.close
  }), pane) : pane;
}
  } },
  "platform/patterns/SettingsLayout/SettingsLayout.jsx": { deps: {"react":null,"../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../NavPane/NavPane.jsx":"platform/patterns/NavPane/NavPane.jsx","../ActionBar/ActionBar.jsx":"platform/patterns/ActionBar/ActionBar.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsLayout = SettingsLayout;
exports.SettingsRow = SettingsRow;
exports.SettingsSection = SettingsSection;
var _react = _interopRequireDefault(require("react"));
var _AppShell = require("../AppShell/AppShell.jsx");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _NavPane = require("../NavPane/NavPane.jsx");
var _ActionBar = require("../ActionBar/ActionBar.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · SettingsLayout, SettingsSection, SettingsRow
   Summary: Navigation beside the settings form. SettingsSection is a titled group of rows; SettingsRow puts the label and
     description at the start and the control at the end.
   Usage:
     <SettingsLayout nav={<NavList…/>}>
       <SettingsSection title="Regional" description="…">
         <SettingsRow label="Date format" description="…">{control}</SettingsRow>
       </SettingsSection>
     </SettingsLayout>
   Props:
     nav: the navigation (a NavList), drawn in a NavPane beside the content
     className: more classes
     children: the settings sections
     SettingsSection.title: the section's heading; it names the section landmark
     SettingsSection.description: a paragraph under the title
     SettingsSection.card: true draws it as a bordered card (asset-app style) for a form that needs grouping; default false
     SettingsSection.actions: the form's buttons, drawn in an ActionBar under the rows (on the right, kept in view at the
       bottom while the page scrolls): the primary action last
     SettingsSection.headingLevel: the title's heading level (default 2)
     SettingsSection.className: more classes
     SettingsSection.children: the rows
     SettingsRow.label: the row's label, at the start
     SettingsRow.description: a line under the label
     SettingsRow.htmlFor: the control's id, so the label is a label element for it
     SettingsRow.className: more classes
     SettingsRow.children: the control, at the end
   Behavior:
     Each row is divided from the next.
     On a narrow layout the navigation stacks above the content.
     It is a settings page: inside an AppShell it claims the page kind "settings", so the layout standard lays it out
       (contained: one centered column at the form width).
   Notes:
     Fields (layout="inline" or "row") can be rows too.
     Give the control the row's label as its own accessible name.
*/

function SettingsLayout({
  nav,
  className,
  children
}) {
  // a settings page: the layout standard (providers/pageLayouts.js) lays it out, through the shell (batch 218)
  const shell = (0, _AppShell.useAppLayout)();
  const claim = shell && shell.claimPage;
  _react.default.useEffect(() => claim ? claim('settings') : undefined, [claim]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-settings', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__frame"
  }, nav ? /*#__PURE__*/_react.default.createElement(_NavPane.NavPane, {
    as: "div",
    className: "plx-settings__nav"
  }, nav) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__content"
  }, children)));
}
function SettingsSection({
  title,
  description,
  card = false,
  actions,
  headingLevel = 2,
  className,
  children
}) {
  const id = (0, _layer.useUid)('plx-set');
  const H = 'h' + headingLevel;
  return /*#__PURE__*/_react.default.createElement("section", {
    "aria-labelledby": title ? id : undefined,
    className: (0, _cx.cx)('plx-settings__section', card && 'plx-settings__section--card', className)
  }, title ? /*#__PURE__*/_react.default.createElement(H, {
    id: id,
    className: "plx-settings__section-title"
  }, title) : null, description ? /*#__PURE__*/_react.default.createElement("p", {
    className: "plx-settings__section-description"
  }, description) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__rows"
  }, children), actions ? /*#__PURE__*/_react.default.createElement(_ActionBar.ActionBar, {
    label: (title ? title + ': ' : '') + 'actions'
  }, actions) : null);
}
function SettingsRow({
  label,
  description,
  htmlFor,
  className,
  children
}) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-settings__row', className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__row-text"
  }, htmlFor ? /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: htmlFor,
    className: "plx-settings__row-label"
  }, label) : /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__row-label"
  }, label), description ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__row-description"
  }, description) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__row-control"
  }, children));
}
  } },
  "platform/patterns/SidePanel/SidePanel.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidePanel = SidePanel;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Button = require("../../components/Button/Button.jsx");
var _Icon = require("../../components/Icon/Icon.jsx");
var _ToolRail = require("../ToolRail/ToolRail.jsx");
var _AppShell = require("../AppShell/AppShell.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · SidePanel
   Summary: The inspector panel on the right of the main region (details, a preview). Give it to the AppShell's panel.
   Usage:
     <SidePanel title="Details" icon="circle-info" open={open} onOpenChange={(next) => …} actions={<…/>} footer={<…/>}>…</SidePanel>
   Props:
     title: the panel's heading
     label: its landmark name (default: the title, or "Panel")
     icon: an icon name or element before the title
     open: true (default) shows the panel; false shows only its rail
     onOpenChange(open): runs from Collapse and Expand; without it there is no Collapse button and no rail
     actions: controls at the end of the header row
     footer: a row pinned to the panel's bottom (its actions: Save, Cancel), --plx-comp-pane-footer-height, its divider drawn inside
     collapseLabel: the Collapse button's label (default "Collapse panel")
     resizable: its start edge can be dragged (or moved with the arrow keys) between --plx-comp-side-panel-width-min and
       -max; the width is remembered; Home and End jump to the smallest and largest (batch 259); default false
     resizeLabel: the edge's accessible name (default "Resize panel")
     className: more classes
     children: the body
   Behavior:
     Width: --plx-sys-panel-inspector-width (by density: 320 / 360 / 400px), docked.
     Its own Collapse button starts its header row; collapsed, it is a rail with Expand.
     Below 1024px Expand opens it over the main region, between the header and the footer; Escape or a click outside closes it.
     When the window becomes that small, an open docked panel collapses to its rail.
   Notes:
     Not every capability has one; it shows only where it is given.
*/

const WIDTH_KEY = 'plenix.sidePanelWidth';
function SidePanel({
  title,
  label,
  icon,
  open = true,
  onOpenChange,
  actions,
  footer,
  collapseLabel,
  resizable = false,
  resizeLabel,
  className,
  children
}) {
  const small = (0, _AppShell.useMedia)((0, _AppShell.below)('--plx-sys-shell-inspector-overlay-below'));
  const ref = _react.default.useRef(null);
  const set = next => {
    if (onOpenChange) onOpenChange(next);
  };
  (0, _layer.useLayer)(ref, open && small, {
    onEscape: () => set(false)
  });
  // entering a small window: the docked panel would cover the main region, so it collapses to its rail
  _react.default.useEffect(() => {
    if (small && open) set(false);
  }, [small]);
  const name = label || title || 'Panel';
  // the width dragged on its edge, remembered across visits (resizable, docked only)
  const [size, setSize] = _react.default.useState(() => {
    try {
      return +localStorage.getItem(WIDTH_KEY) || null;
    } catch (e) {
      return null;
    }
  });
  const resize = w => {
    setSize(w);
    try {
      localStorage.setItem(WIDTH_KEY, String(w));
    } catch (e) {/* this visit only */}
  };
  const docked = resizable && !small;
  const railEl = onOpenChange ? /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail, {
    label: name + ' pane',
    className: "plx-side-panel-rail"
  }, /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail.Item, {
    icon: "panel-right-open",
    label: "Expand panel",
    onClick: () => set(true)
  })) : null;
  if (!open) return railEl;
  const pane = /*#__PURE__*/_react.default.createElement("aside", {
    ref: ref,
    "aria-label": name,
    className: (0, _cx.cx)('plx-side-panel', small && 'plx-side-panel--overlay', docked && 'plx-side-panel--resizable', docked && size && 'plx-side-panel--resized', className),
    style: {
      '--plx-comp-side-panel-width': docked && size ? size + 'px' : undefined
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-side-panel__header"
  }, onOpenChange ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    iconOnly: true,
    icon: "panel-right-close",
    label: collapseLabel || 'Collapse panel',
    onClick: () => set(false)
  }) : null, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-side-panel__icon",
    "aria-hidden": "true"
  }, typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  }) : icon) : null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "plx-side-panel__title"
  }, title), actions), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-side-panel__body"
  }, children), footer ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-side-panel__footer"
  }, footer) : null, docked ? /*#__PURE__*/_react.default.createElement(_AppShell.PanelSplitter, {
    label: resizeLabel || 'Resize panel',
    edge: "start",
    min: (0, _AppShell.tokenPx)('--plx-comp-side-panel-width-min'),
    max: () => (0, _AppShell.tokenPx)('--plx-comp-side-panel-width-max'),
    value: size || (0, _AppShell.tokenPx)('--plx-sys-panel-inspector-width'),
    onChange: resize,
    onCollapse: onOpenChange ? () => set(false) : undefined
  }) : null);
  return small ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, railEl, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-shell__scrim",
    "aria-hidden": "true",
    onMouseDown: () => set(false)
  }), pane) : pane;
}
  } },
  "platform/patterns/SecondaryPane/SecondaryPane.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecondaryPane = SecondaryPane;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../../components/Icon/Icon.jsx");
var _Button = require("../../components/Button/Button.jsx");
var _ToolRail = require("../ToolRail/ToolRail.jsx");
var _AppShell = require("../AppShell/AppShell.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · SecondaryPane
   Summary: A narrow pane beside the main content, inside the main region (under the header, beside the navigation pane):
     the asset browser's Files pane, the spec's "On this page", a project's capabilities. It can collapse to a rail and be
     resized by dragging its edge.
   Usage:
     <SecondaryPane title="Files" icon="folder-open" actions={…} side="start" width="md">…</SecondaryPane>
     <SecondaryPane title="Kitchen Renovation" collapsible resizable rail={<><ToolRail.Item … /></>}>…</SecondaryPane>
   Props:
     title: the title in the header row
     label: its landmark name (default: the title)
     icon: an icon name or element at the start of the header row
     actions: controls at the end of the header row
     side: "start" (default; before the content) | "end"
     width: "sm" (180px) | "md" (220px, default) | "lg" (280px), from --plx-comp-secondary-pane-width-*
     collapsible: a Collapse button in the header folds the pane to a rail (an Expand button, then the rail items); default false
     collapsed / onCollapsedChange(next): the folded state, controlled; defaultCollapsed: its first state when not controlled
     rail: the items the folded rail shows under Expand (ToolRail.Item elements)
     onClose(): a Close button ends the header row; given by the applications whose pane can be closed (the Asset Manager's
       Files pane), left out where the pane is always there (batch 259)
     resizable: the pane's content edge can be dragged (or moved with the arrow keys) between its sm width and
       --plx-comp-secondary-pane-width-max; default false
     className: more classes
     children: the body
     strings: the words it announces, for other languages: { expand: "Expand {name}", collapse: "Collapse {name}", resize:
       "Resize {name}", close: "Close {name}" } ({name} is the label, or the title)
   Behavior:
     The body scrolls on its own while the content scrolls beside it.
     The resize edge is a separator (role="separator", aria-valuenow); Arrow Left / Right move the edge, mirrored in a
     right-to-left page (as is dragging); Home and End jump to the smallest and largest width;
     Enter or a double click folds the pane when it is collapsible.
   Notes:
     It has the page surface, a divider on its content side, a header row (icon, title, actions) and a body.
     A dragged width reaches the stylesheet as --plx-comp-secondary-pane-width (no style is written).
     Other props go on its aside element.
*/
const STRINGS = {
  expand: 'Expand {name}',
  collapse: 'Collapse {name}',
  resize: 'Resize {name}',
  close: 'Close {name}'
};
function SecondaryPane({
  title,
  label,
  icon,
  actions,
  side = 'start',
  width = 'md',
  collapsible = false,
  collapsed,
  defaultCollapsed = false,
  onCollapsedChange,
  rail,
  resizable = false,
  onClose,
  strings,
  className,
  children,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings);
  const [ownCollapsed, setOwnCollapsed] = _react.default.useState(defaultCollapsed);
  const folded = collapsible && (collapsed !== undefined ? collapsed : ownCollapsed);
  const setFolded = next => {
    if (collapsed === undefined) setOwnCollapsed(next);
    if (onCollapsedChange) onCollapsedChange(next);
  };
  const [size, setSize] = _react.default.useState(null);
  const name = label || title;
  const named = s => s.split('{name}').join(name);
  if (folded) {
    return /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail, {
      label: name,
      className: (0, _cx.cx)('plx-secondary-pane-rail', 'plx-secondary-pane-rail--' + side, className)
    }, /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail.Item, {
      icon: side === 'start' ? 'panel-left-open' : 'panel-right-open',
      label: named(t.expand),
      onClick: () => setFolded(false)
    }), rail ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail.Divider, null), rail) : null);
  }
  const min = () => (0, _AppShell.tokenPx)('--plx-comp-secondary-pane-width-sm');
  const max = () => (0, _AppShell.tokenPx)('--plx-comp-secondary-pane-width-max');
  return /*#__PURE__*/_react.default.createElement("aside", _extends({
    "aria-label": name,
    className: (0, _cx.cx)('plx-secondary-pane', 'plx-secondary-pane--' + side, 'plx-secondary-pane--' + width, size && 'plx-secondary-pane--resized', className),
    style: {
      '--plx-comp-secondary-pane-width': size ? size + 'px' : undefined
    }
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-secondary-pane__header"
  }, icon ? typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  }) : icon : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-secondary-pane__title"
  }, title), actions, collapsible ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "xs",
    variant: "ghost",
    iconOnly: true,
    icon: side === 'start' ? 'panel-left-close' : 'panel-right-close',
    label: named(t.collapse),
    onClick: () => setFolded(true)
  }) : null, onClose ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "xs",
    variant: "ghost",
    iconOnly: true,
    icon: "close",
    label: named(t.close),
    onClick: onClose
  }) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-secondary-pane__body"
  }, children), resizable ? /*#__PURE__*/_react.default.createElement(_AppShell.PanelSplitter, {
    label: named(t.resize),
    edge: side === 'start' ? 'end' : 'start',
    min: min(),
    max: max,
    value: size || (0, _AppShell.tokenPx)('--plx-comp-secondary-pane-width-' + width) || min(),
    onChange: setSize,
    onCollapse: collapsible ? () => setFolded(true) : undefined
  }) : null);
}
  } },
  "platform/patterns/StatusBar/StatusBar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusBar = StatusBar;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · StatusBar
   Summary: The thin line at the foot of an application window with library-wide facts.
   Usage:
     <StatusBar start={<>…</>} end={<>…</>} />
   Props:
     start: the facts at the start of the line
     end: the facts at the end of the line
     className: more classes
   Notes:
     It is a footer (contentinfo landmark) on the inverse surface.
*/

function StatusBar({
  start,
  end,
  className
}) {
  return /*#__PURE__*/_react.default.createElement("footer", {
    className: (0, _cx.cx)('plx-status-bar', className)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-status-bar__start"
  }, start), end ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-status-bar__end"
  }, end) : null);
}
  } },
  "platform/hooks/useInteraction.js": { deps: {"react":null,"../providers/ThemeProvider.jsx":"platform/providers/ThemeProvider.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInteraction = useInteraction;
var _react = _interopRequireDefault(require("react"));
var _ThemeProvider = require("../providers/ThemeProvider.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useInteraction
   Summary: Gives the current page's interaction mode: pointer, touch or mobile.
   Usage:
     const interaction = useInteraction();
   Props:
     returns: "pointer" | "touch" | "mobile" (the data-plx-interaction attribute on <html>; "pointer" when unset)
   Behavior:
     Inside a ThemeProvider it follows changes (a laptop folded into a tablet).
     Outside one it reads <html> once.
*/

function useInteraction() {
  const ctx = _react.default.useContext(_ThemeProvider.ThemeContext);
  return ctx ? ctx.interaction : document.documentElement.getAttribute('data-plx-interaction') || 'pointer';
}
  } },
  "platform/patterns/TimeGrid/TimeGrid.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/DateBadge/DateBadge.jsx":"platform/components/DateBadge/DateBadge.jsx","../../components/EventChip/EventChip.jsx":"platform/components/EventChip/EventChip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeGrid = TimeGrid;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _DateBadge = require("../../components/DateBadge/DateBadge.jsx");
var _EventChip = require("../../components/EventChip/EventChip.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · TimeGrid
   Summary: A calendar's week or day view: days as columns, hours as rows, today's column marked, and events placed by their
     start and end (03 › Data display › Specialized displays › Calendar view).
   Usage:
     <TimeGrid label="Week of 5 October" startHour={8} endHour={18}
       days={[{ key: 'mon', weekday: 'Mon', day: 5 }, { key: 'tue', weekday: 'Tue', day: 6, today: true }]}
       events={[{ id: 1, day: 'tue', start: 10, end: 11.5, title: 'Site visit', time: '10:00', color: c, onClick: open }]} />
   Props:
     days: the columns: [{ key, weekday, day, dateTime, today }]
     startHour / endHour: the first and the last hour shown (default 8 and 18)
     events: [{ id, day (a day key), start, end (hours, e.g. 9.5 for 9:30), title, time, color, onClick }]
     hourLabel(hour): how an hour is written (default "9:00")
     label: the accessible name of the grid
     className: more classes on the grid
   Behavior:
     An event is placed on quarter hours (start and end round to 15 minutes; at least 30 minutes tall): the grid takes its
     hours, days and each event's place as attributes, and system/steps.css has a rule per step (no style attribute).
     Each day is a group named by its date; its events are buttons when they have onClick (EventChip).
     The grid scrolls inside its own box when it is taller than its container.
   Notes:
     An event's place reaches the stylesheet as --plx-comp-time-grid-start and --plx-comp-time-grid-span (in hours from the
     first hour), and the row height is --plx-comp-time-grid-hour (a size token): nothing is positioned by a style.
*/
const hourText = h => h + ':00';
function TimeGrid({
  days = [],
  startHour = 8,
  endHour = 18,
  events = [],
  hourLabel = hourText,
  label,
  className,
  ...rest
}) {
  const hours = [];
  for (let h = startHour; h < endHour; h++) hours.push(h);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-time-grid', className),
    role: "group",
    "aria-label": label,
    "data-plx-hours": endHour - startHour,
    "data-plx-days": days.length
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-time-grid__corner",
    "aria-hidden": "true"
  }), days.map(d => /*#__PURE__*/_react.default.createElement("div", {
    key: d.key,
    className: (0, _cx.cx)('plx-time-grid__head', d.today && 'is-today')
  }, /*#__PURE__*/_react.default.createElement(_DateBadge.DateBadge, {
    day: d.day,
    weekday: d.weekday,
    today: d.today,
    dateTime: d.dateTime
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-time-grid__hours",
    "aria-hidden": "true"
  }, hours.map(h => /*#__PURE__*/_react.default.createElement("div", {
    key: h,
    className: "plx-time-grid__hour"
  }, hourLabel(h)))), days.map(d => /*#__PURE__*/_react.default.createElement("div", {
    key: d.key,
    className: (0, _cx.cx)('plx-time-grid__day', d.today && 'is-today'),
    role: "group",
    "aria-label": [d.weekday, d.day].filter(Boolean).join(' ')
  }, hours.map(h => /*#__PURE__*/_react.default.createElement("div", {
    key: h,
    className: "plx-time-grid__slot",
    "aria-hidden": "true"
  })), events.filter(e => e.day === d.key).map(e => /*#__PURE__*/_react.default.createElement("div", {
    key: e.id,
    className: "plx-time-grid__event",
    "data-plx-start": Math.max(0, Math.round((e.start - startHour) * 4)),
    "data-plx-span": Math.max(2, Math.round((e.end - e.start) * 4))
  }, /*#__PURE__*/_react.default.createElement(_EventChip.EventChip, {
    fill: true,
    title: e.title,
    time: e.time,
    color: e.color,
    onClick: e.onClick
  }))))));
}
  } },
  "platform/utils/prefetch.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

/* Plenix · prefetch (platform/utils/prefetch.js): the next page is ready before the click (batch 237). Internal; not part
   of the public API: the Platform bundle runs it once, on every page that loads the Platform over http(s).
   Chromium browsers get speculation rules: a link to another page of the same site is prerendered when the pointer
   rests on it (about 200ms) or presses it, so switching apps shows the finished page at once instead of a blank reload.
   Other browsers get the page's document fetched into the cache on hover. Links that open elsewhere (target, download),
   same-page anchors and links marked data-plx-no-prefetch are left alone. Nothing runs from file://. */
const SKIP = '[target], [download], [data-plx-no-prefetch], [href^="#"]';
function speculationRules(doc) {
  if (!(window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules'))) return false;
  const rules = {
    prerender: [{
      where: {
        and: [{
          href_matches: '/*'
        }, {
          not: {
            selector_matches: SKIP
          }
        }]
      },
      eagerness: 'moderate'
    }]
  };
  const s = doc.createElement('script');
  s.type = 'speculationrules';
  s.textContent = JSON.stringify(rules);
  doc.head.appendChild(s);
  return true;
}
function hoverPrefetch(doc) {
  const done = new Set();
  doc.addEventListener('pointerover', e => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.matches(SKIP)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || done.has(url.pathname)) return;
    done.add(url.pathname);
    const link = doc.createElement('link');
    link.rel = 'prefetch';
    link.href = url.origin + url.pathname + url.search;
    doc.head.appendChild(link);
  }, {
    passive: true
  });
}
if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.head && /^https?:$/.test(location.protocol)) {
  if (!speculationRules(document)) hoverPrefetch(document);
}
  } },
  "platform/patterns/WidgetGrid/WidgetGrid.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx","../../utils/direction.js":"platform/utils/direction.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetGrid = WidgetGrid;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../../components/Icon/Icon.jsx");
var _VisuallyHidden = require("../../components/VisuallyHidden/VisuallyHidden.jsx");
var _direction = require("../../utils/direction.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · WidgetGrid
   Summary: A dashboard's widgets in a grid that people reorder by dragging a widget's handle, or with the arrow keys on it
     (04 › Layout › Layout patterns › Dashboard grid).
   Usage:
     <WidgetGrid label="Dashboard" items={widgets} onReorder={(ids) => setOrder(ids)}
       renderItem={(w) => <Panel title={w.title} flush>{w.body}</Panel>} />
   Props:
     items: the widgets, in order: [{ id, title, span }] (span: "1" (default) | "2" columns)
     renderItem(item, handle): draws a widget (usually a Panel). A renderer that takes the second argument places the
       handle itself (in the Panel's actions); otherwise the grid puts it in the widget's top corner
     onReorder(ids): runs with the new order after a drop or a key move; without it the grid cannot be reordered
     label: the accessible name of the grid
     columns: "auto" (default; as many as fit) | 2 | 3 | 4
     className: more classes on the grid
     strings: the words it announces, for other languages: { widget: "Widget", widgetLower: "widget", move: "Move {title}
       (arrow keys)", position: "{title}, position {index} of {total}" } (widget and widgetLower stand in for a widget
       without a title, in the announcement and in the handle's name)
   Behavior:
     Drag and drop (batch 271): the handle shows the grab cursor, grabbing while held or while its widget moves.
     Each widget gets a handle (a button) when the grid can be reordered: drag it onto another widget to place it there;
     or focus it and press Arrow Up (earlier) or Arrow Down (later); Arrow Left / Right follow reading order (in a
     right-to-left page Arrow Right is earlier).
     While dragging, the widget under the pointer shows the drop ring.
     The new place is announced ("Site visits, position 2 of 6").
   Notes:
     The grid never changes the order by itself: onReorder hands the new order to the page, which keeps it.
*/
const STRINGS = {
  widget: 'Widget',
  widgetLower: 'widget',
  move: 'Move {title} (arrow keys)',
  position: '{title}, position {index} of {total}'
};
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? String(vars[k]) : m);
const move = (ids, from, to) => {
  const next = ids.slice();
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
};
function WidgetGrid({
  items = [],
  renderItem,
  onReorder,
  label,
  columns = 'auto',
  strings,
  className,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings);
  const [dragging, setDragging] = _react.default.useState(null);
  const [over, setOver] = _react.default.useState(null);
  const [said, setSaid] = _react.default.useState('');
  const ids = items.map(i => i.id);
  const place = (from, to) => {
    if (!onReorder || to < 0 || to >= ids.length || from === to) return;
    onReorder(move(ids, from, to));
    const it = items[from];
    setSaid(fill(t.position, {
      title: it.title || t.widget,
      index: to + 1,
      total: ids.length
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-widget-grid', 'plx-widget-grid--' + columns, className),
    role: "list",
    "aria-label": label
  }, rest), items.map((it, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: it.id,
    role: "listitem",
    className: (0, _cx.cx)('plx-widget-grid__item', it.span === '2' && 'plx-widget-grid__item--wide', dragging === it.id && 'is-dragging', over === it.id && dragging !== it.id && 'is-drop-target'),
    onDragOver: onReorder ? e => {
      e.preventDefault();
      setOver(it.id);
    } : undefined,
    onDragLeave: onReorder ? () => setOver(o => o === it.id ? null : o) : undefined,
    onDrop: onReorder ? e => {
      e.preventDefault();
      const from = ids.indexOf(dragging);
      setOver(null);
      setDragging(null);
      place(from, i);
    } : undefined
  }, (() => {
    const handle = onReorder ? /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: (0, _cx.cx)('plx-widget-grid__handle', renderItem && renderItem.length > 1 && 'plx-widget-grid__handle--inline'),
      draggable: true,
      "aria-label": fill(t.move, {
        title: it.title || t.widgetLower
      }),
      onDragStart: e => {
        setDragging(it.id);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(it.id));
      },
      onDragEnd: () => {
        setDragging(null);
        setOver(null);
      },
      onKeyDown: e => {
        const step = (0, _direction.arrowStep)(e, e.currentTarget);
        if (step) {
          e.preventDefault();
          place(i, i + step);
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: "move",
      size: "sm"
    })) : null;
    return renderItem && renderItem.length > 1 ? renderItem(it, handle) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, handle, renderItem ? renderItem(it) : null);
  })()))), /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, {
    role: "status"
  }, said));
}
  } },
  "platform/index.js": { deps: {"./components/Badge/Badge.jsx":"platform/components/Badge/Badge.jsx","./components/VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx","./components/Count/Count.jsx":"platform/components/Count/Count.jsx","./components/Metric/Metric.jsx":"platform/components/Metric/Metric.jsx","./components/ProgressBar/ProgressBar.jsx":"platform/components/ProgressBar/ProgressBar.jsx","./components/DateBadge/DateBadge.jsx":"platform/components/DateBadge/DateBadge.jsx","./components/EventChip/EventChip.jsx":"platform/components/EventChip/EventChip.jsx","./components/RadioTiles/RadioTiles.jsx":"platform/components/RadioTiles/RadioTiles.jsx","./components/StatusDot/StatusDot.jsx":"platform/components/StatusDot/StatusDot.jsx","./components/Tag/Tag.jsx":"platform/components/Tag/Tag.jsx","./components/Kbd/Kbd.jsx":"platform/components/Kbd/Kbd.jsx","./components/Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx","./components/Divider/Divider.jsx":"platform/components/Divider/Divider.jsx","./components/Stack/Stack.jsx":"platform/components/Stack/Stack.jsx","./components/Text/Text.jsx":"platform/components/Text/Text.jsx","./components/Thumbnail/Thumbnail.jsx":"platform/components/Thumbnail/Thumbnail.jsx","./components/Notice/Notice.jsx":"platform/components/Notice/Notice.jsx","./components/ColorSwatch/ColorSwatch.jsx":"platform/components/ColorSwatch/ColorSwatch.jsx","./components/DropZone/DropZone.jsx":"platform/components/DropZone/DropZone.jsx","./components/Preview/Preview.jsx":"platform/components/Preview/Preview.jsx","./components/Fieldset/Fieldset.jsx":"platform/components/Fieldset/Fieldset.jsx","./components/Columns/Columns.jsx":"platform/components/Columns/Columns.jsx","./components/Breadcrumbs/Breadcrumbs.jsx":"platform/components/Breadcrumbs/Breadcrumbs.jsx","./components/List/List.jsx":"platform/components/List/List.jsx","./components/CodeBlock/CodeBlock.jsx":"platform/components/CodeBlock/CodeBlock.jsx","./components/SectionHeading/SectionHeading.jsx":"platform/components/SectionHeading/SectionHeading.jsx","./components/CollapsibleSection/CollapsibleSection.jsx":"platform/components/CollapsibleSection/CollapsibleSection.jsx","./components/Loading/Loading.jsx":"platform/components/Loading/Loading.jsx","./components/Chat/Chat.jsx":"platform/components/Chat/Chat.jsx","./components/EmptyState/EmptyState.jsx":"platform/components/EmptyState/EmptyState.jsx","./components/Pagination/Pagination.jsx":"platform/components/Pagination/Pagination.jsx","./components/Rating/Rating.jsx":"platform/components/Rating/Rating.jsx","./components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","./components/Button/Button.jsx":"platform/components/Button/Button.jsx","./components/RowButton/RowButton.jsx":"platform/components/RowButton/RowButton.jsx","./components/SegmentedControl/SegmentedControl.jsx":"platform/components/SegmentedControl/SegmentedControl.jsx","./components/Input/Input.jsx":"platform/components/Input/Input.jsx","./components/Field/Field.jsx":"platform/components/Field/Field.jsx","./components/Checkbox/Checkbox.jsx":"platform/components/Checkbox/Checkbox.jsx","./components/Combobox/Combobox.jsx":"platform/components/Combobox/Combobox.jsx","./components/SearchField/SearchField.jsx":"platform/components/SearchField/SearchField.jsx","./components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx","./components/Slider/Slider.jsx":"platform/components/Slider/Slider.jsx","./components/Toolbar/Toolbar.jsx":"platform/components/Toolbar/Toolbar.jsx","./components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","./components/Dialog/Dialog.jsx":"platform/components/Dialog/Dialog.jsx","./components/Toast/Toast.jsx":"platform/components/Toast/Toast.jsx","./components/Tabs/Tabs.jsx":"platform/components/Tabs/Tabs.jsx","./components/Card/Card.jsx":"platform/components/Card/Card.jsx","./components/DataTable/DataTable.jsx":"platform/components/DataTable/DataTable.jsx","./components/Table/Table.jsx":"platform/components/Table/Table.jsx","./patterns/ActionBar/ActionBar.jsx":"platform/patterns/ActionBar/ActionBar.jsx","./components/NavList/NavList.jsx":"platform/components/NavList/NavList.jsx","./components/Tree/Tree.jsx":"platform/components/Tree/Tree.jsx","./components/MediaViewer/MediaViewer.jsx":"platform/components/MediaViewer/MediaViewer.jsx","./patterns/AppHeader/AppHeader.jsx":"platform/patterns/AppHeader/AppHeader.jsx","./patterns/FilterBar/FilterBar.jsx":"platform/patterns/FilterBar/FilterBar.jsx","./patterns/SearchWorkspace/SearchWorkspace.jsx":"platform/patterns/SearchWorkspace/SearchWorkspace.jsx","./patterns/DataToolbar/DataToolbar.jsx":"platform/patterns/DataToolbar/DataToolbar.jsx","./patterns/BulkActions/BulkActions.jsx":"platform/patterns/BulkActions/BulkActions.jsx","./patterns/ContentGrid/ContentGrid.jsx":"platform/patterns/ContentGrid/ContentGrid.jsx","./patterns/PropertyList/PropertyList.jsx":"platform/patterns/PropertyList/PropertyList.jsx","./patterns/RecordPage/RecordPage.jsx":"platform/patterns/RecordPage/RecordPage.jsx","./patterns/ActivityList/ActivityList.jsx":"platform/patterns/ActivityList/ActivityList.jsx","./patterns/NotificationList/NotificationList.jsx":"platform/patterns/NotificationList/NotificationList.jsx","./patterns/SettingsLayout/SettingsLayout.jsx":"platform/patterns/SettingsLayout/SettingsLayout.jsx","./patterns/ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","./patterns/AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","./patterns/SidePanel/SidePanel.jsx":"platform/patterns/SidePanel/SidePanel.jsx","./patterns/SecondaryPane/SecondaryPane.jsx":"platform/patterns/SecondaryPane/SecondaryPane.jsx","./patterns/NavPane/NavPane.jsx":"platform/patterns/NavPane/NavPane.jsx","./patterns/StatusBar/StatusBar.jsx":"platform/patterns/StatusBar/StatusBar.jsx","./providers/ThemeProvider.jsx":"platform/providers/ThemeProvider.jsx","./providers/themes.js":"platform/providers/themes.js","./providers/SessionProvider.jsx":"platform/providers/SessionProvider.jsx","./providers/apps.js":"platform/providers/apps.js","./providers/pageLayouts.js":"platform/providers/pageLayouts.js","./hooks/useDensity.js":"platform/hooks/useDensity.js","./hooks/useInteraction.js":"platform/hooks/useInteraction.js","./patterns/TimeGrid/TimeGrid.jsx":"platform/patterns/TimeGrid/TimeGrid.jsx","./utils/prefetch.js":"platform/utils/prefetch.js","./patterns/WidgetGrid/WidgetGrid.jsx":"platform/patterns/WidgetGrid/WidgetGrid.jsx"}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActionBar", {
  enumerable: true,
  get: function () {
    return _ActionBar.ActionBar;
  }
});
Object.defineProperty(exports, "ActivityList", {
  enumerable: true,
  get: function () {
    return _ActivityList.ActivityList;
  }
});
Object.defineProperty(exports, "AppHeader", {
  enumerable: true,
  get: function () {
    return _AppHeader.AppHeader;
  }
});
Object.defineProperty(exports, "AppShell", {
  enumerable: true,
  get: function () {
    return _AppShell.AppShell;
  }
});
Object.defineProperty(exports, "Avatar", {
  enumerable: true,
  get: function () {
    return _Avatar.Avatar;
  }
});
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function () {
    return _Badge.Badge;
  }
});
Object.defineProperty(exports, "Breadcrumbs", {
  enumerable: true,
  get: function () {
    return _Breadcrumbs.Breadcrumbs;
  }
});
Object.defineProperty(exports, "BulkActions", {
  enumerable: true,
  get: function () {
    return _BulkActions.BulkActions;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function () {
    return _Button.Button;
  }
});
Object.defineProperty(exports, "ButtonGroup", {
  enumerable: true,
  get: function () {
    return _Button.ButtonGroup;
  }
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function () {
    return _Card.Card;
  }
});
Object.defineProperty(exports, "Chat", {
  enumerable: true,
  get: function () {
    return _Chat.Chat;
  }
});
Object.defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function () {
    return _Checkbox.Checkbox;
  }
});
Object.defineProperty(exports, "Chip", {
  enumerable: true,
  get: function () {
    return _Tag.Chip;
  }
});
Object.defineProperty(exports, "ChoiceList", {
  enumerable: true,
  get: function () {
    return _Checkbox.ChoiceList;
  }
});
Object.defineProperty(exports, "CodeBlock", {
  enumerable: true,
  get: function () {
    return _CodeBlock.CodeBlock;
  }
});
Object.defineProperty(exports, "CollapsibleSection", {
  enumerable: true,
  get: function () {
    return _CollapsibleSection.CollapsibleSection;
  }
});
Object.defineProperty(exports, "ColorSwatch", {
  enumerable: true,
  get: function () {
    return _ColorSwatch.ColorSwatch;
  }
});
Object.defineProperty(exports, "Columns", {
  enumerable: true,
  get: function () {
    return _Columns.Columns;
  }
});
Object.defineProperty(exports, "Combobox", {
  enumerable: true,
  get: function () {
    return _Combobox.Combobox;
  }
});
Object.defineProperty(exports, "ConfirmDialog", {
  enumerable: true,
  get: function () {
    return _Dialog.ConfirmDialog;
  }
});
Object.defineProperty(exports, "ContentGrid", {
  enumerable: true,
  get: function () {
    return _ContentGrid.ContentGrid;
  }
});
Object.defineProperty(exports, "Count", {
  enumerable: true,
  get: function () {
    return _Count.Count;
  }
});
Object.defineProperty(exports, "DEFAULT_THEME", {
  enumerable: true,
  get: function () {
    return _themes.DEFAULT_THEME;
  }
});
Object.defineProperty(exports, "DEMO_SESSION", {
  enumerable: true,
  get: function () {
    return _SessionProvider.DEMO_SESSION;
  }
});
Object.defineProperty(exports, "DataTable", {
  enumerable: true,
  get: function () {
    return _DataTable.DataTable;
  }
});
Object.defineProperty(exports, "DataToolbar", {
  enumerable: true,
  get: function () {
    return _DataToolbar.DataToolbar;
  }
});
Object.defineProperty(exports, "DateBadge", {
  enumerable: true,
  get: function () {
    return _DateBadge.DateBadge;
  }
});
Object.defineProperty(exports, "Dialog", {
  enumerable: true,
  get: function () {
    return _Dialog.Dialog;
  }
});
Object.defineProperty(exports, "Divider", {
  enumerable: true,
  get: function () {
    return _Divider.Divider;
  }
});
Object.defineProperty(exports, "Drawer", {
  enumerable: true,
  get: function () {
    return _Dialog.Drawer;
  }
});
Object.defineProperty(exports, "DropZone", {
  enumerable: true,
  get: function () {
    return _DropZone.DropZone;
  }
});
Object.defineProperty(exports, "EmptyState", {
  enumerable: true,
  get: function () {
    return _EmptyState.EmptyState;
  }
});
Object.defineProperty(exports, "EventChip", {
  enumerable: true,
  get: function () {
    return _EventChip.EventChip;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function () {
    return _Field.Field;
  }
});
Object.defineProperty(exports, "Fieldset", {
  enumerable: true,
  get: function () {
    return _Fieldset.Fieldset;
  }
});
Object.defineProperty(exports, "FilterBar", {
  enumerable: true,
  get: function () {
    return _FilterBar.FilterBar;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function () {
    return _Icon.Icon;
  }
});
Object.defineProperty(exports, "Inline", {
  enumerable: true,
  get: function () {
    return _Stack.Inline;
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function () {
    return _Input.Input;
  }
});
Object.defineProperty(exports, "Kbd", {
  enumerable: true,
  get: function () {
    return _Kbd.Kbd;
  }
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function () {
    return _List.List;
  }
});
Object.defineProperty(exports, "MediaCard", {
  enumerable: true,
  get: function () {
    return _Card.MediaCard;
  }
});
Object.defineProperty(exports, "MediaViewer", {
  enumerable: true,
  get: function () {
    return _MediaViewer.MediaViewer;
  }
});
Object.defineProperty(exports, "Menu", {
  enumerable: true,
  get: function () {
    return _Menu.Menu;
  }
});
Object.defineProperty(exports, "MenuDivider", {
  enumerable: true,
  get: function () {
    return _Menu.MenuDivider;
  }
});
Object.defineProperty(exports, "MenuGroup", {
  enumerable: true,
  get: function () {
    return _Menu.MenuGroup;
  }
});
Object.defineProperty(exports, "MenuItem", {
  enumerable: true,
  get: function () {
    return _Menu.MenuItem;
  }
});
Object.defineProperty(exports, "Metric", {
  enumerable: true,
  get: function () {
    return _Metric.Metric;
  }
});
Object.defineProperty(exports, "NavList", {
  enumerable: true,
  get: function () {
    return _NavList.NavList;
  }
});
Object.defineProperty(exports, "NavPane", {
  enumerable: true,
  get: function () {
    return _NavPane.NavPane;
  }
});
Object.defineProperty(exports, "Notice", {
  enumerable: true,
  get: function () {
    return _Notice.Notice;
  }
});
Object.defineProperty(exports, "NotificationList", {
  enumerable: true,
  get: function () {
    return _NotificationList.NotificationList;
  }
});
Object.defineProperty(exports, "PAGE_LAYOUTS", {
  enumerable: true,
  get: function () {
    return _pageLayouts.PAGE_LAYOUTS;
  }
});
Object.defineProperty(exports, "PLENIX_APPS", {
  enumerable: true,
  get: function () {
    return _apps.PLENIX_APPS;
  }
});
Object.defineProperty(exports, "PageContent", {
  enumerable: true,
  get: function () {
    return _AppShell.PageContent;
  }
});
Object.defineProperty(exports, "Pagination", {
  enumerable: true,
  get: function () {
    return _Pagination.Pagination;
  }
});
Object.defineProperty(exports, "Panel", {
  enumerable: true,
  get: function () {
    return _Card.Panel;
  }
});
Object.defineProperty(exports, "Preview", {
  enumerable: true,
  get: function () {
    return _Preview.Preview;
  }
});
Object.defineProperty(exports, "ProgressBar", {
  enumerable: true,
  get: function () {
    return _ProgressBar.ProgressBar;
  }
});
Object.defineProperty(exports, "PropertyList", {
  enumerable: true,
  get: function () {
    return _PropertyList.PropertyList;
  }
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function () {
    return _Checkbox.Radio;
  }
});
Object.defineProperty(exports, "RadioGroup", {
  enumerable: true,
  get: function () {
    return _Checkbox.RadioGroup;
  }
});
Object.defineProperty(exports, "RadioTiles", {
  enumerable: true,
  get: function () {
    return _RadioTiles.RadioTiles;
  }
});
Object.defineProperty(exports, "Rating", {
  enumerable: true,
  get: function () {
    return _Rating.Rating;
  }
});
Object.defineProperty(exports, "RecordPage", {
  enumerable: true,
  get: function () {
    return _RecordPage.RecordPage;
  }
});
Object.defineProperty(exports, "RowButton", {
  enumerable: true,
  get: function () {
    return _RowButton.RowButton;
  }
});
Object.defineProperty(exports, "SearchField", {
  enumerable: true,
  get: function () {
    return _SearchField.SearchField;
  }
});
Object.defineProperty(exports, "SearchWorkspace", {
  enumerable: true,
  get: function () {
    return _SearchWorkspace.SearchWorkspace;
  }
});
Object.defineProperty(exports, "SecondaryPane", {
  enumerable: true,
  get: function () {
    return _SecondaryPane.SecondaryPane;
  }
});
Object.defineProperty(exports, "SectionHeading", {
  enumerable: true,
  get: function () {
    return _SectionHeading.SectionHeading;
  }
});
Object.defineProperty(exports, "SegmentedControl", {
  enumerable: true,
  get: function () {
    return _SegmentedControl.SegmentedControl;
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function () {
    return _Input.Select;
  }
});
Object.defineProperty(exports, "SelectionSummary", {
  enumerable: true,
  get: function () {
    return _BulkActions.SelectionSummary;
  }
});
Object.defineProperty(exports, "SessionProvider", {
  enumerable: true,
  get: function () {
    return _SessionProvider.SessionProvider;
  }
});
Object.defineProperty(exports, "SettingsLayout", {
  enumerable: true,
  get: function () {
    return _SettingsLayout.SettingsLayout;
  }
});
Object.defineProperty(exports, "SettingsRow", {
  enumerable: true,
  get: function () {
    return _SettingsLayout.SettingsRow;
  }
});
Object.defineProperty(exports, "SettingsSection", {
  enumerable: true,
  get: function () {
    return _SettingsLayout.SettingsSection;
  }
});
Object.defineProperty(exports, "SideNavPortal", {
  enumerable: true,
  get: function () {
    return _AppShell.SideNavPortal;
  }
});
Object.defineProperty(exports, "SidePanel", {
  enumerable: true,
  get: function () {
    return _SidePanel.SidePanel;
  }
});
Object.defineProperty(exports, "Skeleton", {
  enumerable: true,
  get: function () {
    return _Loading.Skeleton;
  }
});
Object.defineProperty(exports, "Slider", {
  enumerable: true,
  get: function () {
    return _Slider.Slider;
  }
});
Object.defineProperty(exports, "Spinner", {
  enumerable: true,
  get: function () {
    return _Loading.Spinner;
  }
});
Object.defineProperty(exports, "Stack", {
  enumerable: true,
  get: function () {
    return _Stack.Stack;
  }
});
Object.defineProperty(exports, "StatusBar", {
  enumerable: true,
  get: function () {
    return _StatusBar.StatusBar;
  }
});
Object.defineProperty(exports, "StatusDot", {
  enumerable: true,
  get: function () {
    return _StatusDot.StatusDot;
  }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function () {
    return _Checkbox.Switch;
  }
});
Object.defineProperty(exports, "THEMES", {
  enumerable: true,
  get: function () {
    return _themes.THEMES;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function () {
    return _Table.Table;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function () {
    return _Tabs.Tabs;
  }
});
Object.defineProperty(exports, "Tag", {
  enumerable: true,
  get: function () {
    return _Tag.Tag;
  }
});
Object.defineProperty(exports, "TagInput", {
  enumerable: true,
  get: function () {
    return _Tag.TagInput;
  }
});
Object.defineProperty(exports, "TagList", {
  enumerable: true,
  get: function () {
    return _Tag.TagList;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return _Text.Text;
  }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function () {
    return _Input.Textarea;
  }
});
Object.defineProperty(exports, "ThemeProvider", {
  enumerable: true,
  get: function () {
    return _ThemeProvider.ThemeProvider;
  }
});
Object.defineProperty(exports, "Thumbnail", {
  enumerable: true,
  get: function () {
    return _Thumbnail.Thumbnail;
  }
});
Object.defineProperty(exports, "TimeGrid", {
  enumerable: true,
  get: function () {
    return _TimeGrid.TimeGrid;
  }
});
Object.defineProperty(exports, "ToastProvider", {
  enumerable: true,
  get: function () {
    return _Toast.ToastProvider;
  }
});
Object.defineProperty(exports, "ToolRail", {
  enumerable: true,
  get: function () {
    return _ToolRail.ToolRail;
  }
});
Object.defineProperty(exports, "Toolbar", {
  enumerable: true,
  get: function () {
    return _Toolbar.Toolbar;
  }
});
Object.defineProperty(exports, "Tooltip", {
  enumerable: true,
  get: function () {
    return _Tooltip.Tooltip;
  }
});
Object.defineProperty(exports, "Tree", {
  enumerable: true,
  get: function () {
    return _Tree.Tree;
  }
});
Object.defineProperty(exports, "VisuallyHidden", {
  enumerable: true,
  get: function () {
    return _VisuallyHidden.VisuallyHidden;
  }
});
Object.defineProperty(exports, "WidgetGrid", {
  enumerable: true,
  get: function () {
    return _WidgetGrid.WidgetGrid;
  }
});
Object.defineProperty(exports, "appById", {
  enumerable: true,
  get: function () {
    return _apps.appById;
  }
});
Object.defineProperty(exports, "appHref", {
  enumerable: true,
  get: function () {
    return _apps.appHref;
  }
});
Object.defineProperty(exports, "below", {
  enumerable: true,
  get: function () {
    return _AppShell.below;
  }
});
Object.defineProperty(exports, "initialsOf", {
  enumerable: true,
  get: function () {
    return _Avatar.initialsOf;
  }
});
Object.defineProperty(exports, "pageLayout", {
  enumerable: true,
  get: function () {
    return _pageLayouts.pageLayout;
  }
});
Object.defineProperty(exports, "tabsPanelId", {
  enumerable: true,
  get: function () {
    return _Tabs.tabsPanelId;
  }
});
Object.defineProperty(exports, "tokenPx", {
  enumerable: true,
  get: function () {
    return _AppShell.tokenPx;
  }
});
Object.defineProperty(exports, "tokenValue", {
  enumerable: true,
  get: function () {
    return _AppShell.tokenValue;
  }
});
Object.defineProperty(exports, "useAppLayout", {
  enumerable: true,
  get: function () {
    return _AppShell.useAppLayout;
  }
});
Object.defineProperty(exports, "useDensity", {
  enumerable: true,
  get: function () {
    return _useDensity.useDensity;
  }
});
Object.defineProperty(exports, "useInteraction", {
  enumerable: true,
  get: function () {
    return _useInteraction.useInteraction;
  }
});
Object.defineProperty(exports, "useSession", {
  enumerable: true,
  get: function () {
    return _SessionProvider.useSession;
  }
});
Object.defineProperty(exports, "useTheme", {
  enumerable: true,
  get: function () {
    return _ThemeProvider.useTheme;
  }
});
Object.defineProperty(exports, "useToast", {
  enumerable: true,
  get: function () {
    return _Toast.useToast;
  }
});
var _Badge = require("./components/Badge/Badge.jsx");
var _VisuallyHidden = require("./components/VisuallyHidden/VisuallyHidden.jsx");
var _Count = require("./components/Count/Count.jsx");
var _Metric = require("./components/Metric/Metric.jsx");
var _ProgressBar = require("./components/ProgressBar/ProgressBar.jsx");
var _DateBadge = require("./components/DateBadge/DateBadge.jsx");
var _EventChip = require("./components/EventChip/EventChip.jsx");
var _RadioTiles = require("./components/RadioTiles/RadioTiles.jsx");
var _StatusDot = require("./components/StatusDot/StatusDot.jsx");
var _Tag = require("./components/Tag/Tag.jsx");
var _Kbd = require("./components/Kbd/Kbd.jsx");
var _Avatar = require("./components/Avatar/Avatar.jsx");
var _Divider = require("./components/Divider/Divider.jsx");
var _Stack = require("./components/Stack/Stack.jsx");
var _Text = require("./components/Text/Text.jsx");
var _Thumbnail = require("./components/Thumbnail/Thumbnail.jsx");
var _Notice = require("./components/Notice/Notice.jsx");
var _ColorSwatch = require("./components/ColorSwatch/ColorSwatch.jsx");
var _DropZone = require("./components/DropZone/DropZone.jsx");
var _Preview = require("./components/Preview/Preview.jsx");
var _Fieldset = require("./components/Fieldset/Fieldset.jsx");
var _Columns = require("./components/Columns/Columns.jsx");
var _Breadcrumbs = require("./components/Breadcrumbs/Breadcrumbs.jsx");
var _List = require("./components/List/List.jsx");
var _CodeBlock = require("./components/CodeBlock/CodeBlock.jsx");
var _SectionHeading = require("./components/SectionHeading/SectionHeading.jsx");
var _CollapsibleSection = require("./components/CollapsibleSection/CollapsibleSection.jsx");
var _Loading = require("./components/Loading/Loading.jsx");
var _Chat = require("./components/Chat/Chat.jsx");
var _EmptyState = require("./components/EmptyState/EmptyState.jsx");
var _Pagination = require("./components/Pagination/Pagination.jsx");
var _Rating = require("./components/Rating/Rating.jsx");
var _Icon = require("./components/Icon/Icon.jsx");
var _Button = require("./components/Button/Button.jsx");
var _RowButton = require("./components/RowButton/RowButton.jsx");
var _SegmentedControl = require("./components/SegmentedControl/SegmentedControl.jsx");
var _Input = require("./components/Input/Input.jsx");
var _Field = require("./components/Field/Field.jsx");
var _Checkbox = require("./components/Checkbox/Checkbox.jsx");
var _Combobox = require("./components/Combobox/Combobox.jsx");
var _SearchField = require("./components/SearchField/SearchField.jsx");
var _Tooltip = require("./components/Tooltip/Tooltip.jsx");
var _Slider = require("./components/Slider/Slider.jsx");
var _Toolbar = require("./components/Toolbar/Toolbar.jsx");
var _Menu = require("./components/Menu/Menu.jsx");
var _Dialog = require("./components/Dialog/Dialog.jsx");
var _Toast = require("./components/Toast/Toast.jsx");
var _Tabs = require("./components/Tabs/Tabs.jsx");
var _Card = require("./components/Card/Card.jsx");
var _DataTable = require("./components/DataTable/DataTable.jsx");
var _Table = require("./components/Table/Table.jsx");
var _ActionBar = require("./patterns/ActionBar/ActionBar.jsx");
var _NavList = require("./components/NavList/NavList.jsx");
var _Tree = require("./components/Tree/Tree.jsx");
var _MediaViewer = require("./components/MediaViewer/MediaViewer.jsx");
var _AppHeader = require("./patterns/AppHeader/AppHeader.jsx");
var _FilterBar = require("./patterns/FilterBar/FilterBar.jsx");
var _SearchWorkspace = require("./patterns/SearchWorkspace/SearchWorkspace.jsx");
var _DataToolbar = require("./patterns/DataToolbar/DataToolbar.jsx");
var _BulkActions = require("./patterns/BulkActions/BulkActions.jsx");
var _ContentGrid = require("./patterns/ContentGrid/ContentGrid.jsx");
var _PropertyList = require("./patterns/PropertyList/PropertyList.jsx");
var _RecordPage = require("./patterns/RecordPage/RecordPage.jsx");
var _ActivityList = require("./patterns/ActivityList/ActivityList.jsx");
var _NotificationList = require("./patterns/NotificationList/NotificationList.jsx");
var _SettingsLayout = require("./patterns/SettingsLayout/SettingsLayout.jsx");
var _ToolRail = require("./patterns/ToolRail/ToolRail.jsx");
var _AppShell = require("./patterns/AppShell/AppShell.jsx");
var _SidePanel = require("./patterns/SidePanel/SidePanel.jsx");
var _SecondaryPane = require("./patterns/SecondaryPane/SecondaryPane.jsx");
var _NavPane = require("./patterns/NavPane/NavPane.jsx");
var _StatusBar = require("./patterns/StatusBar/StatusBar.jsx");
var _ThemeProvider = require("./providers/ThemeProvider.jsx");
var _themes = require("./providers/themes.js");
var _SessionProvider = require("./providers/SessionProvider.jsx");
var _apps = require("./providers/apps.js");
var _pageLayouts = require("./providers/pageLayouts.js");
var _useDensity = require("./hooks/useDensity.js");
var _useInteraction = require("./hooks/useInteraction.js");
var _TimeGrid = require("./patterns/TimeGrid/TimeGrid.jsx");
require("./utils/prefetch.js");
var _WidgetGrid = require("./patterns/WidgetGrid/WidgetGrid.jsx");
  } }
  };
  var cache = {};
  function load(id) {
    if (cache[id]) return cache[id].exports;
    var def = defs[id], module = { exports: {} };
    cache[id] = module;
    def.run(module, module.exports, function (spec) {
      if (def.externals[spec]) { var g = def.externals[spec](); if (!g) throw new Error('Plenix: "' + spec + '" is not loaded before this script'); return g; }
      return load(def.deps[spec]);
    });
    return module.exports;
  }
  var api = load("platform/index.js");
  window.Plenix = Object.freeze(Object.assign({}, api));
})();
