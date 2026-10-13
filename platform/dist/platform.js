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
     color: a color the data brings (a project's color), a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280); it fills the bar instead of the tone
     size: "sm" (a 4px track) | "md" (default, an 8px track)
     className: more classes on the wrapper
     locale: the language the percent is formatted in (default: the page's language, document.documentElement.lang)
   Behavior:
     A known amount is the browser's own <progress value max> (batch 280: the function reports the amount, the design
     system draws it, no width is written); without a value the track is a progressbar (role="progressbar") with no
     value, its fill running from start to end again and again.
     People who ask their system for less motion see the indeterminate fill still.
   Notes:
     The amount reaches the page as the <progress> element's value and a data color as data-plx-color: no style is written.
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
    "data-plx-color": color || undefined
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
  }).format(pct / 100)) : null) : null, known ? /*#__PURE__*/_react.default.createElement("progress", {
    className: "plx-progress-bar__track plx-progress-bar__meter",
    value: Math.max(0, Math.min(value, max || 100)),
    max: max || 100,
    "aria-labelledby": showLabel ? id : undefined,
    "aria-label": showLabel ? undefined : label
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-progress-bar__track",
    role: "progressbar",
    "aria-labelledby": showLabel ? id : undefined,
    "aria-label": showLabel ? undefined : label
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
     color: the event's or its calendar's color, a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280); it draws the start edge
     fill: the chip fills its box (an event placed in a time grid); default false
     onClick(event): makes the chip a button that opens the event
     className: more classes on the chip
   Behavior:
     With onClick it is a button (focus ring, Enter and Space); without, plain text.
   Notes:
     The hue reaches the stylesheet as the data-plx-color attribute, the only way a data color enters (no style is written).
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
    "data-plx-color": color || undefined
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
exports.StatusIcon = StatusIcon;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Icon, StatusIcon
   Summary: One icon of the Plenix set, drawn as a mask in the current text color. StatusIcon is a tone's icon in the
     tone's color (info, success, warning, danger, neutral), alone or with a short label.
   Usage:
     <Icon name="folder" />
     <Icon name="star" size="sm" filled label="Favorite" />
     <StatusIcon tone="warning" />
     <StatusIcon tone="success" size="sm">Synced</StatusIcon>
   Props:
     name: the Plenix icon name (platform/icons/map.json)
     size: "xs" 12px | "sm" 16px | "md" 20px | "lg" 24px | "xl" 48px, a page title (--plx-sys-icon-size-*); without it the icon takes its container's
       grid icon (a control's --plx-sys-control-icon-<role>) or --plx-sys-icon-size
     filled: the filled version (default false)
     label: the accessible name, when the icon alone carries meaning
     className: more classes on the icon
     StatusIcon.tone: "info" (default) | "success" | "warning" | "danger" | "neutral"; each has its own icon (neutral shares
       the info icon, in the neutral color)
     StatusIcon.size: "sm" (16px) | "md" (default; 20px) | "lg" (24px)
     StatusIcon.label: the accessible name of the icon alone (default: the tone's word from strings)
     StatusIcon.children: a short visible label after the icon; the icon is then decorative and the text says the state
     StatusIcon.strings: the tone words, for other languages: { info: "Information", success: "Success", warning: "Warning",
       danger: "Error", neutral: "Note" }
     StatusIcon.className: more classes on the status icon
   Behavior:
     The filled version is also drawn automatically inside a current or selected element: aria-current, aria-pressed,
       aria-selected, .is-selected, .is-current.
     A pinned item shows the filled pin, not a filled row.
     Without a label the icon is decorative and hidden from assistive technology; with one it is an image (role="img").
     StatusIcon alone is an image named by its tone (role="img", "Warning"), so the state never rests on color only; with a
       visible label the label carries the state and the icon is hidden from assistive technology.
   Notes:
     The set is Material Symbols Sharp, weight 300, used exactly as published (platform/icons/).
     The size names the icon's whole square, which includes the set's own padding (1/12 of the square on each side): the
       system adds none to make up for it.
     Other props pass through to the <span>.
     StatusIcon's colors and sizes are its own tokens (--plx-comp-status-icon-*, components/Icon/status-icon.css); the label
       keeps the text color and size of where it sits.
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

// StatusIcon: a tone's icon in the tone's color, alone (an image named by the tone) or before a short visible label
const STATUS_ICONS = {
  info: 'circle-info',
  success: 'circle-check',
  warning: 'warning',
  danger: 'alert',
  neutral: 'circle-info'
};
const STATUS_WORDS = {
  info: 'Information',
  success: 'Success',
  warning: 'Warning',
  danger: 'Error',
  neutral: 'Note'
};
function StatusIcon({
  tone = 'info',
  size = 'md',
  label,
  children,
  strings,
  className,
  ...rest
}) {
  const t = STATUS_ICONS[tone] ? tone : 'info';
  const words = Object.assign({}, STATUS_WORDS, strings);
  const shown = children !== undefined && children !== null && children !== false;
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-status-icon', 'plx-status-icon--' + t, 'plx-status-icon--' + size, className)
  }, rest), /*#__PURE__*/_react.default.createElement(Icon, {
    name: STATUS_ICONS[t],
    className: "plx-status-icon__glyph",
    label: shown ? undefined : label || words[t]
  }), shown ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-status-icon__label"
  }, children) : null);
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
  "platform/components/StatusDot/StatusDot.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusDot = StatusDot;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · StatusDot
   Summary: A 6px dot that marks a state (active, paused, priority), or a person's availability (online, away, busy, do
     not disturb, offline) in the Status colors.
   Usage:
     <StatusDot tone="success" label="Active" />
     <StatusDot tone="busy" label="Busy" />
     <StatusDot tone="dnd" size="md" icon label="Do not disturb" />
     <StatusDot tone="away" size="md" icon label="Away" />
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"; for a person's availability (the presence
       roles of the Status colors, library wave 4): "online" | "away" | "busy" | "dnd" (do not disturb) |
       "offline"
     size: "sm" (default, 6px) | "md" (12px) | "lg" (16px): the larger dots carry a glyph (icon) and sit on an avatar
     icon: draws the availability's shape inside a md or lg dot, so it never rests on color alone: online a check, away a
       clock, busy a solid dot with nothing cut out, do not disturb a minus (remove), offline a cross; busy and do not
       disturb share a color and differ by shape (default false; presence tones only)
     label: the state in words, read by assistive technology
     className: more classes on the dot
     ...rest: other attributes go on the dot element
   Behavior:
     Without a label the dot is decorative and hidden from assistive technology.
     The glyph is drawn in the surface color, cut out of the dot; a sm dot has no room for one and ignores icon.
   Notes:
     Without a label, pair the dot with visible text.
     Avatar's presence prop draws this dot at the avatar's corner.
*/
const PRESENCE = ['online', 'away', 'busy', 'dnd', 'offline'];
const GLYPHS = {
  online: 'check',
  away: 'clock',
  dnd: 'remove',
  offline: 'close-2'
}; // busy is the solid dot: nothing cut out
const SIZES = ['md', 'lg'];
function StatusDot({
  tone = 'neutral',
  size = 'sm',
  icon = false,
  label,
  className,
  ...rest
}) {
  const s = SIZES.indexOf(size) >= 0 ? size : null;
  const glyph = icon && s && PRESENCE.indexOf(tone) >= 0 && GLYPHS[tone];
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-status-dot', 'plx-status-dot--' + tone, s && 'plx-status-dot--' + s, glyph && 'plx-status-dot--glyph', className),
    "aria-hidden": label ? undefined : true
  }, rest), glyph ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: glyph,
    className: "plx-status-dot__glyph"
  }) : null, label ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, label) : null);
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
   Summary: A short label for a control, shown on hover, on keyboard focus and, on touch, on a long press.
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
     It shows on hover (a mouse or a pen) and on keyboard focus, and hides on leave, on blur and with Escape.
     On touch there is no hover (Platforms Standard 6.5): a long press (--plx-comp-tooltip-long-press-delay) shows it, and
     it hides --plx-comp-tooltip-touch-dismiss-delay after the finger lifts, or when the finger moves away or is cancelled.
     A tap does not show it (focus that follows a touch is ignored; mouse events emulated from touch are not listened to),
     and the long press neither opens the browser's context menu nor activates the control (the click that may follow the
     release is dropped): a long press asks what a control is, it does not use it.
     The trigger is described by the tooltip (aria-describedby), added to any it already has.
   Notes:
     An icon-only control still needs its own label (aria-label): the tooltip repeats it visually, it is never the only
     way to learn the control's name.
     Not for essential or interactive content.
*/

// a duration token ("0.5s", "500ms") in milliseconds, read from the element's computed style
const ms = (el, name) => {
  const v = el ? getComputedStyle(el).getPropertyValue(name).trim() : '';
  const n = parseFloat(v);
  return isNaN(n) ? 0 : /ms$/.test(v) ? n : n * 1000;
};

// the last way the person reached for the page: a touch, or a mouse, pen or key. Focus that follows a tap does not open
// the tooltip (a long press does); focus that follows a key does. One listener pair for every tooltip, added by the first.
let lastInput = 'key',
  listening = false;
const listen = () => {
  if (listening) return;
  listening = true;
  document.addEventListener('pointerdown', e => {
    lastInput = e.pointerType === 'touch' ? 'touch' : 'pointer';
  }, true);
  document.addEventListener('keydown', () => {
    lastInput = 'key';
  }, true);
};
function Tooltip({
  content,
  placement = 'bottom',
  disabled = false,
  className,
  children
}) {
  const id = 'plx-tt' + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = _react.default.useState(false);
  const wrap = _react.default.useRef(null);
  const press = _react.default.useRef(null); // the long-press timer
  const hide = _react.default.useRef(null); // the timer that hides a tooltip a long press opened
  const pressed = _react.default.useRef(false); // this touch opened the tooltip by a long press
  const clear = () => {
    clearTimeout(press.current);
    clearTimeout(hide.current);
  };
  _react.default.useEffect(() => {
    listen();
    return clear;
  }, []);
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
  if (disabled) return /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-tooltip', className)
  }, trigger);
  const onPointerDown = e => {
    if (e.pointerType !== 'touch') return;
    clear();
    pressed.current = false;
    press.current = setTimeout(() => {
      pressed.current = true;
      setOpen(true);
    }, ms(wrap.current, '--plx-comp-tooltip-long-press-delay'));
  };
  const onPointerEnd = e => {
    if (e.pointerType !== 'touch') return;
    clearTimeout(press.current);
    if (pressed.current) hide.current = setTimeout(() => {
      setOpen(false);
      pressed.current = false;
    }, e.type === 'pointercancel' ? 0 : ms(wrap.current, '--plx-comp-tooltip-touch-dismiss-delay'));
  };
  return /*#__PURE__*/_react.default.createElement("span", {
    ref: wrap,
    className: (0, _cx.cx)('plx-tooltip', className),
    onPointerEnter: e => {
      if (e.pointerType !== 'touch') setOpen(true);
    },
    onPointerLeave: e => {
      if (e.pointerType !== 'touch') setOpen(false);
    },
    onPointerDown: onPointerDown,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
    onContextMenu: e => {
      if (pressed.current) e.preventDefault();
    },
    onClickCapture: e => {
      if (pressed.current) {
        e.preventDefault();
        e.stopPropagation();
        pressed.current = false;
      }
    },
    onFocus: () => {
      if (lastInput !== 'touch') setOpen(true);
    },
    onBlur: () => {
      if (!pressed.current) setOpen(false);
    }
  }, trigger, /*#__PURE__*/_react.default.createElement("span", {
    role: "tooltip",
    id: id,
    className: (0, _cx.cx)('plx-tooltip__bubble', 'plx-tooltip__bubble--' + placement, open && 'is-open')
  }, content));
}
  } },
  "platform/components/Tag/Tag.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
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
var _Icon = require("../Icon/Icon.jsx");
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
     The × button is a 24px target in a 16px box, 44px with touch (Platforms Standard 3.1); a chip's target grows the same
       way past its 20px look. With touch, TagList parts its tags and rows so the targets do not overlap.
     Selected chips are filled.
     TagInput is a + at the end of the tag list, drawn as a Chip (the tag look as a button: its height, corners, fill and
       border; owner, batch 272), its target 24px like the tag's × (owner, batch 271: "it should be a + and clicking that plus
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
    }, /*#__PURE__*/_react.default.createElement("button", {
      ref: plusRef,
      id: id,
      type: "button",
      "aria-label": label,
      className: (0, _cx.cx)('plx-tag', 'plx-chip', 'plx-tag-input__add', className),
      onClick: () => setOpen(true)
    }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: "add",
      size: "sm"
    })));
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
  "platform/components/Avatar/Avatar.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../StatusDot/StatusDot.jsx":"platform/components/StatusDot/StatusDot.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Avatar = Avatar;
exports.initialsOf = initialsOf;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _StatusDot = require("../StatusDot/StatusDot.jsx");
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
     color: the person's own color when the data has one, a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280): its soft fill with
       its text color (otherwise the theme's avatar colors)
     category: instead of color, a category color by name (an avatar standing for a category): the color as its fill,
       black or white text (batch 290)
     label: the person's name for assistive technology when no visible name is nearby; without it the avatar is hidden from
       assistive technology
     presence: the person's availability (library wave 4): "online" | "away" | "busy" | "dnd" (do not disturb)
       | "offline", a StatusDot at the avatar's bottom end corner in the presence roles of the Status colors, ringed in the surface color;
       its size follows the avatar (a 6px dot up to 32px, 12px at 40 and 48px, 16px at 64px), and from 40px it carries the
       availability's shape (a check, a clock, busy the solid dot, do not disturb a minus, a cross) so it never rests on
       color alone
     strings: the words of presence, for other languages: { online: "Online", away: "Away", busy: "Busy",
       dnd: "Do not disturb", offline: "Offline" }
     className: more classes on the avatar
   Behavior:
     A picture that fails to load falls back to the initials.
     The corner and the text size follow the size.
     Initials are the first letters of the first and last name ("Raphael Maher" → RM).
     Titles such as "Fr." or "Dr." and parenthesized parts are skipped; one word gives one letter.
     With a label the avatar is an image (role="img") named by the label; with presence too, the name and the state ("Maya Chen, Busy").
     Without a label the presence dot is hidden with the avatar: the page says the state in words next to it.
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
// presence (library wave 4): the availability tones, the dot's size for each avatar size, and the words
const PRESENCE = ['online', 'away', 'busy', 'dnd', 'offline'];
const DOT = {
  20: 'sm',
  24: 'sm',
  28: 'sm',
  32: 'sm',
  40: 'md',
  48: 'md',
  64: 'lg'
};
const STRINGS = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  dnd: 'Do not disturb',
  offline: 'Offline'
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
  color,
  category,
  label,
  presence,
  strings,
  className,
  ...rest
}) {
  const n = NAMED[size] || size;
  const s = SIZES.indexOf(n) >= 0 ? n : NAMED.sm;
  const text = name ? initialsOf(name) : initials;
  const p = PRESENCE.indexOf(presence) >= 0 ? presence : null;
  const words = Object.assign({}, STRINGS, strings);
  const named = label && p ? label + ', ' + words[p] : label;
  // a picture that fails to load falls back to the initials (batch 215)
  const [failed, setFailed] = _react.default.useState(false);
  _react.default.useEffect(() => {
    setFailed(false);
  }, [src]);
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-avatar', 'plx-avatar--' + s, p && 'plx-avatar--presence', className),
    "data-plx-avatar": "",
    "data-plx-color": color || undefined,
    "data-plx-category": category || undefined,
    role: label ? 'img' : undefined,
    "aria-label": named,
    "aria-hidden": label ? undefined : true
  }, rest), src && !failed ? /*#__PURE__*/_react.default.createElement("img", {
    className: "plx-avatar__image",
    src: src,
    alt: "",
    onError: () => setFailed(true)
  }) : text, p ? /*#__PURE__*/_react.default.createElement(_StatusDot.StatusDot, {
    tone: p,
    size: DOT[s],
    icon: DOT[s] !== 'sm',
    className: "plx-avatar__presence"
  }) : null);
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
exports.Bleed = Bleed;
exports.Center = Center;
exports.Inline = Inline;
exports.Stack = Stack;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Stack, Inline, Center, Bleed
   Summary: Lay children out in a column (Stack) or a row (Inline), spaced by the spacing tokens, never by a margin or a number;
     center a block at a readable width (Center); let a child reach past its parent's inset to the edge (Bleed).
   Usage:
     <Stack gap="md">
       <Inline gap="sm" justify="between">…</Inline>
       <Inline wrap>…</Inline>
     </Stack>
     <Inline reverseBelow="narrow"><Main /><Summary /></Inline>    the summary comes first on a narrow window
     <Center maxWidth="sm" text><EmptyState … /></Center>
     <Stack inset="md"><Bleed space="md"><Image … /></Bleed><Text>…</Text></Stack>
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
     Stack.reverse: lays the children out in the other order (column-reverse, row-reverse); the reading and Tab order stay the markup's
     Stack.reverseBelow: "narrow" (under 600px) | "medium" (under 840px): reverses only below that window class
     Stack.order: "first" | "last": moves this element to the start or the end of its parent Stack or Inline
     Stack.orderBelow: "narrow" | "medium": applies order only below that window class
     Stack.as: the element; "div" by default; ul, ol, section, header, footer, form, fieldset, …
     Stack.className: more classes on the element
     Stack.children: the content to lay out
     Center.maxWidth: "sm" (400px: a sign-in form, an empty state) | "md" (default, 600px: a dialog-like page) | "lg" (900px:
       reading) | "page" (the contained layout's maximum) | "none": the widest it grows; narrower parents keep it narrower
     Center.intrinsic: centers each child at its own width (a column of centered children) instead of stretching it
     Center.vertical: centers the content in its parent's height too; content taller than the parent starts at the top
     Center.text: centers the lines of text (short headings and messages only)
     Center.as, Center.className: as for Stack
     Bleed.space: "xs" | "sm" | "md" (default) | "lg" | "xl": the parent's inset (Stack inset) it cancels
     Bleed.sides: "inline" (default: to the start and end edges) | "block" (top and bottom) | "all"
     Bleed.as, Bleed.className: as for Stack
   Behavior:
     A scrolling Stack or Inline shows its scroll bar on hover.
     reverse, reverseBelow and order change only where the children are drawn: assistive technology and the Tab key follow
       the markup. Use them for regions without a reading order between them (a summary and the content it sums up), never
       for steps, form fields or anything read in sequence; when the meaning changes, change the markup instead.
     Bleed cancels exactly the inset tokens of its parent (Stack inset), so its edges meet the parent's edges; its own content
       keeps no inset (text stays out of a Bleed).
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
  reverse,
  reverseBelow,
  order,
  orderBelow,
  className,
  children,
  ...rest
}, defaults) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: (0, _cx.cx)('plx-' + kind, 'plx-' + kind + '--gap-' + (gap || defaults.gap), (align || defaults.align) && 'plx-layout--align-' + (align || defaults.align), justify && 'plx-layout--justify-' + justify, wrap && 'plx-inline--wrap', inset && 'plx-layout--inset-' + inset, grow && 'plx-grow', scroll && 'plx-layout--scroll', width && 'plx-layout--width-' + width, maxHeight && 'plx-layout--max-' + maxHeight, indent && 'plx-layout--indent', push && 'plx-layout--push', reverse && 'plx-layout--reverse', reverseBelow && 'plx-layout--reverse-below-' + reverseBelow, order && 'plx-layout--order-' + order + (orderBelow ? '-below-' + orderBelow : ''), className)
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
function Center({
  as: As = 'div',
  maxWidth = 'md',
  intrinsic,
  vertical,
  text,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: (0, _cx.cx)('plx-center', 'plx-center--max-' + maxWidth, intrinsic && 'plx-center--intrinsic', vertical && 'plx-center--vertical', text && 'plx-center--text', className)
  }, rest), children);
}
function Bleed({
  as: As = 'div',
  space = 'md',
  sides = 'inline',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: (0, _cx.cx)('plx-bleed', 'plx-bleed--' + space, 'plx-bleed--' + sides, className)
  }, rest), children);
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
       hovered; the lowest emphasis) | "danger" (filled red; destructive) | "danger-secondary"
       (red outline, fills on hover). There is no link look: a link goes somewhere (Link), a button does something
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
  "platform/components/Text/Text.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = Text;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Button = require("../Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Text
   Summary: A run of text in one of the system's text roles, from the type tokens.
   Usage:
     <Text variant="secondary" as="p" truncate>Last edited 2 days ago</Text>
     <Text variant="display" as="h1">1,284 assets</Text>
     <Text as="p" lines={3} expandable>A long description…</Text>
     <Text variant="secondary" tabular>12:40</Text>
   Props:
     variant: the text role: "body" (default) | "secondary" | "caption" | "data" | "label" | "strong" | "heading"
       | "accent" (a highlighted term, step number or key figure: the accent color) | "success" (a good outcome, the new value in a change)
       | "eyebrow" | "danger" | "link" | "title" | "display" | "lead".
       body: the UI text. secondary: muted, 12px (counts, hints, descriptions). caption: subtle, 11px.
       data: the data font, DM Mono, for technical values (IDs, file names and paths, versions, dates and
       times, sizes, counts, durations); 12px on its own, the size of the text around it inside other text.
       label: semibold 12px. strong: semibold, the current size.
       heading: a group's title inside a page or dialog, semibold 13px.
       eyebrow: a small uppercase title over a tool panel, 11px, bold, widest spacing, muted.
       danger: the danger color (a required marker). link: the link color, normal weight (the color only: a link is the Link component).
       title: a page title, the heading font, 20px, bold.
       display: the largest style, for one key figure or a sign-in or welcome heading: the heading font at the top
         step of the type scale, semibold, with a tight line height and letter spacing (library wave 2).
       lead: body text one step up (15px) with a relaxed line height, for the opening paragraph of a page or an
         empty state (body-lg; library wave 2).
     as: the element; "span" (default) | "p" | "div" | "h1"–"h4" | "dt" | "dd" | "label" | …
     truncate: one line, cut with an ellipsis; default false (lines wins when both are set)
     lines: 2 | 3 | 4: at most that many lines, the last one cut with an ellipsis (line clamp); default none
     expandable: with lines, a "Show more" button under the text while it is cut; it shows the rest and reads
       "Show less" to fold it again; default false
     defaultExpanded: an expandable text starts unfolded; default false
     tabular: digits of equal width (tabular figures), so numbers line up down a column and do not shift as they
       change; default false
     strings: the words of the expand button: { more: 'Show more', less: 'Show less' }
     className: more classes on the text
     children: the text
     ...rest: other attributes go on the element
   Behavior:
     lines clamps with the line-clamp property; the whole text stays in the page, so search, copy and screen readers
       get all of it.
     expandable measures the text: the button shows only while the text is cut (and while it is unfolded). It is a
       button with aria-expanded that points at the text (aria-controls); it measures again when the width changes.
     display and lead are type styles only: the element (as) gives the heading level.
   Notes:
     Applications never set a font, size, weight or color themselves.
     There are no margins in any case, whatever the element.
     The expand button has the look of ShowMore (CollapsibleSection): the smallest button, its chevron after the
       label, down to show more and up to show less.
*/
const LINES = [2, 3, 4];
const STRINGS = {
  more: 'Show more',
  less: 'Show less'
};

// a text's classes: its role, how it overflows (one line, or at most `clamp` lines while folded) and its figures
const textClass = (variant, truncate, clamp, open, tabular, className) => (0, _cx.cx)('plx-text', 'plx-text--' + variant, truncate && !clamp && 'plx-text--truncate', clamp && !open && 'plx-text--lines-' + clamp, tabular && 'plx-text--tabular', className);
function Text({
  as: As = 'span',
  variant = 'body',
  truncate = false,
  lines,
  expandable = false,
  defaultExpanded = false,
  tabular = false,
  strings,
  className,
  children,
  ...rest
}) {
  const clamp = LINES.indexOf(Number(lines)) >= 0 ? Number(lines) : null;
  if (expandable && clamp) {
    return /*#__PURE__*/_react.default.createElement(ExpandableText, {
      As: As,
      variant: variant,
      clamp: clamp,
      defaultExpanded: defaultExpanded,
      tabular: tabular,
      strings: strings,
      className: className,
      rest: rest
    }, children);
  }
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    className: textClass(variant, truncate, clamp, false, tabular, className)
  }, rest), children);
}

// a clamped text and its Show more button: the button shows while the text is cut, and while it is unfolded
function ExpandableText({
  As,
  variant,
  clamp,
  defaultExpanded,
  tabular,
  strings,
  className,
  rest,
  children
}) {
  const own = (0, _layer.useUid)('plx-text');
  const id = rest.id || own;
  const ref = _react.default.useRef(null);
  const [open, setOpen] = _react.default.useState(defaultExpanded);
  const [cut, setCut] = _react.default.useState(false);
  _react.default.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || open) return undefined;
    const measure = () => setCut(el.scrollHeight > el.clientHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const watch = new ResizeObserver(measure);
    watch.observe(el);
    return () => watch.disconnect();
  }, [open, children]);
  const words = Object.assign({}, STRINGS, strings);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-text-expand"
  }, /*#__PURE__*/_react.default.createElement(As, _extends({}, rest, {
    ref: ref,
    id: id,
    className: textClass(variant, false, clamp, open, tabular, className)
  }), children), open || cut ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "2xs",
    iconEnd: open ? 'chevron-up' : 'chevron-down',
    "aria-expanded": open,
    "aria-controls": id,
    onClick: () => setOpen(!open)
  }, open ? words.less : words.more) : null);
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
  "platform/components/Notice/Notice.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notice = Notice;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _Button = require("../Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Notice
   Summary: A short message inside a page, a panel or a dialog (an inline message); with a title, actions or a dismiss
     button it is a section message: a message about one section of the page that people can act on or put away.
     It shows its tone's soft surface and content color, an icon and the text.
   Usage:
     <Notice tone="warning">This folder is shared with 3 people.</Notice>
     <Notice tone="danger" title="The export failed" actions={<Button size="xs" onClick={retry}>Try again</Button>}
       onDismiss={() => setShown(false)}>The server did not answer.</Notice>
   Props:
     tone: "info" (default) | "success" | "warning" | "danger"
     icon: an icon name; the tone's icon unless given
     title: a short heading above the text, which names the message (a section message)
     actions: buttons under the text (one or two, size "xs"), the next steps the message offers
     onDismiss(event): shows a dismiss button at the end; called when it is pressed (the page hides the notice)
     strings: the words it announces, for other languages: { dismiss: "Dismiss" } (the dismiss button's name)
     className: more classes on the notice
     children: the message text
     ...rest: other attributes go on the notice element
   Behavior:
     A danger notice has role="alert", so screen readers announce it.
     The dismiss button is the last Tab stop of the notice; the page decides what happens to focus after it hides the
       notice (it moves to the next thing in the section).
   Notes:
     Without a title, actions or onDismiss the markup is the plain inline message (the icon and the text).
*/
const ICONS = {
  info: 'info-circle',
  success: 'circle-check',
  warning: 'warning',
  danger: 'alert'
};
const STRINGS = {
  dismiss: 'Dismiss'
};
function Notice({
  tone = 'info',
  icon,
  title,
  actions,
  onDismiss,
  strings,
  className,
  children,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings);
  const section = title || actions;
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-notice', 'plx-notice--' + tone, className),
    role: tone === 'danger' ? 'alert' : undefined
  }, rest), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon || ICONS[tone]
  }), section ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notice__body"
  }, title ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notice__title"
  }, title) : null, children ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notice__text"
  }, children) : null, actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notice__actions"
  }, actions) : null) : /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-notice__text"
  }, children), onDismiss ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    className: "plx-notice__dismiss",
    variant: "ghost",
    size: "xs",
    iconOnly: true,
    icon: "close",
    label: t.dismiss,
    onClick: onDismiss
  }) : null);
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
  icon: 'doc-text',
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
  "platform/components/Brand/Brand.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../providers/apps.js":"platform/providers/apps.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrandMark = BrandMark;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _apps = require("../../providers/apps.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · BrandMark
   Summary: The Plenix brand from the brand kit (platform/brand/): the mark alone, the wordmark, the logo (mark and wordmark
     in one lockup) and the product mark of each application, in the brand colors, in one color or on the accent.
   Usage:
     <BrandMark />                                  the mark, decorative, beside the product name (the header)
     <BrandMark label="Plenix" />                   the mark on its own, named
     <BrandMark kind="logo" size="lg" />            the logo: the mark and the wordmark
     <BrandMark kind="wordmark" tone="mono" />      the name alone, in the current text color
     <BrandMark kind="product" app="notes" />       the product mark of an application (PLENIX_APPS)
     <BrandMark kind="logo" tone="on-accent" />     on the blue header or another accent surface
   Props:
     BrandMark.kind: "mark" (default) | "wordmark" | "logo" (mark + wordmark) | "product" (the application's tile + its name)
     BrandMark.tone: the colors. Without it the mark takes the current text color (as in the header); "brand" (the default of
       the wordmark, the logo and the product mark) draws the mark in the brand blue and the name in the text color; "mono"
       draws everything in the current text color; "on-accent" everything in the accent content color (the blue header)
     BrandMark.size: "sm" (the minimum: a 16px mark) | "md" (20px) | "lg" (24px) | "xl" (32px); without it the mark takes
       the control icon size and a lockup is "md"
     BrandMark.app: kind="product": an application id from PLENIX_APPS ("notes") or an application ({ label, icon })
     BrandMark.showName: kind="product": false draws the tile alone, named by the application (default true)
     BrandMark.clearSpace: pads the lockup with the brand's clear space (brand-rules.json), for a logo that stands on its own
     BrandMark.label: the accessible name of the mark alone (or of the product tile alone); without it the mark is decorative
     BrandMark.strings: { name: "Plenix" } (the wordmark's text: the brand name of brand.json)
     BrandMark.className: more classes
   Behavior:
     The mark is the brand kit's file (platform/brand/brand.json files.mark), drawn as a mask in the color its tone gives:
       its square includes the kit's clear space. The wordmark is live text in the heading face, at a size of the type
       scale, so it is read as the brand name; the mark inside a lockup is decorative.
     The product mark is the application's icon (PLENIX_APPS) on the brand tile, then the application's name.
     The sizes stop at "sm": below it the mark loses its central cross (the minimum sizes of brand-rules.json).
   Notes:
     Never redraw or recolor the mark by hand: replace the kit's files and build (build-brand.js). The brand rules (clear
       space, minimum sizes, backgrounds, misuse) are platform/brand/brand-rules.json; the Brand application page shows them.
     The brand blue comes from the brand tokens (tokens/components/brand.tokens.json), never from a palette color.
     Other props pass through to the outer <span>.
*/
const STRINGS = {
  name: 'Plenix'
};
function BrandMark({
  kind = 'mark',
  tone,
  size,
  app,
  showName = true,
  clearSpace = false,
  label,
  strings,
  className,
  ...rest
}) {
  const s = {
    ...STRINGS,
    ...strings
  };
  if (kind === 'mark') {
    const cls = (0, _cx.cx)('plx-brand-mark', tone && 'plx-brand-mark--tone-' + tone, size && 'plx-brand-mark--size-' + size, className);
    return label ? /*#__PURE__*/_react.default.createElement("span", _extends({
      role: "img",
      "aria-label": label,
      className: cls
    }, rest)) : /*#__PURE__*/_react.default.createElement("span", _extends({
      "aria-hidden": "true",
      className: cls
    }, rest));
  }
  const lockup = (0, _cx.cx)('plx-brand-lockup', 'plx-brand-lockup--' + kind, 'plx-brand-lockup--tone-' + (tone || 'brand'), 'plx-brand-lockup--size-' + (size || 'md'), clearSpace && 'plx-brand-lockup--clear', className);
  if (kind === 'product') {
    const a = typeof app === 'string' ? (0, _apps.appById)(app) : app;
    const name = a ? a.label : s.name;
    return /*#__PURE__*/_react.default.createElement("span", _extends({
      className: lockup,
      role: showName ? undefined : 'img',
      "aria-label": showName ? undefined : label || name
    }, rest), /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-brand-lockup__tile",
      "aria-hidden": "true"
    }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: a ? a.icon : 'home',
      className: "plx-brand-lockup__icon"
    })), showName ? /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-brand-lockup__app"
    }, name) : null);
  }
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: lockup
  }, rest), kind === 'logo' ? /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true",
    className: "plx-brand-mark plx-brand-lockup__mark"
  }) : null, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-brand-lockup__name"
  }, s.name));
}
  } },
  "platform/components/ColorSwatch/dataColors.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_COLORS = void 0;
/* Plenix · DATA_COLORS
   Summary: The data colors by name, GENERATED by build-steps.js from the --plx-sys-data-color-<hue> theme tokens (do not edit).
   Usage:
     import { DATA_COLORS } from 'plenix-platform';   // ["blue","green","purple","red","brown","gray"]
     <ColorSwatch color={DATA_COLORS[0]} />
   Props:
     none: a list of hue names, in the order the theme defines them
*/
const DATA_COLORS = exports.DATA_COLORS = ["blue", "green", "purple", "red", "brown", "gray"];
  } },
  "platform/components/ColorSwatch/categoryColors.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CATEGORY_COLORS = void 0;
/* Plenix · CATEGORY_COLORS
   Summary: The category colors by name, GENERATED by build-steps.js from the --plx-sys-category-<name> tokens (do not edit):
     Trubetskoy's 20 simple, distinct colors in his convenient order (take the first n for n categories).
   Usage:
     import { CATEGORY_COLORS } from 'plenix-platform';
     <ColorPicker palette="category" value={category.color} onChange={…} />
   Props:
     none: a list of names
*/
const CATEGORY_COLORS = exports.CATEGORY_COLORS = ["red", "green", "yellow", "blue", "orange", "purple", "cyan", "magenta", "lime", "pink", "teal", "lavender", "brown", "beige", "maroon", "mint", "olive", "apricot", "navy", "grey"];
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
  "platform/components/ColorSwatch/ColorSwatch.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","./dataColors.js":"platform/components/ColorSwatch/dataColors.js","./categoryColors.js":"platform/components/ColorSwatch/categoryColors.js","../Button/Button.jsx":"platform/components/Button/Button.jsx","../Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","../../utils/overflow.js":"platform/utils/overflow.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPicker = ColorPicker;
exports.ColorSwatch = ColorSwatch;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _dataColors = require("./dataColors.js");
var _categoryColors = require("./categoryColors.js");
var _Button = require("../Button/Button.jsx");
var _Menu = require("../Menu/Menu.jsx");
var _overflow = require("../../utils/overflow.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · ColorSwatch
   Summary: A color from the data shown as a small square chip (a category's color).
   Usage:
     <ColorSwatch color={category.color} />
     <ColorSwatch color={category.color} label="Blue" pressed={picked === 'blue'} onClick={() => …} />
     <ColorSwatch color="green" label="Green" showLabel />
     <ColorPicker palette="category" colors={['red', 'green', 'blue']} value={c} onChange={setC} />
   Props:
     color: a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280)
     category: instead of color, a category color by name (CATEGORY_COLORS: the category palette, its own tokens), set as
       data-plx-category (batch 290)
     tone: instead of color, a surface of the system it previews: "accent" (the accent surface) | "surface" | "frost"
     size: "sm" (16px) | "md" (default; 20px)
     shape: "square" (default: 2px corners, owner batch 291) | "round" (a circle)
     pressed: marks the chosen color (aria-pressed), with onClick
     label: the accessible name of the color, with onClick
     showLabel: shows the label as text after the swatch (default false); with onClick the swatch and its label are one
       button (wave 4)
     onClick(event): makes the swatch a button that picks the color
     className: more classes on the swatch
     ColorPicker: the data colors (DATA_COLORS) as a group of swatch buttons, one pressed (batch 280: a data color is a hue)
       ColorPicker.value: the chosen hue
       ColorPicker.onChange(hue): runs with the hue picked
       ColorPicker.label: the group's accessible name (default "Color")
       ColorPicker.size: the swatches' size (default "md")
       ColorPicker.palette: "data" (default: the data hues) | "category" (the category colors: categories use these)
       ColorPicker.colors: a custom set: the names to offer from the palette, in this order (unknown names are left out)
         (wave 4)
       ColorPicker shows one row (owner, batch 290): the colors that do not fit are in a More menu at its end ("+n", or the
       chosen color when it is one of them), each with its swatch and name
       ColorPicker.className: more classes on the group
   Behavior:
     With onClick it is a button that picks the color; without it the swatch is hidden from assistive technology.
     With showLabel the color's name is text beside it, read as text; the swatch itself stays decorative.
     A swatch button's target is at least 24px (44px with touch) whatever its size: it extends invisibly past the swatch
       (Platforms Standard 3.1); with touch each swatch of a ColorPicker gets a slot that wide.
   Notes:
     The hue reaches the stylesheet as the data-plx-color attribute (system/steps.css), the only way a data color enters a page.
     Other props pass through to the <button> or <span>.
*/
const nameOf = h => h.charAt(0).toUpperCase() + h.slice(1);
function ColorSwatch({
  color,
  category,
  tone,
  size = 'md',
  shape = 'square',
  pressed,
  label,
  showLabel = false,
  onClick,
  className,
  ...rest
}) {
  if (showLabel && label) {
    // the swatch and its name as one unit: a button when it picks the color, else a span with the name as text
    const chip = /*#__PURE__*/_react.default.createElement(ColorSwatch, {
      color: color,
      category: category,
      tone: tone,
      size: size,
      shape: shape
    });
    const text = /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-color-swatch-label__text"
    }, label);
    return onClick ? /*#__PURE__*/_react.default.createElement("button", _extends({
      type: "button",
      className: (0, _cx.cx)('plx-color-swatch-label', className),
      "aria-pressed": !!pressed,
      onClick: onClick
    }, rest), chip, text) : /*#__PURE__*/_react.default.createElement("span", _extends({
      className: (0, _cx.cx)('plx-color-swatch-label', className)
    }, rest), chip, text);
  }
  const cls = (0, _cx.cx)('plx-color-swatch', 'plx-color-swatch--' + size, shape === 'round' && 'plx-color-swatch--round', tone && 'plx-color-swatch--' + tone, className);
  return onClick ? /*#__PURE__*/_react.default.createElement("button", _extends({
    type: "button",
    className: cls,
    "data-plx-color": color || undefined,
    "data-plx-category": category || undefined,
    "aria-pressed": !!pressed,
    "aria-label": label,
    onClick: onClick
  }, rest)) : /*#__PURE__*/_react.default.createElement("span", _extends({
    className: cls,
    "data-plx-color": color || undefined,
    "data-plx-category": category || undefined,
    "aria-hidden": "true"
  }, rest));
}

// the data colors to choose from: each a swatch button named by its hue, the chosen one pressed
function ColorPicker({
  value,
  onChange,
  label = 'Color',
  size = 'md',
  palette = 'data',
  colors,
  invalid,
  required,
  className,
  ...rest
}) {
  // invalid and required: from Field, not for a group
  const all = palette === 'category' ? _categoryColors.CATEGORY_COLORS : _dataColors.DATA_COLORS;
  const list = Array.isArray(colors) ? colors.filter(h => all.indexOf(h) >= 0) : all;
  const cat = palette === 'category';
  const ref = _react.default.useRef(null);
  const fit = (0, _overflow.useOverflow)(ref, list.length, palette + size + list.join());
  const hidden = list.slice(fit);
  const pick = h => {
    if (onChange) onChange(h);
  };
  const swatch = (h, extra) => /*#__PURE__*/_react.default.createElement(ColorSwatch, _extends({
    key: h,
    color: cat ? undefined : h,
    category: cat ? h : undefined,
    size: size
  }, extra));
  // each swatch in a slot as tall as the row, so every item and the More button share the first row's top
  const items = list.map(h => /*#__PURE__*/_react.default.createElement("span", {
    key: h,
    "data-plx-overflow-item": "",
    className: "plx-color-picker__slot"
  }, swatch(h, {
    label: nameOf(h),
    pressed: value === h,
    onClick: () => pick(h)
  })));
  const chosenHidden = hidden.indexOf(value) >= 0;
  const more = hidden.length ? /*#__PURE__*/_react.default.createElement("span", {
    key: "plx-more",
    "data-plx-overflow-more": "",
    className: "plx-color-picker__more"
  }, /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: 'More colors',
    placement: "bottom-end",
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "2xs",
      variant: chosenHidden ? 'secondary' : 'ghost',
      caret: true,
      "aria-label": 'More colors' + (chosenHidden ? ', ' + nameOf(value) + ' chosen' : '')
    }, chosenHidden ? /*#__PURE__*/_react.default.createElement(ColorSwatch, {
      color: cat ? undefined : value,
      category: cat ? value : undefined,
      size: "sm"
    }) : '+' + hidden.length)
  }, hidden.map(h => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: h,
    role: "menuitemradio",
    checked: value === h,
    icon: swatch(h, {
      size: 'sm'
    }),
    onSelect: () => pick(h)
  }, nameOf(h))))) : null;
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    ref: ref,
    role: "group",
    "aria-label": label || undefined,
    className: (0, _cx.cx)('plx-color-picker', className)
  }, rest), (0, _overflow.splitAt)(items, fit, more));
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
     It is the sunken surface, rounded, in a shape of the aspect-ratio scale (4:3 by default), with its content centered.
   Usage:
     <Preview ratio="16-9" fit="cover"><img className="plx-preview__media" src={src} alt="Kitchen, before" /></Preview>
     <Preview as="button" onClick={openViewer} topStart={<Tag>PNG</Tag>} bottomEnd={<Icon name="expand" />}>
       <img src={src} alt="" />
     </Preview>
   Props:
     as: "div" (default) | "button" (opens the item, e.g. the media viewer)
     ratio: the shape, from the aspect-ratio scale (--plx-ref-ratio-*): "4-3" (default) | "1-1" | "3-2" | "16-9" | "21-9" |
       "3-4" | "9-16" (the last two portrait)
     aspect: the older name of ratio, as a photo's: "4/3" | "3/2" | "1/1" | "16/9" (as MediaCard's); ratio wins
     fit: how a picture (.plx-preview__media) fills the frame: none (default: a thumbnail at its own size, centered) |
       "cover" (it fills the frame and is cropped to it) | "contain" (it fills the frame, the whole picture showing)
     topStart: a small mark in the top-start corner (the type)
     bottomEnd: a small mark in the bottom-end corner (an expand icon)
     className: more classes on the preview
     children: the picture or placeholder
     ...rest: other attributes go on the preview element (onClick for a button)
   Behavior:
     The frame keeps its ratio at every width, so the space is reserved before the picture loads.
     cover and contain never stretch the picture; cover crops what does not fit, contain leaves the sunken surface around it.
   Notes:
     A ratio outside the scale falls back to 4:3: add it to the scale (a token) first.
*/
// the aspect-ratio scale (the Aspect-ratio scale foundation, platform/tokens/reference/ratio.tokens.json)
const RATIOS = ['1-1', '4-3', '3-2', '16-9', '21-9', '3-4', '9-16'];
const FITS = ['cover', 'contain'];
function Preview({
  as: As = 'div',
  ratio,
  aspect = '4/3',
  fit,
  topStart,
  bottomEnd,
  className,
  children,
  ...rest
}) {
  const r = ratio || String(aspect).replace('/', '-');
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    type: As === 'button' ? 'button' : undefined,
    "data-plx-ratio": RATIOS.indexOf(r) >= 0 ? r : '4-3'
  }, rest, {
    className: (0, _cx.cx)('plx-preview', As === 'button' && 'plx-preview--button', FITS.indexOf(fit) >= 0 && 'plx-preview--' + fit, className)
  }), children, topStart ? /*#__PURE__*/_react.default.createElement("span", {
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
   Summary: Equal columns side by side (a two- or three-column layout inside a dialog or a page), or a sidebar beside the
     main column; they collapse into one column below a window class.
   Usage:
     <Columns count={3} divided><Stack>…</Stack><Stack>…</Stack><Stack>…</Stack></Columns>
     <Columns ratio="sidebar-start" collapseBelow="wide"><Stack>Filters</Stack><Stack>Results</Stack></Columns>
   Props:
     count: 2 (default) | 3
     divided: a divider between the columns, each column padded (default false; the upload dialog's three steps)
     gap: "none" | "md" (default) | "lg", when not divided
     ratio: "equal" (default) | "sidebar-start" (a narrow first column, one third) | "sidebar-end" (a narrow last
       column); two columns only
     collapseBelow: none (default: always side by side) | "medium" (one column in a Narrow window, under 600px) | "wide"
       (one column in a Narrow or Medium window, under 840px)
     children: the columns; each child is one column (a Stack)
     className: more classes on the row
   Behavior:
     The window class is the main region's width (Platforms Standard 3.3), read by a container query on the shell's
       main region (.plx-shell-main), so a page with an inspector open collapses sooner than the window would say.
     Collapsed, the columns stack in their markup order with the layout gap between them; divided columns trade their
       vertical lines for a line above each column after the first.
     The reading and focus order are the markup order at every width.
   Notes:
     Outside the shell's main region nothing collapses (there is no window class to read).
     Other props pass through to the <div>.
*/
function Columns({
  count = 2,
  divided = false,
  gap = 'md',
  ratio = 'equal',
  collapseBelow,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-columns', 'plx-columns--' + count, divided ? 'plx-columns--divided' : 'plx-columns--gap-' + gap, count === 2 && ratio !== 'equal' ? 'plx-columns--' + ratio : null, collapseBelow ? 'plx-columns--collapse-below-' + collapseBelow : null, className)
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
   Summary: A list of short statements, each with a leading icon in a tone (do and don't, features, requirements); or an
     ordered list, numbered (1, 2, 3) or lettered (a, b, c), or drawn as steps; lists nest one level inside an item.
   Usage:
     <List items={[{ icon: 'circle-check', tone: 'success', children: 'Use it for…' }]} />
     <List><List.Item icon="close" tone="danger">Avoid…</List.Item></List>
     <List ordered items={[{ children: 'Create the project' }, { children: 'Upload the files', items: [{ children: 'Photos' }], ordered: 'alpha' }]} />
     <List ordered variant="steps" items={[{ children: 'Choose the files' }, { children: 'Add the details' }]} />
   Props:
     List.items: the statements: [{ icon, tone, children, items, ordered }]; or pass List.Item children
     List.ordered: an ordered list (<ol>): "decimal" (true is the same) | "alpha"; without it, the icon list (<ul>)
     List.variant: "icons" (default) | "steps": an ordered list whose numbers sit in a circle, for steps to follow
     List.label: names the list for assistive technology when its heading is not next to it
     List.children: List.Item elements, when there are no items
     List.className: more classes on the list
     List.Item.icon: the icon name (icon lists)
     List.Item.tone: "neutral" (default) | "success" | "danger" | "info" | "warning"
     List.Item.items: a nested list under the statement, of the same kind unless List.Item.ordered says otherwise
     List.Item.ordered: the kind of the nested list: "decimal" | "alpha" | false (an icon list)
     List.Item.children: the statement
     List.Item.className: more classes on the <li>
   Behavior:
     Items wrap; the icon, number or step sits on the first line.
     The icon is decorative and hidden from assistive technology (the text carries the meaning); an ordered list is an
       <ol>, so its numbers are announced with the items.
     A nested list starts under its statement's text (the same keyline); nest one level only (two at most).
*/

const kindOf = ordered => ordered === 'alpha' ? 'alpha' : ordered ? 'decimal' : null;
function List({
  items,
  label,
  ordered,
  variant = 'icons',
  className,
  children
}) {
  const kind = kindOf(ordered || (variant === 'steps' ? 'decimal' : null));
  const Tag = kind ? 'ol' : 'ul';
  return /*#__PURE__*/_react.default.createElement(Tag, {
    "aria-label": label,
    className: (0, _cx.cx)('plx-list', kind && 'plx-list--ordered', kind === 'alpha' && 'plx-list--alpha', kind && variant === 'steps' && 'plx-list--steps', className)
  }, items ? items.map((it, i) => /*#__PURE__*/_react.default.createElement(List.Item, {
    key: i,
    icon: it.icon,
    tone: it.tone,
    items: it.items,
    ordered: it.ordered === undefined ? kind : it.ordered
  }, it.children)) : children);
}
List.Item = function ListItem({
  icon,
  tone = 'neutral',
  items,
  ordered,
  className,
  children
}) {
  const text = /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-list__text"
  }, children);
  return /*#__PURE__*/_react.default.createElement("li", {
    className: (0, _cx.cx)('plx-list__item', 'plx-list__item--' + tone, className)
  }, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-list__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  })) : null, items && items.length ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-list__body"
  }, text, /*#__PURE__*/_react.default.createElement(List, {
    items: items,
    ordered: ordered,
    className: "plx-list--nested"
  })) : text);
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
   Summary: A small uppercase heading that names a group (navigation sections, panel sections, settings), sized by its level.
   Usage:
     <SectionHeading collapsible expanded={open} onToggle={() => setOpen(!open)} controls="recent-body">Recent</SectionHeading>
     <SectionHeading level={2}>Appearance</SectionHeading>
   Props:
     level: the heading level; default 3; null for a plain label. Each level takes its own size from the type scale: 2 (13px)
       is larger than 3 (11px), which is larger than 4 (10px); a plain label and levels 5 and 6 are 10px
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
     The size follows the level (plx-section-heading--level-2, -3, -4), so pick the level from the outline, never for a size.
   Notes:
     It sets no outer margin: the list or panel it sits in spaces it.
*/
// the levels with their own size (section-heading.css); the others keep the base size
const LEVELS = [2, 3, 4];
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
  const sized = LEVELS.indexOf(level) >= 0 && 'plx-section-heading--level-' + level;
  if (collapsible) {
    return /*#__PURE__*/_react.default.createElement(Tag, _extends({
      className: (0, _cx.cx)('plx-section-heading', sized, 'plx-section-heading--collapsible', className)
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
    className: (0, _cx.cx)('plx-section-heading', sized, className)
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-section-heading__label"
  }, children), actions ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-section-heading__actions"
  }, actions) : null);
}
  } },
  "platform/components/CollapsibleSection/CollapsibleSection.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleSection = CollapsibleSection;
exports.ShowMore = ShowMore;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
var _Button = require("../Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · CollapsibleSection
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
     ShowMore: the "Show more" button under a list that shows only its first rows (owner, batch 276: it carries an icon):
       ShowMore.expanded: the rest is shown (aria-expanded); the label reads "Show less" and the chevron points up
       ShowMore.count: how many are hidden, shown as "Show more (count)" (a number, or text such as "+3")
       ShowMore.onToggle(next): runs with the new state
       ShowMore.size: the button size (default "2xs", the smallest); other props reach the Button (variant)
   Behavior:
     Controlled with expanded and onToggle(next); uncontrolled with defaultExpanded.
     The header is one button (aria-expanded, pointing at the body).
     The chevron at the end points down while open.
     The body is removed from view, and from the accessibility tree, while collapsed.
   Notes:
     It is the section header: an accent uppercase title with an optional icon, a divider beneath it and a
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

// "Show more (n)" / "Show less" with its chevron after the label: down to show more, up to show less (batch 276)
function ShowMore({
  expanded = false,
  count,
  onToggle,
  size = '2xs',
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(_Button.Button, _extends({
    size: size,
    iconEnd: expanded ? 'chevron-up' : 'chevron-down',
    "aria-expanded": expanded,
    onClick: () => {
      if (onToggle) onToggle(!expanded);
    }
  }, rest), expanded ? 'Show less' : 'Show more' + (count !== undefined && count !== null && count !== '' ? ' (' + count + ')' : ''));
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
     Input.type: the input type (default "text"); "color" gives the color well: a square swatch the field's height, no border
       (owner, batch 275); the system sizes it, so it takes no width or utility
     Input.inputMode, autoComplete, enterKeyHint, autoCapitalize, spellCheck: the on-screen keyboard and autofill hints
       (Platforms Standard 3.5 and 6.2); a type of "email", "url", "tel" or "search" brings its matching defaults (below)
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
     Keyboard hints by type, each overridden by its own prop: email and url get their inputMode, no capitals and no spell
     check; tel gets inputMode "tel"; search gets inputMode "search" and enterKeyHint "search".
   Notes:
     They take every native attribute (value, onChange, placeholder, disabled, readOnly, required…).
     All three forward their ref to the native element.
*/
// the keyboard a type brings on a touch screen (Platforms Standard 3.5: the right type, inputmode and autocomplete)
const TYPE_HINTS = {
  email: {
    inputMode: 'email',
    autoCapitalize: 'off',
    spellCheck: false
  },
  url: {
    inputMode: 'url',
    autoCapitalize: 'off',
    spellCheck: false
  },
  tel: {
    inputMode: 'tel'
  },
  search: {
    inputMode: 'search',
    enterKeyHint: 'search'
  }
};
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
  }, TYPE_HINTS[type], rest));
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
   Summary: What a region shows when it has nothing yet, and how to add the first item; in a tone, what failed, what needs
     care or what went well, and the one action that follows (platforms.md 5.5); with a kind, the common system states
     (offline, degraded, permission denied, not found, maintenance, completion) with their icon, tone and words.
   Usage:
     <EmptyState size="page" icon="folder" title="No assets yet" action={<Button variant="primary">Upload</Button>}>
       Upload files to start.</EmptyState>
     <EmptyState tone="error" title="The assets could not load" action={<Button icon="refresh" onClick={reload}>Retry</Button>}>
       The server did not answer.</EmptyState>
     <EmptyState kind="offline" action={<Button icon="refresh" onClick={reload}>Try again</Button>} />
     <EmptyState kind="permission-denied" title="You can’t open this project">Ask its owner to share it with you.</EmptyState>
   Props:
     size: "inline" (default; a line inside a list or table area) | "page" (a whole view)
     tone: "neutral" (default; empty) | "error" (the content could not load: the title names the problem, the action
       recovers; announced as an alert, the icon in the danger color) | "warning" (something needs care before the region
       works fully: the icon in the warning color) | "success" (the work here is finished: the icon in the success color);
       warning and success are announced politely (role="status")
     kind: a system state that brings its icon, tone, title and text (each still overridable by the props):
       "offline" (warning, wifi-off) | "degraded" (warning, cloud-off) | "permission-denied" (neutral) | "not-found" (neutral)
       | "maintenance" (neutral) | "completion" (success)
     icon: an icon name or an <Icon> (or other mark); hidden from assistive technology; the default comes from the kind,
       else from the tone (error and warning "warning", success "circle-check")
     title: the main line (the kind's title unless given)
     action: a button (one: the action that fills the region, recovers from the error or moves on)
     children: the explaining text (the kind's text unless given)
     strings: the kinds' words, for other languages: { offline: { title, text }, degraded: { … }, … } (merged over the defaults)
     className: more classes on the region
   Behavior:
     The error tone is a live alert (role="alert"): a screen reader says it when it appears. Warning and success are a
       status (role="status"), read when the reader is idle. The neutral tone is not announced.
     Its words carry the meaning; the tone color on the icon is never the only sign (WCAG 1.4.1).
   Notes:
     Other props pass through to the <div>.
     A kind sets defaults only: an explicit tone, icon, title or children wins.
*/
// the system states: their tone and icon, and their words (STRINGS, translatable through the strings prop)
const KINDS = {
  offline: {
    tone: 'warning',
    icon: 'wifi-off'
  },
  degraded: {
    tone: 'warning',
    icon: 'cloud-off'
  },
  'permission-denied': {
    tone: 'neutral',
    icon: 'lock'
  },
  'not-found': {
    tone: 'neutral',
    icon: 'doc-search'
  },
  maintenance: {
    tone: 'neutral',
    icon: 'settings-maintenance'
  },
  completion: {
    tone: 'success',
    icon: 'circle-check'
  }
};
const STRINGS = {
  offline: {
    title: 'You’re offline',
    text: 'Check your connection. This page updates when you’re back online.'
  },
  degraded: {
    title: 'Some features aren’t working',
    text: 'A service is slow or not responding, so what you see may be out of date.'
  },
  'permission-denied': {
    title: 'You don’t have access',
    text: 'Ask the owner to share it with you.'
  },
  'not-found': {
    title: 'This page doesn’t exist',
    text: 'It may have been moved or deleted. Check the address or go back.'
  },
  maintenance: {
    title: 'Down for maintenance',
    text: 'This service is being updated. Try again in a few minutes.'
  },
  completion: {
    title: 'All done',
    text: 'There’s nothing left to do here.'
  }
};
const TONE_ICONS = {
  error: 'warning',
  warning: 'warning',
  success: 'circle-check'
};
const ROLES = {
  error: 'alert',
  warning: 'status',
  success: 'status'
};
function EmptyState({
  size = 'inline',
  tone,
  kind,
  icon,
  title,
  action,
  strings,
  className,
  children,
  ...rest
}) {
  const preset = KINDS[kind];
  const words = preset ? Object.assign({}, STRINGS[kind], strings && strings[kind]) : null;
  const t = tone || (preset ? preset.tone : 'neutral');
  const mark = icon !== undefined ? icon : preset ? preset.icon : TONE_ICONS[t];
  const head = title !== undefined ? title : words ? words.title : null;
  const text = children !== undefined && children !== null ? children : words ? words.text : null;
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-empty-state', 'plx-empty-state--' + size, t !== 'neutral' && 'plx-empty-state--' + t, className),
    role: ROLES[t]
  }, rest), mark ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__icon",
    "aria-hidden": "true"
  }, typeof mark === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: mark
  }) : mark) : null, head ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__title"
  }, head) : null, text ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-empty-state__text"
  }, text) : null, action ? /*#__PURE__*/_react.default.createElement("div", {
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
exports.RTL_LANGUAGES = void 0;
exports.arrowStep = arrowStep;
exports.directionOf = directionOf;
exports.getDirection = getDirection;
exports.isRtl = isRtl;
exports.physicalSide = physicalSide;
/* Plenix · Writing direction (platform/utils/direction.js)
   Summary: Right-to-left and left-to-right in script: the direction of an element or a language, the arrow keys in reading
     order, and the physical side of a logical one. In a right-to-left page Arrow Right moves back and Arrow Left forward,
     as the eye reads; Up and Down are the same in both directions.
   Usage:
     const step = arrowStep(e, e.currentTarget);   // +1, -1 or 0
     if (step) { e.preventDefault(); move(index + step); }
     directionOf('ar-EG')          // "rtl"
     physicalSide('start', 'rtl')  // "right"
   Props:
     isRtl(el): true when the element is laid out right to left (its computed direction)
     arrowStep(event, el, { vertical }): +1 for the next item, -1 for the previous one, 0 for another key; with vertical:
       false, Up and Down are ignored (a horizontal-only control)
     getDirection(el): "rtl" | "ltr", the element's computed direction (the document's when no element is given)
     directionOf(locale): "rtl" for a language written right to left (Arabic, Hebrew, Persian, Urdu and the others in
       RTL_LANGUAGES), else "ltr"
     physicalSide(side, dir): "left" | "right" for a logical "start" or "end" in that direction (for a measurement API that
       only speaks physical sides, such as a pointer's clientX); "left" and "right" come back as they are
     RTL_LANGUAGES: the language subtags written right to left
   Behavior:
     The direction comes from the dir attribute on the element or an ancestor (<html dir="rtl">, a DirectionProvider):
       stylesheets use logical properties (inline-start, inline-end), so the layout mirrors on its own; script reads the
       computed direction only where it measures or handles arrow keys.
*/
const RTL_LANGUAGES = exports.RTL_LANGUAGES = ['ar', 'arc', 'ckb', 'dv', 'fa', 'he', 'iw', 'ps', 'sd', 'syr', 'ug', 'ur', 'yi'];
function isRtl(el) {
  return !!el && typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
}
function getDirection(el) {
  if (typeof window === 'undefined') return 'ltr';
  return isRtl(el || document.documentElement) ? 'rtl' : 'ltr';
}
function directionOf(locale) {
  const lang = String(locale || '').toLowerCase().split(/[-_]/)[0];
  return RTL_LANGUAGES.indexOf(lang) >= 0 ? 'rtl' : 'ltr';
}
function physicalSide(side, dir) {
  if (side !== 'start' && side !== 'end') return side;
  return side === 'start' === (dir !== 'rtl') ? 'left' : 'right';
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
     type, inputMode, autoComplete, enterKeyHint: keyboard and autofill hints handed to the control (Platforms Standard 3.5),
       unless it sets its own
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
  type,
  inputMode,
  autoComplete,
  enterKeyHint,
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
  const props = {
    id: child.props.id || controlId,
    'aria-describedby': [child.props['aria-describedby'], descId, errId].filter(Boolean).join(' ') || undefined,
    invalid: child.props.invalid !== undefined ? child.props.invalid : error ? true : undefined,
    required: child.props.required !== undefined ? child.props.required : required || undefined
  };
  // keyboard hints given on the Field reach the control, unless it has its own
  const hints = {
    type,
    inputMode,
    autoComplete,
    enterKeyHint
  };
  Object.keys(hints).forEach(k => {
    if (hints[k] !== undefined && child.props[k] === undefined) props[k] = hints[k];
  });
  const control = /*#__PURE__*/_react.default.cloneElement(child, props);
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
     A Checkbox without label or description (a row's selection box) still has a 24px target (44px with touch): it extends
       invisibly past the 16px box (Platforms Standard 3.1).
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
     ...rest: other attributes go on the input (inputMode, enterKeyHint, autoComplete… override the search defaults)
   Behavior:
     The clear button shows only while there is text.
     The shortcut hint shows only while the field is empty.
     It is type="search" with inputMode "search" and enterKeyHint "search": a touch keyboard shows a Search key.
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
    inputMode: "search",
    enterKeyHint: "search",
    autoComplete: "off",
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
  "platform/utils/sizeSteps.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIZE_STEPS = void 0;
exports.snapSize = snapSize;
exports.stepSize = stepSize;
/* Plenix · SIZE_STEPS
   Summary: The size tokens in pixels, GENERATED by build-steps.js from the --plx-ref-size-* tokens (do not edit): the widths a pane snaps to.
   Usage:
     import { SIZE_STEPS, snapSize } from '../../utils/sizeSteps.js';
     snapSize(250, 140, 320)   // 240: the nearest size token within the limits
   Props:
     none: SIZE_STEPS lists the sizes in pixels, smallest first; snapSize(px, min, max) and stepSize(px, dir, min, max)
*/
const SIZE_STEPS = exports.SIZE_STEPS = [4, 8, 12, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 80, 92, 96, 100, 112, 120, 132, 140, 152, 160, 180, 200, 220, 240, 280, 300, 320, 360, 400, 500, 560, 600, 720, 900];
const within = (min, max) => SIZE_STEPS.filter(s => s >= min && s <= max);
// the size token nearest to px within [min, max] (the limit itself when no token lies between them)
function snapSize(px, min, max) {
  const c = within(min, max);
  if (!c.length) return Math.max(min, Math.min(max, px));
  return c.reduce((a, b) => Math.abs(b - px) < Math.abs(a - px) ? b : a);
}
// the next size token from px in a direction (+1 wider, -1 narrower), within [min, max]
function stepSize(px, dir, min, max) {
  const c = within(min, max);
  if (!c.length) return px;
  const cur = snapSize(px, min, max);
  const i = c.indexOf(cur) + (dir > 0 ? 1 : -1);
  return c[Math.max(0, Math.min(c.length - 1, i))];
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
  "platform/patterns/AppShell/AppShell.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/direction.js":"platform/utils/direction.js","../../utils/sizeSteps.js":"platform/utils/sizeSteps.js","../../providers/pageLayouts.js":"platform/providers/pageLayouts.js","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppShell = AppShell;
exports.Hide = Hide;
exports.LayoutContext = void 0;
exports.PageContent = PageContent;
exports.PanelSplitter = PanelSplitter;
exports.Show = Show;
exports.SideNavPortal = SideNavPortal;
exports.useAppLayout = exports.tokenValue = exports.tokenPx = exports.readPref = exports.below = void 0;
exports.useMedia = useMedia;
exports.writePref = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _direction = require("../../utils/direction.js");
var _sizeSteps = require("../../utils/sizeSteps.js");
var _pageLayouts = require("../../providers/pageLayouts.js");
var _Menu = require("../../components/Menu/Menu.jsx");
var _Button = require("../../components/Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · AppShell, PageContent, SideNavPortal, Show, Hide
   Summary: The root of an application page, after the Layout grid's shell: the header across the top, a body row with the
     navigation (left), the main region and the inspector panel (right), then the footer across the bottom.
   Usage:
     <AppShell header={<AppHeader…/>} sideNav={<NavPane…/>} panel={<SidePanel…/>} footer={<StatusBar…/>}>
       <PageContent>…</PageContent>
     </AppShell>
     <SideNavPortal><NavPane…/></SideNavPortal>
     <Show above="wide"><Text variant="data">2.4 MB</Text></Show>      <Hide below="medium"><Toolbar…/></Hide>
     <Show print><Text>Printed 12 October 2026</Text></Show>          <Hide print><ActionBar…/></Hide>
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
     Show / Hide (responsive visibility, the Hide / show page): show or hide their children by the window class, or on paper:
       above: a breakpoint: Show is there from it up (Hide removes it there): "medium" (600px, --plx-sys-shell-phone-below),
         "wide" (840px, --plx-sys-shell-rail-below), "inspector" (1024px, --plx-sys-shell-inspector-overlay-below), or any
         breakpoint token's name
       below: a breakpoint: Show is there only under it (Hide removes it there); with above too, both must hold
       print: Show only on paper; Hide never on paper (the window class does not apply)
       fallback: what is drawn where the children are not (the place a hidden action moved to, e.g. a menu item; default none)
       children: what is shown or hidden
     useAppLayout(): the layout state for the panes, or null outside an AppShell:
       { mode, open, expanded, width, setWidth, toggle, close, small, narrow, barEl, parentEl, hasSideNav, page, layout,
         claimPage(kind), parentRow, claimParentRow(), detailBack, claimBack({ label, onBack, ref }) }; mode is "inline",
         "rail", "overlay" (Medium), "bar" or "screen" (Narrow) or "none". parentRow is true while NavPane draws the parent
         row at Narrow; detailBack is a list-detail's Back (SecondaryPane, while its detail shows at Narrow), which the
         parent row then becomes; each claim returns its release
   Behavior:
     The areas are the shell's immediate children.
     The header and the footer always span the full width, above and below both side areas.
     The side areas live between the header and the footer, also when they open as overlays.
     Navigation: --plx-sys-shell-nav-width (240px), resizable 140–320px with the splitter on its edge; the width is remembered.
     A dragged width snaps to the size tokens (--plx-ref-size-*) and the arrow keys step through them (batch 281).
     The splitters follow the writing direction: in a right-to-left page the edges are mirrored, so dragging and Arrow Left /
       Right move the edge the mirrored way (the key toward the outside widens the area).
     The navigation's own Collapse button (in the pane's header) or Ctrl+[ collapses it to a rail whose Expand button opens
       it again; this is remembered.
     The window classes (Platforms Standard 3.3) decide the navigation's form (4.1): Wide (840px and up, from
       --plx-sys-shell-rail-below) the pane beside the main region; Medium (600-839px) a rail whose Expand opens the
       expanded rail over the main region (Escape or a click outside closes it); Narrow (under 600px,
       --plx-sys-shell-phone-below) never a drawer: the page's top-level destinations in a bottom navigation bar, always
       visible and labeled, and the pane a screen of its own, opened from the bar's Browse destination or the parent row
       at the top (NavPane).
     The shell keeps the safe areas (viewport-fit=cover): the header below the top inset, the bottom bar or footer above
       the bottom inset, both sides inside theirs.
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
     Show and Hide work anywhere (inside an AppShell or not). Off screen means not rendered at all: what is hidden by width
       leaves the page, the Tab order and the accessibility tree; on paper they toggle display (the content stays in the
       page for screen readers). Every hidden action needs a place where it still is (fallback, a menu, the detail view).
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
  const narrow = useMedia(below('--plx-sys-shell-phone-below'));
  const [barEl, setBarEl] = _react.default.useState(null); // where NavPane puts the bottom navigation bar at Narrow
  const [parentEl, setParentEl] = _react.default.useState(null); // where it puts the parent row (the way to the pane) at Narrow
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
  // one back control at Narrow: the parent row (NavPane) says it is drawn; a list-detail's Back (SecondaryPane) hands
  // itself to it while the detail shows, so the page never has two back rows
  const [parentRow, setParentRow] = _react.default.useState(false);
  const [detailBack, setDetailBack] = _react.default.useState(null);
  const claimParentRow = _react.default.useCallback(() => {
    setParentRow(true);
    return () => setParentRow(false);
  }, []);
  const claimBack = _react.default.useCallback(b => {
    setDetailBack(b);
    return () => setDetailBack(x => x === b ? null : x);
  }, []);
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
  }, [small, narrow]);
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
  const mode = !hasSide ? 'none' : narrow ? overlay ? 'screen' : 'bar' : small ? overlay ? 'overlay' : 'rail' : expanded ? 'inline' : 'rail';
  const ctx = _react.default.useMemo(() => ({
    hasSideNav: hasSide,
    slotEl,
    registerPortal,
    small,
    narrow,
    barEl,
    parentEl,
    mode,
    open: mode === 'inline' || mode === 'overlay' || mode === 'screen',
    expanded: small ? overlay : expanded,
    width,
    setWidth,
    toggle,
    close: () => setOverlay(false),
    page: claimed || page,
    layout,
    claimPage,
    parentRow,
    claimParentRow,
    detailBack,
    claimBack
  }), [hasSide, slotEl, registerPortal, small, narrow, barEl, parentEl, mode, overlay, expanded, width, setWidth, toggle, claimed, page, layout, claimPage, parentRow, claimParentRow, detailBack, claimBack]);
  return /*#__PURE__*/_react.default.createElement(LayoutContext.Provider, {
    value: ctx
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-app-shell', className),
    "data-plx-layout": LAYOUTS.indexOf(layout) >= 0 ? layout : 'fluid'
  }, /*#__PURE__*/_react.default.createElement("a", {
    className: "plx-app-shell__skip",
    href: '#' + mainId
  }, t.skip), header, narrow && hasSide ? /*#__PURE__*/_react.default.createElement("div", {
    ref: setParentEl,
    className: "plx-app-shell__parent-slot"
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-shell__body"
  }, sideNav || /*#__PURE__*/_react.default.createElement("div", {
    ref: setSlotEl,
    className: "plx-app-shell__slot"
  }), /*#__PURE__*/_react.default.createElement("main", {
    id: mainId,
    tabIndex: -1,
    className: (0, _cx.cx)('plx-app-shell__main', mainClassName),
    "data-plx-layout": LAYOUTS.indexOf(layout) >= 0 ? layout : 'fluid'
  }, children), panel), footer, narrow && hasSide ? /*#__PURE__*/_react.default.createElement("div", {
    ref: setBarEl,
    className: "plx-app-shell__bar-slot"
  }) : null));
}

/* the drag handle on a resizable area's inner edge: drag, or the arrow keys (16px), Home and End; double-click or Enter
   collapses the area when it can collapse. edge: "end" (an area at the start: dragging toward the end widens it) or
   "start" (an area at the end). In a right-to-left page the start is on the right, so the drag and Arrow Left / Right
   are mirrored (arrowStep gives the step in reading order).
   Without dragging (WCAG 2.5.7): a small menu button on the edge (shown while the edge is hovered or focused, always with
   a touch or mobile interaction) offers Narrower and Wider (one size token), Reset width (with defaultValue, the area's
   default width) and Collapse (with onCollapse). */
const SPLITTER = {
  options: '{label} options',
  narrower: 'Narrower',
  wider: 'Wider',
  reset: 'Reset width',
  collapse: 'Collapse'
};
function PanelSplitter({
  label,
  value,
  min,
  max,
  onChange,
  onCollapse,
  defaultValue,
  edge = 'end'
}) {
  const dir = edge === 'end' ? 1 : -1;
  // a width is always a size token (batch 281: Strict DS): dragging snaps to the nearest, the arrow keys step through them
  const clamp = w => (0, _sizeSteps.snapSize)(w, min, max());
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
    const step = (0, _direction.arrowStep)(e, e.currentTarget, {
      vertical: false
    }) * dir;
    if (step) {
      e.preventDefault();
      onChange((0, _sizeSteps.stepSize)(value, step, min, max()));
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
  const top = clamp(max()),
    now = clamp(value);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    role: "separator",
    "aria-orientation": "vertical",
    "aria-label": label,
    "aria-valuenow": value,
    "aria-valuemin": min,
    "aria-valuemax": top,
    tabIndex: 0,
    className: (0, _cx.cx)('plx-panel-splitter', 'plx-panel-splitter--' + edge),
    onPointerDown: onPointerDown,
    onKeyDown: onKeyDown,
    "data-plx-target-equivalent": "the width menu beside it (WCAG 2.5.8 Equivalent)",
    onDoubleClick: onCollapse || undefined
  }), /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: label,
    placement: edge === 'end' ? 'bottom-end' : 'bottom-start',
    className: (0, _cx.cx)('plx-panel-splitter__menu', 'plx-panel-splitter__menu--' + edge),
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "xs",
      iconOnly: true,
      icon: "more",
      label: SPLITTER.options.replace('{label}', label || '')
    })
  }, /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    disabled: now <= clamp(min),
    onSelect: () => onChange((0, _sizeSteps.stepSize)(value, -1, min, max()))
  }, SPLITTER.narrower), /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    disabled: now >= top,
    onSelect: () => onChange((0, _sizeSteps.stepSize)(value, 1, min, max()))
  }, SPLITTER.wider), defaultValue != null ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: "refresh",
    disabled: now === clamp(defaultValue),
    onSelect: () => onChange(clamp(defaultValue))
  }, SPLITTER.reset) : null, onCollapse ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: edge === 'end' ? 'panel-left-close' : 'panel-right-close',
    onSelect: onCollapse
  }, SPLITTER.collapse) : null));
}
function SideNavPortal({
  children
}) {
  const layout = useAppLayout();
  _react.default.useEffect(() => layout && layout.registerPortal ? layout.registerPortal() : undefined, []);
  if (!layout || !layout.registerPortal) return children; // outside an AppShell: render in place
  return layout.slotEl ? /*#__PURE__*/(0, _reactDom.createPortal)(children, layout.slotEl) : null;
}

/* <Show> and <Hide>: responsive visibility by the window class (the breakpoint tokens), or on paper; see the header. */
const BREAKPOINTS = {
  medium: '--plx-sys-shell-phone-below',
  wide: '--plx-sys-shell-rail-below',
  inspector: '--plx-sys-shell-inspector-overlay-below'
};
const breakpointQuery = b => b ? below(BREAKPOINTS[b] || b) : 'not all';
// true where the window is at or above "above" and under "below" (an omitted bound always holds)
function useWithin(above, under) {
  const underAbove = useMedia(breakpointQuery(above));
  const underBelow = useMedia(breakpointQuery(under));
  return (!above || !underAbove) && (!under || underBelow);
}
function Show({
  above,
  below: under,
  print = false,
  fallback = null,
  children
}) {
  const within = useWithin(above, under);
  if (print) return /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-visibility plx-visibility--print-only"
  }, children);
  return within ? children : fallback;
}
function Hide({
  above,
  below: under,
  print = false,
  fallback = null,
  children
}) {
  const within = useWithin(above, under);
  if (print) return /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-visibility plx-visibility--no-print"
  }, children);
  return (above || under) && within ? fallback : children;
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
  "platform/components/Sheet/Sheet.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx","../Dialog/Dialog.jsx":"platform/components/Dialog/Dialog.jsx","../../patterns/AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sheet = Sheet;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Icon = require("../Icon/Icon.jsx");
var _Button = require("../Button/Button.jsx");
var _Dialog = require("../Dialog/Dialog.jsx");
var _AppShell = require("../../patterns/AppShell/AppShell.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Sheet
   Summary: A short, self-contained task or the details of a selection over the screen (Platforms Standard 4.2 rows 5–6,
     5.2 Supporting pane, 5.3 Sheet task, 6.5 Sheet and inspector). It changes form with the window class: at Narrow a
     bottom sheet at a medium (about half) or large height with a grabber; at Medium a side sheet (the Drawer); at Wide a
     dialog (the Dialog), unless the caller shows a pane there instead.
   Usage:
     <Sheet open={open} onClose={close} title="Rename" onDone={save}>…</Sheet>
     <Sheet open={open} onClose={close} title="Details" detent="large" footer={<…/>}>…</Sheet>
   Props:
     open: whether the sheet is shown
     onClose(): runs from Cancel (or Close), Escape, a click on the scrim and the browser's own dismissal
     title: the title in the header; it names the sheet
     description: a paragraph at the top of the body; it describes the sheet
     icon: an <Icon> (or an icon name) before the title
     onDone(): makes the sheet a task: Cancel on the leading edge of the header, Done on the trailing edge (in the footer
       of the side sheet and the dialog); without it the header ends with Close
     doneLabel: the confirm button's text (default "Done"; Save, Create, Add)
     cancelLabel: the cancel button's text (default "Cancel")
     closeLabel: the accessible name of the Close button (default "Close")
     detent: the bottom sheet's starting height: "medium" (default; about half the window) | "large"
     form: "auto" (default; by the window class) | "bottom" | "side" | "dialog"
     actions: controls at the end of the header, before Done or Close
     footer: a row of actions pinned to the bottom
     initialFocus: a ref to the element that takes focus when the sheet opens
     dismissible: false turns off Escape and the scrim click, and hides Cancel and Close (default true)
     flush: true removes the body padding (default false)
     className: more classes on the sheet
     strings: the words it announces, for other languages: { expand: "Expand sheet", shrink: "Shrink sheet" } (the grabber)
     children: the body
   Behavior:
     Focus moves in (initialFocus, else the first control in the body, else the first footer action), stays inside while
       the sheet is open, and returns to the opener when it closes.
     Escape and a click on the scrim close it, unless dismissible is false.
     The grabber is a button: pressing it moves between the medium and large heights; dragging it up opens the large
       height, dragging it down returns to the medium height or, from there, closes the sheet.
     Only one sheet shows at a time: a sheet opened while another is open shows in its place, and the first returns when
       it closes.
     The page does not scroll while the sheet is open.
   Notes:
     The window classes: Narrow under --plx-sys-shell-phone-below (600px), Medium under --plx-sys-shell-rail-below (840px).
     The side sheet and the dialog are the Drawer and the Dialog (Dialog.jsx); Cancel and Done sit in their footer, after
       the caller's footer actions, Done last (the Action bar rule).
     A caller with a pane at Wide (SidePanel) renders the sheet only below that width and passes form="bottom".
     The bottom sheet keeps the bottom safe area (--plx-sys-safe-area-bottom).
     The layer renders in a portal on document.body.
*/

const STRINGS = {
  expand: 'Expand sheet',
  shrink: 'Shrink sheet'
};
const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;

// one sheet at a time (HIG › Sheets): the open sheets in the order they opened; only the last one shows
const openSheets = [];
const listeners = new Set();
const notify = () => listeners.forEach(f => f());
function useTopSheet(open) {
  const id = _react.default.useId();
  const [, rerender] = _react.default.useReducer(n => n + 1, 0);
  _react.default.useEffect(() => {
    listeners.add(rerender);
    return () => {
      listeners.delete(rerender);
    };
  }, []);
  _react.default.useEffect(() => {
    if (!open) return undefined;
    openSheets.push(id);
    notify();
    return () => {
      openSheets.splice(openSheets.indexOf(id), 1);
      notify();
    };
  }, [open]);
  return open && openSheets[openSheets.length - 1] === id;
}

// the window class decides the form: Narrow a bottom sheet, Medium a side sheet, Wide a dialog
function useForm(form) {
  const narrow = (0, _AppShell.useMedia)((0, _AppShell.below)('--plx-sys-shell-phone-below'));
  const medium = (0, _AppShell.useMedia)((0, _AppShell.below)('--plx-sys-shell-rail-below'));
  if (form && form !== 'auto') return form;
  return narrow ? 'bottom' : medium ? 'side' : 'dialog';
}
function Sheet({
  open,
  onClose,
  title,
  description,
  icon,
  onDone,
  doneLabel = 'Done',
  cancelLabel = 'Cancel',
  closeLabel = 'Close',
  detent = 'medium',
  form,
  actions,
  footer,
  initialFocus,
  dismissible = true,
  flush = false,
  className,
  strings,
  children
}) {
  const t = Object.assign({}, STRINGS, strings);
  const shown = useTopSheet(!!open);
  const kind = useForm(form);
  const bottom = kind === 'bottom';
  const ref = _react.default.useRef(null);
  const id = (0, _layer.useUid)('plx-sheet');
  const [height, setHeight] = _react.default.useState(detent);
  _react.default.useEffect(() => {
    if (open) setHeight(detent);
  }, [open, detent]);
  const firstFocus = () => {
    if (initialFocus && initialFocus.current) return initialFocus.current;
    const root = ref.current;
    return (0, _layer.focusables)(root.querySelector('.plx-sheet__body'))[0] || (0, _layer.focusables)(root.querySelector('.plx-sheet__footer'))[0] || null;
  };
  (0, _layer.useLayer)(ref, shown && bottom, {
    modal: true,
    onEscape: dismissible ? onClose : null,
    initialFocus: firstFocus
  });
  const task = !!onDone;
  if (!shown) return null;
  if (!bottom) {
    // the side sheet (Medium) and the dialog (Wide): Close in the header; Cancel and Done after the caller's footer actions
    const ends = task ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, dismissible ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
      onClick: onClose
    }, cancelLabel) : null, /*#__PURE__*/_react.default.createElement(_Button.Button, {
      variant: "primary",
      onClick: onDone
    }, doneLabel)) : null;
    const foot = footer || ends ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, footer, ends) : null;
    const Shell = kind === 'side' ? _Dialog.Drawer : _Dialog.Dialog;
    return /*#__PURE__*/_react.default.createElement(Shell, {
      open: true,
      onClose: onClose,
      title: title,
      description: description,
      icon: icon,
      footer: foot,
      initialFocus: initialFocus,
      closeLabel: closeLabel,
      dismissible: dismissible,
      flush: flush,
      className: (0, _cx.cx)('plx-sheet-' + kind, className)
    }, actions ? /*#__PURE__*/_react.default.createElement("div", {
      className: "plx-sheet__actions"
    }, actions) : null, children);
  }

  // the grabber: a press moves between the two heights; a drag up opens the large height, a drag down shrinks or closes
  const toggle = () => setHeight(height === 'medium' ? 'large' : 'medium');
  const onGrab = e => {
    if (e.button !== 0) return;
    const y0 = e.clientY,
      el = e.currentTarget,
      step = el.offsetHeight;
    el.setPointerCapture(e.pointerId);
    const up = ev => {
      el.removeEventListener('pointerup', up);
      const dy = ev.clientY - y0;
      if (Math.abs(dy) < step / 2) return; // a press: the click toggles
      ev.preventDefault();
      el.dataset.plxDragged = 'true';
      if (dy < 0) setHeight('large');else if (height === 'large') setHeight('medium');else if (dismissible && onClose) onClose();
    };
    el.addEventListener('pointerup', up);
  };
  const onGrabClick = e => {
    if (e.currentTarget.dataset.plxDragged) {
      delete e.currentTarget.dataset.plxDragged;
      return;
    }
    toggle();
  };
  const onScrim = e => {
    if (dismissible && e.target === e.currentTarget && onClose) onClose();
  };
  return /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("div", {
    className: "plx-modal-layer plx-modal-layer--sheet",
    onMouseDown: onScrim
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": id + 't',
    "aria-describedby": description ? id + 'd' : undefined,
    tabIndex: -1,
    className: (0, _cx.cx)('plx-sheet', 'plx-sheet--' + height, task && 'plx-sheet--task', className)
  }, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-sheet__grabber",
    "aria-label": height === 'medium' ? t.expand : t.shrink,
    onPointerDown: onGrab,
    onClick: onGrabClick
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-sheet__header"
  }, task && dismissible ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    variant: "ghost",
    className: "plx-sheet__cancel",
    onClick: onClose
  }, cancelLabel) : null, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-sheet__icon",
    "aria-hidden": "true"
  }, asIcon(icon)) : null, /*#__PURE__*/_react.default.createElement("h2", {
    id: id + 't',
    className: "plx-sheet__title"
  }, title), actions, task ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    variant: "primary",
    className: "plx-sheet__done",
    onClick: onDone
  }, doneLabel) : dismissible ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "close",
    label: closeLabel,
    className: "plx-sheet__close",
    onClick: onClose
  }) : null), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-sheet__body', flush && 'plx-sheet__body--flush')
  }, description ? /*#__PURE__*/_react.default.createElement("p", {
    id: id + 'd',
    className: "plx-dialog__description"
  }, description) : null, children), footer ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-sheet__footer"
  }, footer) : null)), document.body);
}
  } },
  "platform/utils/tokenTime.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenMs = tokenMs;
// Plenix · tokenMs: a duration token's value in milliseconds ("4s", "250ms"), read from the element (or the root), so
// behavior that waits (a toast leaving, a delay) takes its time from the tokens like the stylesheets do (batch 341).
// Returns the fallback when the token is not set (no document, or the token stylesheet not loaded).
function tokenMs(name, fallback = 0, el) {
  if (typeof document === 'undefined') return fallback;
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(name).trim();
  const m = /^(-?[\d.]+)(ms|s)$/.exec(v);
  return m ? parseFloat(m[1]) * (m[2] === 's' ? 1000 : 1) : fallback;
}
  } },
  "platform/components/Toast/Toast.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx","../../utils/tokenTime.js":"platform/utils/tokenTime.js"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastProvider = ToastProvider;
exports.useToast = useToast;
exports.useUndo = useUndo;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _Button = require("../Button/Button.jsx");
var _tokenTime = require("../../utils/tokenTime.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · ToastProvider, useToast, useUndo
   Summary: A short message about something that just happened, at the end of the screen; with an action (Undo) it is the
     undo pattern.
   Usage:
     <ToastProvider>…the application…</ToastProvider>
     const toast = useToast();
     toast.show('Saved', { tone: 'success' });
     toast.show('Asset moved to Crosses', { action: { label: 'Undo', onAction: () => moveBack() } });
     const undoable = useUndo();
     undoable('3 assets archived', { onUndo: () => restore(ids), onCommit: () => purge(ids) });
   Props:
     ToastProvider.duration: the default milliseconds before a toast leaves by itself; default the --plx-comp-toast-duration token
     ToastProvider.children: the application
     toast.show(message, options): shows a toast and returns its id
     options.tone: "info" (default) | "success" | "warning" | "danger"
     options.duration: milliseconds before it leaves by itself; 0 keeps it until dismissed or its action is used
     options.action: { label, onAction() }: one action button in the toast (Undo, View); using it runs onAction and closes
       the toast
     options.onClose(reason): runs once when the toast leaves: "action" (its action was used), "dismiss" (the Dismiss
       button or toast.dismiss) or "timeout"
     toast.dismiss(id): removes the toast with that id
     useUndo(): returns undoable(message, options): a toast with an Undo action for something already done
       options.onUndo(): puts it back (the Undo action was used)
       options.onCommit(): runs when the toast leaves without Undo (timed out or dismissed): the moment to make it final
       options.label: the action's label (default "Undo")
       options.tone, options.duration: as toast.show
   Behavior:
     A danger toast stays until dismissed (unless a duration is given) and is announced at once (role="alert").
     The other toasts are announced politely.
     Every toast has a Dismiss button.
     A toast with an action stays while the pointer is over it or focus is inside it, and starts its time again when they
       leave, so the action is never taken away from someone reaching for it.
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
  duration,
  children
}) {
  const [toasts, setToasts] = _react.default.useState([]);
  const timers = _react.default.useRef(new Map()); // id -> { wait, timer, onClose }
  const remove = _react.default.useCallback(id => setToasts(all => all.filter(t => t.id !== id)), []);
  const dismiss = _react.default.useCallback((id, reason = 'dismiss') => {
    const t = timers.current.get(id);
    if (t) {
      clearTimeout(t.timer);
      timers.current.delete(id);
      if (t.onClose) t.onClose(reason);
    }
    setToasts(all => all.map(x => x.id === id ? {
      ...x,
      leaving: true
    } : x));
    setTimeout(() => remove(id), (0, _tokenTime.tokenMs)('--plx-comp-toast-animation-duration'));
  }, [remove]);
  const start = _react.default.useCallback(id => {
    const t = timers.current.get(id);
    if (!t || !(t.wait > 0)) return;
    clearTimeout(t.timer);
    t.timer = setTimeout(() => dismiss(id, 'timeout'), t.wait);
  }, [dismiss]);
  const hold = _react.default.useCallback(id => {
    const t = timers.current.get(id);
    if (t) clearTimeout(t.timer);
  }, []);
  const show = _react.default.useCallback((message, {
    tone = 'info',
    duration: ms,
    action,
    onClose
  } = {}) => {
    const id = nextId++;
    const wait = ms !== undefined ? ms : tone === 'danger' ? 0 : duration !== undefined ? duration : (0, _tokenTime.tokenMs)('--plx-comp-toast-duration');
    timers.current.set(id, {
      wait,
      timer: null,
      onClose
    });
    setToasts(all => all.concat({
      id,
      message,
      tone,
      action,
      leaving: false
    }));
    start(id);
    return id;
  }, [start, duration]);
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
    onAnimationEnd: t.leaving ? () => remove(t.id) : undefined,
    onPointerEnter: t.action ? () => hold(t.id) : undefined,
    onPointerLeave: t.action ? () => start(t.id) : undefined,
    onFocus: t.action ? () => hold(t.id) : undefined,
    onBlur: t.action ? e => {
      if (!e.currentTarget.contains(e.relatedTarget)) start(t.id);
    } : undefined
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-toast__icon"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: TONE_ICON[t.tone] || TONE_ICON.info
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-toast__message"
  }, t.message), t.action ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "xs",
    className: "plx-toast__action",
    onClick: () => {
      if (t.action.onAction) t.action.onAction();
      dismiss(t.id, 'action');
    }
  }, t.action.label) : null, /*#__PURE__*/_react.default.createElement("button", {
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

// the undo pattern: the action is already done; the toast offers Undo for as long as it shows, then the change is final
function useUndo() {
  const toast = useToast();
  return _react.default.useCallback((message, {
    onUndo,
    onCommit,
    label = 'Undo',
    tone,
    duration
  } = {}) => toast.show(message, {
    tone,
    duration,
    action: {
      label,
      onAction: onUndo
    },
    onClose: reason => {
      if (reason !== 'action' && onCommit) onCommit();
    }
  }), [toast]);
}
  } },
  "platform/components/Tabs/Tabs.jsx": { deps: {"react":null,"../../utils/direction.js":"platform/utils/direction.js","../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../Count/Count.jsx":"platform/components/Count/Count.jsx","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Menu/Menu.jsx":"platform/components/Menu/Menu.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
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
var _Menu = require("../Menu/Menu.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Tabs
   Summary: Switch between views of the same thing.
   Usage:
     <Tabs label="Asset details" value={tab} onChange={setTab}
       items={[{ value: 'info', label: 'Info', count: 3, content: <…/> }, …]} />
   Props:
     variant: "contained" (default) | "folder" | "segmented"
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
     strings: the words it shows, for other languages: { more: "More", moreLabel: "More tabs" }
   Behavior:
     In a side panel (the inspector) the tabs use the Folder variant: the panel is already the frame (batch 272).
     The open contained or folder tab draws its own joint with the panel, so no line shows under it at any display scale.
     Arrow keys move and select (wrapping); Home and End go to the first and last.
     Only the selected tab is in the Tab order.
     The open folder tab has no line beneath it.
     Tabs that do not fit on one row move into a "More" menu after the last shown tab: a menu button outside the tab list,
       its own Tab stop. The tab list never scrolls sideways (Platforms Standard 3.5, reflow). The selected tab is always
       shown: when it is one of the moved tabs, it takes the last shown place. Arrow keys, Home and End still reach every
       tab, moved ones included (the one chosen is shown); each tab states its place in the whole set (aria-posinset,
       aria-setsize), so a screen reader counts the moved tabs too. Choosing a tab in the menu selects it and focuses it.
   Notes:
     "contained" is the standard: folder tabs joined to a bordered panel.
     "folder" (owner, batch 259) is the tab strip alone: the folder tabs over a baseline, the open tab joined to it, and the
     content below with no frame of its own; for tabs inside a pane or a card that is already framed.
     "segmented" is a compact switch.
     Without content on the items, the application renders the panel; give that panel id={tabsPanelId(idBase, value)}
       and pass idBase so the tabs point at it.
*/

const asIcon = i => typeof i === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
  name: i
}) : i;
const tabsPanelId = (base, value) => base + '-panel-' + String(value).replace(/[^a-zA-Z0-9_-]/g, '');
exports.tabsPanelId = tabsPanelId;
const STRINGS = {
  more: 'More',
  moreLabel: 'More tabs'
};

/* how many tabs fit on the row: it starts from all of them whenever the width, the tabs or the selected tab change, and
   lowers the number, before the browser paints, until every shown tab ends inside the tab list (the More control, once
   shown, takes its own room, so the list narrows and the count is checked again). The width is the Tabs' own, which
   does not follow the count, so the two never chase each other. */
function useTabsFit(rootRef, listRef, count, key) {
  const [fit, setFit] = _react.default.useState(count);
  const [width, setWidth] = _react.default.useState(0);
  _react.default.useLayoutEffect(() => {
    setFit(count);
  }, [count, key, width]);
  _react.default.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => setWidth(root.clientWidth));
    ro.observe(root);
    return () => ro.disconnect();
  }, []);
  _react.default.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || fit <= 1) return;
    const box = list.getBoundingClientRect();
    const out = Array.prototype.some.call(list.children, el => {
      if (el.hidden) return false;
      const r = el.getBoundingClientRect();
      return r.right > box.right + 0.5 || r.left < box.left - 0.5;
    });
    if (out) setFit(fit - 1);
  });
  return Math.max(1, Math.min(fit, count));
}
function Tabs({
  variant = 'contained',
  items,
  value,
  defaultValue,
  onChange,
  label,
  idBase,
  className,
  panelClassName,
  strings
}) {
  const words = Object.assign({}, STRINGS, strings);
  const uid = (0, _layer.useUid)('plx-tabs');
  const base = idBase || uid;
  const [own, setOwn] = _react.default.useState(defaultValue !== undefined ? defaultValue : items[0] ? items[0].value : undefined);
  const current = value !== undefined ? value : own;
  const refs = _react.default.useRef({});
  const root = _react.default.useRef(null),
    list = _react.default.useRef(null);
  const fit = useTabsFit(root, list, items.length, items.map(t => t.label).join('|') + '|' + String(current));
  // the shown tabs: the first `fit`; the selected tab takes the last place when it is not among them
  const at = items.findIndex(t => t.value === current);
  const shown = i => at < fit ? i < fit : i < fit - 1 || i === at;
  const moved = items.filter((t, i) => !shown(i));
  // focus goes to a tab once it is shown (a moved tab chosen by key or from the menu)
  const focusNext = _react.default.useRef(null);
  _react.default.useLayoutEffect(() => {
    const el = focusNext.current !== null ? refs.current[focusNext.current] : null;
    if (el && !el.hidden) {
      focusNext.current = null;
      el.focus();
    }
  });
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
    if (refs.current[t.value] && !refs.current[t.value].hidden) refs.current[t.value].focus();else focusNext.current = t.value;
  };
  const hasPanels = items.some(t => t.content !== undefined);
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: root,
    className: (0, _cx.cx)('plx-tabs', 'plx-tabs--' + variant, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-tabs__list"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: list,
    role: "tablist",
    "aria-label": label,
    className: "plx-tabs__tablist",
    onKeyDown: onKeyDown
  }, items.map((t, i) => {
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
      "aria-posinset": i + 1,
      "aria-setsize": items.length,
      tabIndex: on ? 0 : -1,
      disabled: t.disabled || undefined,
      hidden: !shown(i) || undefined,
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
  })), moved.length ? /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: words.moreLabel,
    placement: "bottom-end",
    className: "plx-tabs__more-anchor",
    trigger: /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      className: "plx-tabs__tab plx-tabs__more"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tabs__label"
    }, words.more), /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-tabs__more-caret",
      "aria-hidden": "true"
    }))
  }, moved.map(t => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: t.value,
    icon: t.icon,
    disabled: t.disabled,
    onSelect: () => {
      focusNext.current = t.value;
      select(t.value);
    }
  }, t.count !== undefined ? t.label + ' (' + t.count + ')' : t.label))) : null), hasPanels ? items.map(t => /*#__PURE__*/_react.default.createElement("div", {
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
     Card.accent: a color from the data (a project's color): a 3px start edge in it; a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280)
     Panel.title: the heading; it also names the section landmark
     Panel.icon: the icon of what the card is (an icon name or element), before the heading (owner, batch 272: a card's
       icon always sits on the left of its heading)
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
     MediaCard.onSelectChange(checked): runs when the selection box changes, or when the card is clicked anywhere but its
       title, box and actions (it toggles the selection); without it there is no selection box and a click opens the card.
       A selectable card opens from its title or a double-click.
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
     A selectable MediaCard's title is at least 24px tall (44px with touch): its target extends invisibly above and below the
       text (Platforms Standard 3.1).
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
  icon,
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
    className: (0, _cx.cx)('plx-panel__title', icon && 'plx-panel__title--icon')
  }, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-panel__icon",
    "aria-hidden": "true"
  }, typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon
  }) : icon) : null, title) : null, description ? /*#__PURE__*/_react.default.createElement("p", {
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
    "data-plx-color": accent || undefined
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
  onClick,
  onDoubleClick,
  ...rest
}) {
  const t = Object.assign({}, MEDIA_CARD_STRINGS, strings);
  const selectable = !!onSelectChange;
  // a selectable card (owner, batch 272: "clicking the card selects it"): a click anywhere but its controls toggles the
  // selection; the title, or a double-click, opens it
  const inControl = e => !!(e.target.closest && e.target.closest('a, button, input, select, textarea, [role=menu], .plx-card__actions'));
  const click = e => {
    if (onClick) onClick(e);
    if (!selectable || e.defaultPrevented || inControl(e)) return;
    onSelectChange(!selected);
  };
  const dblClick = e => {
    if (onDoubleClick) onDoubleClick(e);
    if (!selectable || e.defaultPrevented || inControl(e)) return;
    if (onOpen) onOpen();else if (href) location.href = href;
  };
  return /*#__PURE__*/_react.default.createElement("article", _extends({
    className: (0, _cx.cx)('plx-media-card', (href || onOpen) && 'plx-card--interactive', selectable && 'plx-media-card--selectable', selected && 'is-selected', selecting && 'is-selecting', className),
    onClick: click,
    onDoubleClick: dblClick
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
  "platform/components/DataTable/strict.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strictTabulator = strictTabulator;
/* Plenix · DataTable strict mode (strict.js)
   Summary: Tabulator drawn by Plenix (Strict DS 6b, batch 285): Tabulator keeps its data, sorting, filtering, selection,
     editing, grouping and tree, but writes no style: every geometry write it makes is switched off here, once per window,
     and the Plenix stylesheet draws the grid from classes and tokens (data-table.css, table.css, system/steps.css).
   Usage:
     strictTabulator(Tabulator, win)   // loadTabulator does it before the first grid is built
   Props:
     none: strictTabulator(Tabulator, win) patches that window's Tabulator once
   Behavior:
     Off: cell and column widths, heights and alignment; row heights; header vertical alignment; the body's sizing and the
       virtual renderer's padding (DataTable renders rows with the basic renderer); the frozen-rows holder's width.
     Pinned (frozen) columns: classes only (tabulator-frozen, data-plx-sticky naming the widths before it); the stylesheet
       makes them sticky at that offset.
     Tree rows: no branch spacer and no indent written; the row's level is its tabulator-tree-level-N class and the tree
       cell (plx-data-table__tree-cell) is indented by the stylesheet.
     Popups (menus, the header filter): no coordinates. The popup opens in the top layer (popover) and is placed by CSS
       anchor positioning against the cell, header or button that opened it.
   Notes:
     The patches are found from a probe table built once (Tabulator's classes are not exported), then the probe is removed.
*/

const OFF = function () {};
const done = new WeakMap(); // Tabulator -> the promise of its patches

// the width token class a column carries (plx-data-table__w-<size> or the lead column), for a pinned column's offset
function widthName(column) {
  const css = String(column.definition && column.definition.cssClass || '');
  if (/__cell--select|__cell--icon|__w-lead/.test(css)) return 'lead';
  const m = /__w-(\d+px)/.exec(css);
  return m ? m[1] : null;
}
function strictTabulator(Tabulator, win) {
  if (!Tabulator) return Promise.resolve();
  if (done.has(Tabulator)) return done.get(Tabulator);
  let resolveDone;
  done.set(Tabulator, new Promise(r => {
    resolveDone = r;
  }));
  const doc = win.document;
  const probeEl = doc.createElement('div');
  probeEl.className = 'plx-visually-hidden';
  doc.body.appendChild(probeEl);
  const probe = new Tabulator(probeEl, {
    data: [{
      id: 1,
      a: 'x',
      kids: [{
        id: 2,
        a: 'y'
      }]
    }],
    index: 'id',
    renderVertical: 'basic',
    dataTree: true,
    dataTreeChildField: 'kids',
    columns: [{
      field: 'a',
      frozen: true
    }, {
      field: 'b'
    }],
    rowContextMenu: [{
      label: 'x',
      action: OFF
    }],
    frozenRows: 0
  });
  const finish = () => {
    try {
      const row = probe.rowManager.rows[0],
        cell = row && row.cells[0],
        col = cell && cell.column;
      if (cell) {
        const Cell = Object.getPrototypeOf(cell);
        ['setWidth', 'setMinWidth', 'setMaxWidth', 'setHeight', 'clearWidth'].forEach(n => {
          if (typeof Cell[n] === 'function') Cell[n] = OFF;
        });
        // a cell's alignment is a class (DataTable maps hozAlign to plx-data-table__cell--align-*): nothing written
        const configure = Cell._configureCell;
        Cell._configureCell = function () {
          configure.apply(this, arguments);
          if (this.element) this.element.removeAttribute('style');
        };
      }
      if (col) {
        const Col = Object.getPrototypeOf(col);
        Col.setWidthActual = function (w) {
          this.width = w;
          this.widthStyled = '';
        };
        ['setMinWidth', 'setMaxWidth', 'setHeight', 'verticalAlign', 'clearVerticalAlign', 'matchChildWidths', 'checkCellHeights'].forEach(n => {
          if (typeof Col[n] === 'function') Col[n] = OFF;
        });
      }
      if (row) ['setCellHeight', 'normalizeHeight', 'reinitializeHeight', 'calcHeight'].forEach(n => {
        const R = Object.getPrototypeOf(row);
        if (typeof R[n] === 'function') R[n] = OFF;
      });
      const CM = Object.getPrototypeOf(probe.columnManager);
      ['verticalAlignHeaders'].forEach(n => {
        if (typeof CM[n] === 'function') CM[n] = OFF;
      });
      const RM = Object.getPrototypeOf(probe.rowManager);
      ['normalizeHeight', 'adjustTableSize'].forEach(n => {
        if (typeof RM[n] === 'function') RM[n] = OFF;
      });
      if (probe.modules.frozenRows) {
        const FR = Object.getPrototypeOf(probe.modules.frozenRows);
        FR.resizeHolderWidth = OFF;
      }
      // pinned columns: classes, and the widths before it as data-plx-sticky
      if (probe.modules.frozenColumns) {
        const FC = Object.getPrototypeOf(probe.modules.frozenColumns);
        FC.layoutElement = function (el, column) {
          if (!column.modules.frozen || !el) return;
          const left = this.leftColumns.filter(c => c.visible !== false),
            at = left.indexOf(column);
          const before = at > 0 ? left.slice(0, at).map(widthName) : [];
          el.classList.add('tabulator-frozen');
          el.classList.toggle('tabulator-frozen-left', at === left.length - 1);
          if (before.length && before.every(Boolean)) el.setAttribute('data-plx-sticky', before.join('+'));else el.removeAttribute('data-plx-sticky');
        };
        FC.adjustForScrollbar = OFF;
      }
      // tree rows: no spacer, no indent written; the level is a class and the tree cell is marked
      if (probe.modules.dataTree) {
        const DT = Object.getPrototypeOf(probe.modules.dataTree),
          init = DT.initialize;
        DT.initialize = function () {
          init.apply(this, arguments);
          this.branchEl = null;
        };
        DT.layoutRow = function (r) {
          const cfg = r.modules.dataTree;
          if (!cfg) return;
          const target = this.elementField ? r.getCell(this.elementField) : r.getCells()[0];
          if (!target) return;
          const cellEl = target.getElement();
          if (cfg.branchEl) {
            if (cfg.branchEl.parentNode) cfg.branchEl.parentNode.removeChild(cfg.branchEl);
            cfg.branchEl = false;
          }
          if (cfg.controlEl) {
            if (cfg.controlEl.parentNode) cfg.controlEl.parentNode.removeChild(cfg.controlEl);
            cfg.controlEl = false;
          }
          this.generateControlElement(r, cellEl);
          cellEl.classList.add('plx-data-table__tree-cell');
          const el = r.getElement();
          Array.from(el.classList).filter(c => /^tabulator-tree-level-\d+$/.test(c)).forEach(c => el.classList.remove(c));
          el.classList.add('tabulator-tree-level-' + cfg.index);
        };
      }
      // popups: the top layer and CSS anchor positioning against what opened them
      const menu = probe.modules.menu;
      const sample = menu && typeof menu.popup === 'function' ? menu.popup(doc.createElement('div')) : null;
      if (sample) {
        const P = Object.getPrototypeOf(sample),
          hide = P.hide;
        P.show = function (origin) {
          if (this.destroyed || this.table.destroyed) return this;
          let anchor = origin instanceof win.HTMLElement ? origin : null;
          if (!anchor && origin && origin.target && origin.target.closest) anchor = origin.target.closest('.tabulator-cell, .tabulator-col, .tabulator-group, .tabulator-row');
          if (!anchor && this.parent && this.parent.element) anchor = this.parent.element;
          doc.querySelectorAll('.plx-data-table__popup-anchor').forEach(a => a.classList.remove('plx-data-table__popup-anchor'));
          if (anchor) anchor.classList.add('plx-data-table__popup-anchor');
          this.anchorEl = anchor;
          this.element.classList.add('plx-data-table__popup');
          if (typeof this.element.showPopover === 'function') this.element.setAttribute('popover', 'manual');
          this.container.appendChild(this.element);
          if (typeof this.element.showPopover === 'function') {
            try {
              this.element.showPopover();
            } catch (e) {/* already shown */}
          }
          if (typeof this.renderedCallback === 'function') this.renderedCallback();
          this.visible = true;
          this.subscribe('table-destroy', this.destroyBinding);
          this.element.addEventListener('mousedown', e => {
            e.stopPropagation();
          });
          return this;
        };
        P.hide = function () {
          if (this.anchorEl) this.anchorEl.classList.remove('plx-data-table__popup-anchor');
          if (typeof this.element.hidePopover === 'function') {
            try {
              this.element.hidePopover();
            } catch (e) {/* not shown */}
          }
          return hide.apply(this, arguments);
        };
        P._fitToScreen = OFF;
        P.applyOffset = OFF;
      }
    } finally {
      try {
        probe.destroy();
      } catch (e) {/* gone */}
      if (probeEl.parentNode) probeEl.parentNode.removeChild(probeEl);
    }
  };
  // the probe builds synchronously in Tabulator 6 when its element is in the page; tableBuilt follows
  probe.on('tableBuilt', () => {
    finish();
    resolveDone();
  });
  return done.get(Tabulator);
}
  } },
  "platform/components/DataTable/tabulator.js": { deps: {"./strict.js":"platform/components/DataTable/strict.js"}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTabulator = loadTabulator;
exports.prefetchTabulator = prefetchTabulator;
exports.tablePx = tablePx;
var _strict = require("./strict.js");
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
     A failed load rejects and is forgotten; the DataTable shows its error state (the reason and Retry) in place of the
     grid, and Retry loads the files again. */

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
  // every Tabulator is made strict before a grid is built (strict.js: it writes no style; Strict DS 6b, batch 285)
  const strict = T => (0, _strict.strictTabulator)(T, w).then(() => T);
  if (w.Tabulator) return strict(w.Tabulator);
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
    // a failed load is forgotten, so the error state's Retry loads the files again
    script.onload = () => {
      if (w.Tabulator) resolve(strict(w.Tabulator));else {
        loading.delete(w);
        script.remove();
        reject(new Error('Tabulator did not load from ' + script.src));
      }
    };
    script.onerror = () => {
      loading.delete(w);
      script.remove();
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
  "platform/components/DataTable/DataTable.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","./tabulator.js":"platform/components/DataTable/tabulator.js","../../utils/sizeSteps.js":"platform/utils/sizeSteps.js","../../utils/direction.js":"platform/utils/direction.js","../EmptyState/EmptyState.jsx":"platform/components/EmptyState/EmptyState.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
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
var _sizeSteps = require("../../utils/sizeSteps.js");
var _direction = require("../../utils/direction.js");
var _EmptyState = require("../EmptyState/EmptyState.jsx");
var _Button = require("../Button/Button.jsx");
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
     columns[].kind: "name" (the row's name, medium weight) | "data" (technical values: IDs, file names, paths, versions,
       dates and times, sizes, counts, durations: the data font, DM Mono, at the row's own size and line height, so it shares
       the row's baseline; owner, 2026-10-11) |
       "icon" (a mark column as wide as the checkbox column; its header shows columns[].icon) | "center" (content
       centered in the row's height: badges, buttons) | "actions" (row action buttons, shown while the row is hovered or
       selected) | "wrap" (long text: it wraps and the row grows; the first line sits where a one-line cell's text does).
       Two kinds combine as a list: ["name", "data"] (a row named by a file name: medium weight in the data font),
       ["wrap", "data"] (a long path)
     columns[].icon: the Plenix icon name a "kind: icon" column shows in its header (its title is the accessible name)
     columns[].render(data, cell): the cell's content as a React element (badges, buttons, links); state and context work
     columns[].filter: true (contains text) | "list" (one of the column's values): the filter button, shown on hover
     columns[].rowLabel: true: the row header: this column and the columns before it are pinned and shaded like the
       header row (and so is the checkbox column)
     columns[].width: a size token ("--plx-ref-size-240px"; a number snaps to the nearest one); without it the column shares
       the room left with the others. minWidth: the smallest such a sharing column gets (a size token; default 80px)
     index: the field that identifies a row; default "id"
     selectable: a checkbox column (select all in its header) and row selection; default false. Without it,
       options.selectableRows (Tabulator) selects rows by click (1: one row, as the open row of a list)
     selected: the index values of the selected rows, for a selection kept by the page (bulk actions); with
     onSelectionChange(keys): runs when the person changes the selection (not when selected changes it)
     headerMenu: right-click on a header: sort, clear sort, clear filter, group by, fit, hide, show all; default true
     rowMenu: right-click on a row: [{ label, icon, onSelect(data, row), danger, disabled, separator }], or
       (data) => that list
     empty: shown when no row matches; default "Nothing to show"
     error: the rows could not load (a message or an Error): the grid shows the error state, naming the problem
     onRetry(): the error state's one recovery action (Retry); a grid whose engine failed to load retries it as well
     keyColumns: the fields a Narrow grid keeps (its list layout); default the first column plus the next two (icon,
       actions and handle columns are not counted)
     narrow: "list" (the DataTable's default: under 600px of its own width, a list of the key columns) | "table" (the
       static Table's default: the columns stay and scroll sideways)
     storageKey: keeps the person's view (sort, column widths, order and hidden columns) in this browser under the key
       and restores it the next time the grid is built
     height: the grid's height, a size token (the rows scroll inside it), or "100%" (it fills its container)
     options: any other Tabulator table option (layout, initialSort, groupBy, dataTree, movableColumns, movableRows…)
     on: Tabulator events, { rowClick(e, row), cellEdited(cell), rowSelectionChanged(data, rows), dataSorted(sorters)… };
       with rowClick, rows are focusable and Enter does what a click does
     onReady(table): the Tabulator instance, once built (for anything Tabulator offers)
     className: more classes on the grid's frame
     DataTable.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Drag and drop (batch 271): a row handle (a column with rowHandle) shows the grab cursor; the row being moved shows
       grabbing.
     Every drag has a way without dragging (WCAG 2.5.7): a click on a row handle, or the row menu, offers Move up, Move
       down, Move to top and Move to bottom; a focused handle moves its row with Alt + Arrow Up / Down (Alt + Home / End
       to the ends). A column's header menu offers Move left and Move right (options.movableColumns), Narrower and Wider
       (one size token) and Fit to content; its resize grip is a separator that the arrow keys step through the size
       tokens (Home and End: narrowest and widest).
     Error: the error prop, or an engine that failed to load, shows an inline error state (EmptyState tone="error"): what
       failed and Retry.
     Narrow (platforms.md 6.5): under 600px of its own width (a container query, not the window) the grid becomes a list
       of its key columns: the first is the row's title line, the others the lines under it; the checkbox, the row handle
       and the row actions stay; the header row and the other columns are not shown.
     The header's sort arrow and filter button show while the header is hovered; a sorted column keeps its arrow and a
     filtered column its button, in the accent color. Right-click opens the header menu or the row menu.
     Hover, selected and selected + hover are three row colors; pinned and row-header cells follow the row.
     The row height and text size follow the density (--plx-sys-data-table-row-height, --plx-sys-data-table-font-size), also a
     density region's; a density change redraws the grid. A grid built while hidden is drawn again when it is shown.
     Cells edit on double-click (Tabulator editors). Group rows and tree rows are Tabulator's (groupBy, dataTree).
     The grid is an ARIA grid: rows, column headers (aria-sort on sorted ones), cells; its scrolling body is one Tab stop.
   Notes:
     Nothing on the grid is styled inline (Strict DS 6b, batch 285): Tabulator runs in strict mode (strict.js) and the grid
       is drawn from classes: a column's width is a size token class (__w-<size>, __w-lead, __w-fill), its alignment a class
       (__cell--align-*), a pinned column sticky at the widths before it, a tree row indented by its level class, a menu
       placed by CSS anchor positioning. Rows render all at once (no virtual scrolling). Moving rows (a rowHandle column
       with options.movableRows) and columns (options.movableColumns) is native drag and drop; a column's resize handle
       and Fit to content snap its width to the size tokens. Editors "input" and "number" are a Plenix input.
     The data changes in place (sort, filters, scroll and column widths stay); new columns rebuild the column set.
*/
const SEP = '\u0000';
const MIN = '--plx-ref-size-80px'; // the narrowest a resized column gets
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
  failed: 'The table could not load',
  retry: 'Retry',
  moveUp: 'Move up',
  moveDown: 'Move down',
  moveTop: 'Move to top',
  moveBottom: 'Move to bottom',
  moveRow: 'Move row',
  moveLeft: 'Move left',
  moveRight: 'Move right',
  narrower: 'Narrower',
  wider: 'Wider',
  resize: 'Resize'
};
const VIEW = 'plx-data-table:'; // the browser storage prefix of a kept view (storageKey)
const readView = key => {
  try {
    const s = window.localStorage.getItem(VIEW + key);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
};
const writeView = (key, v) => {
  try {
    window.localStorage.setItem(VIEW + key, JSON.stringify(v));
  } catch (e) {/* storage off: the view is not kept */}
};
// the columns a Narrow grid can keep: data columns (not the icon, actions or handle columns)
const listable = c => !!c.field && c.kind !== 'icon' && c.kind !== 'actions' && !c.rowHandle;
const keyFields = (cols, want) => want && want.length ? want.slice() : cols.filter(listable).slice(0, 3).map(c => c.field);
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
// a width as a size token's name ("240px"): a token as given, a number snapped to the nearest token
const sizeName = (v, host) => {
  if (v == null || v === '' || v === true) return null;
  const m = /--plx-ref-size-(\d+px)/.exec(String(v));
  if (m) return m[1];
  const px = typeof v === 'number' ? v : sizeOf(v, host);
  return px ? (0, _sizeSteps.snapSize)(px, _sizeSteps.SIZE_STEPS[0], _sizeSteps.SIZE_STEPS[_sizeSteps.SIZE_STEPS.length - 1]) + 'px' : null;
};
// the editor for "input" and "number": a Plenix input (Tabulator's own writes its padding and width inline)
const plenixEditor = type => (cell, onRendered, success, cancel) => {
  const i = document.createElement('input');
  i.type = type;
  i.className = 'plx-data-table__editor';
  const v = cell.getValue();
  i.value = v == null ? '' : v;
  let finished = false;
  const ok = () => {
    if (!finished) {
      finished = true;
      success(type === 'number' && i.value !== '' ? Number(i.value) : i.value);
    }
  };
  i.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      ok();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      finished = true;
      cancel();
    }
  });
  i.addEventListener('blur', ok);
  onRendered(() => {
    i.focus();
    i.select();
  });
  return i;
};
// a column's width class set again (the resize handle, Fit to content): its definition for new cells, its header and cells now
function setWidthClass(column, size, B) {
  const def = column.getDefinition(),
    next = B + '__w-' + size;
  const swap = el => {
    if (!el) return;
    Array.from(el.classList).filter(c => c.indexOf(B + '__w-') === 0).forEach(c => el.classList.remove(c));
    el.classList.add(next);
  };
  def.cssClass = String(def.cssClass || '').split(/\s+/).filter(c => c && c.indexOf(B + '__w-') !== 0).concat(next).join(' ');
  if (column._column) column._column.definition.cssClass = def.cssClass;
  swap(column.getElement());
  column.getCells().forEach(c => swap(c.getElement()));
}

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
  // one look from one set of tokens (owner, 2026-10-09): the static Table draws with the DataTable's classes and tokens
  // (--plx-sys-data-table-*, --plx-comp-data-table-*); isStatic only switches the interaction off
  const isStatic = !!props.isStatic,
    B = 'plx-data-table';
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
    className,
    error: failure,
    onRetry,
    keyColumns,
    narrow = isStatic ? 'table' : 'list',
    storageKey
  } = props;
  // the Narrow list: its key columns, and whether it hides any (a grid whose columns are all key columns stays a table)
  const keys = keyFields(columns, keyColumns);
  const listed = narrow === 'list' && columns.some(c => listable(c) && keys.indexOf(c.field) < 0);
  const [attempt, setAttempt] = _react.default.useState(0); // a Retry after the engine failed to load builds the grid again
  const resized = _react.default.useRef({}); // the widths the person chose (field -> size name), for the kept view
  const restoring = _react.default.useRef(false);
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
  const moving = _react.default.useRef(null); // the row being moved by its handle
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

  // the person's view, kept under storageKey: written after each change they make (not while it is being restored)
  const saveView = () => {
    const t = tableRef.current,
      key = latest.current.storageKey;
    if (!key || !t || restoring.current) return;
    writeView(key, {
      sort: t.getSorters().map(s => ({
        column: s.field,
        dir: s.dir
      })),
      widths: resized.current,
      order: t.getColumns().map(c => c.getField()).filter(Boolean),
      hidden: t.getColumns().filter(c => !c.isVisible()).map(c => c.getField()).filter(Boolean)
    });
  };
  // the kept view onto a grid just built: what still fits its columns (a field that is gone is skipped)
  const restoreView = t => {
    const key = latest.current.storageKey,
      v = key ? readView(key) : null;
    resized.current = {};
    if (!v) return;
    restoring.current = true;
    try {
      const col = f => t.getColumns().find(c => c.getField() === f);
      const order = (v.order || []).filter(col);
      order.forEach((f, i) => {
        const c = col(f),
          prev = i ? col(order[i - 1]) : null;
        if (c && prev && !c.getDefinition().frozen && !prev.getDefinition().frozen) c.move(prev, true);
      });
      Object.keys(v.widths || {}).forEach(f => {
        const c = col(f);
        if (c && /^\d+px$/.test(v.widths[f])) {
          setWidthClass(c, v.widths[f], B);
          resized.current[f] = v.widths[f];
        }
      });
      (v.hidden || []).forEach(f => {
        const c = col(f);
        if (c) c.hide();
      });
      const sort = (v.sort || []).filter(s => col(s.column) && (s.dir === 'asc' || s.dir === 'desc'));
      if (sort.length) t.setSort(sort);
    } catch (e) {/* a view kept for another column set: what fits is restored */}
    restoring.current = false;
  };
  // a column's width as a size token (the grip, the header menu, Fit to content), kept in the view
  const applyWidth = (col, size) => {
    setWidthClass(col, size, B);
    if (col.getField()) resized.current[col.getField()] = size;
    const grip = col.getElement().querySelector('.' + B + '__resize');
    if (grip) grip.setAttribute('aria-valuenow', String(parseInt(size, 10)));
    saveView();
  };
  const widthLimits = el => [(0, _tabulator.tablePx)(MIN, el), _sizeSteps.SIZE_STEPS[_sizeSteps.SIZE_STEPS.length - 1]];
  const stepWidth = (col, dir) => {
    const el = col.getElement(),
      [lo, hi] = widthLimits(el);
    applyWidth(col, (0, _sizeSteps.stepSize)(el.getBoundingClientRect().width, dir, lo, hi) + 'px');
  };
  // a column one place left or right (the header menu): past hidden columns, never into the pinned ones
  const moveColumn = (col, step) => {
    const dir = (0, _direction.isRtl)(col.getElement()) ? -step : step;
    let to = dir < 0 ? col.getPrevColumn() : col.getNextColumn();
    while (to && !to.isVisible()) to = dir < 0 ? to.getPrevColumn() : to.getNextColumn();
    if (!to || to.getDefinition().frozen) return;
    col.move(to, dir > 0);
    const h = (latest.current.on || {}).columnMoved;
    if (h) h(col, tableRef.current.getColumns());
    saveView();
  };
  // a row one place up or down, or to the top or bottom (the handle's menu, the row menu, Alt + the arrow keys)
  const moveRow = (row, where) => {
    const t = tableRef.current;
    if (!t) return false;
    const rows = t.getRows('active'),
      prev = row.getPrevRow(),
      next = row.getNextRow();
    // (Tabulator's row.move(target, true) places the row above the target, false below it)
    if (where === 'up' && prev) row.move(prev, true);else if (where === 'down' && next) row.move(next, false);else if (where === 'top' && prev) row.move(rows[0], true);else if (where === 'bottom' && next) row.move(rows[rows.length - 1], false);else return false;
    const h = (latest.current.on || {}).rowMoved;
    if (h) h(row);
    return true;
  };
  const rowMoveItems = row => {
    const up = !row.getPrevRow(),
      down = !row.getNextRow();
    return [{
      label: menuLabel(STRINGS.moveUp, 'chevron-up'),
      disabled: up,
      action: () => moveRow(row, 'up')
    }, {
      label: menuLabel(STRINGS.moveDown, 'chevron-down'),
      disabled: down,
      action: () => moveRow(row, 'down')
    }, {
      label: menuLabel(STRINGS.moveTop),
      disabled: up,
      action: () => moveRow(row, 'top')
    }, {
      label: menuLabel(STRINGS.moveBottom),
      disabled: down,
      action: () => moveRow(row, 'bottom')
    }];
  };

  // Plenix columns -> Tabulator column definitions
  const defsOf = (cols, host) => {
    const T = () => tableRef.current;
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
    const fitColumn = col => {
      const els = [col.getElement()].concat(col.getCells().map(x => x.getElement()));
      const need = Math.max.apply(null, els.map(el => el.scrollWidth));
      applyWidth(col, (0, _sizeSteps.snapSize)(_sizeSteps.SIZE_STEPS.find(z => z >= need) || need, _sizeSteps.SIZE_STEPS[0], _sizeSteps.SIZE_STEPS[_sizeSteps.SIZE_STEPS.length - 1]) + 'px');
    };
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
    const headerItems = (c, pinned) => () => {
      const items = [];
      // moving a column without dragging it (WCAG 2.5.7): one place left or right
      if ((latest.current.options || {}).movableColumns && !pinned) {
        items.push({
          label: menuLabel(STRINGS.moveLeft, 'chevron-left'),
          action: (e, col) => moveColumn(col, -1)
        });
        items.push({
          label: menuLabel(STRINGS.moveRight, 'chevron-right'),
          action: (e, col) => moveColumn(col, 1)
        });
        items.push({
          separator: true
        });
      }
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
      // the width without dragging: one size token narrower or wider, or fitted to the content
      if (c.kind !== 'icon' && c.kind !== 'actions' && c.resizable !== false) {
        items.push({
          label: menuLabel(STRINGS.narrower),
          action: (e, col) => stepWidth(col, -1)
        });
        items.push({
          label: menuLabel(STRINGS.wider),
          action: (e, col) => stepWidth(col, 1)
        });
        items.push({
          label: menuLabel(STRINGS.fit, 'expand'),
          action: (e, col) => fitColumn(col)
        });
      }
      items.push({
        label: menuLabel(STRINGS.hide, 'visibility-off'),
        action: (e, col) => {
          col.hide();
          saveView();
        }
      });
      items.push({
        label: menuLabel(STRINGS.showAll, 'visibility'),
        action: () => {
          T().getColumns().forEach(col => col.show());
          saveView();
        }
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
      // the width: a size token class, the lead width (icon), or a share of the room left (with its smallest size)
      const w = kind === 'icon' ? 'lead' : sizeName(d.width, host);
      const min = sizeName(d.minWidth, host);
      const hz = kind === 'icon' ? 'center' : d.hozAlign,
        hh = kind === 'icon' ? 'center' : d.headerHozAlign;
      const align = hz && hz !== 'left' ? B + '__cell--align-' + hz : null;
      const headAlign = hh && hh !== 'left' ? B + '__head-align-' + hh : null;
      ['width', 'minWidth', 'maxWidth', 'hozAlign', 'headerHozAlign', 'vertAlign', 'widthGrow', 'widthShrink'].forEach(k => {
        delete d[k];
      });
      d.cssClass = (0, _cx.cx)(c.cssClass, kind && [].concat(kind).map(k => B + '__cell--' + k).join(' '), (rowLabel || labelAt > i) && B + '__cell--row-label', w ? B + '__w-' + w : B + '__w-fill', !w && min && B + '__min-' + min, align, headAlign, c.rowHandle && B + '__cell--handle', keys.indexOf(c.field) >= 0 && B + '__cell--key', keys.indexOf(c.field) === 0 && B + '__cell--key-first') || undefined;
      if (d.editor === 'input' || d.editor === 'number') d.editor = plenixEditor(d.editor === 'number' ? 'number' : 'text');
      if (labelAt >= i) d.frozen = true;
      if (kind === 'icon') {
        d.resizable = false; // the lead width and centered (its classes)
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
        resizable: false
      });
      if (render) d.formatter = cell => {
        const id = String(cell.getRow().getIndex()) + SEP + c.field;
        owners.current.set(id, cell);
        return container(id);
      };
      if (filter && !isStatic) {
        d.headerPopup = filterPopup(c);
        d.headerPopupIcon = iconEl('filter').outerHTML;
      }
      if (headerMenu && !isStatic && d.headerContextMenu === undefined) d.headerContextMenu = headerItems(c, labelAt >= i || !!c.frozen);
      // a click on a row handle opens its move menu (a way to move rows without dragging; WCAG 2.5.7)
      if (c.rowHandle && !isStatic && (latest.current.options || {}).movableRows && d.clickMenu === undefined) d.clickMenu = (e, cell) => rowMoveItems(cell.getRow());
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
      const host = hostRef.current;
      const p = latest.current;
      const placeholder = el('div', B + '__empty tabulator-placeholder-contents', p.empty || STRINGS.empty);
      // the row menu: the page's items, then (movable rows) the moves
      const movable = !isStatic && !!(p.options || {}).movableRows;
      const rowContextMenu = p.rowMenu || movable ? (e, row) => {
        const cur = latest.current.rowMenu,
          d = row.getData();
        const list = typeof cur === 'function' ? cur(d) : cur;
        const items = (list || []).map(it => it.separator ? {
          separator: true
        } : {
          label: menuLabel(it.label, it.icon, it.danger),
          disabled: typeof it.disabled === 'function' ? it.disabled(d) : !!it.disabled,
          action: () => it.onSelect && it.onSelect(d, row)
        });
        if (movable) {
          if (items.length) items.push({
            separator: true
          });
          items.push(...rowMoveItems(row));
        }
        return items;
      } : undefined;
      const labelled = p.columns.some(c => c.rowLabel);
      const opts = {
        layout: 'fitColumns',
        index: p.index || 'id',
        placeholder,
        columnDefaults: {
          resizable: false
        },
        renderVertical: 'basic',
        editTriggerEvent: 'dblclick',
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
          cssClass: (0, _cx.cx)('plx-data-table__cell--select', B + '__w-lead', B + '__cell--align-center', B + '__head-align-center', labelled && 'plx-data-table__cell--row-label')
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
        ...Object.fromEntries(Object.entries(p.options || {}).filter(([k]) => !['rowFormatter', 'movableRows', 'movableColumns', 'height', 'maxHeight', 'minHeight', 'renderVertical', 'renderHorizontal', 'dataTreeChildIndent', 'columnDefaults'].includes(k))),
        data: p.data || []
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
        // a row handle is a Tab stop: Enter or Space opens its move menu, Alt + the arrow keys move the row
        if (movable) host.querySelectorAll('.tabulator-row .' + B + '__cell--handle').forEach(h => {
          if (h.hasAttribute('aria-keyshortcuts')) return;
          h.tabIndex = 0;
          h.setAttribute('aria-label', STRINGS.moveRow);
          h.setAttribute('aria-haspopup', 'menu');
          h.setAttribute('aria-keyshortcuts', 'Alt+ArrowUp Alt+ArrowDown Alt+Home Alt+End');
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
        if (!isStatic) {
          wireColumns(table);
          wireRows(table, host);
          restoreView(table);
          table.on('dataSorted', () => saveView());
        }
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
  }, [shape, selectable, headerMenu, !!rowMenu, typeof height === 'string' ? height : '', keys.join(SEP), attempt, storageKey || '']);

  // moving rows (options.movableRows with a rowHandle column): native drag and drop from the handle, delegated on the grid;
  // the row it is dropped on shows a line (a class) and the moved row lands before it
  const wireRows = (table, host) => {
    if (!(latest.current.options || {}).movableRows || host.hasAttribute('data-plx-move')) return;
    host.setAttribute('data-plx-move', '');
    const rowOf = el => {
      const r = el && el.closest('.tabulator-row');
      return r ? table.getRows().find(x => x.getElement() === r) : null;
    };
    const clear = () => host.querySelectorAll('.' + B + '__drop').forEach(x => x.classList.remove(B + '__drop'));
    host.addEventListener('pointerdown', ev => {
      const h = ev.target.closest && ev.target.closest('.' + B + '__cell--handle');
      if (h) h.draggable = true;
    });
    host.addEventListener('dragstart', ev => {
      const h = ev.target.closest && ev.target.closest('.' + B + '__cell--handle');
      if (!h) return;
      const r = rowOf(h);
      if (!r) return;
      moving.current = r;
      r.getElement().classList.add('tabulator-moving');
      ev.dataTransfer.effectAllowed = 'move';
      ev.dataTransfer.setData('text/plain', String(r.getIndex()));
    });
    host.addEventListener('dragover', ev => {
      const r = rowOf(ev.target);
      if (!moving.current || !r || r === moving.current) return;
      ev.preventDefault();
      clear();
      r.getElement().classList.add(B + '__drop');
    });
    host.addEventListener('dragleave', ev => {
      const r = ev.target.closest && ev.target.closest('.tabulator-row');
      if (r && !r.contains(ev.relatedTarget)) r.classList.remove(B + '__drop');
    });
    host.addEventListener('drop', ev => {
      const r = rowOf(ev.target),
        from = moving.current;
      clear();
      moving.current = null;
      if (!from || !r || r === from) return;
      ev.preventDefault();
      from.move(r, true);
      const h = (latest.current.on || {}).rowMoved;
      if (h) h(from);
    });
    host.addEventListener('dragend', () => {
      clear();
      host.querySelectorAll('.tabulator-moving').forEach(x => x.classList.remove('tabulator-moving'));
      moving.current = null;
    });
    // the keyboard on a focused handle: Enter or Space opens its menu; Alt + Arrow Up / Down (Home / End) moves the row,
    // and the handle keeps the focus
    host.addEventListener('keydown', ev => {
      const h = ev.target.closest && ev.target.closest('.tabulator-row .' + B + '__cell--handle');
      if (!h || ev.target !== h) return;
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        h.click();
        return;
      }
      const where = ev.altKey ? {
        ArrowUp: 'up',
        ArrowDown: 'down',
        Home: 'top',
        End: 'bottom'
      }[ev.key] : null;
      const r = where && rowOf(h);
      if (!r) return;
      ev.preventDefault();
      if (moveRow(r, where)) requestAnimationFrame(() => {
        const c = r.getElement().querySelector('.' + B + '__cell--handle');
        if (c) c.focus();
      });
    });
  };

  // a header can be dragged onto another to move its column (options.movableColumns), and its edge resizes it: the width
  // snaps to the size tokens (between 80px and the largest token), set as the column's width class
  const wireColumns = table => {
    const opt = latest.current.options || {};
    let dragged = null;
    table.getColumns().forEach(col => {
      const el = col.getElement(),
        def = col.getDefinition();
      if (!el || el.hasAttribute('data-plx-wired')) return;
      el.setAttribute('data-plx-wired', '');
      if (opt.movableColumns && !def.frozen) {
        el.draggable = true;
        el.addEventListener('dragstart', ev => {
          if (ev.target.closest('.' + B + '__resize')) {
            ev.preventDefault();
            return;
          }
          dragged = col;
          el.classList.add('tabulator-moving');
          ev.dataTransfer.effectAllowed = 'move';
          ev.dataTransfer.setData('text/plain', col.getField() || '');
        });
        el.addEventListener('dragend', () => {
          el.classList.remove('tabulator-moving');
          dragged = null;
        });
        el.addEventListener('dragover', ev => {
          if (dragged && dragged !== col) {
            ev.preventDefault();
            el.classList.add(B + '__drop');
          }
        });
        el.addEventListener('dragleave', () => el.classList.remove(B + '__drop'));
        el.addEventListener('drop', ev => {
          ev.preventDefault();
          el.classList.remove(B + '__drop');
          if (dragged && dragged !== col) {
            const from = dragged;
            dragged = null;
            from.move(col, true);
            const h = (latest.current.on || {}).columnMoved;
            if (h) h(from, table.getColumns());
            saveView();
          }
        });
      }
      // resizable unless the page's column says not (Tabulator's own resizing is off: its handles write styles)
      const mine = (latest.current.columns || []).find(x => x.field && x.field === col.getField());
      const resizable = !!mine && mine.resizable !== false && !/__cell--(icon|actions|select)|__w-lead/.test(String(def.cssClass || ''));
      if (resizable) {
        // the grip is a separator: dragged, or focused and stepped with the arrow keys (WCAG 2.5.7 and 2.1.1); the header
        // keeps its own name (its title), so the grip's name does not join it
        const title = String(def.title || col.getField() || '');
        const [lo, hi] = widthLimits(el);
        const grip = el.ownerDocument.createElement('span');
        grip.className = B + '__resize';
        grip.setAttribute('role', 'separator');
        grip.setAttribute('aria-orientation', 'vertical');
        grip.tabIndex = 0;
        grip.setAttribute('data-plx-target-equivalent', 'the header menu: Narrower, Wider, Fit to content (WCAG 2.5.8 Equivalent)');
        grip.setAttribute('aria-label', STRINGS.resize + ' ' + title);
        grip.setAttribute('aria-valuemin', String(lo));
        grip.setAttribute('aria-valuemax', String(hi));
        grip.setAttribute('aria-valuenow', String(Math.round(el.getBoundingClientRect().width) || lo));
        if (title && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', title);
        grip.addEventListener('click', ev => ev.stopPropagation());
        grip.addEventListener('keydown', ev => {
          const now = el.getBoundingClientRect().width,
            step = (0, _direction.arrowStep)(ev, el, {
              vertical: false
            });
          const to = step ? (0, _sizeSteps.stepSize)(now, step, lo, hi) : ev.key === 'Home' ? (0, _sizeSteps.snapSize)(lo, lo, hi) : ev.key === 'End' ? (0, _sizeSteps.snapSize)(hi, lo, hi) : null;
          if (to == null) return;
          ev.preventDefault();
          ev.stopPropagation();
          applyWidth(col, to + 'px');
        });
        grip.addEventListener('pointerdown', ev => {
          ev.preventDefault();
          ev.stopPropagation();
          const x0 = ev.clientX,
            w0 = el.getBoundingClientRect().width,
            rtl = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
          const doc = el.ownerDocument;
          let last = null;
          const move = e2 => {
            last = (0, _sizeSteps.snapSize)(w0 + (e2.clientX - x0) * rtl, lo, hi) + 'px';
            setWidthClass(col, last, B);
          };
          const up = () => {
            doc.removeEventListener('pointermove', move);
            doc.removeEventListener('pointerup', up);
            doc.documentElement.classList.remove('is-resizing-columns');
            if (last) applyWidth(col, last);
          };
          doc.addEventListener('pointermove', move);
          doc.addEventListener('pointerup', up);
          doc.documentElement.classList.add('is-resizing-columns');
        });
        el.appendChild(grip);
      }
    });
  };

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

  // the error state (platforms.md 5.5: it names the problem, one action recovers): the page's failure, or the engine's
  const failed = failure || error;
  const retry = () => {
    if (error) {
      setError(null);
      setAttempt(n => n + 1);
    }
    if (onRetry) onRetry();
  };
  const reason = failed && failed !== true ? String(failed.message || failed) : null;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: frameRef,
    className: (0, _cx.cx)(B, columns.some(c => c.rowLabel) && B + '--row-header', height === '100%' && B + '--fill', listed && B + '--list', className),
    "data-plx-height": height && height !== '100%' ? sizeName(height) || undefined : undefined
  }, failed ? /*#__PURE__*/_react.default.createElement(_EmptyState.EmptyState, {
    className: B + '__error',
    tone: "error",
    title: STRINGS.failed,
    action: error || onRetry ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "sm",
      icon: "refresh",
      onClick: retry
    }, STRINGS.retry) : null
  }, reason) : null, /*#__PURE__*/_react.default.createElement("div", {
    ref: hostRef,
    className: B + '__table',
    hidden: failed ? true : undefined
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
   Summary: A static table: information in rows and columns, read and nothing else. It IS a DataTable (the same classes,
     .plx-data-table, and the same tokens, --plx-sys-data-table-* and --plx-comp-data-table-*; owner, 2026-10-09) with the
     interaction off: no sorting, filters, menus, selection, resizing, moving, editing or row hover.
   Usage:
     <Table label="Fields" data={fields} columns={[
       { title: 'Field', field: 'name', kind: 'name', rowLabel: true, width: '--plx-ref-size-240px' },
       { title: 'Type', field: 'type', kind: 'data' },
       { title: 'Notes', field: 'notes', kind: 'wrap' }]} />
   Props:
     label: names the table for screen readers (required)
     data: the rows: plain objects with an id (or name the field with index)
     columns: Tabulator column definitions (title, field, hozAlign, width…) with the Plenix kinds: "name", "data" (technical
       values: the data font, DM Mono, at the table's size), "wrap", "center", "icon", or two as a list
       (["name", "data"]); render(row) for React content; rowLabel for the row header. Interactive options are ignored.
     index: the field that identifies a row; default "id"
     empty: shown when there are no rows; default "Nothing to show"
     height: a fixed height (a size token) for a long table; its rows scroll inside it
     options: Tabulator table options that only change the layout (layout, headerVisible…)
     className: more classes on the frame
     Table.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Nothing reacts to the pointer: rows do not highlight, headers do not sort, there is no menu. Links and buttons placed
     in cells work as themselves. Row height and text size follow the density.
   Notes:
     For records people work with (sort, filter, select, open, edit) use DataTable. Every name/value list of reference facts
     (the design system's details, Settings and Capture) is a Table with a header row.
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
     items[].muted: an incomplete place (it exists but has nothing in it yet): its text in the danger content color (red); it
       still opens
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
     A row's actions (item.actions) show on hover and when the row holds keyboard focus; on touch they always show. The pin
       is different: it shows a state, so a pinned row keeps it (batch 272).
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
exports.choosePicture = choosePicture;
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
       setNotifications(next), pinnedApps: [application ids], setPinnedApps(next | (prev) => next),
       setPicture(dataUrl | null) }
     choosePicture(): opens the file picker for an image and resolves to a 128px square picture (a data: URL), or null
   Behavior:
     The pins are remembered in the browser (localStorage plenix.pinnedApps) until the back end stores them.
     The person's picture is too (localStorage plenix.accountPicture, batch 272): it replaces account.src everywhere.
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
const PICTURE_KEY = 'plenix.accountPicture';
const readPicture = () => {
  try {
    return localStorage.getItem(PICTURE_KEY) || null;
  } catch (e) {
    return null;
  }
};

// the file picker for a picture: the image cut to a centered square and drawn at 128px (a small data: URL, a PNG)
function choosePicture() {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const side = Math.min(img.naturalWidth, img.naturalHeight),
            c = document.createElement('canvas');
          c.width = 128;
          c.height = 128;
          c.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, 128, 128);
          resolve(c.toDataURL('image/png'));
        };
        img.onerror = () => resolve(null);
        img.src = reader.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
    input.click();
  });
}
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
  const [picture, setPictureState] = _react.default.useState(readPicture);
  const setPicture = _react.default.useCallback(v => {
    try {
      if (v) localStorage.setItem(PICTURE_KEY, v);else localStorage.removeItem(PICTURE_KEY);
    } catch (e) {/* not stored: it lasts for this visit */}
    setPictureState(v || null);
  }, []);
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
  const account = _react.default.useMemo(() => Object.assign({}, session.account || {}, picture ? {
    src: picture
  } : null), [session, picture]);
  const value = _react.default.useMemo(() => ({
    account,
    notifications,
    setNotifications,
    pinnedApps,
    setPinnedApps,
    setPicture
  }), [account, notifications, pinnedApps, setPinnedApps, setPicture]);
  return /*#__PURE__*/_react.default.createElement(SessionContext.Provider, {
    value: value
  }, children);
}

// the session, or the demo session outside a provider (a page that has not been wrapped still shows the same person)
function useSession() {
  const ctx = _react.default.useContext(SessionContext);
  if (ctx) return ctx;
  const pic = readPicture();
  return {
    account: pic ? Object.assign({}, DEMO_SESSION.account, {
      src: pic
    }) : DEMO_SESSION.account,
    notifications: DEMO_SESSION.notifications,
    setNotifications: () => {},
    pinnedApps: DEMO_SESSION.pinnedApps,
    setPinnedApps: () => {},
    setPicture: v => {
      try {
        if (v) localStorage.setItem(PICTURE_KEY, v);else localStorage.removeItem(PICTURE_KEY);
      } catch (e) {/* not stored */}
      location.reload();
    }
  };
}
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
  "platform/providers/ThemeProvider.jsx": { deps: {"react":null,"./themes.js":"platform/providers/themes.js","../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeContext = void 0;
exports.ThemeProvider = ThemeProvider;
exports.ThemeZone = ThemeZone;
exports.useTheme = useTheme;
var _react = _interopRequireDefault(require("react"));
var _themes = require("./themes.js");
var _cx = require("../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · ThemeProvider, useTheme, ThemeZone
   Summary: Gives React components the theme, density and interaction context; a theme zone gives one region of a page
     another mode (or theme).
   Usage:
     <ThemeProvider>{app}</ThemeProvider>
     const { theme, mode, setTheme, themes } = useTheme();
     <ThemeZone mode="dark"><MediaViewer … /></ThemeZone>
     <ThemeZone mode="light" surface="default">…</ThemeZone>
   Props:
     children: the application root or React island it wraps
     useTheme(): { theme, mode, setTheme(name), themes, zone } — the current theme's name and mode ("light" | "dark"), a
       way to change the page's theme (kept for every page), the themes the design system defines (THEMES, from
       platform/standards/themes.json), and whether it is read inside a ThemeZone
     ThemeZone: a region with its own mode (or theme)
       mode: "light" | "dark" | none (default: the mode around it)
       theme: a theme name of THEMES | none (default: the theme around it)
       surface: "canvas" (default: the zone's canvas fill) | "default" (the default surface) | "none" (no fill of its own)
       as: the element (default "div"); label: names the region (with as="section", a landmark)
       className: more classes on the zone
   Behavior:
     It reads the theme, mode, density and interaction attributes on <html> and follows their changes.
     It sends changes back through the same runtime (window.PlenixWorkspace), so a person's saved choice is never reset.
     Outside a ThemeProvider, useTheme still reads and changes the theme on <html>.
     A ThemeZone writes data-plx-theme and data-plx-mode on its element, so every color role inside
       it resolves to that theme and mode; it also writes the density around it (data-plx-density), so the component
       tokens are resolved again inside it. Menus and dialogs opened from inside a zone keep its theme and mode (Portal).
     Nested zones work: the innermost decides.
   Notes:
     The attributes on <html> are set before the page draws by platform/providers/theme-boot.js (loaded in <head>, with
       the same saved preference keys as before).
     Wrap an application root, or a React island, in ThemeProvider.
     Read it with useTheme, useDensity and useInteraction.
     The themes are defined in the design system (platform/standards/themes.json); today "default", the Plenix look.
     A zone is for a region with a reason (a dark media viewer, a code panel, the shell header); never many small zones on
       one page, and never colors set by hand on components inside one.
     Other ThemeZone props pass through to its element.
*/
const ThemeContext = exports.ThemeContext = /*#__PURE__*/_react.default.createContext(null);
function readRoot() {
  const root = document.documentElement;
  return {
    theme: root.getAttribute('data-plx-theme') || _themes.DEFAULT_THEME,
    density: root.getAttribute('data-plx-density') || 'standard',
    interaction: root.getAttribute('data-plx-interaction') || 'pointer',
    mode: root.getAttribute('data-plx-mode') === 'dark' ? 'dark' : 'light'
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
      attributeFilter: ['data-plx-theme', 'data-plx-density', 'data-plx-interaction', 'data-plx-mode']
    });
    return () => observer.disconnect();
  }, []);
  const value = _react.default.useMemo(() => ({
    theme: state.theme,
    mode: state.mode,
    setTheme: changeTheme,
    themes: _themes.THEMES,
    density: state.density,
    interaction: state.interaction,
    zone: false,
    setDensity: d => {
      if (window.PlenixWorkspace) window.PlenixWorkspace.setDensity(d);
    }
  }), [state.theme, state.mode, state.density, state.interaction]);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: value
  }, children);
}
function useTheme() {
  const ctx = _react.default.useContext(ThemeContext);
  const [own, setOwn] = _react.default.useState(() => ctx ? null : readRoot());
  _react.default.useEffect(() => {
    if (ctx) return undefined;
    const observer = new MutationObserver(() => setOwn(readRoot()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-plx-theme', 'data-plx-mode']
    });
    return () => observer.disconnect();
  }, [ctx]);
  return {
    theme: ctx ? ctx.theme : own.theme,
    mode: ctx ? ctx.mode : own.mode,
    setTheme: changeTheme,
    themes: _themes.THEMES,
    zone: ctx ? !!ctx.zone : false
  };
}
const SURFACES = ['canvas', 'default', 'none'];
function ThemeZone({
  mode,
  theme,
  surface = 'canvas',
  as = 'div',
  label,
  className,
  children,
  ...rest
}) {
  const outer = _react.default.useContext(ThemeContext);
  const ref = _react.default.useRef(null);
  const [root, setRoot] = _react.default.useState(readRoot);
  const [density, setDensity] = _react.default.useState(null);
  // the density around the zone (the nearest region that sets one, else <html>) and the page's theme and mode, followed
  _react.default.useEffect(() => {
    const read = () => {
      const up = ref.current && ref.current.parentElement,
        near = up && up.closest('[data-plx-density]');
      setDensity(near ? near.getAttribute('data-plx-density') : null);
      setRoot(readRoot());
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-plx-density', 'data-plx-theme', 'data-plx-mode']
    });
    return () => observer.disconnect();
  }, []);
  const base = outer || root;
  const t = theme && _themes.THEMES.some(x => x.name === theme) ? theme : base.theme;
  const m = mode === 'light' || mode === 'dark' ? mode : base.mode;
  const value = _react.default.useMemo(() => Object.assign({
    setTheme: changeTheme,
    themes: _themes.THEMES,
    density: density || root.density,
    interaction: root.interaction
  }, outer, {
    theme: t,
    mode: m,
    zone: true
  }), [outer, t, m, density, root]);
  const Tag = as;
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: value
  }, /*#__PURE__*/_react.default.createElement(Tag, _extends({
    ref: ref,
    className: (0, _cx.cx)('plx-theme-zone', 'plx-theme-zone--' + (SURFACES.indexOf(surface) >= 0 ? surface : 'canvas'), className),
    "data-plx-theme": t,
    "data-plx-mode": m,
    "data-plx-density": density || undefined,
    "aria-label": label
  }, rest), children));
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
  "platform/patterns/AppHeader/AppHeader.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Brand/Brand.jsx":"platform/components/Brand/Brand.jsx","../../components/Count/Count.jsx":"platform/components/Count/Count.jsx","../../components/Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Text/Text.jsx":"platform/components/Text/Text.jsx","../../providers/SessionProvider.jsx":"platform/providers/SessionProvider.jsx","../../providers/apps.js":"platform/providers/apps.js","../../utils/layer.js":"platform/utils/layer.js","../../hooks/useDensity.js":"platform/hooks/useDensity.js","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppHeader = AppHeader;
exports.SIGN_OUT = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _Tooltip = require("../../components/Tooltip/Tooltip.jsx");
var _Icon = require("../../components/Icon/Icon.jsx");
var _Brand = require("../../components/Brand/Brand.jsx");
var _Count = require("../../components/Count/Count.jsx");
var _Avatar = require("../../components/Avatar/Avatar.jsx");
var _Menu = require("../../components/Menu/Menu.jsx");
var _Button = require("../../components/Button/Button.jsx");
var _Text = require("../../components/Text/Text.jsx");
var _SessionProvider = require("../../providers/SessionProvider.jsx");
var _apps = require("../../providers/apps.js");
var _layer = require("../../utils/layer.js");
var _useDensity = require("../../hooks/useDensity.js");
var _AppShell = require("../AppShell/AppShell.jsx");
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
     brand: replaces the header name's content (default: the Plenix mark, then "Plenix" over the application's name)
     brandHref: makes the header name a link when there is no switcher
     currentApp: the open application's id (see PLENIX_APPS), or null on a screen that is not an application (Settings);
       when it is given (also null) the header name is the switcher and the pinned header links show
     appsRoot: the relative path from this page to the folder that holds every application (default "")
     onOpenApp(app): return true when the page opens the application itself (a section of the same page); otherwise the link opens it
     nav: replaces the header links (default: the pinned applications)
     navLabel: the header links' accessible name (default "Pinned applications")
     action: the application's action (AppHeader.Action), an icon item with its label as tooltip, between search and the utilities
     search: the search field (a SearchField onAccent), shown when search is asked for; without it there is no search
     searchSuggestions: at Narrow, the recent searches and suggestions shown under the field of the full-screen search view
     searchResults: at Narrow, the results shown in the full-screen search view (after the suggestions); without them,
       Enter in the field closes the view so the page shows its own results
     searchScope: at Narrow, what the search covers, shown under the field ("In Notes"); default the application's name
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
     AppHeader.Account.settings: { href | onSelect } for "Plenix settings", the suite's settings (owner, batch 272)
     AppHeader.Account.signOut: { href | onSelect } for "Sign out", last in the menu (default: the sign-in proxy's sign-out,
       /outpost.goauthentik.io/sign_out); the picture is changed under My account (Settings > Account), not in this menu (owner, batch 274)
     AppHeader.Account.appSettings: { app, href | onSelect, icon } for "<app> settings", this application's own settings
       ("Notes settings", "Asset Manager settings"); left out when the application has none
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
     AppHeader.Action.children: the action's label: its tooltip and accessible name (or label)
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
     Ctrl K (Cmd K) opens search from anywhere on the page; Escape closes it.
     An empty search field closes when focus leaves it. The field's own clear button is the only X (owner, 2026-10-10: a
       separate Close button made two)
     At Narrow (under 600px, --plx-sys-shell-phone-below) search opens a full-screen search view (Platforms Standard 4.2
       row 7, 5.3 Search): the field on top with Cancel, the scope, the recent searches and suggestions, then the results.
       Opening it adds a history entry, so the browser's Back closes it as Cancel and Escape do; focus stays inside it and
       returns to the search button.
     With a touch pointer every header item and the header name has a 44 × 44px target (Platforms Standard 3.1): the
       target extends invisibly past the 40px item, and the utilities part 4px so the targets do not overlap.
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
  searchSuggestions,
  searchResults,
  searchScope,
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
    toggle = _react.default.useRef(null),
    view = _react.default.useRef(null);
  const refocus = _react.default.useRef(false);
  const searchId = (0, _layer.useUid)('plx-header-search');
  const narrow = (0, _AppShell.useMedia)((0, _AppShell.below)('--plx-sys-shell-phone-below'));
  const fullScreen = narrow && searching; // at Narrow the search view fills the screen
  const close = () => {
    refocus.current = true;
    setSearching(false);
  };
  // the full-screen view is a history entry: the browser's Back closes it; Cancel and Escape go back along it
  _react.default.useEffect(() => {
    if (!fullScreen) return undefined;
    window.history.pushState({
      plxSearch: searchId
    }, '');
    const pop = () => close();
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, [fullScreen]);
  const cancel = () => {
    if (window.history.state && window.history.state.plxSearch === searchId) window.history.back();else close();
  };
  (0, _layer.useLayer)(view, fullScreen, {
    modal: true,
    onEscape: cancel,
    initialFocus: () => view.current && view.current.querySelector('input')
  });
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
    if (narrow) return undefined; // the full-screen view is a modal layer: it takes focus and Escape itself
    const input = panel.current && panel.current.querySelector('input');
    if (input) input.focus();
    const esc = e => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [searching, narrow]);
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
  const brandEl = brand || (name ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Brand.BrandMark, null), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__name"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__product"
  }, "Plenix"), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-app-header__app"
  }, name))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Brand.BrandMark, null), "Plenix"));
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
  // Enter in the view's field: without results of its own the view closes, so the page's results show
  const onViewKey = e => {
    if (e.key === 'Enter' && !searchResults && !e.defaultPrevented && e.target.tagName === 'INPUT') cancel();
  };
  const scope = searchScope !== undefined ? searchScope : name;
  const searchView = fullScreen ? /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("div", {
    ref: view,
    id: searchId,
    className: "plx-search-view",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Search",
    onKeyDown: onViewKey
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-view__bar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-view__field"
  }, /*#__PURE__*/_react.default.isValidElement(search) ? /*#__PURE__*/_react.default.cloneElement(search, {
    onAccent: false
  }) : search), /*#__PURE__*/_react.default.createElement(_Button.Button, {
    variant: "ghost",
    className: "plx-search-view__cancel",
    onClick: cancel
  }, "Cancel")), scope ? /*#__PURE__*/_react.default.createElement(_Text.Text, {
    variant: "secondary",
    as: "p",
    className: "plx-search-view__scope"
  }, 'In ' + scope) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-view__content"
  }, searchSuggestions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-view__suggestions"
  }, searchSuggestions) : null, searchResults ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-search-view__results"
  }, searchResults) : null, !searchSuggestions && !searchResults ? /*#__PURE__*/_react.default.createElement(_Text.Text, {
    variant: "secondary",
    as: "p"
  }, "Type what you are looking for, then press Enter.") : null)), document.body) : null;
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
  })), searchView, searching && !narrow ? /*#__PURE__*/_react.default.createElement("div", {
    ref: panel,
    id: searchId,
    className: "plx-app-header__search",
    role: "search",
    onBlur: onPanelBlur
  }, search) : null) : null, action ? /*#__PURE__*/_react.default.createElement("div", {
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

// the sign-in proxy's sign-out (Authentik's forward-auth outpost on every Plenix host): ends the session, then signs in again
const SIGN_OUT = exports.SIGN_OUT = '/outpost.goauthentik.io/sign_out';
AppHeader.Account = function AppHeaderAccount({
  name: nameProp,
  email: emailProp,
  src: srcProp,
  placement = 'header',
  current,
  myAccount = {},
  settings = {},
  appSettings = {},
  signOut = {
    href: SIGN_OUT
  },
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
  }, /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null), has(myAccount) ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: "settings-profile",
    href: myAccount.href,
    onSelect: myAccount.onSelect,
    "aria-current": current === 'account' ? 'page' : undefined
  }, "My account") : null, has(settings) ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: "gear",
    href: settings.href,
    onSelect: settings.onSelect,
    "aria-current": current === 'settings' ? 'page' : undefined
  }, "Plenix settings") : null, has(appSettings) ? /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: appSettings.icon || 'settings-customize',
    href: appSettings.href,
    onSelect: appSettings.onSelect,
    "aria-current": current === 'app-settings' ? 'page' : undefined
  }, (appSettings.app || 'App') + ' settings') : null), density ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null), /*#__PURE__*/_react.default.createElement(_Menu.MenuGroup, {
    label: "Display density"
  }, choices.map(d => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: d.value,
    role: "menuitemradio",
    icon: 'density-' + d.value,
    checked: dens === d.value,
    onSelect: () => setDens(d.value)
  }, d.label)))) : null, extra ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null), extra) : null, has(signOut) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Menu.MenuDivider, null), /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    icon: "sign-out",
    href: signOut.href,
    onSelect: signOut.onSelect
  }, "Sign out")) : null);
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

// the application's action is an icon item like the header's others: its label is the tooltip and the accessible name
// (owner, batch 272: "just an icon with tooltip"); a variant the application passes is no longer used
AppHeader.Action = function AppHeaderAction({
  icon,
  children,
  label,
  variant,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement(AppHeader.Item, _extends({
    icon: typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
      name: icon
    }) : icon,
    label: label || (typeof children === 'string' ? children : undefined)
  }, rest));
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
    variant: "ghost",
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
     of actions on the selection, always shown: its actions are disabled until something is selected.
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
       none: (word) => "No " + word + " selected" (word is the plural),
       selectAll: (n) => "Select all " + n, clear: "Clear selection" } (word is the noun or plural, chosen by count)
     BulkActions.count: how many are selected; at 0 the bar stays, grayed, with its actions disabled (owner, batch 277:
       "always visible but grayed out until selection happens")
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
     With nothing selected the bar is neutral (no selection color), reads "No assets selected", offers Select all, and
       every action (and More) is disabled; selecting enables them.
     Actions that do not fit move into a "More actions" menu; a menu button's items appear there as a group.
*/
const off = (a, count) => !count || !!(a.single && count > 1);
const STRINGS = {
  selected: (n, word) => n + ' ' + word + ' selected',
  none: word => 'No ' + word + ' selected',
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
  const words = count ? t.selected(count, count === 1 ? noun : plural || noun + 's') : t.none(plural || noun + 's');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _cx.cx)('plx-selection-summary', className)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-selection-summary__count",
    "aria-live": "polite"
  }, words), onSelectAll && total !== undefined && count < total ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    onClick: onSelectAll
  }, t.selectAll(total)) : null, onClear && count ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
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
  const hidden = actions.slice(fit);
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "toolbar",
    "aria-label": label || t.label,
    className: (0, _cx.cx)('plx-bulk-actions', !count && 'plx-bulk-actions--empty', className)
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
      caret: true,
      disabled: !count
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
      caret: true,
      disabled: !count
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
   Summary: A responsive grid of cards, a masonry of pictures of mixed heights, or justified rows of pictures.
   Usage:
     <ContentGrid size="md" label="Assets"><Card…/><Card…/></ContentGrid>
     <ContentGrid layout="masonry" size="sm" label="Photos"><Image…/><Image…/></ContentGrid>
     <ContentGrid layout="justified" label="Photos"><Image ratio="16-9" …/><Image ratio="3-4" …/></ContentGrid>
   Props:
     size: "xs" | "sm" | "md" (default) | "lg"; sets the smallest card width (100, 140, 180, 240px), and in justified rows
       the row height
     layout: "grid" (default: rows of equal cells) | "masonry" (columns of the card width; each item keeps its own height)
       | "justified" (rows of the size's height that fill the width; each item as wide as its ratio)
     label: names the list
     className: more classes on the grid
     children: the cards; each child is one list item (null, undefined and false are skipped). In justified rows each
       child's ratio prop ("1-1", "4-3", "3-2", "16-9", "21-9", "3-4", "9-16"; the aspect-ratio scale) sets its width;
       a child without one is 4:3
   Behavior:
     Columns fill the width.
     The gap follows the density (--plx-sys-card-grid-gap).
     Masonry fills each column from top to bottom in the markup order, so reading and Tab go down the first column, then
       the next; where the browser lays out a masonry grid (grid-template-rows: masonry) it fills row by row instead.
       An item never breaks across two columns.
     Justified rows keep the row height and widen each item by its ratio until the row is full; the last row keeps its
       items at their own width. Pictures in it fill their cell (cover), so a few pixels of their edges may be cropped.
   Notes:
     Masonry and justified rows are for browsing pictures; when the order matters (sorted results) use the grid.
*/

const RATIOS = ['1-1', '4-3', '3-2', '16-9', '21-9', '3-4', '9-16'];
function ContentGrid({
  size = 'md',
  layout = 'grid',
  label,
  className,
  children
}) {
  const justified = layout === 'justified';
  return /*#__PURE__*/_react.default.createElement("ul", {
    "aria-label": label,
    className: (0, _cx.cx)('plx-content-grid', 'plx-content-grid--' + size, layout !== 'grid' ? 'plx-content-grid--' + layout : null, className)
  }, _react.default.Children.map(children, c => {
    if (c === null || c === undefined || c === false) return null;
    const ratio = justified ? c.props && RATIOS.indexOf(c.props.ratio) >= 0 ? c.props.ratio : '4-3' : undefined;
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "plx-content-grid__item",
      "data-plx-ratio": ratio
    }, c);
  }));
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · PropertyList
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
     PropertyList.Item.data: the value is a technical value (a size, a date, an ID, a file name): the data font, DM Mono,
       at the value size, so it shares the label's baseline; names, descriptions and statuses stay DM Sans; default false
     PropertyList.Item.className: more classes on the pair
     PropertyList.Item.children: the value
   Notes:
     For an editable value put the control in the item and pass htmlFor (its id) so the label names it.
     A list of name/value facts shown as reference (a component's details, a capability's facts) is the defined data table
       with a header row (Table / DataTable), not a PropertyList (owner, 2026-10-09, replacing batch 296's rule); a
       PropertyList is for an item's own details in a panel (an inspector, a form's summary).
     Other props (aria-label) reach the <dl>.
*/
function PropertyList({
  layout = 'columns',
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("dl", _extends({
    className: (0, _cx.cx)('plx-property-list', 'plx-property-list--' + layout, className)
  }, rest), children);
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
  "platform/patterns/EntityHeader/EntityHeader.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/overflow.js":"platform/utils/overflow.js","../../components/Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx","../../components/Badge/Badge.jsx":"platform/components/Badge/Badge.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","../../components/StatusDot/StatusDot.jsx":"platform/components/StatusDot/StatusDot.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityHeader = EntityHeader;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _overflow = require("../../utils/overflow.js");
var _Avatar = require("../../components/Avatar/Avatar.jsx");
var _Badge = require("../../components/Badge/Badge.jsx");
var _Button = require("../../components/Button/Button.jsx");
var _Icon = require("../../components/Icon/Icon.jsx");
var _Menu = require("../../components/Menu/Menu.jsx");
var _StatusDot = require("../../components/StatusDot/StatusDot.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · EntityHeader
   Summary: The header of a page that shows one entity (a contact, a project, an email, a note, a task list): its picture,
     its name, the actions that act on it, and one line of facts about it. Decided with the owner on 2026-10-09 (the page
     header study, docs/page-header-study.html).
   Usage:
     <EntityHeader media={{ person: 'Maya Chen', color: 'blue' }} context="Clients" status={{ tone: 'warning', label: 'Reconnect due' }}
       title="Maya Chen" facts={['Creative Director', 'Apex Co', <>Last message <Text variant="data">10:24 AM</Text></>]}
       actions={[{ icon: 'phone', label: 'Call' }, { icon: 'message', label: 'Message', primary: true }, { icon: 'share', label: 'Share' }]} />
     <EntityHeader media={{ icon: 'briefcase', hue: 'blue' }} title="AI Writing Tools" description="Evaluating AI writing assistants" />
   Props:
     title: the entity's name; 18px bold; a long name wraps, never cut off
     media: the entity's picture, always shown: { person, src, color } draws an Avatar (48px); { icon, hue } a generic icon for
       the entity's kind, tinted in a data color (hue: blue, green, purple, red, brown, gray; default gray), or on the surface (hue: surface, a white tile); or an element
     context: the line above the title (optional; not a breadcrumb): a placeholder such as the item's category, or a control
       that places the entity (a period navigator); what it holds is still to be defined per capability
     status: the entity's status, a soft Badge in the upper-right status area: { tone, label } (tone: neutral, info, success,
       warning, danger) or an element
     actions: the actions that act on this entity, as 16px icon buttons side by side: [{ icon, label, onClick, primary,
       disabled }]; label is the tooltip and the accessible name; one primary (filled). Never capability actions (New …)
     moreActions: items only in the ⋯ menu, after the actions that did not fit: [{ icon, label, onSelect, danger }]
     (with neither actions nor moreActions there is no action area, not even ⋯: a documentation page, an overview)
     live: the live state, the first fact, with a status dot: { tone, label }
     facts: key facts, one line joined by ·, at most four (live state included); what does not fit is cut with …;
       a technical value in a fact (a date, a time, a file name) is Text variant "data", at the facts' size
     description: a sentence instead of facts (never both)
     headingLevel: the title's heading level (default 1)
     className: more classes on the header
     strings: the words it shows and announces, for other languages: { more: "More actions" }
   Behavior:
     A card on the page (the shell floats its content as cards). Its background follows the user's settings on the page root:
       data-plx-header-tint none | gray | blue (default) | warm | green | purple | red, and data-plx-header-tint-style fade
       (default; the tint at the top fading to the surface) | flat.
     The media spans the three lines; nothing sits above it. The context line and the status area share the top line.
     Actions sit at the right, level with the title; the ⋯ menu is always last. When the row is too narrow the actions at
       the end fold into the ⋯ menu first; the title keeps at least half the width.
     A full-width line (border-subtle) runs above the facts, across the text column.
     Every fact is in the same font, size, weight and color; only the separators are muted.
   Notes:
     Not for settings screens or section titles: use RecordPage.Header.
*/

const HUES = ['blue', 'green', 'purple', 'red', 'brown', 'gray', 'surface'];
function Media({
  media
}) {
  if (/*#__PURE__*/_react.default.isValidElement(media)) return /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-entity-header__media"
  }, media);
  if (media.person || media.src) return /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    className: "plx-entity-header__media plx-entity-header__avatar",
    name: media.person,
    src: media.src,
    color: media.color,
    size: "xl"
  });
  const hue = HUES.indexOf(media.hue) >= 0 ? media.hue : 'gray';
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-entity-header__media plx-entity-header__tile",
    "data-plx-media-hue": hue,
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: media.icon,
    size: "lg"
  }));
}
function Facts({
  live,
  facts,
  description
}) {
  const items = [];
  if (live) items.push(/*#__PURE__*/_react.default.createElement("span", {
    key: "live",
    className: "plx-entity-header__live"
  }, /*#__PURE__*/_react.default.createElement(_StatusDot.StatusDot, {
    tone: live.tone
  }), live.label));
  if (description) items.push(/*#__PURE__*/_react.default.createElement("span", {
    key: "d"
  }, description));else (facts || []).filter(Boolean).forEach((f, i) => items.push(/*#__PURE__*/_react.default.createElement("span", {
    key: 'f' + i
  }, f)));
  if (!items.length) return null;
  return /*#__PURE__*/_react.default.createElement("p", {
    className: "plx-entity-header__facts"
  }, items.map((it, i) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: i
  }, i ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-entity-header__sep",
    "aria-hidden": "true"
  }, "\xB7") : null, it)));
}
function Actions({
  actions,
  moreActions,
  strings
}) {
  const ref = _react.default.useRef(null);
  const list = actions || [];
  const fit = (0, _overflow.useOverflow)(ref, list.length, list.map(a => a.label).join('|'));
  const items = list.map(a => /*#__PURE__*/_react.default.createElement("span", {
    key: a.label,
    "data-plx-overflow-item": "",
    className: "plx-entity-header__action"
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "xs",
    iconOnly: true,
    icon: a.icon,
    label: a.label,
    title: a.label,
    variant: a.primary ? 'primary' : 'ghost',
    disabled: a.disabled,
    onClick: a.onClick
  })));
  const hidden = list.slice(fit);
  const extra = moreActions || [];
  const more = /*#__PURE__*/_react.default.createElement("span", {
    key: "plx-more",
    "data-plx-overflow-more": "",
    className: "plx-entity-header__action"
  }, /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
    label: strings.more,
    placement: "bottom-end",
    trigger: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "xs",
      iconOnly: true,
      icon: "more",
      label: strings.more,
      title: strings.more,
      variant: "ghost"
    })
  }, hidden.map(a => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: a.label,
    icon: a.icon,
    disabled: a.disabled,
    onSelect: a.onClick
  }, a.label)), extra.map(a => /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
    key: a.label,
    icon: a.icon,
    danger: a.danger,
    onSelect: a.onSelect
  }, a.label))));
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: "plx-entity-header__actions",
    "data-plx-density": "compact"
  }, (0, _overflow.splitAt)(items, fit, more));
}
function EntityHeader({
  title,
  media,
  context,
  status,
  actions,
  moreActions,
  live,
  facts,
  description,
  headingLevel = 1,
  className,
  strings
}) {
  const H = 'h' + headingLevel;
  const s = {
    more: 'More actions',
    ...strings
  };
  const badge = status && ! /*#__PURE__*/_react.default.isValidElement(status) ? /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    tone: status.tone,
    variant: "soft"
  }, status.label) : status;
  return /*#__PURE__*/_react.default.createElement("header", {
    className: (0, _cx.cx)('plx-entity-header', className)
  }, /*#__PURE__*/_react.default.createElement(Media, {
    media: media || {
      icon: 'doc-text'
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-entity-header__top"
  }, context ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-entity-header__context"
  }, context) : /*#__PURE__*/_react.default.createElement("span", null), badge ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-entity-header__status"
  }, badge) : null), /*#__PURE__*/_react.default.createElement(H, {
    className: "plx-entity-header__title"
  }, title), actions && actions.length || moreActions && moreActions.length ? /*#__PURE__*/_react.default.createElement(Actions, {
    actions: actions,
    moreActions: moreActions,
    strings: s
  }) : null, /*#__PURE__*/_react.default.createElement(Facts, {
    live: live,
    facts: facts,
    description: description
  }));
}
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
  "platform/providers/UnsavedGuard.jsx": { deps: {"react":null,"react-dom/client":null,"../components/Dialog/Dialog.jsx":"platform/components/Dialog/Dialog.jsx"}, externals: { "react": function () { return window.React; }, "react-dom/client": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmLeave = confirmLeave;
exports.hasUnsaved = hasUnsaved;
exports.leavePage = leavePage;
exports.useUnsavedGuard = useUnsavedGuard;
var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _Dialog = require("../components/Dialog/Dialog.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useUnsavedGuard, confirmLeave, hasUnsaved, leavePage
   Summary: Protects unsaved work (Platforms Standard 4.3, Guard): while a screen, a form or a dialog has unsaved changes,
     leaving it asks first, with a Plenix confirmation dialog ("Leave without saving?"), never the browser's confirm().
   Usage:
     const guard = useUnsavedGuard(dirty, 'Your changes to this note will be lost.');
     <Dialog onClose={guard(onClose)} …>                    // closing the dialog asks while it is dirty
     useUnsavedGuard(dirty, message, { keeps: (next) => true });   // sections that stay mounted: only leaving the page asks
     leavePage('../settings/index.html#/general');           // a page change from code, asked like a link
   Props:
     useUnsavedGuard(dirty, message, options): dirty: true while there are unsaved changes; message: the explanation in the
       dialog (default "Your changes will be lost."); options.keeps(next): true when the next screen (useScreenLocation's
       { path, parts, params }) still shows this work, so changing to it does not ask; options.strings: { title, leave,
       stay } for other languages. Returns guard(fn): fn wrapped so that, while dirty, it runs only after the person
       chooses Leave (for a dialog's Close and Cancel)
     hasUnsaved(next): true when a dirty guard would lose its work by changing to next (null: another page)
     confirmLeave(next): resolves true when nothing unsaved is in the way of the screen change (next: the next screen, or
       null for another page), or when the person chose Leave; false when they stay
     leavePage(url): goes to another page, asking first while something is unsaved
   Behavior:
     While anything is dirty:
     - closing or reloading the tab asks (beforeunload; the browser words that question itself);
     - a link to another page (the header's applications, a navigation pane's links, a Button with href) asks with the
       Plenix dialog: Leave follows the link, Keep editing stays;
     - a screen change through useScreenLocation (opening a screen, Back, Forward, the parent control) asks the same, and
       Back or Forward is undone when the person stays.
     The dialog is a destructive ConfirmDialog: it starts on Keep editing, Escape and the veil keep editing.
     Only one question shows at a time; a second request while it is open waits for the same answer.
   Notes:
     The dialog renders in its own root on document.body, so a guard works on any page, with or without an AppShell.
     A link that opens a new tab or window (target, Ctrl, Shift, the middle button) never asks: nothing is lost.
*/

const STRINGS = {
  title: 'Leave without saving?',
  message: 'Your changes will be lost.',
  leave: 'Leave',
  stay: 'Keep editing'
};
const guards = new Set(); // every mounted guard: a ref to { dirty, message, options }
let leaving = false; // the person chose Leave: the page may unload without asking again
let pending = null; // the question on screen, if any (one at a time)

// the first dirty guard that the next screen would lose (next null: another page)
function blocking(next) {
  for (const g of guards) {
    const c = g.current;
    if (c.dirty && !(next && c.options.keeps && c.options.keeps(next))) return c;
  }
  return null;
}

// asks with the Plenix dialog in a root of its own; resolves true for Leave
function ask(c) {
  if (pending) return pending;
  const t = Object.assign({}, STRINGS, c.options.strings);
  pending = new Promise(resolve => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const root = (0, _client.createRoot)(el);
    const done = ok => {
      queueMicrotask(() => {
        root.unmount();
        el.remove();
        pending = null;
        resolve(ok);
      });
    };
    root.render(/*#__PURE__*/_react.default.createElement(_Dialog.ConfirmDialog, {
      open: true,
      destructive: true,
      title: t.title,
      message: c.message || t.message,
      confirmLabel: t.leave,
      cancelLabel: t.stay,
      onConfirm: () => done(true),
      onCancel: () => done(false)
    }));
  });
  return pending;
}
function hasUnsaved(next) {
  return !!blocking(next === undefined ? null : next);
}
function confirmLeave(next) {
  const c = blocking(next === undefined ? null : next);
  return c ? ask(c) : Promise.resolve(true);
}
function leavePage(url) {
  return confirmLeave(null).then(ok => {
    if (ok) {
      leaving = true;
      location.href = url;
    }
    return ok;
  });
}

// the page-wide listeners, installed with the first guard
let installed = false;
function install() {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  window.addEventListener('beforeunload', e => {
    if (leaving || !blocking(null)) return;
    e.preventDefault();
    e.returnValue = '';
  });
  // a link to another page: ask before following it (capture: before the link's own handlers navigate)
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target && a.target !== '_self' || a.hasAttribute('download')) return;
    const to = new URL(a.href, location.href);
    if (to.origin === location.origin && to.pathname === location.pathname && to.search === location.search) return; // this page: a screen (useScreenLocation)
    if (!blocking(null)) return;
    e.preventDefault();
    e.stopPropagation();
    leavePage(to.href);
  }, true);
}
function useUnsavedGuard(dirty, message, options) {
  const ref = _react.default.useRef(null);
  ref.current = {
    dirty: !!dirty,
    message,
    options: options || {}
  };
  _react.default.useEffect(() => {
    install();
    guards.add(ref);
    return () => {
      guards.delete(ref);
    };
  }, []);
  return _react.default.useCallback(fn => (...args) => {
    const c = ref.current;
    if (!c.dirty) return fn && fn(...args);
    return ask(c).then(ok => ok && fn ? fn(...args) : undefined);
  }, []);
}
  } },
  "platform/providers/ScreenLocation.js": { deps: {"react":null,"./UnsavedGuard.jsx":"platform/providers/UnsavedGuard.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToParent = goToParent;
exports.navigate = navigate;
exports.parseScreen = parseScreen;
exports.readView = readView;
exports.screenHref = screenHref;
exports.useScreenLocation = useScreenLocation;
exports.useViewState = useViewState;
var _react = _interopRequireDefault(require("react"));
var _UnsavedGuard = require("./UnsavedGuard.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useScreenLocation, navigate, goToParent, screenHref, parseScreen, useViewState
   Summary: A URL for every screen inside an application (Platforms Standard 4.3: destination, history, back, parent, deep
     link, restoration): hash routes such as #/note/42, #/project/3/tasks or #/search?q=mail. Opening a screen pushes a
     history entry, the browser's Back and Forward bring the screens back, an address opens its screen directly, and the
     header's parent control goes to the logical parent.
   Usage:
     const loc = useScreenLocation({ app: 'notes' });
     loc.parts                          // ['note', '42'] at #/note/42; [] at the start screen
     loc.params.q                       // 'mail' at #/search?q=mail
     loc.navigate(['note', 42])         // push a history entry and show the note (a string path works too: '/note/42')
     loc.parent('/')                    // the logical parent (the header's parent control, a list-detail Back)
     const [view, updateView] = useViewState('notes');   // { paneWidth, scroll, … } kept in localStorage plenix.notes.view
   Props:
     useScreenLocation(options): the current screen; re-renders when it changes. options.app: the application id: the
       last screen is kept in its view state (plenix.<app>.view, screen) and opened on load when the address names no
       screen; options.legacy(hash): maps an older address (#t-3, #account) to a screen path; it is rewritten in place on
       load (the same screen, not a move). The first call on a page sets them.
     returns { path, parts, params, href, navigate(path, params, { replace }), parent(path, params), hrefOf(path, params) }
     navigate(path, params, options): opens a screen from outside React; resolves true when the screen changed (false when
       the person kept unsaved work); options.replace: replace the entry (a correction of the same screen, never a move)
     goToParent(path, params): Back when the previous entry is that parent (the history follows the hierarchy), else a
       new entry for it (after a deep link)
     screenHref(path, params): the address of a screen ("#/note/42?tab=files"); path: a string or a list of parts
       (each part is encoded)
     parseScreen(hash): { path, parts, params, href } of an address
     useViewState(app): [view, update(patch)]: what an application keeps between visits (the pane width, the list's
       scroll position, the last screen); update merges the patch and stores it
   Behavior:
     A new screen is a new history entry (pushState); the history is never rewritten where the person moved, and an
       address opened from outside is opened alone (no padded entries).
     Back and Forward (popstate, hashchange) show the screen of the entry; a link to "#/…" works the same way.
     A screen change asks the unsaved-changes guards first (useUnsavedGuard): when the person keeps editing, Back or
       Forward is undone (the history returns to the entry they were on) and a link or navigate() does nothing.
     An address that is not a screen (the skip link's #main) changes nothing.
     Stored values are read and written in try/catch: without storage everything works for this visit.
   Notes:
     The start screen is "#/" (or no hash). The entries the hook made carry their place in history.state (plxScreen), so
     a traversal knows how far it went and can be undone.
*/

const KEY = 'plxScreen';
const isScreen = hash => !hash || hash === '#' || hash.indexOf('#/') === 0;
function screenHref(path, params) {
  const parts = Array.isArray(path) ? path.map(p => encodeURIComponent(String(p))) : String(path || '/').split('/').filter(Boolean);
  const q = new URLSearchParams();
  Object.keys(params || {}).forEach(k => {
    const v = params[k];
    if (v !== undefined && v !== null && v !== '') q.append(k, String(v));
  });
  const query = q.toString();
  return '#/' + parts.join('/') + (query ? '?' + query : '');
}
function parseScreen(hash) {
  const h = hash && hash.indexOf('#/') === 0 ? hash.slice(1) : '/';
  const at = h.indexOf('?');
  const parts = (at >= 0 ? h.slice(0, at) : h).split('/').filter(Boolean).map(p => {
    try {
      return decodeURIComponent(p);
    } catch (e) {
      return p;
    }
  });
  const params = {};
  if (at >= 0) new URLSearchParams(h.slice(at + 1)).forEach((v, k) => {
    params[k] = v;
  });
  return {
    path: '/' + parts.join('/'),
    parts,
    params,
    href: screenHref(parts, params)
  };
}

/* ── the view state: plenix.<app>.view ── */
const viewKey = app => 'plenix.' + app + '.view';
function readView(app) {
  try {
    const v = JSON.parse(localStorage.getItem(viewKey(app)));
    return v && typeof v === 'object' ? v : {};
  } catch (e) {
    return {};
  }
}
function writeView(app, patch) {
  try {
    localStorage.setItem(viewKey(app), JSON.stringify(Object.assign(readView(app), patch)));
  } catch (e) {/* not stored: it lasts for this visit */}
}
function useViewState(app) {
  const [view, setView] = _react.default.useState(() => readView(app));
  const update = _react.default.useCallback(patch => {
    setView(v => {
      const p = typeof patch === 'function' ? patch(v) : patch;
      writeView(app, p);
      return Object.assign({}, v, p);
    });
  }, [app]);
  return [view, update];
}

/* ── the page's screen: one per page, shared by every component that asks ── */
let current = null; // the screen shown: parseScreen(…)
let at = 0; // the place of the current entry in this tab's history (history.state.plxScreen)
const trail = []; // trail[i]: the screen of entry i, as far as this page knows
let app = null; // the application whose last screen is kept
let undoTo = null; // a traversal being undone: the entry it returns to
let passing = false; // the person chose Leave: the next traversal goes through
const subscribers = new Set();
const urlOf = href => location.pathname + location.search + href;
const placeOf = state => state && typeof state[KEY] === 'number' ? state[KEY] : null;
const tag = i => {
  try {
    history.replaceState(Object.assign({}, history.state, {
      [KEY]: i
    }), '', location.href);
  } catch (e) {/* no history API */}
};
function show(next, i) {
  at = i;
  trail[i] = next.href;
  if (current && next.href === current.href) return;
  current = next;
  if (app) writeView(app, {
    screen: next.href
  });
  subscribers.forEach(f => f(next));
}
function start(options) {
  if (current) {
    if (options.app && !app) app = options.app;
    return;
  }
  app = options.app || null;
  const hash = location.hash;
  // an older address (#t-3): the same screen under its new address, in place
  const old = !isScreen(hash) && options.legacy ? options.legacy(hash) : null;
  if (old) history.replaceState(history.state, '', urlOf(screenHref(old)));
  // no screen named: the last screen of this application (restoration), in place
  else if (!hash && app) {
    const last = readView(app).screen;
    if (last && isScreen(last)) history.replaceState(history.state, '', urlOf(parseScreen(last).href));
  }
  current = parseScreen(isScreen(location.hash) ? location.hash : '');
  const place = placeOf(history.state);
  at = place === null ? 0 : place;
  if (place === null) tag(at);
  trail[at] = current.href;
  window.addEventListener('popstate', onTraverse);
  window.addEventListener('hashchange', onTraverse);
}

// Back, Forward, or a link to "#/…" (the browser has already moved: show the entry, or undo the move and ask)
function onTraverse() {
  const place = placeOf(history.state);
  if (undoTo !== null) {
    if (place === undoTo) undoTo = null;
    return;
  }
  const to = place === null ? at + 1 : place; // an entry the browser added (a link) comes after this one
  if (place === null) tag(to);
  if (!isScreen(location.hash)) {
    at = to;
    trail[to] = current.href;
    return;
  } // #main and the like: the same screen
  const next = parseScreen(location.hash);
  if (next.href === current.href) {
    at = to;
    trail[to] = next.href;
    return;
  }
  if (passing || !(0, _UnsavedGuard.hasUnsaved)(next)) {
    passing = false;
    show(next, to);
    return;
  }
  // unsaved work: the page stays where it was while the question is open (the move is undone), and Leave redoes it
  const from = at;
  if (to === from) {
    // nothing to undo: put the address of the shown screen back if the person stays
    (0, _UnsavedGuard.confirmLeave)(next).then(ok => {
      if (ok) show(next, to);else history.replaceState(history.state, '', urlOf(current.href));
    });
    return;
  }
  undoTo = from;
  history.go(from - to);
  (0, _UnsavedGuard.confirmLeave)(next).then(ok => {
    if (ok) {
      passing = true;
      history.go(to - from);
    }
  });
}
function navigate(path, params, options) {
  start({});
  const next = parseScreen(screenHref(path, params));
  if (next.href === current.href) return Promise.resolve(true);
  return (0, _UnsavedGuard.confirmLeave)(next).then(ok => {
    if (!ok) return false;
    if (options && options.replace) history.replaceState(Object.assign({}, history.state, {
      [KEY]: at
    }), '', urlOf(next.href));else {
      trail.length = at + 1;
      history.pushState({
        [KEY]: at + 1
      }, '', urlOf(next.href));
      at += 1;
    }
    show(next, at);
    return true;
  });
}
function goToParent(path, params) {
  start({});
  const href = parseScreen(screenHref(path, params)).href;
  if (at > 0 && trail[at - 1] === href) {
    history.back();
    return Promise.resolve(true);
  }
  return navigate(path, params);
}
function useScreenLocation(options) {
  start(options || {});
  const [loc, setLoc] = _react.default.useState(current);
  _react.default.useEffect(() => {
    subscribers.add(setLoc);
    if (loc !== current) setLoc(current);
    return () => {
      subscribers.delete(setLoc);
    };
  }, []);
  return _react.default.useMemo(() => Object.assign({}, loc, {
    navigate,
    parent: goToParent,
    hrefOf: screenHref
  }), [loc]);
}
  } },
  "platform/patterns/ToolRail/ToolRail.jsx": { deps: {"react":null,"../../utils/roving.js":"platform/utils/roving.js","../../utils/cx.js":"platform/utils/cx.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarContext = void 0;
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
     ToolRailBar (NavPane at Narrow): the same items drawn as the destinations of the bottom navigation bar
   Behavior:
     It is a toolbar with vertical orientation and one Tab stop: Arrow Up / Down, Home and End move between tools; Tab
     enters and leaves the rail.
     Each tool is an icon-only toggle button with a tooltip at its end side.
   Notes:
     The editor page sets the dark mode on its container.
*/

const LabelsContext = /*#__PURE__*/_react.default.createContext(false);
// inside the bottom navigation bar (NavPane at Narrow; Platforms Standard 4.1, 6.4) an item is a destination: its icon with
// its label under it, always shown, and aria-current for the current one
const BarContext = exports.BarContext = /*#__PURE__*/_react.default.createContext(false);
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
  const labels = _react.default.useContext(LabelsContext),
    bar = _react.default.useContext(BarContext);
  if (bar) return /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: (0, _cx.cx)('plx-nav-bar__item', pressed && 'is-current', className),
    "aria-current": pressed ? 'page' : undefined,
    disabled: disabled || undefined,
    onClick: onClick
  }, typeof icon === 'string' ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon,
    filled: !!pressed
  }) : icon, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-bar__label"
  }, label));
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
  if (_react.default.useContext(BarContext)) return null; // the bar has no dividers
  return /*#__PURE__*/_react.default.createElement("span", {
    role: "separator",
    className: "plx-tool-rail__divider"
  });
};
  } },
  "platform/patterns/NavPane/NavPane.jsx": { deps: {"react":null,"react-dom":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","../../utils/sizeSteps.js":"platform/utils/sizeSteps.js"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavPane = NavPane;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("../../utils/cx.js");
var _layer = require("../../utils/layer.js");
var _Button = require("../../components/Button/Button.jsx");
var _ToolRail = require("../ToolRail/ToolRail.jsx");
var _AppShell = require("../AppShell/AppShell.jsx");
var _sizeSteps = require("../../utils/sizeSteps.js");
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
     rail: the page's rail items (<ToolRail.Item…/>), shown when the pane is collapsed; at Narrow, the destinations of the
       bottom navigation bar
     collapseAt: "end" (default; the row's end, facing the main region) | "start" (only for a pane on the right)
     width: its own width outside an AppShell (default: the shell navigation width)
     strings: the words it shows, for other languages: { browse: "Browse" } (the bar's destination that opens the pane)
     className: more classes on the pane
     children: the body: NavList groups (whose headings are collapsible section headers), a filter field, buttons
   Behavior:
     Its size follows the Layout grid's shell: --plx-sys-shell-nav-width (240px), resizable 140–320px with the splitter on its edge.
     The first row is the same on every pane: the title, the actions, then the Collapse button at the row's end, on the side
       that faces the main region.
     Collapsed, it is a rail (ToolRail) of the page's rail items with Expand always first, at the top, then a divider.
     The window class (Platforms Standard 3.3) decides its form (4.1, 6.4):
       Wide (840px and up): beside the main region, as above.
       Medium (600–839px): a rail whose Expand opens the expanded rail over the main region; Escape or a click outside
         closes it.
       Narrow (under 600px): never a drawer. With two or more rail items, the page's top-level destinations are a bottom
         navigation bar: up to four of them, then Browse, which opens the pane as a screen of its own (every other
         destination is in it). Without, the pane is the first screen of a stack, and a parent row at the top of the page
         (the pane's title after a back arrow) opens it. While a list-detail's detail shows (SecondaryPane detailOpen),
         the parent row is that detail's Back instead ("Back to {list}"; it returns to the list), so the page has one back
         control; when the list shows again, the row opens the pane as before. Choosing a destination, a link or a list item in the pane shows the
         main region again; Escape does too.
     The body scrolls; its bar shows on hover.
     Outside an AppShell it is a plain pane (width: its own, or the shell navigation width) with no Collapse button.
   Notes:
     The shared first row dates from batch 153; the Narrow forms from batch 311.
     Every page's pane has a footer.
     The content is the page's.
*/

const STRINGS = {
  browse: 'Browse'
};
// the rail's items out of their fragments (the bar draws destinations, never dividers)
const railItems = rail => {
  const out = [];
  const walk = c => _react.default.Children.forEach(c, el => {
    if (! /*#__PURE__*/_react.default.isValidElement(el)) return;
    if (el.type === _react.default.Fragment) walk(el.props.children);else if (el.type !== _ToolRail.ToolRail.Divider) out.push(el);
  });
  walk(rail);
  return out;
};
// in the pane's screen (Narrow), choosing something to show takes the person to it
const CHOOSES = 'a[href], .plx-nav-list__item:not(.plx-nav-list__item--group), [role="treeitem"]';
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
  strings,
  className,
  children
}) {
  const layout = (0, _AppShell.useAppLayout)();
  const ref = _react.default.useRef(null);
  const t = Object.assign({}, STRINGS, strings);
  const Tag = as;
  const mode = layout && layout.hasSideNav ? layout.mode : 'static';
  const narrow = mode === 'bar' || mode === 'screen';
  const items = narrow ? railItems(rail) : [];
  // the parent row (Narrow, fewer than two destinations) tells the shell it is drawn, so a list-detail's Back joins it
  const rowed = narrow && items.length < 2 && !!(layout && layout.parentEl);
  const claimRow = layout ? layout.claimParentRow : null;
  _react.default.useLayoutEffect(() => rowed && claimRow ? claimRow() : undefined, [rowed, claimRow]);
  // the overlay and the screen are layers: Escape closes them
  (0, _layer.useLayer)(ref, mode === 'overlay' || mode === 'screen', {
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

  // Narrow: the bottom navigation bar (two or more destinations) or the parent row, put in the shell's slots
  let narrowEl = null;
  if (narrow) {
    const close = fn => e => {
      layout.close();
      if (fn) fn(e);
    };
    if (items.length >= 2) {
      narrowEl = layout.barEl ? /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("nav", {
        "aria-label": label || 'Navigation',
        className: "plx-nav-bar"
      }, /*#__PURE__*/_react.default.createElement(_ToolRail.BarContext.Provider, {
        value: true
      }, items.slice(0, 4).map((el, i) => /*#__PURE__*/_react.default.cloneElement(el, {
        key: el.key || i,
        pressed: mode === 'screen' ? false : el.props.pressed,
        onClick: close(el.props.onClick)
      })), /*#__PURE__*/_react.default.createElement(_ToolRail.ToolRail.Item, {
        icon: "menu-lines",
        label: t.browse,
        pressed: mode === 'screen',
        onClick: layout.toggle
      }))), layout.barEl) : null;
    } else if (layout.parentEl && mode === 'bar') {
      const back = layout.detailBack; // a list-detail's detail shows: the row is its Back
      narrowEl = /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement("div", {
        className: "plx-nav-pane-parent"
      }, back ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
        ref: back.ref,
        size: "sm",
        variant: "ghost",
        icon: "arrow-left",
        onClick: back.onBack
      }, back.label) : /*#__PURE__*/_react.default.createElement(_Button.Button, {
        size: "sm",
        variant: "ghost",
        icon: "arrow-left",
        onClick: layout.toggle
      }, title || label || t.browse)), layout.parentEl);
    }
    if (mode === 'bar') return narrowEl;
  }

  // a width only the page or the person knows (the width prop, or the splitter's) reaches the stylesheet as the pane's width token
  const w = mode === 'static' ? width : narrow ? null : layout.width;
  const paneWidth = w ? (0, _sizeSteps.snapSize)(parseInt(w, 10), (0, _AppShell.tokenPx)('--plx-sys-shell-nav-min-width'), (0, _AppShell.tokenPx)('--plx-sys-shell-nav-max-width')) + 'px' : undefined;
  const collapse = mode === 'static' || narrow ? null : /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-nav-pane__collapse', 'plx-nav-pane__collapse--' + collapseAt)
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    variant: "ghost",
    iconOnly: true,
    icon: "panel-left-close",
    label: "Collapse sidebar",
    onClick: layout.toggle
  }));
  const onChoose = narrow ? e => {
    if (e.target.closest && e.target.closest(CHOOSES)) layout.close();
  } : undefined;
  const pane = /*#__PURE__*/_react.default.createElement(Tag, {
    ref: ref,
    "aria-label": Tag === 'nav' ? label : undefined,
    className: (0, _cx.cx)('plx-nav-pane', mode !== 'static' && 'plx-nav-pane--' + mode, className),
    "data-plx-width": paneWidth
  }, title || actions || collapse ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__header"
  }, collapseAt === 'start' ? collapse : null, title ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-pane__title"
  }, title) : null, actions ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-nav-pane__actions"
  }, actions) : null, collapseAt !== 'start' ? collapse : null) : null, header ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__subheader"
  }, header) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-nav-pane__body",
    onClick: onChoose
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
  // Narrow: the pane is a screen over the main region, with the bar still below it
  if (mode === 'screen') return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, pane, narrowEl);
  // Medium: the rail stays in place; the expanded rail opens over the main region
  return mode === 'overlay' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, railEl, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-app-shell__scrim",
    "aria-hidden": "true",
    onMouseDown: layout.close
  }), pane) : pane;
}
  } },
  "platform/patterns/SettingsLayout/SettingsLayout.jsx": { deps: {"react":null,"../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../../providers/ScreenLocation.js":"platform/providers/ScreenLocation.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../NavPane/NavPane.jsx":"platform/patterns/NavPane/NavPane.jsx","../ActionBar/ActionBar.jsx":"platform/patterns/ActionBar/ActionBar.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
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
var _ScreenLocation = require("../../providers/ScreenLocation.js");
var _Icon = require("../../components/Icon/Icon.jsx");
var _NavPane = require("../NavPane/NavPane.jsx");
var _ActionBar = require("../ActionBar/ActionBar.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · SettingsLayout, SettingsSection, SettingsRow
   Summary: Navigation beside the settings form. SettingsSection is a card: a titled group of rows, static or collapsible;
     SettingsRow puts the label and description at the start and the control at the end.
   Usage:
     <SettingsLayout nav={<NavList…/>}>
       <SettingsSection title="Regional" description="…">
         <SettingsRow label="Date format" description="…">{control}</SettingsRow>
       </SettingsSection>
       <SettingsSection title="Advanced" collapsible defaultExpanded={false}>…</SettingsSection>
     </SettingsLayout>
   Props:
     nav: the navigation (a NavList), drawn in a NavPane beside the content
     className: more classes
     children: the settings sections
     SettingsSection.title: the section's heading (an h2 by default); it names the section landmark
     SettingsSection.description: a paragraph under the title
     SettingsSection.collapsible: true makes the header a toggle that shows and hides the rows (default false: static)
     SettingsSection.defaultExpanded: whether a collapsible section starts open when nothing is remembered (default true)
     SettingsSection.expanded: the open state when the parent controls it; onToggle(next) then runs on each press
     SettingsSection.onToggle(next): runs when a collapsible section opens or closes
     SettingsSection.stateKey: the name its open state is remembered under on this page (default the title); give one
       when two sections of the page share a title
     SettingsSection.remember: false keeps the open state for this visit only (default true)
     SettingsSection.actions: the form's buttons, drawn in an ActionBar under the rows (on the right, kept in view at the
       bottom while the page scrolls): the primary action last
     SettingsSection.headingLevel: the title's heading level (default 2); its size follows the level, as SectionHeading's
       (level 2 13px, level 3 11px, level 4 10px)
     SettingsSection.strings: the words it announces, for other languages: { section: "section" } (the actions' name)
     SettingsSection.className: more classes
     SettingsSection.children: the rows
     SettingsRow.label: the row's label, at the start
     SettingsRow.description: a line under the label
     SettingsRow.htmlFor: the control's id, so the label is a label element for it
     SettingsRow.className: more classes
     SettingsRow.children: the control, at the end
   Behavior:
     Every section is a card (owner, 2026-10-13: "all the settings pages to have the cards view"): static, or collapsible.
     A collapsible section's whole header is one button inside the heading (the disclosure pattern): Enter or Space, or a
       click anywhere on the title row, opens and closes it; aria-expanded tells its state and aria-controls names the
       body. Its open state is remembered per page and section in the page's view state (useViewState,
       plenix.<page>-settings.view), so the page opens as the person left it; a parent that controls it (expanded) keeps
       it instead.
     Each row is divided from the next.
     On a narrow layout the navigation stacks above the content.
     It is a settings page: inside an AppShell it claims the page kind "settings", so the layout standard lays it out
       (contained: one centered column at the form width).
   Notes:
     Fields (layout="inline" or "row") can be rows too.
     Give the control the row's label as its own accessible name, or htmlFor with the control's id.
     A section with no title is a static card (a collapsible one needs a title to press).
*/

const SECTION_STRINGS = {
  section: 'section'
};
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

// the view state a page's section states are kept in: its file ("settings-system-settings"), or its folder for an index
// page ("settings-settings")
function pageOf() {
  if (typeof location === 'undefined') return 'page-settings';
  const parts = location.pathname.split('/').filter(Boolean);
  let last = parts.pop() || 'page';
  if (/^index\.html?$/.test(last)) last = parts.pop() || 'page';
  return last.replace(/\.html?$/, '') + '-settings';
}

// the open state of a collapsible section: controlled (expanded), or its own, remembered in the page's view state
function useOpen(collapsible, defaultExpanded, expanded, onToggle, key, remember) {
  const page = _react.default.useMemo(pageOf, []);
  const [view, update] = (0, _ScreenLocation.useViewState)(page);
  const kept = remember && key && view.sections ? view.sections[key] : undefined;
  const [own, setOwn] = _react.default.useState(typeof kept === 'boolean' ? kept : defaultExpanded);
  const open = !collapsible || (expanded === undefined ? own : expanded);
  const toggle = () => {
    const next = !open;
    if (expanded === undefined) setOwn(next);
    // the stored map is read afresh, so the sections of one page never overwrite each other's state
    if (remember && key) update(() => ({
      sections: Object.assign({}, (0, _ScreenLocation.readView)(page).sections, {
        [key]: next
      })
    }));
    if (onToggle) onToggle(next);
  };
  return [open, toggle];
}
function SettingsSection({
  title,
  description,
  collapsible = false,
  defaultExpanded = true,
  expanded,
  onToggle,
  stateKey,
  remember = true,
  actions,
  headingLevel = 2,
  strings,
  className,
  children
}) {
  const t = Object.assign({}, SECTION_STRINGS, strings);
  const id = (0, _layer.useUid)('plx-set');
  const canCollapse = !!(collapsible && title);
  const [open, toggle] = useOpen(canCollapse, defaultExpanded, expanded, onToggle, stateKey || (typeof title === 'string' ? title : null), remember);
  const H = 'h' + headingLevel;
  const descId = description ? id + '-d' : undefined;
  return /*#__PURE__*/_react.default.createElement("section", {
    "aria-labelledby": title ? id : undefined,
    className: (0, _cx.cx)('plx-settings__section', canCollapse && 'plx-settings__section--collapsible', canCollapse && !open && 'is-collapsed', className)
  }, title || description ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__section-header"
  }, title ? /*#__PURE__*/_react.default.createElement(H, {
    className: (0, _cx.cx)('plx-settings__section-title', headingLevel !== 2 && 'plx-settings__section-title--level-' + headingLevel)
  }, canCollapse ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    id: id,
    className: "plx-settings__section-toggle",
    "aria-expanded": open,
    "aria-controls": id + '-body',
    "aria-describedby": descId,
    onClick: toggle
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-settings__section-label"
  }, title), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-down",
    className: "plx-settings__section-chevron"
  })) : /*#__PURE__*/_react.default.createElement("span", {
    id: id
  }, title)) : null, description ? /*#__PURE__*/_react.default.createElement("p", {
    id: descId,
    className: "plx-settings__section-description"
  }, description) : null) : null, /*#__PURE__*/_react.default.createElement("div", {
    id: id + '-body',
    hidden: !open,
    className: "plx-settings__section-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__rows"
  }, children), actions ? /*#__PURE__*/_react.default.createElement(_ActionBar.ActionBar, {
    label: (typeof title === 'string' ? title : t.section) + ': actions'
  }, actions) : null));
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
  "platform/patterns/SidePanel/SidePanel.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/layer.js":"platform/utils/layer.js","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Sheet/Sheet.jsx":"platform/components/Sheet/Sheet.jsx","../ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","../../utils/sizeSteps.js":"platform/utils/sizeSteps.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
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
var _Sheet = require("../../components/Sheet/Sheet.jsx");
var _ToolRail = require("../ToolRail/ToolRail.jsx");
var _AppShell = require("../AppShell/AppShell.jsx");
var _sizeSteps = require("../../utils/sizeSteps.js");
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
     The footer's actions sit at its end, the primary action last (the Action bar rule; owner, batch 272).
     Tabs inside a side panel use the Folder variant (the tab strip alone): the panel is already the frame (owner, batch 272).
     Width: --plx-sys-panel-inspector-width (by density: 320 / 360 / 400px), docked.
     Its own Collapse button starts its header row; collapsed, it is a rail with Expand.
     Below 1024px Expand opens it over the main region, between the header and the footer; Escape or a click outside closes it.
     At Narrow (under 600px, --plx-sys-shell-phone-below) Expand opens it as a bottom sheet (Sheet, form="bottom"): its title,
       icon and actions in the sheet's header with Close, its body, its footer pinned below (Platforms Standard 5.2
       Supporting pane, 6.5 Sheet and inspector); Escape, Close or a click on the scrim closes it.
     When the window becomes that small, an open docked panel collapses to its rail.
   Notes:
     Not every capability has one; it shows only where it is given.
     Without onOpenChange it cannot close, so at Narrow it stays the overlay rather than a sheet nobody can dismiss.
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
  const narrow = (0, _AppShell.useMedia)((0, _AppShell.below)('--plx-sys-shell-phone-below'));
  const ref = _react.default.useRef(null);
  const set = next => {
    if (onOpenChange) onOpenChange(next);
  };
  // at Narrow the panel is a bottom sheet (when it can be closed): the Sheet is the layer then
  const sheet = narrow && !!onOpenChange;
  (0, _layer.useLayer)(ref, open && small && !sheet, {
    onEscape: () => set(false)
  });
  // entering a small window: the docked panel would cover the main region, so it collapses to its rail
  // (only on the change: a panel opened in a small window, a file chosen on a phone, stays open)
  const wasSmall = _react.default.useRef(small);
  _react.default.useEffect(() => {
    if (small && !wasSmall.current && open) set(false);
    wasSmall.current = small;
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
  if (sheet) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, railEl, /*#__PURE__*/_react.default.createElement(_Sheet.Sheet, {
      open: true,
      form: "bottom",
      title: title,
      icon: icon,
      actions: actions,
      footer: footer,
      closeLabel: collapseLabel || 'Close panel',
      onClose: () => set(false),
      className: className
    }, children));
  }
  const pane = /*#__PURE__*/_react.default.createElement("aside", {
    ref: ref,
    "aria-label": name,
    className: (0, _cx.cx)('plx-side-panel', small && 'plx-side-panel--overlay', docked && 'plx-side-panel--resizable', docked && size && 'plx-side-panel--resized', className),
    "data-plx-width": docked && size ? (0, _sizeSteps.snapSize)(size, (0, _AppShell.tokenPx)('--plx-comp-side-panel-width-min'), (0, _AppShell.tokenPx)('--plx-comp-side-panel-width-max')) + 'px' : undefined
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
  "platform/patterns/SecondaryPane/SecondaryPane.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","../AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","../../utils/layer.js":"platform/utils/layer.js","../../utils/sizeSteps.js":"platform/utils/sizeSteps.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
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
var _layer = require("../../utils/layer.js");
var _sizeSteps = require("../../utils/sizeSteps.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · SecondaryPane
   Summary: A narrow pane beside the main content, inside the main region (under the header, beside the navigation pane):
     the asset browser's Files pane, the spec's "On this page", a project's capabilities. It can collapse to a rail and be
     resized by dragging its edge.
   Usage:
     <SecondaryPane title="Files" icon="folder-open" actions={…} side="start" width="md">…</SecondaryPane>
     <SecondaryPane title="Kitchen Renovation" collapsible resizable rail={<><ToolRail.Item … /></>}>…</SecondaryPane>
     <div className="plx-page-panes">
       <SecondaryPane title="Notes" detailOpen={!!note} onBack={() => loc.parent('/')}>{the list}</SecondaryPane>
       <PageContent>{the open note}</PageContent>
     </div>
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
     size / onSizeChange(px): the dragged width, controlled (an application keeps it between visits, useViewState);
       defaultSize: the first dragged width when not controlled
     detailOpen: the pane is the list of a list-detail screen (Platforms Standard 5.2): true while an item's detail shows
       beside it. At Narrow (under 600px, --plx-sys-shell-phone-below) one pane shows at a time: the list fills the
       width while detailOpen is false; while it is true the list steps aside and a Back control leads the detail
     onBack(): the Back control's action at Narrow (the detail's parent, the list: useScreenLocation's parent('/'))
     scrollTop / onScrollChange(top): the body's scroll position, to restore it (on load and when the list comes back
       at Narrow) and to keep it
     className: more classes
     children: the body
     strings: the words it announces, for other languages: { expand: "Expand {name}", collapse: "Collapse {name}", resize:
       "Resize {name}", close: "Close {name}", back: "Back to {name}" } ({name} is the label, or the title)
   Behavior:
     The body scrolls on its own while the content scrolls beside it.
     The resize edge is a separator (role="separator", aria-valuenow); Arrow Left / Right move the edge, mirrored in a
     right-to-left page (as is dragging); Home and End jump to the smallest and largest width;
     Enter or a double click folds the pane when it is collapsible.
     List-detail at Narrow (with detailOpen): the list fills the main region and the panes beside it are hidden; choosing
       an item opens its detail (the application gives it an address and a history entry, so the browser's Back returns
       to the list), the list steps aside (it stays mounted: its state and scroll position are kept) and a bar with
       "Back to {name}" leads the detail; focus moves to it. Where the shell draws a parent row (NavPane at Narrow
       without a bottom navigation bar), that row becomes the Back and the pane draws no bar of its own: one back
       control. Back brings the list back with focus on the item that was chosen. The application shows no selection in the list at Narrow (useAppLayout().narrow). The pane does not fold
       or resize at Narrow.
   Notes:
     It has the page surface, a divider on its content side, a header row (icon, title, actions) and a body.
     A dragged width reaches the stylesheet as --plx-comp-secondary-pane-width (no style is written).
     Other props go on its aside element.
*/
const STRINGS = {
  expand: 'Expand {name}',
  collapse: 'Collapse {name}',
  resize: 'Resize {name}',
  close: 'Close {name}',
  back: 'Back to {name}'
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
  size: sizeProp,
  defaultSize = null,
  onSizeChange,
  detailOpen,
  onBack,
  scrollTop,
  onScrollChange,
  onClose,
  strings,
  className,
  children,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings);
  const [ownCollapsed, setOwnCollapsed] = _react.default.useState(defaultCollapsed);
  const narrow = (0, _AppShell.useMedia)((0, _AppShell.below)('--plx-sys-shell-phone-below'));
  const listDetail = detailOpen !== undefined;
  const stepAside = narrow && listDetail && !!detailOpen; // at Narrow the detail shows alone, led by the Back bar
  const folded = collapsible && !(narrow && listDetail) && (collapsed !== undefined ? collapsed : ownCollapsed);
  const setFolded = next => {
    if (collapsed === undefined) setOwnCollapsed(next);
    if (onCollapsedChange) onCollapsedChange(next);
  };
  const [ownSize, setOwnSize] = _react.default.useState(defaultSize);
  const size = sizeProp !== undefined ? sizeProp : ownSize;
  const setSize = w => {
    if (sizeProp === undefined) setOwnSize(w);
    if (onSizeChange) onSizeChange(w);
  };
  const name = label || title;
  const named = s => s.split('{name}').join(name);
  // the body's scroll position: restored when the body appears (on load, and when the list comes back at Narrow)
  const body = _react.default.useRef(null);
  const top = _react.default.useRef(scrollTop || 0);
  const frame = _react.default.useRef(0);
  const onScroll = e => {
    top.current = e.currentTarget.scrollTop;
    if (onScrollChange && !frame.current) frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      onScrollChange(top.current);
    });
  };
  _react.default.useLayoutEffect(() => {
    if (body.current && !stepAside && top.current) body.current.scrollTop = top.current;
  }, [stepAside, folded]);
  // the Back control: the shell's parent row when there is one (one back control at Narrow), else the pane's own bar
  const layout = (0, _AppShell.useAppLayout)();
  const back = _react.default.useRef(null);
  const backAction = _react.default.useRef(onBack);
  backAction.current = onBack;
  const backLabel = named(t.back);
  const claimBack = layout ? layout.claimBack : null;
  _react.default.useLayoutEffect(() => stepAside && claimBack ? claimBack({
    label: backLabel,
    onBack: e => {
      if (backAction.current) backAction.current(e);
    },
    ref: back
  }) : undefined, [stepAside, backLabel, claimBack]);
  const ownBar = stepAside && !(layout && layout.parentRow);
  // focus: to the Back control when the detail opens at Narrow; back to the chosen item when the list returns
  const chosen = _react.default.useRef(-1);
  const was = _react.default.useRef(stepAside);
  _react.default.useEffect(() => {
    if (was.current === stepAside) return;
    was.current = stepAside;
    if (stepAside) {
      // the shell's row takes the control a moment later (its own render): focus it once it is there
      const go = () => {
        if (back.current) back.current.focus();
      };
      if (back.current) go();else requestAnimationFrame(go);
      return;
    }
    const items = body.current ? (0, _layer.focusables)(body.current) : [];
    const item = items[chosen.current] || items[0];
    // the Back control took focus with it, or focus stayed on the shell's row (which is now the way to the pane)
    const ae = document.activeElement;
    const lost = !ae || ae === document.body || !!(layout && layout.parentEl && layout.parentEl.contains(ae));
    if (item && lost) item.focus();
  }, [stepAside]);
  const onBodyClick = e => {
    const items = body.current ? (0, _layer.focusables)(body.current) : [];
    chosen.current = items.findIndex(x => x === e.target || x.contains(e.target));
  };
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
  const sized = size && !(narrow && listDetail);
  const pane = /*#__PURE__*/_react.default.createElement("aside", _extends({
    "aria-label": name,
    className: (0, _cx.cx)('plx-secondary-pane', 'plx-secondary-pane--' + side, 'plx-secondary-pane--' + width, sized && 'plx-secondary-pane--resized', narrow && listDetail && (stepAside ? 'plx-secondary-pane--aside' : 'plx-secondary-pane--list'), className),
    "data-plx-width": sized ? (0, _sizeSteps.snapSize)(size, min(), max()) + 'px' : undefined
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
    ref: body,
    className: "plx-secondary-pane__body",
    onScroll: onScroll,
    onClick: listDetail ? onBodyClick : undefined
  }, children), resizable && !(narrow && listDetail) ? /*#__PURE__*/_react.default.createElement(_AppShell.PanelSplitter, {
    label: named(t.resize),
    edge: side === 'start' ? 'end' : 'start',
    min: min(),
    max: max,
    value: size || (0, _AppShell.tokenPx)('--plx-comp-secondary-pane-width-' + width) || min(),
    onChange: setSize,
    onCollapse: collapsible ? () => setFolded(true) : undefined
  }) : null);
  // at Narrow with the detail open: the list stays mounted (hidden) and the Back bar leads the detail (unless the shell's
  // parent row is the Back)
  return ownBar ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, pane, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-secondary-pane-back"
  }, /*#__PURE__*/_react.default.createElement(_Button.Button, {
    ref: back,
    size: "sm",
    variant: "ghost",
    icon: "arrow-left",
    onClick: onBack
  }, backLabel))) : pane;
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
  "platform/patterns/WidgetGrid/WidgetGrid.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../../components/VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx","../../utils/direction.js":"platform/utils/direction.js","../../components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
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
var _Menu = require("../../components/Menu/Menu.jsx");
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
       (arrow keys)", position: "{title}, position {index} of {total}", earlier: "Move earlier", later: "Move later",
       first: "Move to the start", last: "Move to the end" } (widget and widgetLower stand in for a widget without a
       title, in the announcement and in the handle's name)
   Behavior:
     Drag and drop (batch 271): the handle shows the grab cursor, grabbing while held or while its widget moves.
     Each widget gets a handle (a button) when the grid can be reordered: drag it onto another widget to place it there;
     or focus it and press Arrow Up (earlier) or Arrow Down (later); Arrow Left / Right follow reading order (in a
     right-to-left page Arrow Right is earlier).
     Without dragging (WCAG 2.5.7): a click on the handle (or Enter or Space) opens its menu: Move earlier, Move later,
     Move to the start and Move to the end (the ones that cannot move are disabled).
     While dragging, the widget under the pointer shows the drop ring.
     The new place is announced ("Site visits, position 2 of 6").
   Notes:
     The grid never changes the order by itself: onReorder hands the new order to the page, which keeps it.
*/
const STRINGS = {
  widget: 'Widget',
  widgetLower: 'widget',
  move: 'Move {title} (arrow keys)',
  position: '{title}, position {index} of {total}',
  earlier: 'Move earlier',
  later: 'Move later',
  first: 'Move to the start',
  last: 'Move to the end'
};
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => k in vars ? String(vars[k]) : m);
const move = (ids, from, to) => {
  const next = ids.slice();
  const [x] = next.splice(from, 1);
  next.splice(to, 0, x);
  return next;
};

// the handle: a menu button (Menu gives it the click, Enter and Space) whose arrow keys move the widget instead of
// opening the menu, so the keys keep their meaning on the handle
const Handle = /*#__PURE__*/_react.default.forwardRef(function Handle({
  onStep,
  onKeyDown,
  expanded,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement("button", _extends({
    ref: ref,
    type: "button"
  }, rest, {
    onKeyDown: e => {
      const step = (0, _direction.arrowStep)(e, e.currentTarget);
      if (step) {
        e.preventDefault();
        onStep(step);
        return;
      }
      if (onKeyDown) onKeyDown(e);
    }
  }));
});
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
    const handle = onReorder ? /*#__PURE__*/_react.default.createElement(_Menu.Menu, {
      label: fill(t.move, {
        title: it.title || t.widgetLower
      }),
      placement: "bottom-end",
      className: (0, _cx.cx)('plx-widget-grid__menu', renderItem && renderItem.length > 1 && 'plx-widget-grid__menu--inline'),
      trigger: /*#__PURE__*/_react.default.createElement(Handle, {
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
        onStep: step => place(i, i + step)
      }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
        name: "drag",
        size: "md"
      }))
    }, /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
      disabled: i === 0,
      onSelect: () => place(i, i - 1)
    }, t.earlier), /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
      disabled: i === items.length - 1,
      onSelect: () => place(i, i + 1)
    }, t.later), /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
      disabled: i === 0,
      onSelect: () => place(i, 0)
    }, t.first), /*#__PURE__*/_react.default.createElement(_Menu.MenuItem, {
      disabled: i === items.length - 1,
      onSelect: () => place(i, items.length - 1)
    }, t.last)) : null;
    return renderItem && renderItem.length > 1 ? renderItem(it, handle) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, handle, renderItem ? renderItem(it) : null);
  })()))), /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, {
    role: "status"
  }, said));
}
  } },
  "platform/patterns/ImageEditor/imageEditorSteps.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IMAGE_EDITOR_STEPS = void 0;
/* Plenix · IMAGE_EDITOR_STEPS
   Summary: The steps of the image editor, GENERATED by build-steps.js from image-editor.steps.json (do not edit): presets, crop ratios,
     fonts, slider ranges, the zoom and overlay steps. The picture is drawn from them by system/steps.css.
   Usage:
     import { IMAGE_EDITOR_STEPS } from 'plenix-platform';
   Props:
     none: the steps file as an object
*/
const IMAGE_EDITOR_STEPS = exports.IMAGE_EDITOR_STEPS = {
  "$description": "The image editor's steps (batch 282, Strict DS step 5): every value an edit can take, so the picture is drawn by generated rules (system/steps.css, build-steps.js) from attributes, never a style. The page reads the same file for its controls.",
  "step": 5,
  "zoom": {
    "base": 1.25,
    "min": -6,
    "max": 6
  },
  "sliders": [{
    "key": "brightness",
    "label": "Brightness",
    "min": -100,
    "max": 100,
    "unit": "%"
  }, {
    "key": "contrast",
    "label": "Contrast",
    "min": -100,
    "max": 100,
    "unit": "%"
  }, {
    "key": "saturation",
    "label": "Saturation",
    "min": -100,
    "max": 100,
    "unit": "%"
  }, {
    "key": "hueRotation",
    "label": "Hue rotation",
    "min": 0,
    "max": 360,
    "unit": ""
  }, {
    "key": "vibrance",
    "label": "Vibrance",
    "min": -100,
    "max": 100,
    "unit": ""
  }, {
    "key": "blur",
    "label": "Blur",
    "min": 0,
    "max": 20,
    "unit": "",
    "step": 1
  }, {
    "key": "noise",
    "label": "Noise",
    "min": 0,
    "max": 100,
    "unit": ""
  }, {
    "key": "pixelate",
    "label": "Pixelate",
    "min": 0,
    "max": 50,
    "unit": ""
  }],
  "saturate": {
    "min": -40,
    "max": 100,
    "per": 40
  },
  "presets": [{
    "id": "grayscale",
    "label": "Grayscale",
    "filter": "grayscale(1)"
  }, {
    "id": "black-white",
    "label": "Black&White",
    "filter": "grayscale(1) contrast(1.6)"
  }, {
    "id": "sepia",
    "label": "Sepia",
    "filter": "sepia(1)"
  }, {
    "id": "vintage",
    "label": "Vintage",
    "filter": "sepia(0.5) contrast(0.9) brightness(1.05) saturate(0.85)"
  }, {
    "id": "polaroid",
    "label": "Polaroid",
    "filter": "contrast(1.1) brightness(1.1) saturate(1.2) sepia(0.15)"
  }, {
    "id": "kodachrome",
    "label": "Kodachrome",
    "filter": "contrast(1.25) saturate(1.3) sepia(0.12)"
  }, {
    "id": "technicolor",
    "label": "Technicolor",
    "filter": "saturate(1.8) contrast(1.15) hue-rotate(-10deg)"
  }, {
    "id": "brownie",
    "label": "Brownie",
    "filter": "sepia(0.6) contrast(1.1) brightness(0.95)"
  }, {
    "id": "lomo",
    "label": "Lomo",
    "filter": "contrast(1.3) saturate(1.2) brightness(0.95)"
  }, {
    "id": "invert",
    "label": "Invert",
    "filter": "invert(1)"
  }],
  "ratios": [{
    "id": "1-1",
    "label": "1:1 (Square)",
    "value": "1 / 1"
  }, {
    "id": "16-9",
    "label": "16:9",
    "value": "16 / 9"
  }, {
    "id": "9-16",
    "label": "9:16",
    "value": "9 / 16"
  }, {
    "id": "4-3",
    "label": "4:3",
    "value": "4 / 3"
  }, {
    "id": "3-4",
    "label": "3:4",
    "value": "3 / 4"
  }, {
    "id": "2-1",
    "label": "2:1",
    "value": "2 / 1"
  }, {
    "id": "1-2",
    "label": "1:2",
    "value": "1 / 2"
  }],
  "fonts": ["Lato", "Arvo", "Caveat", "Corinthia", "DancingScript", "KodeMono", "MadimiOne", "MajorMonoDisplay", "Montserrat", "OpenSans"],
  "textTop": {
    "min": 0,
    "max": 95
  },
  "overlay": {
    "opacity": {
      "min": 0,
      "max": 100
    },
    "scale": {
      "min": 10,
      "max": 300,
      "step": 10
    }
  }
};
  } },
  "platform/utils/format.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORMATS = void 0;
exports.dateTimeAttr = dateTimeAttr;
exports.formatAddress = formatAddress;
exports.formatBytes = formatBytes;
exports.formatCompact = formatCompact;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatDuration = formatDuration;
exports.formatList = formatList;
exports.formatLocale = formatLocale;
exports.formatNumber = formatNumber;
exports.formatPercent = formatPercent;
exports.formatPersonName = formatPersonName;
exports.formatPhone = formatPhone;
exports.formatRange = formatRange;
exports.formatRelative = formatRelative;
exports.formatTime = formatTime;
exports.formatUnit = formatUnit;
exports.regionName = regionName;
/* Plenix · Formatting (platform/utils/format.js)
   Summary: Numbers, units, dates, times, money, percentages, names, addresses and phone numbers written the same way on
     every page, in the reader's locale, on the browser's Intl formatters (NumberFormat, DateTimeFormat,
     RelativeTimeFormat, ListFormat, DisplayNames). The rules (precision, when relative time ends, address layouts, phone
     groupings) are the Formats standard, platform/standards/formats.json; FORMATS below is the same data (the format test
     keeps the two equal).
   Usage:
     formatNumber(1234.5)                         // "1,234.5"
     formatBytes(1200000)                         // "1.2 MB"
     formatCompact(1234)                          // "1.2K"
     formatDate(date, { dateStyle: 'long' })          // "March 4, 2026"
     formatRelative(date)                         // "5 minutes ago" (an absolute date after 7 days)
     formatCurrency(12.5, 'EUR')                  // "€12.50"
     formatPercent(0.256)                         // "26%"
     formatPhone('+14155550123')                  // "+1 415 555 0123"
   Props:
     every function takes an options object last; options.locale overrides the reader's locale (formatLocale())
     formatLocale(): the page's language (<html lang>), else the browser's, else "en-US"
     formatNumber(value, { decimals, signed }): a plain number; decimals fixes the precision (keep it the same in a column)
     formatUnit(value, unit, { display, decimals }): a measurement with an Intl unit ("kilometer", "celsius", "megabyte");
       display "short" (default), "long" or "narrow"
     formatBytes(bytes, { decimals }): a file size in B, kB, MB, GB or TB (powers of 1000)
     formatDuration(seconds, { display }): "1 hr, 5 min" (display "short", default), "1 hour, 5 minutes" ("long") or "1:05:00" ("clock")
     formatCompact(value, { decimals }): "1.2K", "3.4M": only where space is tight, with the full value beside it (title, tooltip)
     formatDate(date, { dateStyle, timeZone }): dateStyle "short" ("Mar 4"; the year when it is not this year), "medium"
       ("Mar 4, 2026", default), "long" ("March 4, 2026") or "full" ("Wednesday, March 4, 2026")
     formatTime(date, { seconds, timeZone, timeZoneName }): "2:05 PM"; timeZoneName "short" adds the zone ("2:05 PM PST")
     formatDateTime(date, { dateStyle, timeZone, timeZoneName }): the date (medium) and the time together
     formatRelative(date, { now, untilDays }): "5 minutes ago", "in 2 days", "yesterday"; after untilDays (FORMATS) the date
     formatRange(from, to, { kind, dateStyle }): two dates ("Mar 4 – 6, 2026", kind "date", default) or numbers ("3–5", kind "number")
     formatCurrency(amount, currency, { display, decimals, signed }): money in an ISO 4217 currency ("USD"); display
       "symbol" (default, "$12.50") or "code" ("USD 12.50", for pages that mix currencies)
     formatPercent(ratio, { decimals, signed }): a ratio as a percentage, 0.256 → "26%" (signed: "+3%", for changes)
     formatList(items, { type }): "A, B, and C"; type "conjunction" (default), "disjunction" ("A, B, or C") or "unit"
     formatPersonName(person, { display }): a name as the person wrote it; person is a string or { full, preferred };
       display "full" (default), "preferred" (the preferred name, else the full one) or "initials"
     formatAddress(address, { country, includeCountry }): the lines of a postal address in its country's order; address
       is { name, organization, street (a string or lines), locality, region, postalCode, country (ISO 3166 code) }
     regionName(code): a country's name in the reader's language ("DE" → "Germany")
     formatPhone(e164, { display }):a phone number stored as E.164 ("+14155550123"), "international" (default) or
       "national" ("(415) 555-0123")
     dateTimeAttr(date): the machine-readable value for <time dateTime={…}>
     FORMATS: the standard's data (see platform/standards/formats.json)
   Behavior:
     Nothing is cached per locale beyond the Intl formatter objects; every call reads the locale unless one is given.
     A value that is not a finite number or a valid date comes back as an empty string, never "NaN" or "Invalid Date".
   Notes:
     Never build a separator, a symbol position or a date order by hand: these functions are the only place they are made.
     Phone numbers and addresses follow FORMATS for the countries it lists; others fall back to a neutral layout.
*/

// The Formats standard (platform/standards/formats.json): edit both together; the format test compares them.
const FORMATS = exports.FORMATS = {
  number: {
    decimals: {
      default: 0,
      ratio: 0,
      compact: 1,
      bytes: 1
    }
  },
  bytes: {
    base: 1000,
    units: ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']
  },
  relative: {
    untilDays: 7
  },
  currency: {
    display: 'symbol',
    mixedDisplay: 'code'
  },
  date: {
    default: 'medium'
  },
  address: {
    default: ['name', 'organization', 'street', 'locality region postalCode', 'country'],
    US: ['name', 'organization', 'street', 'locality, region postalCode', 'country'],
    CA: ['name', 'organization', 'street', 'locality region postalCode', 'country'],
    GB: ['name', 'organization', 'street', 'locality', 'postalCode', 'country'],
    DE: ['name', 'organization', 'street', 'postalCode locality', 'country'],
    FR: ['name', 'organization', 'street', 'postalCode locality', 'country'],
    IT: ['name', 'organization', 'street', 'postalCode locality region', 'country'],
    JP: ['country', 'postalCode', 'region locality', 'street', 'organization', 'name']
  },
  phone: {
    '1': {
      national: '(###) ###-####',
      international: '+1 ### ### ####'
    },
    '33': {
      national: '0# ## ## ## ##',
      international: '+33 # ## ## ## ##'
    },
    '44': {
      national: '0#### ######',
      international: '+44 #### ######'
    },
    '49': {
      national: '0### #######',
      international: '+49 ### #######'
    },
    '61': {
      national: '0# #### ####',
      international: '+61 # #### ####'
    }
  }
};
const ok = n => typeof n === 'number' && isFinite(n);
const toDate = d => {
  const x = d instanceof Date ? d : new Date(d);
  return isNaN(x.getTime()) ? null : x;
};
function formatLocale() {
  const lang = typeof document !== 'undefined' && document.documentElement && document.documentElement.getAttribute('lang');
  if (lang) return lang;
  if (typeof navigator !== 'undefined' && navigator.language) return navigator.language;
  return 'en-US';
}
const loc = o => o && o.locale || formatLocale();
const digits = d => d === undefined ? {} : {
  minimumFractionDigits: d,
  maximumFractionDigits: d
};
function formatNumber(value, o = {}) {
  if (!ok(value)) return '';
  return new Intl.NumberFormat(loc(o), {
    ...digits(o.decimals),
    signDisplay: o.signed ? 'exceptZero' : 'auto'
  }).format(value);
}
function formatUnit(value, unit, o = {}) {
  if (!ok(value)) return '';
  return new Intl.NumberFormat(loc(o), {
    style: 'unit',
    unit,
    unitDisplay: o.display || 'short',
    ...digits(o.decimals)
  }).format(value);
}
function formatBytes(bytes, o = {}) {
  if (!ok(bytes)) return '';
  const {
    base,
    units
  } = FORMATS.bytes;
  let i = 0,
    v = Math.abs(bytes);
  while (v >= base && i < units.length - 1) {
    v /= base;
    i++;
  }
  const d = o.decimals !== undefined ? o.decimals : i === 0 ? 0 : FORMATS.number.decimals.bytes;
  return new Intl.NumberFormat(loc(o), {
    style: 'unit',
    unit: units[i],
    unitDisplay: 'short',
    maximumFractionDigits: d
  }).format(Math.sign(bytes) * v);
}
function formatDuration(seconds, o = {}) {
  if (!ok(seconds)) return '';
  const s = Math.round(Math.abs(seconds)),
    h = Math.floor(s / 3600),
    m = Math.floor(s % 3600 / 60),
    r = s % 60;
  if (o.display === 'clock') {
    const two = n => String(n).padStart(2, '0');
    return (seconds < 0 ? '-' : '') + (h ? h + ':' + two(m) : String(m)) + ':' + two(r);
  }
  const display = o.display === 'long' ? 'long' : 'short';
  const parts = [[h, 'hour'], [m, 'minute'], [r, 'second']].filter(([n], i, all) => n || i === 2 && !all[0][0] && !all[1][0]);
  return formatList(parts.map(([n, unit]) => formatUnit(n, unit, {
    locale: o.locale,
    display
  })), {
    locale: o.locale,
    type: 'unit'
  });
}
function formatCompact(value, o = {}) {
  if (!ok(value)) return '';
  return new Intl.NumberFormat(loc(o), {
    notation: 'compact',
    maximumFractionDigits: o.decimals !== undefined ? o.decimals : FORMATS.number.decimals.compact
  }).format(value);
}
const DATE_STYLES = {
  medium: {
    dateStyle: 'medium'
  },
  long: {
    dateStyle: 'long'
  },
  full: {
    dateStyle: 'full'
  }
};
function formatDate(date, o = {}) {
  const d = toDate(date);
  if (!d) return '';
  const style = o.dateStyle || FORMATS.date.default;
  if (style === 'short') {
    const thisYear = d.getFullYear() === new Date().getFullYear();
    return new Intl.DateTimeFormat(loc(o), {
      month: 'short',
      day: 'numeric',
      year: thisYear ? undefined : 'numeric',
      timeZone: o.timeZone
    }).format(d);
  }
  return new Intl.DateTimeFormat(loc(o), {
    ...(DATE_STYLES[style] || DATE_STYLES.medium),
    timeZone: o.timeZone
  }).format(d);
}
function formatTime(date, o = {}) {
  const d = toDate(date);
  if (!d) return '';
  return new Intl.DateTimeFormat(loc(o), {
    hour: 'numeric',
    minute: '2-digit',
    second: o.seconds ? '2-digit' : undefined,
    timeZone: o.timeZone,
    timeZoneName: o.timeZoneName
  }).format(d);
}
function formatDateTime(date, o = {}) {
  const d = toDate(date);
  if (!d) return '';
  const style = o.dateStyle && DATE_STYLES[o.dateStyle] ? o.dateStyle : FORMATS.date.default;
  if (o.timeZoneName) return new Intl.DateTimeFormat(loc(o), {
    ...(style === 'medium' ? {
      month: 'short'
    } : {
      month: 'long'
    }),
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: o.timeZone,
    timeZoneName: o.timeZoneName
  }).format(d);
  return new Intl.DateTimeFormat(loc(o), {
    dateStyle: style,
    timeStyle: 'short',
    timeZone: o.timeZone
  }).format(d);
}
const STEPS = [['second', 60], ['minute', 60], ['hour', 24], ['day', 7]];
function formatRelative(date, o = {}) {
  const d = toDate(date);
  if (!d) return '';
  const now = toDate(o.now || Date.now());
  const until = o.untilDays !== undefined ? o.untilDays : FORMATS.relative.untilDays;
  let diff = (d.getTime() - now.getTime()) / 1000;
  if (Math.abs(diff) >= until * 86400) return formatDate(d, {
    locale: o.locale,
    dateStyle: 'medium',
    timeZone: o.timeZone
  });
  const rtf = new Intl.RelativeTimeFormat(loc(o), {
    numeric: 'auto'
  });
  for (const [unit, size] of STEPS) {
    if (Math.abs(diff) < size || unit === 'day') return rtf.format(Math.round(diff), unit);
    diff /= size;
  }
  return '';
}
function formatRange(from, to, o = {}) {
  if (o.kind === 'number') {
    if (!ok(from) || !ok(to)) return '';
    return new Intl.NumberFormat(loc(o), digits(o.decimals)).formatRange(from, to);
  }
  const a = toDate(from),
    b = toDate(to);
  if (!a || !b) return '';
  return new Intl.DateTimeFormat(loc(o), {
    ...(DATE_STYLES[o.dateStyle] || DATE_STYLES.medium),
    timeZone: o.timeZone
  }).formatRange(a, b);
}
function formatCurrency(amount, currency, o = {}) {
  if (!ok(amount) || !currency) return '';
  return new Intl.NumberFormat(loc(o), {
    style: 'currency',
    currency,
    currencyDisplay: o.display || FORMATS.currency.display,
    ...digits(o.decimals),
    signDisplay: o.signed ? 'exceptZero' : 'auto'
  }).format(amount);
}
function formatPercent(ratio, o = {}) {
  if (!ok(ratio)) return '';
  const d = o.decimals !== undefined ? o.decimals : FORMATS.number.decimals.ratio;
  return new Intl.NumberFormat(loc(o), {
    style: 'percent',
    ...digits(d),
    signDisplay: o.signed ? 'exceptZero' : 'auto'
  }).format(ratio);
}
function formatList(items, o = {}) {
  const list = (items || []).filter(x => x !== undefined && x !== null && x !== '').map(String);
  return new Intl.ListFormat(loc(o), o.type === 'unit' ? {
    type: 'unit',
    style: 'short'
  } : {
    type: o.type || 'conjunction'
  }).format(list);
}
function formatPersonName(person, o = {}) {
  const p = typeof person === 'string' ? {
    full: person
  } : person || {};
  const full = String(p.full || '').trim();
  if (o.display === 'preferred') return String(p.preferred || '').trim() || full;
  if (o.display === 'initials') {
    const words = full.split(/\s+/).filter(Boolean);
    const pick = words.length > 1 ? [words[0], words[words.length - 1]] : words;
    return pick.map(w => Array.from(w)[0].toLocaleUpperCase(loc(o))).join('');
  }
  return full;
}
function regionName(code, o = {}) {
  if (!code) return '';
  try {
    return new Intl.DisplayNames(loc(o), {
      type: 'region'
    }).of(code) || code;
  } catch (e) {
    return code;
  }
}
function formatAddress(address, o = {}) {
  const a = address || {};
  const country = (o.country || a.country || '').toUpperCase();
  const layout = FORMATS.address[country] || FORMATS.address.default;
  const readerRegion = (loc(o).split('-')[1] || '').toUpperCase();
  const includeCountry = o.includeCountry !== undefined ? o.includeCountry : !!country && country !== readerRegion;
  const value = k => {
    if (k === 'country') return includeCountry ? regionName(country, o) : '';
    if (k === 'street') return [].concat(a.street || []).filter(Boolean).join('\n');
    return a[k] ? String(a[k]) : '';
  };
  const lines = [];
  layout.forEach(pattern => {
    // a pattern line: field names with the punctuation between them; a separator is written only between two values
    let text = '',
      sep = '';
    for (const [, field, between] of pattern.matchAll(/([A-Za-z]+)|([^A-Za-z]+)/g)) {
      if (between) {
        sep = between;
        continue;
      }
      const v = value(field);
      if (!v) continue;
      text += (text ? sep : '') + v;
      sep = '';
    }
    text.split('\n').forEach(l => {
      if (l.trim()) lines.push(l.trim());
    });
  });
  return lines;
}
function formatPhone(e164, o = {}) {
  const raw = String(e164 || '').trim();
  const num = raw.replace(/[^\d+]/g, '');
  if (!/^\+\d{4,15}$/.test(num)) return raw;
  const all = num.slice(1);
  const code = Object.keys(FORMATS.phone).sort((x, y) => y.length - x.length).find(c => all.startsWith(c));
  const display = o.display === 'national' ? 'national' : 'international';
  if (code) {
    const rest = all.slice(code.length),
      pattern = FORMATS.phone[code][display];
    if ((pattern.match(/#/g) || []).length === rest.length) {
      let i = 0;
      return pattern.replace(/#/g, () => rest[i++]);
    }
  }
  // a country Formats does not list (or a length its pattern does not fit): the country code when it is known, then the
  // digits in groups of three, the last group taking up to four
  const groups = [];
  let rest = code ? all.slice(code.length) : all;
  while (rest.length > 4) {
    groups.push(rest.slice(0, 3));
    rest = rest.slice(3);
  }
  groups.push(rest);
  return '+' + (code ? code + ' ' : '') + groups.join(' ');
}
function dateTimeAttr(date) {
  const d = toDate(date);
  return d ? d.toISOString() : '';
}
  } },
  "platform/utils/announce.jsx": { deps: {"react":null,"./cx.js":"platform/utils/cx.js","./tokenTime.js":"platform/utils/tokenTime.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LiveRegion = LiveRegion;
exports.announce = announce;
var _react = _interopRequireDefault(require("react"));
var _cx = require("./cx.js");
var _tokenTime = require("./tokenTime.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · LiveRegion, announce (platform/utils/announce.jsx)
   Summary: Tells screen-reader users about a change they cannot see happen (a save, a count of results, an upload that
     finished, an error) without moving their focus. announce(text) speaks through one pair of page-wide regions;
     LiveRegion is a region of a component's own, for messages that also stay on screen (a status line, a log).
   Usage:
     announce('12 results');                               // polite: waits until the reader is idle
     announce('Couldn’t save. Check your connection.', { politeness: 'assertive' });   // interrupts: urgent errors only
     <LiveRegion kind="status">{saved ? 'Saved' : ''}</LiveRegion>
     <LiveRegion kind="log" visible>{lines.map((l) => <div key={l.id}>{l.text}</div>)}</LiveRegion>
   Props:
     announce(text, { politeness }): politeness "polite" (default) or "assertive"; the same text twice is spoken twice
     LiveRegion.kind: "polite" (default; aria-live="polite"), "assertive" (aria-live="assertive"), "status"
       (role="status": a polite advisory such as a count or a save) or "log" (role="log": new lines are read, old ones stay)
     LiveRegion.visible: show the region's text on screen (default false: read by screen readers only)
     LiveRegion.atomic: read the whole region on every change, not only what changed (default: true for status, else false)
     LiveRegion.children: the message (render the region empty first, then put the text in it)
     LiveRegion.className: more classes on the region
   Behavior:
     The page-wide regions are created on the first announce(), once per page, at the end of <body>, and are never removed.
     Each message replaces the last after a short pause (--plx-sys-live-region-delay), so rapid updates are read once, in their final state.
     A LiveRegion is in the page from its first render; screen readers only read changes made after it appeared.
   Notes:
     Not when focus already moves to the new content (a dialog, an error summary): that is announced by the focus itself.
     Never put a control inside a live region. Messages are plain text: no markup, icons or emoji names.
     Meets WCAG 2.2 SC 4.1.3 Status Messages.
*/
const regions = {};
const pending = {};

// the page-wide region for one politeness (made once, visually hidden)
function region(politeness) {
  if (regions[politeness] && regions[politeness].isConnected) return regions[politeness];
  const el = document.createElement('div');
  el.className = 'plx-visually-hidden';
  el.setAttribute('aria-live', politeness);
  el.setAttribute('aria-atomic', 'true');
  el.setAttribute('data-plx-announcer', politeness);
  if (politeness === 'assertive') el.setAttribute('role', 'alert');
  document.body.appendChild(el);
  regions[politeness] = el;
  return el;
}
function announce(text, {
  politeness = 'polite'
} = {}) {
  if (typeof document === 'undefined' || !document.body) return;
  const p = politeness === 'assertive' ? 'assertive' : 'polite';
  const el = region(p);
  // clear first, then write in the next frame: the same text twice is still a change, and a burst is read once
  el.textContent = '';
  if (pending[p]) clearTimeout(pending[p]);
  pending[p] = setTimeout(() => {
    pending[p] = null;
    el.textContent = String(text || '');
  }, (0, _tokenTime.tokenMs)('--plx-sys-live-region-delay'));
}
const KINDS = {
  polite: {
    'aria-live': 'polite'
  },
  assertive: {
    'aria-live': 'assertive'
  },
  status: {
    role: 'status',
    'aria-live': 'polite'
  },
  log: {
    role: 'log',
    'aria-live': 'polite'
  }
};
function LiveRegion({
  kind = 'polite',
  visible = false,
  atomic,
  className,
  children,
  ...rest
}) {
  const a = KINDS[kind] || KINDS.polite;
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, a, {
    "aria-atomic": atomic !== undefined ? atomic : kind === 'status',
    "data-plx-live": kind,
    className: (0, _cx.cx)(!visible && 'plx-visually-hidden', className)
  }, rest), children);
}
  } },
  "platform/utils/clipboard.js": { deps: {"react":null,"./announce.jsx":"platform/utils/announce.jsx","./tokenTime.js":"platform/utils/tokenTime.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyImage = copyImage;
exports.copyRich = copyRich;
exports.copyText = copyText;
exports.useClipboard = useClipboard;
var _react = _interopRequireDefault(require("react"));
var _announce = require("./announce.jsx");
var _tokenTime = require("./tokenTime.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Clipboard (platform/utils/clipboard.js)
   Summary: Copies a value (an ID, a path, a link, a code sample, a picture) to the clipboard and confirms it: the copy
     functions write it, useClipboard keeps the "Copied" state for a moment and announces the result to screen readers.
   Usage:
     const clip = useClipboard();
     <Button icon={clip.copied ? 'check' : 'copy'} onClick={() => clip.copy(path)}>{clip.copied ? 'Copied' : 'Copy file path'}</Button>
     {clip.error && <Notice tone="danger">{clip.error}</Notice>}
     await copyText('ASSET-0142');
     await copyRich({ html: '<b>Cross 014</b>', text: 'Cross 014' });
     await copyImage(pngBlob);
   Props:
     copyText(text): writes plain text; resolves true when copied, false when the browser refused
     copyRich({ html, text }): writes HTML for editors that paste formatting, with the plain text for the others
     copyImage(blob): writes a picture (a PNG Blob, or a Promise of one); false where the browser cannot
     useClipboard({ timeout, strings }): returns { copy(value), copied, error, reset() }; value is text, { html, text } or a
       Blob. copied stays true for timeout milliseconds (default the --plx-sys-clipboard-feedback-duration token)
     strings: { copied: 'Copied', failed: 'Couldn’t copy. Select the text and copy it by hand.' }: what is announced and
       returned as error
   Behavior:
     Uses the asynchronous Clipboard API; for text, where it is missing or refused (an insecure page, an old browser), it
     falls back to a hidden text area and the copy command.
     Copies only from a person's action (a press or a key): browsers refuse it otherwise.
     Success and failure are announced through the polite live region (announce); the failure message says what to do.
   Notes:
     Never reads the clipboard. Name the button for what it copies ("Copy file path"), not just "Copy".
*/

const STRINGS = {
  copied: 'Copied',
  failed: 'Couldn’t copy. Select the text and copy it by hand.'
};

// the copy command on a hidden text area: for pages without the Clipboard API
function legacyCopy(text) {
  if (typeof document === 'undefined' || !document.body) return false;
  const area = document.createElement('textarea');
  area.className = 'plx-visually-hidden';
  area.setAttribute('readonly', '');
  area.setAttribute('aria-hidden', 'true');
  area.value = text;
  const active = document.activeElement;
  document.body.appendChild(area);
  area.select();
  let done = false;
  try {
    done = document.execCommand('copy');
  } catch (e) {
    done = false;
  }
  area.remove();
  if (active && active.focus) active.focus();
  return done;
}
async function copyText(text) {
  const value = String(text === undefined || text === null ? '' : text);
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch (e) {/* refused: try the copy command */}
  return legacyCopy(value);
}
async function copyRich({
  html = '',
  text = ''
} = {}) {
  try {
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard && navigator.clipboard.write) {
      await navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], {
          type: 'text/html'
        }),
        'text/plain': new Blob([text], {
          type: 'text/plain'
        })
      })]);
      return true;
    }
  } catch (e) {/* refused: plain text only */}
  return copyText(text);
}
async function copyImage(blob) {
  try {
    if (typeof ClipboardItem === 'undefined' || !navigator.clipboard || !navigator.clipboard.write) return false;
    const b = await blob;
    await navigator.clipboard.write([new ClipboardItem({
      [b.type || 'image/png']: b
    })]);
    return true;
  } catch (e) {
    return false;
  }
}
function useClipboard({
  timeout,
  strings
} = {}) {
  const s = {
    ...STRINGS,
    ...(strings || {})
  };
  const [copied, setCopied] = _react.default.useState(false);
  const [error, setError] = _react.default.useState(null);
  const timer = _react.default.useRef(null);
  _react.default.useEffect(() => () => clearTimeout(timer.current), []);
  const reset = _react.default.useCallback(() => {
    clearTimeout(timer.current);
    setCopied(false);
    setError(null);
  }, []);
  const copy = _react.default.useCallback(async value => {
    clearTimeout(timer.current);
    const done = typeof Blob !== 'undefined' && value instanceof Blob ? await copyImage(value) : value && typeof value === 'object' && ('html' in value || 'text' in value) ? await copyRich(value) : await copyText(value);
    setCopied(done);
    setError(done ? null : s.failed);
    (0, _announce.announce)(done ? s.copied : s.failed, {
      politeness: done ? 'polite' : 'assertive'
    });
    if (done) timer.current = setTimeout(() => setCopied(false), timeout !== undefined ? timeout : (0, _tokenTime.tokenMs)('--plx-sys-clipboard-feedback-duration'));
    return done;
  }, [timeout, s.copied, s.failed]);
  return {
    copy,
    copied,
    error,
    reset
  };
}
  } },
  "platform/utils/hotkey.js": { deps: {"react":null,"./tokenTime.js":"platform/utils/tokenTime.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hotkeyKeys = hotkeyKeys;
exports.hotkeyLabel = hotkeyLabel;
exports.hotkeyList = hotkeyList;
exports.isMac = isMac;
exports.parseHotkey = parseHotkey;
exports.registerHotkey = registerHotkey;
exports.setSingleKeyHotkeys = setSingleKeyHotkeys;
exports.singleKeyHotkeys = singleKeyHotkeys;
exports.subscribeHotkeys = subscribeHotkeys;
exports.useHotkey = useHotkey;
exports.useHotkeyList = useHotkeyList;
var _react = _interopRequireDefault(require("react"));
var _tokenTime = require("./tokenTime.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Hotkey (platform/utils/hotkey.js)
   Summary: Keyboard shortcuts in one place: useHotkey binds a key, a chord (Mod K) or a sequence (G then I) to a command,
     for the whole page or for one region, and every binding goes into one registry that the shortcuts dialog and the
     menus read their hints from (Kbd draws the label).
   Usage:
     useHotkey('Mod+K', () => openSearch(), { label: 'Search', group: 'General' });
     useHotkey('G I', () => goTo('inbox'), { label: 'Go to inbox', group: 'Navigation' });
     useHotkey('Delete', removeSelected, { scope: listRef, label: 'Delete the selected files' });
     <Kbd>{hotkeyLabel('Mod+K')}</Kbd>                     // "Ctrl K" on Windows and Linux, "⌘ K" on a Mac
     const all = useHotkeyList();                         // [{ binding, label, group, keys }] for the shortcuts dialog
   Props:
     useHotkey(binding, handler, options): binds while the component is mounted; handler(event) runs on a match
     binding: steps separated by spaces (a sequence: "G I"), each step keys joined by "+" ("Mod+Shift+P"); modifiers Mod
       (Cmd on a Mac, Ctrl elsewhere), Ctrl, Meta, Alt, Shift; keys as KeyboardEvent.key names ("K", "Escape", "/", "?")
     options.scope: a ref (or element) of the region the binding belongs to; it fires only when focus is inside it
     options.enabled: false unbinds it without unmounting (default true)
     options.allowInFields: also fire while focus is in a text field (default false)
     options.label: what the command does, as written in its menu item; options.group: its group in the shortcuts dialog
     registerHotkey(binding, handler, options): the same without React; returns the function that unbinds it
     hotkeyLabel(binding, { mac }): the binding as people read it ("Ctrl Shift P", "G then I")
     hotkeyList(): every labeled binding; useHotkeyList() the same, kept current; subscribeHotkeys(fn) for other code
     setSingleKeyHotkeys(on): turns every single-key shortcut (no modifier) off or on (WCAG 2.2 SC 2.1.4)
   Behavior:
     One keydown listener for the page. The binding of the innermost scope that contains the focus wins; page-wide
     bindings come last. A key that starts a sequence waits --plx-sys-hotkey-sequence-timeout for the next one.
     Ignored while focus is in a text field, a select or editable content, unless allowInFields. Ignored when an earlier
     handler called preventDefault. A match calls preventDefault, so the browser's own use of that key does not run.
   Notes:
     Never bind keys that assistive technology or the browser needs (Tab, the arrow keys outside a widget, Ctrl L, F6).
     Use the same label here as in the menu item, so the dialog and the menu agree.
*/

const MODS = ['ctrl', 'meta', 'alt', 'shift'];
const NAMES = {
  esc: 'escape',
  del: 'delete',
  space: ' ',
  spacebar: ' ',
  return: 'enter',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
  cmd: 'meta',
  command: 'meta',
  option: 'alt',
  control: 'ctrl'
};
const entries = [];
const listeners = new Set();
let singleKeys = true;
let buffer = [],
  bufferAt = 0,
  installed = false,
  nextId = 1;
function isMac() {
  if (typeof navigator === 'undefined') return false;
  const p = navigator.userAgentData && navigator.userAgentData.platform || navigator.platform || '';
  return /mac|iphone|ipad|ipod/i.test(p);
}

// "Mod+Shift+P" → { ctrl, meta, alt, shift, key: 'p' }
function parseStep(step, mac) {
  const parts = step.split('+').filter((x, i, all) => x !== '' || i === all.length - 1).map(x => x === '' ? '+' : x);
  const s = {
    ctrl: false,
    meta: false,
    alt: false,
    shift: false,
    key: ''
  };
  parts.forEach(raw => {
    let p = raw.toLowerCase();
    p = NAMES[p] || p;
    if (p === 'mod') s[mac ? 'meta' : 'ctrl'] = true;else if (MODS.indexOf(p) >= 0) s[p] = true;else s.key = p;
  });
  return s;
}
function parseHotkey(binding, mac = isMac()) {
  return String(binding || '').trim().split(/\s+/).filter(Boolean).map(st => parseStep(st, mac));
}
function matchStep(s, e) {
  const key = (e.key || '').toLowerCase();
  // a letter or digit typed with Alt (or Shift) on some layouts changes e.key: e.code still names the key
  const code = /^Key([A-Z])$|^Digit(\d)$/.exec(e.code || '');
  const sameKey = key === s.key || !!code && (code[1] || code[2]).toLowerCase() === s.key;
  if (!sameKey) return false;
  // a symbol that needs Shift ("?") is written without it: Shift is then not compared
  const symbol = s.key.length === 1 && !/[a-z0-9]/.test(s.key);
  return e.ctrlKey === s.ctrl && e.metaKey === s.meta && e.altKey === s.alt && (symbol || e.shiftKey === s.shift);
}
const isSingle = steps => steps.length >= 1 && steps.every(s => !s.ctrl && !s.meta && !s.alt) && steps[0].key.length === 1;
function inField(el) {
  if (!el || !el.tagName) return false;
  if (el.isContentEditable) return true;
  const t = el.tagName.toLowerCase();
  if (t === 'textarea' || t === 'select') return true;
  if (t !== 'input') return false;
  return ['checkbox', 'radio', 'button', 'submit', 'reset', 'range', 'color', 'file', 'image'].indexOf((el.type || '').toLowerCase()) < 0;
}
const scopeOf = x => (x && 'current' in x ? x.current : x) || null;
const depth = el => {
  let n = 0;
  for (let x = el; x; x = x.parentElement) n++;
  return n;
};
function onKeyDown(e) {
  if (e.defaultPrevented || e.isComposing || ['Control', 'Meta', 'Alt', 'Shift'].indexOf(e.key) >= 0) return;
  const now = Date.now();
  if (now - bufferAt > (0, _tokenTime.tokenMs)('--plx-sys-hotkey-sequence-timeout')) buffer = [];
  const target = e.target,
    field = inField(target);
  const live = entries.filter(x => x.enabled && (!field || x.allowInFields) && (singleKeys || !isSingle(x.steps))).map(x => ({
    x,
    scope: scopeOf(x.scope)
  })).filter(c => !c.x.scope || c.scope && c.scope.contains(target)).sort((a, b) => (b.scope ? depth(b.scope) : 0) - (a.scope ? depth(a.scope) : 0));
  const step = buffer.length;
  const fits = (c, at) => c.x.steps.length > at && buffer.slice(buffer.length - at).every((ev, i) => matchStep(c.x.steps[i], ev)) && matchStep(c.x.steps[at], e);
  // the longest waiting sequence first, then a fresh start
  for (const at of [step, 0].filter((v, i, all) => all.indexOf(v) === i)) {
    const full = live.find(c => c.x.steps.length === at + 1 && fits(c, at));
    if (full) {
      buffer = [];
      e.preventDefault();
      full.x.handler(e);
      return;
    }
    if (live.some(c => c.x.steps.length > at + 1 && fits(c, at))) {
      buffer = buffer.slice(buffer.length - at).concat([{
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey
      }]);
      bufferAt = now;
      return;
    }
  }
  buffer = [];
}
function install() {
  if (installed || typeof document === 'undefined') return;
  document.addEventListener('keydown', onKeyDown);
  installed = true;
}
const notify = () => listeners.forEach(fn => fn());
function registerHotkey(binding, handler, options = {}) {
  install();
  const entry = {
    id: nextId++,
    binding,
    steps: parseHotkey(binding),
    handler,
    scope: options.scope || null,
    enabled: options.enabled !== false,
    allowInFields: !!options.allowInFields,
    label: options.label || '',
    group: options.group || ''
  };
  entries.push(entry);
  if (entry.label) notify();
  return () => {
    const i = entries.indexOf(entry);
    if (i >= 0) {
      entries.splice(i, 1);
      if (entry.label) notify();
    }
  };
}
function useHotkey(binding, handler, options = {}) {
  const ref = _react.default.useRef(handler);
  ref.current = handler;
  const {
    scope,
    enabled = true,
    allowInFields = false,
    label,
    group
  } = options;
  _react.default.useEffect(() => {
    if (!enabled || !binding) return undefined;
    return registerHotkey(binding, e => ref.current && ref.current(e), {
      scope,
      allowInFields,
      label,
      group
    });
  }, [binding, scope, enabled, allowInFields, label, group]);
}
const MAC_NAMES = {
  meta: '⌘',
  ctrl: '⌃',
  alt: '⌥',
  shift: '⇧'
};
const PC_NAMES = {
  meta: 'Win',
  ctrl: 'Ctrl',
  alt: 'Alt',
  shift: 'Shift'
};
const KEY_NAMES = {
  ' ': 'Space',
  escape: 'Esc',
  arrowup: '↑',
  arrowdown: '↓',
  arrowleft: '←',
  arrowright: '→',
  enter: 'Enter',
  delete: 'Delete',
  backspace: 'Backspace',
  tab: 'Tab'
};
function hotkeyKeys(binding, {
  mac = isMac()
} = {}) {
  const names = mac ? MAC_NAMES : PC_NAMES;
  return parseHotkey(binding, mac).map(s => (mac ? ['ctrl', 'alt', 'shift', 'meta'] : ['ctrl', 'meta', 'alt', 'shift']).filter(m => s[m]).map(m => names[m]).concat([KEY_NAMES[s.key] || (s.key.length === 1 ? s.key.toUpperCase() : s.key.charAt(0).toUpperCase() + s.key.slice(1))]));
}
function hotkeyLabel(binding, options) {
  return hotkeyKeys(binding, options).map(k => k.join(' ')).join(' then ');
}
function hotkeyList() {
  return entries.filter(x => x.label).map(x => ({
    binding: x.binding,
    label: x.label,
    group: x.group,
    keys: hotkeyLabel(x.binding),
    enabled: x.enabled
  }));
}
function subscribeHotkeys(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function useHotkeyList() {
  const [list, setList] = _react.default.useState(hotkeyList);
  _react.default.useEffect(() => {
    setList(hotkeyList());
    return subscribeHotkeys(() => setList(hotkeyList()));
  }, []);
  return list;
}
function setSingleKeyHotkeys(on) {
  singleKeys = !!on;
  buffer = [];
}
function singleKeyHotkeys() {
  return singleKeys;
}
  } },
  "platform/hooks/useVirtualizer.js": { deps: {"react":null,"../utils/direction.js":"platform/utils/direction.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIRTUAL_STICKY_CLASS = void 0;
exports.VirtualGap = VirtualGap;
exports.VirtualProbe = VirtualProbe;
exports.gapPieces = gapPieces;
exports.useVirtualizer = useVirtualizer;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../utils/direction.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useVirtualizer
   Summary: Renders only the items of a long collection that are in view (plus a few on each side), so a list, a file
     grid or a log of thousands of items stays fast. The items that are not rendered are stood in for by gaps the
     stylesheet sizes (system/virtual.css): no style is ever written, and the scroll bar keeps its true length.
   Usage:
     const v = useVirtualizer({ count: files.length });
     <div ref={v.viewportRef} className="plx-file-list" role="list">            // the scroll container
       <VirtualProbe />
       {v.segments.map((s) => s.gap ? <VirtualGap key={s.key} count={s.count} />
         : <div key={s.key} role="listitem" {...v.itemProps(s.index)}>{files[s.index].name}</div>)}
     </div>
     .plx-file-list { --plx-sys-virtual-item-size: var(--plx-sys-data-table-row-height); overflow-y: auto; }
   Props:
     count: how many items there are
     mode: "fixed" (default: every item is one row of --plx-sys-virtual-item-size) or "measured" (items take their own
       size; the token is the estimate for the items not rendered)
     axis: "y" (default, a vertical list) or "x" (a horizontal strip)
     grid: true lays items out in rows of as many columns as fit (a CSS grid container); gaps then stand for whole rows
     overscan: rows rendered beyond each edge of the view (default 4)
     sticky: indexes of group headers; the header of the group in view stays rendered (give it VIRTUAL_STICKY_CLASS)
     returns: { viewportRef, segments, itemProps(index), scrollToIndex(index), range: { start, end }, columns }
     segments: in order, { key, index } for an item to render and { key, gap: true, count } for a run of items (rows, in a
       grid) not rendered
     itemProps(index): data-plx-virtual-index, aria-posinset and aria-setsize for the item (spread them on it)
     VirtualGap: { count, axis }: the stand-in for count items (rows); VirtualProbe: { axis }: measures one item (render it
       first in the viewport)
   Behavior:
     The viewport is in the Tab order (tabIndex 0, unless it has a tabindex of its own), so keyboard users can scroll it;
     name it (aria-label) and give it its role (list, grid, listbox).
     The view follows the scroll position and the viewport's size (a ResizeObserver). The focused item stays rendered
     while it has focus, so keyboard navigation and screen readers do not lose it. With measured items the browser's
     scroll anchoring keeps the content still while gaps replace items of another size.
     Items carry their position in the whole collection (aria-posinset of aria-setsize), so screen readers announce
     "12 of 4,000" even though only a few are in the page.
   Notes:
     Not for short collections (under a few hundred items): render them all. Not where browser find (Ctrl F) over every
     item matters, unless the page offers its own search. DataTable keeps Tabulator's own rendering.
     The item size token and --plx-sys-virtual-item-gap must match the container's layout: set them in its stylesheet.
     A grid container sizes its rows by their content (no grid-auto-rows): a gap is one grid row across every column.
*/

const VIRTUAL_STICKY_CLASS = exports.VIRTUAL_STICKY_CLASS = 'plx-virtual-sticky';

// a count as powers of two: 13 → [8, 4, 1] (one generated rule per power in system/virtual.css)
function gapPieces(count) {
  const out = [];
  let n = Math.max(0, Math.floor(count));
  for (let p = 1 << 20; p >= 1; p >>= 1) while (n >= p) {
    out.push(p);
    n -= p;
  }
  return out;
}
function VirtualGap({
  count,
  axis = 'y'
}) {
  if (!count) return null;
  return /*#__PURE__*/_react.default.createElement('div', {
    className: 'plx-virtual-gap',
    'data-plx-axis': axis,
    'aria-hidden': 'true'
  }, gapPieces(count).map((p, i) => /*#__PURE__*/_react.default.createElement('div', {
    key: i,
    className: 'plx-virtual-gap__piece',
    'data-plx-span': String(p)
  })));
}
function VirtualProbe({
  axis = 'y'
}) {
  return /*#__PURE__*/_react.default.createElement('div', {
    className: 'plx-virtual-probe',
    'data-plx-axis': axis,
    'data-plx-virtual-probe': '',
    'aria-hidden': 'true'
  });
}
function useVirtualizer({
  count = 0,
  mode = 'fixed',
  axis = 'y',
  grid = false,
  overscan = 4,
  sticky
} = {}) {
  const viewportRef = _react.default.useRef(null);
  const [view, setView] = _react.default.useState({
    offset: 0,
    size: 0,
    pitch: 0,
    columns: 1
  });
  const [focused, setFocused] = _react.default.useState(-1);
  const sizes = _react.default.useRef(new Map()); // measured mode: index → size along the axis
  const shown = _react.default.useRef({
    start: 0,
    end: 0
  }); // the rows rendered last
  const horizontal = axis === 'x';

  // reads the scroll position, the viewport's size, one item's pitch (the probe) and, in a grid, the columns
  const measure = _react.default.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const probe = el.querySelector(':scope > [data-plx-virtual-probe]');
    const pitch = probe ? horizontal ? probe.offsetWidth : probe.offsetHeight : 0;
    let columns = 1;
    if (grid) {
      const items = el.querySelectorAll(':scope > [data-plx-virtual-index]');
      if (items.length) {
        const top = items[0].offsetTop;
        let n = 0;
        while (n < items.length && items[n].offsetTop === top) n++;
        // no wrap seen while more items exist: guess wider, render more and look again
        columns = n === items.length && items.length < count ? Math.min(count, Math.max(n, view.columns * 2)) : n;
      }
    }
    if (mode === 'measured') {
      el.querySelectorAll(':scope > [data-plx-virtual-index]').forEach(it => {
        sizes.current.set(Number(it.getAttribute('data-plx-virtual-index')), horizontal ? it.offsetWidth : it.offsetHeight);
      });
    }
    const offset = Math.abs(horizontal ? el.scrollLeft : el.scrollTop);
    const size = horizontal ? el.clientWidth : el.clientHeight;
    setView(v => v.offset === offset && v.size === size && v.pitch === pitch && v.columns === columns ? v : {
      offset,
      size,
      pitch,
      columns
    });
  }, [horizontal, grid, mode, count, view.columns]);
  _react.default.useLayoutEffect(() => {
    measure();
  });
  _react.default.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    // a scroll container people reach with the keyboard (WCAG 2.1.1): in the Tab order unless the page placed it already
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    const onScroll = () => measure();
    const onFocus = e => {
      const it = e.target.closest && e.target.closest('[data-plx-virtual-index]');
      setFocused(it && el.contains(it) ? Number(it.getAttribute('data-plx-virtual-index')) : -1);
    };
    const onBlur = e => {
      if (!el.contains(e.relatedTarget)) setFocused(-1);
    };
    el.addEventListener('scroll', onScroll, {
      passive: true
    });
    el.addEventListener('focusin', onFocus);
    el.addEventListener('focusout', onBlur);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measure()) : null;
    if (ro) ro.observe(el);
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('focusin', onFocus);
      el.removeEventListener('focusout', onBlur);
      if (ro) ro.disconnect();
    };
  }, [measure]);
  const columns = grid ? Math.max(1, view.columns) : 1;
  const rows = Math.ceil(count / columns);
  const pitch = view.pitch || 1;
  // the first row in view. Fixed items: the offset in pitches. Measured items: from the window rendered last, walking
  // through its items' own sizes (the gap before it counts in pitches), so a window that moves keeps the same first
  // item while scroll anchoring shifts the offset by the difference (no back-and-forth between two windows)
  let first;
  const last = shown.current;
  if (mode === 'measured' && !grid && view.offset >= last.start * pitch) {
    let pos = last.start * pitch,
      i = last.start;
    while (i < last.end && pos + (sizes.current.get(i) || pitch) <= view.offset) {
      pos += sizes.current.get(i) || pitch;
      i++;
    }
    if (i >= last.end) i += Math.floor((view.offset - pos) / pitch);
    first = Math.min(rows, i);
  } else first = Math.min(rows, Math.floor(view.offset / pitch));
  let fill = 0,
    covered = 0;
  const target = view.size || pitch * 10;
  while (first + fill < rows && covered < target) {
    covered += mode === 'measured' && !grid ? sizes.current.get(first + fill) || pitch : pitch;
    fill++;
  }
  const startRow = Math.max(0, first - overscan);
  const endRow = Math.min(rows, first + fill + overscan); // exclusive
  const start = startRow * columns,
    end = Math.min(count, endRow * columns);
  shown.current = {
    start: startRow,
    end: endRow
  };

  // rows outside the window that stay rendered: the focused item's row and the sticky header of the group in view
  const pinned = [];
  if (focused >= 0 && focused < count) pinned.push(Math.floor(focused / columns));
  const header = (sticky || []).filter(i => i < start).sort((a, b) => b - a)[0];
  if (header !== undefined && !grid) pinned.push(header);
  const segments = [];
  const rowsOut = [...new Set(pinned)].filter(r => r < startRow || r >= endRow).sort((a, b) => a - b);
  let at = 0;
  const pushRows = (from, to) => {
    for (let i = from * columns; i < Math.min(count, to * columns); i++) segments.push({
      key: 'i' + i,
      index: i
    });
  };
  const pushGap = (from, to) => {
    if (to > from) segments.push({
      key: 'g' + from,
      gap: true,
      count: to - from
    });
  };
  rowsOut.filter(r => r < startRow).forEach(r => {
    pushGap(at, r);
    pushRows(r, r + 1);
    at = r + 1;
  });
  pushGap(at, startRow);
  pushRows(startRow, endRow);
  at = endRow;
  rowsOut.filter(r => r >= endRow).forEach(r => {
    pushGap(at, r);
    pushRows(r, r + 1);
    at = r + 1;
  });
  pushGap(at, rows);
  const itemProps = _react.default.useCallback(index => ({
    'data-plx-virtual-index': index,
    'aria-posinset': index + 1,
    'aria-setsize': count
  }), [count]);
  const scrollToIndex = _react.default.useCallback(index => {
    const el = viewportRef.current;
    if (!el) return;
    const offset = Math.floor(index / columns) * pitch;
    if (horizontal) el.scrollLeft = (0, _direction.isRtl)(el) ? -offset : offset;else el.scrollTop = offset;
    measure();
  }, [columns, pitch, horizontal, measure]);
  return {
    viewportRef,
    segments,
    itemProps,
    scrollToIndex,
    range: {
      start,
      end
    },
    columns
  };
}
  } },
  "platform/utils/floating.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEMENTS = exports.FLOATING_POINTER = exports.FLOATING_ANCHOR = void 0;
exports.useFloating = useFloating;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useFloating
   Summary: Places a floating element (a menu, popover, tooltip, combobox list or date picker) beside its anchor and keeps it in view: a named placement, an offset step, flip, shift, the anchor's width, or a point (a context menu at the pointer). It writes data attributes only; system/floating.css places the element, so no position is ever written as a style.
   Usage:
     const anchor = React.useRef(null), panel = React.useRef(null);
     const { placement } = useFloating(anchor, panel, { open, placement: 'bottom-start' });
     <button ref={anchor} aria-expanded={open} aria-controls="list">Sort</button>
     {open ? <div ref={panel} id="list" popover="manual" className="plx-menu">…</div> : null}
     useFloating(anchor, panel, { open, placement: 'bottom-start', matchWidth: true })      // a select or combobox list
     useFloating(row, panel, { open, virtual: { x: event.clientX, y: event.clientY } })     // a context menu at the pointer
   Props:
     anchorRef: a ref to the element the floating element is placed against
     floatingRef: a ref to the floating element (best in the top layer: popover="manual", or inside a Portal)
     options.open (true): placed while open; the anchor slot is released when it closes or unmounts
     options.placement ('bottom-start'): top | bottom | start | end (the side; start and end follow the writing direction), centered or aligned: top-start, top-end, bottom-start, bottom-end, start-top, start-bottom, end-top, end-bottom
     options.offset ('xs'): the gap to the anchor: 'none' | 'xs' | 'sm' | 'md' (--plx-sys-floating-offset-*)
     options.flip (true): moves to the opposite side when there is no room
     options.shift (true): swaps the alignment (start to end) to stay in the window; a centered placement aligns to an edge
     options.matchWidth (false): at least as wide as the anchor
     options.virtual (null): { x, y } in window pixels (event.clientX / clientY): placed at that point, flipped and kept inside the window; the anchor is used where the browser cannot place a point
     returns { placement (the side and alignment in use where useFloating measures it), mode: 'anchor' | 'pointer' | 'inline' }
   Behavior:
     anchor: with CSS anchor positioning (Chrome 125, Safari 26, Firefox 147) the browser places the element, flips and shifts it, and follows the anchor on scroll and resize: nothing is measured.
     pointer: with typed attr() (Chrome 133) a virtual anchor is a point: useFloating measures the element, flips it to the other side of the point and keeps it --plx-sys-floating-viewport-margin inside the window, then writes the point (data-plx-floating-x / -y).
     inline: without anchor positioning the element is placed inside the anchor's parent (data-plx-floating-host) on its side; useFloating measures the room and flips or shifts the placement. Render the element next to its anchor for this fallback.
     The pair shares one of 16 anchor names while open (data-plx-floating-anchor / data-plx-floating), so each floating element finds its own anchor anywhere in the page.
   Notes:
     It positions only. Opening, Escape, focus and outside clicks are the overlay's (useLayer), the top layer is popover="manual" or Portal layer="top", and the ARIA link (aria-expanded, aria-controls, aria-describedby) is the component's.
     Menu, Tooltip and Popover adopt it in their own tasks.
*/

const SLOTS = 16;
const taken = new Array(SLOTS + 1).fill(false);
const take = () => {
  for (let i = 1; i <= SLOTS; i++) if (!taken[i]) {
    taken[i] = true;
    return i;
  }
  return 0;
};
const release = i => {
  if (i) taken[i] = false;
};

// what the browser can do, checked once
const supports = decl => typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports(decl);
const FLOATING_ANCHOR = exports.FLOATING_ANCHOR = supports('anchor-name: --plx-a');
const FLOATING_POINTER = exports.FLOATING_POINTER = supports('inset-block-start: attr(data-plx-floating-y px, 0px)');
const PLACEMENTS = exports.PLACEMENTS = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'start', 'start-top', 'start-bottom', 'end', 'end-top', 'end-bottom'];
const OFFSETS = {
  none: null,
  xs: '--plx-sys-floating-offset-xs',
  sm: '--plx-sys-floating-offset-sm',
  md: '--plx-sys-floating-offset-md'
};
const ATTRS = ['data-plx-floating', 'data-plx-floating-placement', 'data-plx-floating-offset', 'data-plx-floating-flip', 'data-plx-floating-shift', 'data-plx-floating-match', 'data-plx-floating-pointer', 'data-plx-floating-x', 'data-plx-floating-y'];

// a length token in pixels (the tokens are written in rem; a custom property's computed value has its var() resolved)
function tokenPixels(name) {
  if (!name || typeof document === 'undefined') return 0;
  const root = document.documentElement,
    v = getComputedStyle(root).getPropertyValue(name).trim(),
    n = parseFloat(v) || 0;
  return /rem$/.test(v) ? n * parseFloat(getComputedStyle(root).fontSize) : n;
}
const set = (el, name, value) => {
  if (value == null || value === false) el.removeAttribute(name);else el.setAttribute(name, String(value));
};
const isRtl = el => getComputedStyle(el).direction === 'rtl';

// the inline fallback: the side with room (flip) and the alignment that stays in the window (shift), from the anchor's box
function measured(anchor, floating, placement, flip, shift, gap) {
  const a = anchor.getBoundingClientRect(),
    f = floating.getBoundingClientRect();
  const W = window.innerWidth,
    H = window.innerHeight,
    rtl = isRtl(anchor);
  let [side, align] = placement.split('-');
  const room = {
    top: a.top - gap,
    bottom: H - a.bottom - gap,
    start: rtl ? W - a.right - gap : a.left - gap,
    end: rtl ? a.left - gap : W - a.right - gap
  };
  const need = side === 'top' || side === 'bottom' ? f.height : f.width;
  const opposite = {
    top: 'bottom',
    bottom: 'top',
    start: 'end',
    end: 'start'
  }[side];
  if (flip && room[side] < need && room[opposite] > room[side]) side = opposite;
  if (shift && align && (side === 'top' || side === 'bottom')) {
    // aligned to the inline start, the element runs toward the inline end: does it leave the window there?
    const startEdge = rtl ? a.right : a.left,
      endRoom = rtl ? startEdge : W - startEdge;
    const endEdge = rtl ? a.left : a.right,
      startRoom = rtl ? W - endEdge : endEdge;
    if (align === 'start' && endRoom < f.width && startRoom > endRoom) align = 'end';else if (align === 'end' && startRoom < f.width && endRoom > startRoom) align = 'start';
  }
  if (shift && align && (side === 'start' || side === 'end')) {
    if (align === 'top' && H - a.top < f.height && a.bottom > H - a.top) align = 'bottom';else if (align === 'bottom' && a.bottom < f.height && H - a.top > a.bottom) align = 'top';
  }
  return align ? side + '-' + align : side;
}

// a point: the element's corner at the point, flipped to the other side of it when it does not fit, then kept inside the window
function pointAt(floating, x, y) {
  const f = floating.getBoundingClientRect(),
    W = window.innerWidth,
    H = window.innerHeight,
    m = tokenPixels('--plx-sys-floating-viewport-margin');
  const rtl = isRtl(floating);
  // the inline-start inset of the point, measured from the window's inline-start edge
  let ix = rtl ? W - x : x,
    iy = y;
  if (ix + f.width > W - m && ix - f.width >= m) ix -= f.width;
  if (iy + f.height > H - m && iy - f.height >= m) iy -= f.height;
  ix = Math.max(m, Math.min(ix, W - m - f.width));
  iy = Math.max(m, Math.min(iy, H - m - f.height));
  return [Math.round(ix), Math.round(iy)];
}
function useFloating(anchorRef, floatingRef, options = {}) {
  const {
    open = true,
    placement = 'bottom-start',
    offset = 'xs',
    flip = true,
    shift = true,
    matchWidth = false,
    virtual = null
  } = options;
  const wanted = PLACEMENTS.indexOf(placement) >= 0 ? placement : 'bottom-start';
  const pointer = !!(virtual && FLOATING_POINTER);
  const mode = pointer ? 'pointer' : FLOATING_ANCHOR ? 'anchor' : 'inline';
  const [used, setUsed] = _react.default.useState(wanted);
  const slot = _react.default.useRef(0);
  const vx = virtual ? virtual.x : null,
    vy = virtual ? virtual.y : null;
  _react.default.useLayoutEffect(() => {
    const anchor = anchorRef && anchorRef.current,
      floating = floatingRef && floatingRef.current;
    if (!open || !floating) return undefined;
    const host = !pointer && mode === 'inline' && anchor ? anchor.parentElement : null;
    if (pointer) {
      set(floating, 'data-plx-floating-pointer', '');
      const [ix, iy] = pointAt(floating, vx, vy);
      set(floating, 'data-plx-floating-x', ix);
      set(floating, 'data-plx-floating-y', iy);
    } else if (anchor) {
      if (!slot.current) slot.current = take();
      set(anchor, 'data-plx-floating-anchor', slot.current || null);
      set(floating, 'data-plx-floating', slot.current || 'inline');
      set(floating, 'data-plx-floating-offset', offset === 'xs' || !(offset in OFFSETS) ? null : offset);
      set(floating, 'data-plx-floating-flip', flip ? null : 'off');
      set(floating, 'data-plx-floating-shift', shift ? null : 'off');
      set(floating, 'data-plx-floating-match', matchWidth ? 'width' : null);
      if (host) set(host, 'data-plx-floating-host', '');
      set(floating, 'data-plx-floating-placement', wanted);
      let next = wanted;
      if (mode === 'inline') {
        next = measured(anchor, floating, wanted, flip, shift, tokenPixels(OFFSETS[offset] || null));
        set(floating, 'data-plx-floating-placement', next);
      }
      setUsed(next);
    }
    return () => {
      ATTRS.forEach(n => floating.removeAttribute(n));
      if (anchor) anchor.removeAttribute('data-plx-floating-anchor');
      if (host) host.removeAttribute('data-plx-floating-host');
      release(slot.current);
      slot.current = 0;
    };
  }, [open, wanted, offset, flip, shift, matchWidth, pointer, mode, vx, vy, anchorRef, floatingRef]);

  // the inline fallback measures again when the window changes size
  _react.default.useEffect(() => {
    if (!open || mode !== 'inline' || typeof window === 'undefined') return undefined;
    const again = () => {
      const anchor = anchorRef.current,
        floating = floatingRef.current;
      if (!anchor || !floating) return;
      set(floating, 'data-plx-floating-placement', wanted);
      const next = measured(anchor, floating, wanted, flip, shift, tokenPixels(OFFSETS[offset] || null));
      set(floating, 'data-plx-floating-placement', next);
      setUsed(next);
    };
    window.addEventListener('resize', again);
    return () => window.removeEventListener('resize', again);
  }, [open, mode, wanted, flip, shift, offset, anchorRef, floatingRef]);
  return {
    placement: mode === 'anchor' ? wanted : used,
    mode
  };
}
  } },
  "platform/utils/portal.jsx": { deps: {"react":null,"react-dom":null,"./cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; }, "react-dom": function () { return window.ReactDOM; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Portal = Portal;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _cx = require("./cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · Portal
   Summary: Draws its children outside their parent's layout, so an overlay is never clipped by a scroll area, a card or a pane and never sits under a stacking context: into one shared root at the end of the page, into the browser's top layer, or into a container you name. The density, theme and direction of the place it is written go with it.
   Usage:
     <Portal><div className="plx-toast-region">…</div></Portal>
     <Portal layer="top"><div ref={panel} className="plx-menu">…</div></Portal>        // above every dialog and pane
     <Portal container={sideRef}>…</Portal>                                          // into an element of the page
   Props:
     children: what to draw
     layer ('page'): 'page' draws into the shared root at the end of <body> (plx-portal-root); 'top' into the browser's top layer (a manual popover over the whole window that lets the pointer through to the page except on its content)
     container (null): an element, or a ref to one, to draw into instead of the shared root
     className: more classes on the Portal's own container (plx-portal)
   Behavior:
     The Portal leaves an empty <template> where it is written and copies from its nearest ancestors the density (data-plx-density), the theme and mode of a theme zone (data-plx-theme, data-plx-mode), the direction (dir) and the language (lang) onto its own container, so the tokens and the reading direction inside are those of the place it came from. It copies them again on every render.
     Its container is created with it and removed when it unmounts; the shared root stays.
     Events from the content bubble through the React tree as if it were in place (React portals), not through the page.
   Notes:
     A Portal moves content, nothing else: focus into the content and back to its trigger, Escape and the modal veil are the overlay's (useLayer); the ARIA link between a trigger and its content (aria-controls, aria-describedby) is the component's, since the page order no longer shows it.
     Do not portal content that belongs in the reading order of the page.
     Dialog, Sheet, Toast and MediaViewer adopt it in their own tasks.
*/

const ROOT_ID = 'plx-portal-root';
// what the Portal carries from where it is written: [attribute, the attributes that travel with it]
const CARRIED = [['data-plx-density'], ['data-plx-mode', 'data-plx-theme'], ['dir'], ['lang']];
const TOP_LAYER = typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');

// the shared root at the end of <body>, made once
function sharedRoot() {
  let root = document.getElementById(ROOT_ID);
  if (!root) {
    root = document.createElement('div');
    root.id = ROOT_ID;
    root.className = 'plx-portal-root';
    document.body.appendChild(root);
  }
  return root;
}

// the origin's nearest ancestor (below <html>, whose attributes reach everything already) that sets each carried attribute
function carry(origin, node) {
  CARRIED.forEach(group => {
    const from = origin && origin.parentElement ? origin.parentElement.closest('[' + group[0] + ']') : null;
    const own = from && from !== document.documentElement ? from : null;
    group.forEach(name => {
      const v = own ? own.getAttribute(name) : null;
      if (v == null) node.removeAttribute(name);else node.setAttribute(name, v);
    });
  });
}
function Portal({
  children,
  layer = 'page',
  container = null,
  className
}) {
  const origin = _react.default.useRef(null);
  const [node] = _react.default.useState(() => typeof document === 'undefined' ? null : document.createElement('div'));
  const top = layer === 'top';

  // the container: placed in its parent while the Portal is mounted, in the top layer for layer="top"
  _react.default.useLayoutEffect(() => {
    if (!node) return undefined;
    const target = container && 'current' in container ? container.current : container;
    const parent = target || sharedRoot();
    parent.appendChild(node);
    if (top && TOP_LAYER) {
      node.setAttribute('popover', 'manual');
      if (node.showPopover && !node.matches(':popover-open')) node.showPopover();
    }
    return () => {
      if (top && TOP_LAYER && node.matches(':popover-open')) node.hidePopover();
      node.removeAttribute('popover');
      if (node.parentNode) node.parentNode.removeChild(node);
    };
  }, [node, container, top]);

  // its class and the density, theme and direction of where it is written, on every render
  _react.default.useLayoutEffect(() => {
    if (!node) return;
    node.className = (0, _cx.cx)('plx-portal', top && 'plx-portal--top', className);
    carry(origin.current, node);
  });
  if (!node) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("template", {
    ref: origin,
    "data-plx-portal-origin": ""
  }), /*#__PURE__*/(0, _reactDom.createPortal)(children, node));
}
  } },
  "platform/hooks/useIntersection.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIntersection = useIntersection;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useIntersection
   Summary: Tells a component when an element enters or leaves the window or a scroll area (IntersectionObserver), without scroll handlers: to load a thumbnail just before it shows, fetch the next page near the end of a list, or mark a sticky header once the content passes under it.
   Usage:
     const ref = React.useRef(null);
     const { visible } = useIntersection(ref, { once: true, rootMargin: '--plx-ref-size-200px' });   // load once, a little early
     <div ref={ref}>{visible ? <img … /> : <Skeleton … />}</div>
     const { ratio } = useIntersection(ref, { threshold: [0, 0.5, 1] });                             // how much of it shows
     useIntersection(sentinel, { root: listRef, onChange: (e) => { if (e.isIntersecting) loadMore(); } });
   Props:
     ref: a ref to the element to watch
     options.root (null): a ref to the scroll area to watch in (or an element); the window when null
     options.rootMargin (null): a length token (a name such as '--plx-ref-size-200px', or a list of up to four for the top, right, bottom and left) that grows the area, so it fires before the element is in view; a negative margin is not offered
     options.threshold (0): the visible share, from 0 to 1 (or a list), at which it reports
     options.once (false): stops watching once the element has been visible, and stays visible
     options.disabled (false): does not watch
     options.onChange (null): called with each IntersectionObserverEntry
     returns { visible (at least the threshold shows), ratio (0 to 1), entry (the last IntersectionObserverEntry) }
   Behavior:
     The observer starts after the element is drawn and disconnects when the component unmounts, the element changes, or once it has been seen (once).
     Without IntersectionObserver (an old browser, a page drawn on the server) the element counts as visible, so nothing that depends on it is lost.
   Notes:
     It reports; it hides nothing. Content that loads as it scrolls into view keeps a placeholder of its final size (no layout shift), newly loaded results are announced politely (a live region), and a "Load more" button stays as the keyboard way to the next page.
     The margin is a token, never a number: the tokens are in rem, so it is converted to pixels with the page's root font size.
*/

// a length token as pixels for rootMargin ('--plx-ref-size-200px' -> '200px'); the tokens are written in rem
function marginOf(value) {
  if (!value || typeof document === 'undefined') return '0px';
  const root = document.documentElement,
    size = parseFloat(getComputedStyle(root).fontSize);
  return [].concat(value).slice(0, 4).map(name => {
    const v = getComputedStyle(root).getPropertyValue(name).trim(),
      n = parseFloat(v) || 0;
    return Math.round(/rem$/.test(v) ? n * size : n) + 'px';
  }).join(' ');
}
function useIntersection(ref, options = {}) {
  const {
    root = null,
    rootMargin = null,
    threshold = 0,
    once = false,
    disabled = false,
    onChange = null
  } = options;
  const [state, setState] = _react.default.useState({
    visible: false,
    ratio: 0,
    entry: null
  });
  const seen = _react.default.useRef(false);
  const change = _react.default.useRef(onChange);
  change.current = onChange;
  const margin = [].concat(rootMargin || []).join(' '),
    steps = [].concat(threshold).join(' ');
  _react.default.useEffect(() => {
    const el = ref && ref.current;
    if (!el || disabled || once && seen.current) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      seen.current = true;
      setState({
        visible: true,
        ratio: 1,
        entry: null
      });
      return undefined;
    }
    const area = root && 'current' in root ? root.current : root;
    const min = Math.min.apply(null, [].concat(threshold));
    const io = new IntersectionObserver(entries => {
      const entry = entries[entries.length - 1];
      const visible = entry.isIntersecting && entry.intersectionRatio >= min;
      if (change.current) change.current(entry);
      setState({
        visible: visible || once && seen.current,
        ratio: entry.intersectionRatio,
        entry
      });
      if (visible && once) {
        seen.current = true;
        io.disconnect();
      }
    }, {
      root: area || null,
      rootMargin: marginOf(rootMargin),
      threshold
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, root, margin, steps, once, disabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return state;
}
  } },
  "platform/utils/contrast.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONTRAST_PAIRS = exports.CONTRAST_MINIMUMS = void 0;
exports.contrastRatio = contrastRatio;
exports.meetsContrast = meetsContrast;
exports.parseColor = parseColor;
exports.relativeLuminance = relativeLuminance;
/* Plenix · contrast (platform/utils/contrast.js): the contrast rules in code.
   Summary: WCAG 2.2 contrast between two colors (contrastRatio), whether a ratio meets a rule (meetsContrast), the rules
     themselves (CONTRAST_MINIMUMS) and the theme's role pairs that must meet them (CONTRAST_PAIRS). tests/contrast.test.js
     checks every pair in every theme and mode; the Contrast rules page draws the same pairs live from the page's tokens.
   Usage:
     import { contrastRatio, meetsContrast, CONTRAST_PAIRS } from 'plenix-platform';
     const css = getComputedStyle(document.documentElement), role = (n) => css.getPropertyValue('--plx-sys-' + n).trim();
     contrastRatio(role('content-muted'), role('surface-default'))   // 7.11 in the default light theme
     meetsContrast(4.6, 'text')                      // true: 4.5:1 is the rule for normal text
     CONTRAST_PAIRS.filter((p) => p.rule === 'non-text')
   Props:
     contrastRatio(a, b): the ratio (1 to 21) of two colors, "#rgb", "#rrggbb" or "rgb(r, g, b)"; NaN when one is not a color
     relativeLuminance(color): the color's relative luminance (0 to 1), as WCAG defines it
     parseColor(color): [r, g, b] (0 to 255), or null
     meetsContrast(ratio, rule): true when the ratio meets the rule ("text", "large-text", "enhanced", "non-text")
     CONTRAST_MINIMUMS: { text: 4.5, 'large-text': 3, enhanced: 7, 'non-text': 3 }
     CONTRAST_PAIRS: [{ fg, bg, rule, use }]: a foreground role on a background role (--plx-sys-<fg> on --plx-sys-<bg>)
   Behavior:
     Ratios are not rounded: 4.49 fails the text rule. Colors are opaque in Plenix (opacity is its own token), so alpha is
     ignored.
   Notes:
     The rules are the baseline (WCAG 2.2 AA; enhanced is AAA for dense small text): never loosen them. A pair that fails is
     fixed by pointing a role at another palette color in that theme and mode, never by adding a color. */

// the minimum ratio of each rule (WCAG 2.2: 1.4.3, 1.4.6 and 1.4.11)
const CONTRAST_MINIMUMS = exports.CONTRAST_MINIMUMS = Object.freeze({
  text: 4.5,
  'large-text': 3,
  enhanced: 7,
  'non-text': 3
});

// the role pairs the themes must keep: text on its surfaces, content on its fills, marks and edges on the surface
const T = 'text',
  N = 'non-text';
const CONTRAST_PAIRS = exports.CONTRAST_PAIRS = Object.freeze([{
  fg: 'content-default',
  bg: 'surface-canvas',
  rule: T,
  use: 'Body text on the canvas'
}, {
  fg: 'content-default',
  bg: 'surface-default',
  rule: T,
  use: 'Body text on a surface'
}, {
  fg: 'content-default',
  bg: 'surface-raised',
  rule: T,
  use: 'Body text on a raised surface'
}, {
  fg: 'content-default',
  bg: 'surface-sunken',
  rule: T,
  use: 'Body text on a sunken surface (read-only fields)'
}, {
  fg: 'content-default',
  bg: 'surface-overlay',
  rule: T,
  use: 'Body text in menus and dialogs'
}, {
  fg: 'content-muted',
  bg: 'surface-default',
  rule: T,
  use: 'Secondary text on a surface'
}, {
  fg: 'content-muted',
  bg: 'surface-canvas',
  rule: T,
  use: 'Secondary text on the canvas'
}, {
  fg: 'content-link',
  bg: 'surface-default',
  rule: T,
  use: 'Links on a surface'
}, {
  fg: 'content-link-visited',
  bg: 'surface-default',
  rule: T,
  use: 'Visited links on a surface'
}, {
  fg: 'content-inverse',
  bg: 'surface-inverse',
  rule: T,
  use: 'Text on the inverse surface'
}, {
  fg: 'field-placeholder',
  bg: 'control-background',
  rule: T,
  use: 'Placeholder text in a field'
}, {
  fg: 'action-primary-content',
  bg: 'action-primary-background',
  rule: T,
  use: 'Primary button label'
}, {
  fg: 'action-danger-content',
  bg: 'action-danger-background',
  rule: T,
  use: 'Danger button label'
}, {
  fg: 'fill-neutral-content',
  bg: 'fill-neutral',
  rule: T,
  use: 'Label on a neutral fill (secondary button)'
}, {
  fg: 'selected-content',
  bg: 'state-selected',
  rule: T,
  use: 'Text of a selected row or item'
}, {
  fg: 'accent-content',
  bg: 'accent-surface',
  rule: T,
  use: 'Text in the accent header'
}, {
  fg: 'tooltip-content',
  bg: 'tooltip-background',
  rule: T,
  use: 'Tooltip text'
}, {
  fg: 'toast-content',
  bg: 'toast-background',
  rule: T,
  use: 'Toast text'
}, {
  fg: 'status-bar-content',
  bg: 'status-bar-background',
  rule: T,
  use: 'Status bar text'
}, {
  fg: 'data-table-text',
  bg: 'data-table-surface',
  rule: T,
  use: 'Table cells'
}, {
  fg: 'avatar-content',
  bg: 'avatar-background',
  rule: T,
  use: 'Avatar initials'
}, {
  fg: 'feedback-info-content',
  bg: 'feedback-info-soft',
  rule: T,
  use: 'Info message text'
}, {
  fg: 'feedback-success-content',
  bg: 'feedback-success-soft',
  rule: T,
  use: 'Success message text'
}, {
  fg: 'feedback-warning-content',
  bg: 'feedback-warning-soft',
  rule: T,
  use: 'Warning message text'
}, {
  fg: 'feedback-danger-content',
  bg: 'feedback-danger-soft',
  rule: T,
  use: 'Error message text'
}, {
  fg: 'feedback-neutral-content',
  bg: 'feedback-neutral-soft',
  rule: T,
  use: 'Neutral message text'
}, {
  fg: 'feedback-info-on-solid',
  bg: 'feedback-info-solid',
  rule: T,
  use: 'Text on a solid info badge'
}, {
  fg: 'feedback-success-on-solid',
  bg: 'feedback-success-solid',
  rule: T,
  use: 'Text on a solid success badge'
}, {
  fg: 'feedback-warning-on-solid',
  bg: 'feedback-warning-solid',
  rule: T,
  use: 'Text on a solid warning badge'
}, {
  fg: 'feedback-danger-on-solid',
  bg: 'feedback-danger-solid',
  rule: T,
  use: 'Text on a solid danger badge'
}, {
  fg: 'control-border',
  bg: 'control-background',
  rule: N,
  use: 'The edge of a field'
}, {
  fg: 'border-strong',
  bg: 'surface-default',
  rule: N,
  use: 'Strong borders and control edges'
}, {
  fg: 'focus-ring-color',
  bg: 'surface-default',
  rule: N,
  use: 'The focus color on a surface'
}, {
  fg: 'focus-ring-color',
  bg: 'surface-canvas',
  rule: N,
  use: 'The focus color on the canvas'
}, {
  fg: 'feedback-info-solid',
  bg: 'surface-default',
  rule: N,
  use: 'Info marks (dots, icons)'
}, {
  fg: 'feedback-success-solid',
  bg: 'surface-default',
  rule: N,
  use: 'Success marks (dots, icons)'
}, {
  fg: 'feedback-warning-solid',
  bg: 'surface-default',
  rule: N,
  use: 'Warning marks (dots, icons)'
}, {
  fg: 'feedback-danger-solid',
  bg: 'surface-default',
  rule: N,
  use: 'Danger marks (dots, icons)'
},
// the brand and status roles (color groups, owner 2026-10-13)
{
  fg: 'brand-on-primary',
  bg: 'brand-primary',
  rule: T,
  use: 'Text and icons on the brand blue (a product tile)'
}, {
  fg: 'status-online',
  bg: 'surface-default',
  rule: N,
  use: 'Presence: online (a dot)'
}, {
  fg: 'status-away',
  bg: 'surface-default',
  rule: N,
  use: 'Presence: away (a dot)'
}, {
  fg: 'status-busy',
  bg: 'surface-default',
  rule: N,
  use: 'Presence: busy (a dot)'
}, {
  fg: 'status-dnd',
  bg: 'surface-default',
  rule: N,
  use: 'Presence: do not disturb (a dot)'
}, {
  fg: 'status-offline',
  bg: 'surface-default',
  rule: N,
  use: 'Presence: offline (a dot)'
}, {
  fg: 'status-done',
  bg: 'surface-default',
  rule: N,
  use: 'Workflow: done (a dot, an icon)'
}, {
  fg: 'status-in-progress',
  bg: 'surface-default',
  rule: N,
  use: 'Workflow: in progress (a dot, an icon)'
}, {
  fg: 'status-blocked',
  bg: 'surface-default',
  rule: N,
  use: 'Workflow: blocked (a dot, an icon)'
}, {
  fg: 'status-not-started',
  bg: 'surface-default',
  rule: N,
  use: 'Workflow: not started (a dot, an icon)'
}]);
function parseColor(color) {
  const s = String(color || '').trim().toLowerCase();
  let m = /^#([0-9a-f]{3}|[0-9a-f]{6})([0-9a-f]{1,2})?$/.exec(s);
  if (m) {
    const h = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1];
    return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16));
  }
  m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(s);
  return m ? [+m[1], +m[2], +m[3]] : null;
}
function relativeLuminance(color) {
  const c = Array.isArray(color) ? color : parseColor(color);
  if (!c) return NaN;
  const lin = c.map(v => {
    const x = v / 255;
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}
function contrastRatio(a, b) {
  const la = relativeLuminance(a),
    lb = relativeLuminance(b);
  if (Number.isNaN(la) || Number.isNaN(lb)) return NaN;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function meetsContrast(ratio, rule = 'text') {
  const min = CONTRAST_MINIMUMS[rule];
  if (min == null) throw new Error('meetsContrast: no rule "' + rule + '" (text, large-text, enhanced, non-text)');
  return ratio >= min;
}
  } },
  "platform/utils/dataviz.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATAVIZ_STATUS = exports.DATAVIZ_SCALES = exports.DATAVIZ_ALERT = void 0;
exports.datavizCategory = datavizCategory;
exports.datavizStep = datavizStep;
exports.datavizToken = datavizToken;
/* Plenix · data visualization colors (platform/utils/dataviz.js): which chart color a series or a value takes.
   Summary: The chart scales (--plx-sys-dataviz-*, platform/tokens/semantic/dataviz.tokens.json) by name: categorical (6
     hues, the data colors in order), sequential (7 steps of one hue), diverging (7 steps, two hues around a neutral
     midpoint), status (positive, caution, negative, informative, neutral) and alert (warning, critical). The helpers return
     the step's name; data-plx-dataviz="<name>" on an element makes it the element's data color (system/dataviz.css sets
     --plx-comp-data-color), so a chart part fills itself with var(--plx-comp-data-color) and no style is written.
   Usage:
     import { datavizCategory, datavizStep } from 'plenix-platform';
     series.map((s, i) => <path key={s.id} className="my-line" data-plx-dataviz={datavizCategory(i)} />)
     <rect data-plx-dataviz={datavizStep('sequential', value, 0, 100)} />     // "sequential-5"
     <rect data-plx-dataviz={datavizStep('diverging', change, -10, 10)} />     // midpoint 0 -> "diverging-4"
     <line data-plx-dataviz="alert-critical" />
   Props:
     DATAVIZ_SCALES: { categorical: 6, sequential: 7, diverging: 7 }, the number of steps of each scale
     DATAVIZ_STATUS: ['positive', 'caution', 'negative', 'informative', 'neutral'] (data-plx-dataviz="status-<name>")
     DATAVIZ_ALERT: ['warning', 'critical'] (data-plx-dataviz="alert-<name>")
     datavizCategory(index): "categorical-1" to "categorical-6" for series index 0, 1, …; after six it starts again
     datavizStep(scale, value, min?, max?): the step of "sequential" or "diverging" for a value between min and max
       (default 0 and 1; values outside are clamped); for diverging the midpoint is halfway between min and max
     datavizToken(name): the token of a step, "--plx-sys-dataviz-" + name
   Behavior:
     A series keeps its color in every view: assign by a stable order (the series' order in the data), never by rank.
     The scales are the same in light and dark mode; marks keep 3:1 against the chart surface (the Contrast rules page).
   Notes:
     Color is never the only cue: label series directly or add markers and patterns (Use of color). Status and alert colors
     only where the data is a status or a threshold, never for ordinary series. More than six categories: group or filter. */

const DATAVIZ_SCALES = exports.DATAVIZ_SCALES = Object.freeze({
  categorical: 6,
  sequential: 7,
  diverging: 7
});
const DATAVIZ_STATUS = exports.DATAVIZ_STATUS = Object.freeze(['positive', 'caution', 'negative', 'informative', 'neutral']);
const DATAVIZ_ALERT = exports.DATAVIZ_ALERT = Object.freeze(['warning', 'critical']);
function datavizCategory(index) {
  const n = DATAVIZ_SCALES.categorical,
    i = Math.floor(Number(index) || 0);
  return 'categorical-' + ((i % n + n) % n + 1);
}
function datavizStep(scale, value, min = 0, max = 1) {
  const steps = DATAVIZ_SCALES[scale];
  if (!steps || scale === 'categorical') throw new Error('datavizStep: the scale is "sequential" or "diverging", not "' + scale + '"');
  const span = max - min;
  const t = span ? Math.min(1, Math.max(0, (Number(value) - min) / span)) : 0.5;
  return scale + '-' + Math.min(steps, Math.floor(t * steps) + 1);
}
function datavizToken(name) {
  return '--plx-sys-dataviz-' + name;
}
  } },
  "platform/utils/describedBy.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinIds = joinIds;
exports.useDescribedBy = useDescribedBy;
exports.useDescriptionId = useDescriptionId;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · accessible descriptions (platform/utils/describedBy.js): one way to tie descriptions to an element.
   Summary: joinIds merges description ids into one aria-describedby value (empty and repeated ids dropped, the order kept);
     useDescriptionId gives a component a stable id for its description; useDescribedBy builds the attribute from the ids a
     component has now. Field and Tooltip do this by hand today; new components use these.
   Usage:
     import { joinIds, useDescriptionId, useDescribedBy } from 'plenix-platform';
     const hintId = useDescriptionId('hint');
     const describedBy = useDescribedBy(props['aria-describedby'], hint && hintId, error && errorId);
     <input aria-describedby={describedBy} />
     <p id={hintId}>Use letters and numbers only</p>
   Props:
     joinIds(...ids): a string of ids separated by spaces, or undefined when there is none; each argument may itself hold
       several ids ("a b"), or be empty, false or undefined
     useDescriptionId(prefix?): a stable, unique id for this component ("plx-" + prefix + a React id); default prefix "desc"
     useDescribedBy(...ids): joinIds of the arguments (the hook form, for symmetry with useDescriptionId)
   Behavior:
     The ids already on the element come first (what its owner set), then the component's own, so nothing the owner
     described is lost. A description that is not shown (a hint only for screen readers) is VisuallyHidden text with the id.
   Notes:
     A description adds to the name, it never repeats it. Visible text first: aria-describedby points at text everyone can
     read (the hint, the error message); a hidden description only for what sighted people get from the layout. */

function joinIds(...ids) {
  const out = [];
  ids.forEach(v => {
    if (!v) return;
    String(v).split(/\s+/).forEach(id => {
      if (id && out.indexOf(id) < 0) out.push(id);
    });
  });
  return out.length ? out.join(' ') : undefined;
}
function useDescriptionId(prefix = 'desc') {
  return 'plx-' + prefix + _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
}
function useDescribedBy(...ids) {
  return joinIds(...ids);
}
  } },
  "platform/utils/scrollLock.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isScrollLocked = isScrollLocked;
exports.lockScroll = lockScroll;
exports.scrollLockCount = scrollLockCount;
exports.useScrollLock = useScrollLock;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · scroll lock (platform/utils/scrollLock.js): stops a scroll container scrolling while a modal layer covers it.
   Summary: lockScroll(target) locks the page (the html element) or one scroll container and returns the function that
     releases it; useScrollLock(active, ref) does the same for as long as a component asks. Locks are counted per target,
     so nested modals release the page only when the last one closes.
   Usage:
     import { useScrollLock, lockScroll } from 'plenix-platform';
     useScrollLock(open);                          // the page, while open
     useScrollLock(open, listRef);                 // one scroll container
     const release = lockScroll(); … release();    // outside React
   Props:
     lockScroll(target?): target is an element (default document.documentElement); returns release(), safe to call twice
     useScrollLock(active, ref?): locks while active is true; ref (a React ref) names the container, else the page
     isScrollLocked(target?): true while the target holds a lock
     scrollLockCount(target?): how many locks the target holds
   Behavior:
     A locked target carries data-plx-scroll-lock="locked" and system/scroll-lock.css stops it scrolling: overflow hidden in
     both directions, the scrollbar's space kept (scrollbar-gutter: stable) so nothing shifts, overscroll contained. The
     scroll position is not touched, so it is exactly where it was when the lock is released. Content inside the modal
     scrolls as usual.
   Notes:
     Only for modal layers (Dialog, a modal drawer or sheet, a full-screen overlay): never for menus, popovers, tooltips or
     toasts. Pair it with the modal's focus trap (utils/layer.js) so assistive technology also stays inside. */

const ATTR = 'data-plx-scroll-lock';
const counts = new Map();
const pageOf = target => target || (typeof document !== 'undefined' ? document.documentElement : null);
function lockScroll(target) {
  const el = pageOf(target);
  if (!el) return () => {};
  const n = (counts.get(el) || 0) + 1;
  counts.set(el, n);
  if (n === 1) el.setAttribute(ATTR, 'locked');
  let released = false;
  return function release() {
    if (released) return;
    released = true;
    const left = (counts.get(el) || 1) - 1;
    if (left > 0) {
      counts.set(el, left);
      return;
    }
    counts.delete(el);
    el.removeAttribute(ATTR);
  };
}
function isScrollLocked(target) {
  return (counts.get(pageOf(target)) || 0) > 0;
}
function scrollLockCount(target) {
  return counts.get(pageOf(target)) || 0;
}
function useScrollLock(active, ref) {
  _react.default.useEffect(() => {
    if (!active) return undefined;
    if (ref && !ref.current) return undefined;
    return lockScroll(ref ? ref.current : undefined);
  }, [active, ref]);
}
  } },
  "platform/components/Link/Link.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Link
   Summary: A link to another page or place: inside a sentence (inline), on its own line (standalone), to another site
     (external) or back to the page above (back).
   Usage:
     <Text as="p">Read the <Link href="../guides/upload.html">upload guide</Link> first.</Text>
     <Link href="../projects/" variant="standalone">View all projects</Link>
     <Link href="https://m3.material.io" external>Material guidelines</Link>
     <Link href="../" back>Projects</Link>
     <Link href="#" variant="subtle">Terms</Link>   <Link href="#" onAccent>Help</Link>
   Props:
     href: where it goes (required: a link without one is a button)
     variant: "inline" (default: in running text, always underlined) | "standalone" (on its own: medium weight, underlined
       on hover, as tall as the minimum target) | "subtle" (the text color, underlined: footers and fine print)
     external: another site: opens in a new tab (target="_blank", rel="noopener noreferrer"), shows the open icon after
       the text and tells assistive technology (strings.newTab)
     back: the page above: a leading chevron that points back; it draws as standalone
     onAccent: the version for the blue header and other accent surfaces (default false)
     visited: draws the visited color in documentation (the browser draws it on its own with :visited)
     as: another element or component that renders the anchor (a router's link); it gets href, className and the rest
     strings: the words it announces, for other languages: { newTab: "opens in a new tab" }
     children: the link text: says where it goes ("Upload guide"), never "click here"
     className: more classes on the link
   Behavior:
     Enter follows the link; it is one Tab stop. Hover thickens the underline (inline, subtle, on accent) or draws it
       (standalone, back).
     Keyboard focus shows the focus ring around the text (:focus-visible); a click does not.
     The back chevron mirrors in right-to-left pages (the icon set's bidirectional icons).
   Notes:
     The underline is the non-color sign of a link in running text (WCAG 1.4.1); standalone links are recognized by their
       place and weight.
     Use a Button for an action that changes data; a Link only goes somewhere.
     Other props pass through to the <a>. forwardRef: the ref is the <a>.
*/
const STRINGS = {
  newTab: 'opens in a new tab'
};
const Link = exports.Link = /*#__PURE__*/_react.default.forwardRef(function Link({
  href,
  variant = 'inline',
  external = false,
  back = false,
  onAccent = false,
  visited = false,
  as: Tag = 'a',
  strings,
  className,
  children,
  ...rest
}, ref) {
  const s = Object.assign({}, STRINGS, strings);
  const kind = back ? 'standalone' : variant;
  const newTab = external ? {
    target: '_blank',
    rel: 'noopener noreferrer'
  } : null;
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    ref: ref,
    href: href
  }, newTab, rest, {
    className: (0, _cx.cx)('plx-link', 'plx-link--' + kind, back && 'plx-link--back', external && 'plx-link--external', onAccent && 'plx-link--on-accent', visited && 'is-visited', className)
  }), back ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "chevron-left",
    className: "plx-link__icon"
  }) : null, children, external ? /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "open",
    className: "plx-link__icon"
  }) : null, external ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, " (", s.newTab, ")") : null);
});
  } },
  "platform/components/Code/Code.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Code = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Code
   Summary: A short piece of code inside a sentence (inline code): a file name, a class, a command, a token name, in the
     code font (DM Mono) on a neutral fill.
   Usage:
     <Text as="p">Add <Code>plx-link--standalone</Code> to the anchor.</Text>
     <Code onAccent>Ctrl K</Code>
     <Code truncate>platform/components/RichText/rich-text.css</Code>
   Props:
     onAccent: the version for the blue header and other accent surfaces (default false)
     truncate: keep it to one line, cut with an ellipsis where its box ends; the whole value is its title (default false)
     children: the code, as text
     className: more classes on the <code>
   Behavior:
     It takes the size and line height of the text around it, so the code font and the text share a baseline.
     A long value wraps anywhere rather than overflow its line; truncate keeps it to one line instead.
     It is not focusable and has no actions: to copy code, use a CodeBlock.
   Notes:
     Code for code only: technical values that are not code (sizes, dates, IDs) use Text variant="data".
     Other props pass through to the <code>. forwardRef: the ref is the <code>.
*/
const Code = exports.Code = /*#__PURE__*/_react.default.forwardRef(function Code({
  onAccent = false,
  truncate = false,
  className,
  children,
  ...rest
}, ref) {
  const title = truncate && typeof children === 'string' ? children : undefined;
  return /*#__PURE__*/_react.default.createElement("code", _extends({
    ref: ref,
    title: title
  }, rest, {
    className: (0, _cx.cx)('plx-code', onAccent && 'plx-code--on-accent', truncate && 'plx-code--truncate', className)
  }), children);
});
  } },
  "platform/components/Blockquote/Blockquote.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Blockquote = Blockquote;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Blockquote
   Summary: Words quoted from someone else (a person, a document, an earlier message), set apart from the text around it by
     a leading rule, with the source under it.
   Usage:
     <Blockquote citation="Ana Ruiz, project lead">Every room gets its own folder before the first upload.</Blockquote>
     <Blockquote cite="https://example.org/brief" citation="Kitchen brief, page 2">…</Blockquote>
     <Blockquote variant="pull">The archive is the product.</Blockquote>
   Props:
     variant: "default" (a quote in reading text: the body size, a rule at its start) | "pull" (a short line lifted out of
       the page to draw the eye: larger, medium weight, a stronger rule)
     citation: who or what is quoted, shown under the quote (optional)
     cite: the address of the source, for the blockquote's cite attribute (optional)
     children: the quoted text (one or more paragraphs)
     className: more classes on the <figure>
   Behavior:
     Not interactive. The quote keeps the reading width of its container and wraps.
     The rule sits at the start side: on the left in left-to-right pages, on the right in right-to-left ones.
   Notes:
     The quote is a <blockquote> inside a <figure>; the citation is its <figcaption>, so it is read with the quote but is
       not part of it.
     Quote exactly; mark what is left out with an ellipsis. Use a Notice, not a quote, to make a point stand out.
     Other props pass through to the <figure>.
*/
function Blockquote({
  variant = 'default',
  citation,
  cite,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/_react.default.createElement("figure", _extends({
    className: (0, _cx.cx)('plx-blockquote', variant === 'pull' && 'plx-blockquote--pull', className)
  }, rest), /*#__PURE__*/_react.default.createElement("blockquote", {
    className: "plx-blockquote__quote",
    cite: cite
  }, children), citation ? /*#__PURE__*/_react.default.createElement("figcaption", {
    className: "plx-blockquote__citation"
  }, citation) : null);
}
  } },
  "platform/components/RichText/RichText.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RichText = RichText;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · RichText
   Summary: A block of formatted reading text (prose): paragraphs, headings, lists, links, quotes, inline code and code
     blocks, from an editor's or a Markdown renderer's HTML or from JSX, in the Platform's type styles.
   Usage:
     <RichText>
       <h2>Before you upload</h2>
       <p>Name each file the way the <a href="../guides/naming.html">naming guide</a> says.</p>
       <ul><li>Photos</li><li>Drawings</li></ul>
     </RichText>
     <RichText variant="compact" html={sanitizedHtml} />
   Props:
     variant: "article" (default: a page of reading: 14px text, 24px lines, a reading width of about 80 characters) |
       "compact" (notes, comments and help in a panel: the body size, 20px lines, the container's width)
     html: HTML to show, already sanitized by the application (see Notes); without it, the children
     as: the element: "div" (default) | "article" | "section"
     label: names the region for assistive technology when it is a landmark (as="section")
     children: the content, as plain elements (h2, p, ul, ol, li, a, strong, em, code, pre, blockquote, hr, img, figure)
     className: more classes on the container
   Behavior:
     Not interactive itself; links inside it are one Tab stop each and take the Link's look and focus ring.
     Blocks are spaced by the variant's rhythm; a heading has more space above it than below.
     Long words and addresses wrap; a code block (pre) scrolls sideways inside its box and is one Tab stop when it
       overflows (give it tabindex="0" and a name in the content).
     Lists take their markers from the writing direction; the quote's rule sits at the start side.
   Notes:
     It sanitizes nothing: HTML from people (comments, imported documents) must be cleaned by the application first (an
       allow-list of the elements above, no scripts, no event attributes, no style attributes).
     It uses the elements' own styles from Link, Code and Blockquote, so a link in prose looks like <Link>.
     Tables are not prose: show a table from content with the DataTable.
     Keep the real heading levels and list markup: screen readers move through them.
     Other props pass through to the container.
*/
function RichText({
  variant = 'article',
  html,
  as: Tag = 'div',
  label,
  className,
  children,
  ...rest
}) {
  const content = html != null ? {
    dangerouslySetInnerHTML: {
      __html: html
    }
  } : null;
  return /*#__PURE__*/_react.default.createElement(Tag, _extends({
    "aria-label": label
  }, content, rest, {
    className: (0, _cx.cx)('plx-rich-text', 'plx-rich-text--' + (variant === 'compact' ? 'compact' : 'article'), className)
  }), html != null ? undefined : children);
}
  } },
  "platform/providers/DirectionProvider.jsx": { deps: {"react":null,"../utils/direction.js":"platform/utils/direction.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionContext = void 0;
exports.DirectionProvider = DirectionProvider;
exports.useDirection = useDirection;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../utils/direction.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · DirectionProvider, useDirection
   Summary: Sets the writing direction (left to right or right to left) of an application or of one region, and tells
     React components which it is.
   Usage:
     <DirectionProvider dir="rtl" lang="ar">{app}</DirectionProvider>
     <DirectionProvider locale="he-IL" root>{app}</DirectionProvider>   // on <html>: the whole page
     const { dir, setDir } = useDirection();
   Props:
     dir: "ltr" | "rtl"; without it, the direction of locale, else of the page
     locale: a language tag ("ar-EG", "en-US"); it sets lang and, without dir, the direction (directionOf)
     lang: the lang attribute, when it is not the locale
     root: set dir and lang on <html> instead of a region (default false): the page, its portals and its scrollbars mirror
     children: the application root or the region it wraps
     useDirection(): { dir, rtl, setDir(dir) }: the nearest provider's direction (outside one, the page's), and a way to
       change it
   Behavior:
     A region: a wrapper (div.plx-direction, display: contents, so it adds no box) with dir and lang; everything inside
       it lays out in that direction, as the stylesheets use logical properties.
     With root, the attributes go on <html> and are put back as they were when the provider unmounts.
     Overlays drawn in a Portal take the direction of where they were written (the Portal copies dir and lang).
   Notes:
     Mirror the layout, not the content: text, numbers, media controls, clocks and the icons that are not directional
       keep their shape; the icon set mirrors its directional icons (arrows, chevrons, undo and redo) by itself.
     Script reads the direction where it measures or handles arrow keys (utils/direction.js: arrowStep, physicalSide).
*/

const DirectionContext = exports.DirectionContext = /*#__PURE__*/_react.default.createContext(null);
function DirectionProvider({
  dir,
  locale,
  lang,
  root = false,
  children
}) {
  const wanted = dir || (locale ? (0, _direction.directionOf)(locale) : null);
  const [own, setOwn] = _react.default.useState(wanted);
  _react.default.useEffect(() => {
    setOwn(wanted);
  }, [wanted]);
  const current = own || (typeof document !== 'undefined' ? (0, _direction.getDirection)() : 'ltr');
  const language = lang || locale || undefined;
  _react.default.useLayoutEffect(() => {
    if (!root) return undefined;
    const html = document.documentElement,
      before = {
        dir: html.getAttribute('dir'),
        lang: html.getAttribute('lang')
      };
    html.setAttribute('dir', current);
    if (language) html.setAttribute('lang', language);
    return () => {
      if (before.dir == null) html.removeAttribute('dir');else html.setAttribute('dir', before.dir);
      if (language) {
        if (before.lang == null) html.removeAttribute('lang');else html.setAttribute('lang', before.lang);
      }
    };
  }, [root, current, language]);
  const value = _react.default.useMemo(() => ({
    dir: current,
    rtl: current === 'rtl',
    setDir: d => setOwn(d === 'rtl' ? 'rtl' : 'ltr')
  }), [current]);
  return /*#__PURE__*/_react.default.createElement(DirectionContext.Provider, {
    value: value
  }, root ? children : /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-direction",
    dir: current,
    lang: language
  }, children));
}
function useDirection() {
  const ctx = _react.default.useContext(DirectionContext);
  const [page, setPage] = _react.default.useState(() => typeof document !== 'undefined' ? (0, _direction.getDirection)() : 'ltr');
  _react.default.useEffect(() => {
    if (ctx) return undefined;
    const observer = new MutationObserver(() => setPage((0, _direction.getDirection)()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });
    return () => observer.disconnect();
  }, [ctx]);
  if (ctx) return ctx;
  return {
    dir: page,
    rtl: page === 'rtl',
    setDir: d => document.documentElement.setAttribute('dir', d === 'rtl' ? 'rtl' : 'ltr')
  };
}
  } },
  "platform/hooks/usePressable.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePressable = usePressable;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · usePressable
   Summary: One press from every input: a mouse click, a tap, a pen, Enter or Space on the keyboard, and the click a
     screen reader sends all call onPress once, with the kind of input that made it. While the press is held the element
     is pressed, so it can show the pressed treatment (is-pressed, system/interaction.css).
   Usage:
     const { pressed, pressProps } = usePressable({ onPress: (e) => open(e.pointerType) });
     <button type="button" className={cx('plx-state', pressed && 'is-pressed')} {...pressProps}>Open</button>
     <div role="button" tabIndex={0} {...pressProps}>…</div>          // a custom surface: the role and the Tab stop are yours
   Props:
     options.onPress({ pointerType, target, shiftKey, ctrlKey, metaKey, altKey }): the press, once; pointerType is
       "mouse", "touch", "pen", "keyboard" or "virtual" (a screen reader's or a script's click)
     options.onPressStart({ pointerType }): the press begins (pointer down, or the key goes down)
     options.onPressEnd({ pointerType }): the press ends, whether it was made or canceled
     options.onPressChange(pressed): the pressed state changes
     options.disabled (false): no press, no pressed state; the element keeps its focus behavior
     options.handlers ({}): your own handlers of the same events (onClick, onKeyDown, …); they run first
     returns { pressed, pressProps }: pressProps go on the element (onPointerDown, onPointerUp, onPointerEnter,
       onPointerLeave, onPointerCancel, onKeyDown, onKeyUp, onBlur, onClick)
   Behavior:
     Pointer: the press is made on release over the element (the browser's click), so sliding off before release cancels
       it (WCAG 2.2, 2.5.2 Pointer cancellation); sliding back on while held presses it again. Only the primary button presses.
     Keyboard: Enter presses when it goes down (as a native button does) and does not repeat while held; Space presses
       when it comes up, and Escape or moving focus away while it is held cancels it. A link (a[href]) keeps Enter for itself.
     A click with no pointer and no key (a screen reader activating the element) presses with pointerType "virtual".
     Your own handlers of the same events still run: pass them in options.handlers and they run first; preventDefault
       in one stops the press.
   Notes:
     It gives behavior, not semantics: put it on a native button whenever you can. A custom surface needs role="button"
       (or the role of its widget), tabIndex 0 and a name; the check-system rule semantic-html rejects a clickable div
       without a role.
     Hover is not a press: hover treatment comes from :hover, which touch screens do not keep after a tap.
*/

const PRIMARY = 0;
function usePressable(options = {}) {
  const {
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    disabled = false,
    handlers = {}
  } = options;
  const [pressed, setPressedState] = _react.default.useState(false);
  // what is held now: { pointerType } while a pointer or key holds the press; the key that holds it
  const hold = _react.default.useRef(null);
  const key = _react.default.useRef(null);
  const lastPointer = _react.default.useRef(null);
  const latest = _react.default.useRef(options);
  latest.current = options;
  const setPressed = on => {
    setPressedState(on);
    if (latest.current.onPressChange) latest.current.onPressChange(on);
  };
  const start = pointerType => {
    hold.current = {
      pointerType
    };
    setPressed(true);
    if (onPressStart) onPressStart({
      pointerType
    });
  };
  const end = () => {
    const was = hold.current;
    hold.current = null;
    setPressed(false);
    if (was && onPressEnd) onPressEnd({
      pointerType: was.pointerType
    });
  };
  const fire = (e, pointerType) => {
    if (onPress) onPress({
      pointerType,
      target: e.currentTarget,
      shiftKey: !!e.shiftKey,
      ctrlKey: !!e.ctrlKey,
      metaKey: !!e.metaKey,
      altKey: !!e.altKey
    });
  };
  // the caller's own handler first; preventDefault in it stops the press
  const chain = (name, own) => e => {
    if (handlers[name]) handlers[name](e);
    if (disabled || e.defaultPrevented) return;
    own(e);
  };
  const isLink = el => el && el.tagName === 'A' && el.hasAttribute('href');
  _react.default.useEffect(() => {
    if (disabled && hold.current) end();
  });
  const pressProps = {
    onPointerDown: chain('onPointerDown', e => {
      if (e.button !== PRIMARY) return;
      const el = e.currentTarget;
      lastPointer.current = e.pointerType || 'mouse';
      start(lastPointer.current);
      // the release may happen anywhere: it ends the press; off the element it also cancels it (no click follows)
      const up = u => {
        window.removeEventListener('pointerup', up, true);
        window.removeEventListener('pointercancel', up, true);
        if (u.type === 'pointercancel' || !el.contains(u.target)) lastPointer.current = null;
        if (hold.current && hold.current.pointerType !== 'keyboard') end();
      };
      window.addEventListener('pointerup', up, true);
      window.addEventListener('pointercancel', up, true);
    }),
    onPointerUp: chain('onPointerUp', () => {
      if (hold.current && hold.current.pointerType !== 'keyboard') end();
    }),
    onPointerCancel: chain('onPointerCancel', () => {
      if (hold.current) end();
      lastPointer.current = null;
    }),
    onPointerLeave: chain('onPointerLeave', () => {
      if (hold.current && hold.current.pointerType !== 'keyboard') {
        hold.current.left = true;
        setPressed(false);
      }
    }),
    onPointerEnter: chain('onPointerEnter', e => {
      if (hold.current && hold.current.left && e.buttons & 1) {
        hold.current.left = false;
        setPressed(true);
      }
    }),
    onKeyDown: chain('onKeyDown', e => {
      lastPointer.current = null;
      if (e.key === 'Escape' && key.current) {
        key.current = null;
        end();
        return;
      }
      if (e.key === 'Enter' && !isLink(e.currentTarget)) {
        e.preventDefault(); // the native button's own click would press twice
        if (e.repeat) return;
        start('keyboard');
        fire(e, 'keyboard');
        end();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // no page scroll, no native click
        if (e.repeat || key.current) return;
        key.current = ' ';
        start('keyboard');
      }
    }),
    onKeyUp: chain('onKeyUp', e => {
      if ((e.key === ' ' || e.key === 'Spacebar') && key.current) {
        e.preventDefault();
        key.current = null;
        fire(e, 'keyboard');
        end();
      }
    }),
    onBlur: chain('onBlur', () => {
      if (key.current) {
        key.current = null;
        end();
      }
    }),
    onClick: chain('onClick', e => {
      const pointerType = lastPointer.current;
      lastPointer.current = null;
      if (pointerType) {
        if (hold.current) end();
        fire(e, pointerType);
        return;
      }
      if (e.detail === 0) fire(e, 'virtual'); // a click with no pointer and no key: assistive technology or a script
    })
  };
  // the caller's other handlers pass through untouched
  Object.keys(handlers).forEach(name => {
    if (!pressProps[name]) pressProps[name] = handlers[name];
  });
  return {
    pressed: !disabled && pressed,
    pressProps
  };
}
  } },
  "platform/hooks/useFocusable.js": { deps: {"react":null,"../utils/roving.js":"platform/utils/roving.js","../utils/direction.js":"platform/utils/direction.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFocusGroup = useFocusGroup;
exports.useFocusable = useFocusable;
var _react = _interopRequireDefault(require("react"));
var _roving = require("../utils/roving.js");
var _direction = require("../utils/direction.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useFocusable, useFocusGroup
   Summary: Focus for custom elements, the way native controls have it. useFocusable makes an element a Tab stop (or a
     focus target only) and tells whether its focus came from the keyboard (focus-visible), so the focus treatment shows
     for the keyboard and not after a click. useFocusGroup makes a group of controls one Tab stop whose items are reached
     with the arrow keys (roving focus: a toolbar, a list of options, a grid of tiles).
   Usage:
     const { focused, focusVisible, focusProps } = useFocusable();
     <div role="option" aria-selected={on} className={cx('plx-state', focusVisible && 'is-focus-visible')} {...focusProps}>…</div>
     const ref = React.useRef(null);
     const { groupProps } = useFocusGroup(ref, { orientation: 'vertical' });
     <div ref={ref} role="listbox" aria-label="Folders" {...groupProps}>{options}</div>
   Props:
     useFocusable(options).tabStop ("tab"): "tab" puts it in the Tab order (tabIndex 0); "target" makes it focusable
       only from code or a click (tabIndex -1, a skip-link target or a dialog's heading); "none" leaves tabIndex alone
       (a native control, or an item of a focus group, whose tabIndex the group sets)
     useFocusable(options).disabled (false): no Tab stop (an item that is disabled is skipped)
     useFocusable(options).onFocusChange(focused, visible): the focus changes
     useFocusable(options).handlers ({}): your own onFocus and onBlur; they run first
     useFocusable returns { focused, focusVisible, focusProps } (tabIndex, onFocus, onBlur)
     useFocusGroup(ref, options).orientation ("horizontal"): "horizontal" (Left and Right, in reading order),
       "vertical" (Up and Down) or "both" (all four arrows: a grid read in order)
     useFocusGroup(ref, options).loop (true): the last item's next is the first
     useFocusGroup(ref, options).items (a selector): which descendants are items; default the enabled buttons, links,
       inputs, selects and elements with a tabindex
     useFocusGroup(ref, options).onKeyDown(event): runs first; preventDefault stops the group's own key handling
     useFocusGroup returns { groupProps } (onKeyDown, onFocus) for the group element
   Behavior:
     focusVisible follows the browser's :focus-visible: true after Tab, an arrow key or focus moved by a keyboard command,
       false after a mouse click or a tap on a non-text element. A text field is always focus-visible (it shows its caret).
     A focus group has one Tab stop: the item focused last (else the first) has tabIndex 0 and the others -1 (the roving
       focus of utils/roving.js), so Tab enters and leaves the group in one step. The arrows move to the next and previous
       items in reading order (right to left reverses Left and Right), Home and End to the first and last. In a text field
       Left and Right move the caret instead. Hidden items are skipped.
   Notes:
     Make only interactive elements focusable: a heading or a paragraph is not a Tab stop. A scroll area that holds no
       control is the exception: give it tabStop "tab" and a name (role="region" with aria-label) so the keyboard can
       scroll it.
     The focus treatment is the system's (Focus treatment, system/interaction.css): a ring on controls, the border color
       on fields; never remove it without the replacement.
*/

const ITEMS = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([disabled]):not([aria-disabled="true"])';
function isVisibleFocus(el) {
  try {
    return el.matches(':focus-visible');
  } catch (e) {
    return true;
  } // a browser without :focus-visible shows it always
}
function useFocusable(options = {}) {
  const {
    tabStop = 'tab',
    disabled = false,
    onFocusChange,
    handlers = {}
  } = options;
  const [state, setState] = _react.default.useState({
    focused: false,
    visible: false
  });
  const set = (focused, visible) => {
    setState(s => s.focused === focused && s.visible === visible ? s : {
      focused,
      visible
    });
    if (onFocusChange) onFocusChange(focused, visible);
  };
  const focusProps = {
    onFocus: e => {
      if (handlers.onFocus) handlers.onFocus(e);
      if (e.target === e.currentTarget) set(true, isVisibleFocus(e.currentTarget));
    },
    onBlur: e => {
      if (handlers.onBlur) handlers.onBlur(e);
      if (e.target === e.currentTarget) set(false, false);
    }
  };
  if (tabStop !== 'none') focusProps.tabIndex = disabled ? undefined : tabStop === 'target' ? -1 : 0;
  return {
    focused: state.focused,
    focusVisible: state.focused && state.visible,
    focusProps
  };
}
function useFocusGroup(ref, options = {}) {
  const {
    orientation = 'horizontal',
    loop = true,
    items: selector = ITEMS,
    onKeyDown
  } = options;
  const itemsOf = () => ref.current ? Array.prototype.filter.call(ref.current.querySelectorAll(selector), el => el.getClientRects().length > 0 && !el.closest('[hidden]')) : [];
  (0, _roving.useRovingFocus)(ref, itemsOf);
  const KEYS = orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : orientation === 'both' ? ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] : ['ArrowLeft', 'ArrowRight'];
  const groupProps = {
    onKeyDown: e => {
      if (onKeyDown) onKeyDown(e);
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (KEYS.indexOf(e.key) < 0 && e.key !== 'Home' && e.key !== 'End') return;
      const t = e.target;
      if ((t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End')) return;
      const list = itemsOf();
      const i = list.indexOf(document.activeElement);
      if (i < 0 || !list.length) return;
      let n;
      if (e.key === 'Home') n = 0;else if (e.key === 'End') n = list.length - 1;else {
        const step = (0, _direction.arrowStep)(e, ref.current, {
          vertical: orientation !== 'horizontal'
        });
        if (!step) return;
        n = i + step;
        if (n < 0 || n >= list.length) {
          if (!loop) return;
          n = (n + list.length) % list.length;
        }
      }
      e.preventDefault();
      list[n].focus();
    },
    onFocus: e => {
      (0, _roving.roveTo)(ref, itemsOf(), e.target);
    }
  };
  return {
    groupProps
  };
}
  } },
  "platform/hooks/useSelection.js": { deps: {"react":null}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelection = useSelection;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useSelection
   Summary: The selection of a collection (a list, a grid of tiles, a table's rows) as one model: single selection (one
     item, choosing another replaces it) or multiple selection (toggle items, extend a range from the anchor, select all),
     with the counts a select-all checkbox and a selection summary need.
   Usage:
     const sel = useSelection({ items: files.map((f) => f.id), mode: 'multiple' });
     <Checkbox label="Select all" checked={sel.allSelected} indeterminate={sel.someSelected} onChange={sel.toggleAll} />
     {files.map((f) => <Checkbox key={f.id} label={f.name} checked={sel.isSelected(f.id)} onChange={() => sel.toggle(f.id)} />)}
     <RowButton selected={sel.isSelected(id)} onClick={(e) => sel.choose(id, e)}>…</RowButton>     // click, Shift, Ctrl or ⌘
   Props:
     options.items ([]): the keys of the items, in their order (the order a range follows)
     options.mode ("multiple"): "single" | "multiple"
     options.selected: the selected keys (controlled); with onChange
     options.defaultSelected ([]): the keys selected at first (uncontrolled)
     options.onChange(keys): the selection changes; keys in the items' order
     options.disallowEmpty (false): single mode: choosing the selected item again keeps it (a radio group's rule)
     options.behavior ("toggle"): multiple mode, what a plain choose(key) does: "toggle" adds or removes the item (a list
       with checkboxes); "replace" selects only it, as a file manager does (Ctrl or ⌘ toggles, Shift extends)
     options.disabledKeys ([]): keys that cannot be selected (select all skips them)
     returns { selected (keys, in order), count, isSelected(key), select(key), deselect(key), toggle(key), extendTo(key),
       choose(key, event), selectAll(), clear(), toggleAll(), setSelected(keys), allSelected, someSelected, anchor }
   Behavior:
     single: select, toggle and choose make the item the only one; toggle on the selected item clears it unless
       disallowEmpty. selectAll and extendTo do nothing.
     multiple: toggle adds or removes; extendTo selects every item from the anchor (the item chosen last without Shift)
       to the key, keeping what was selected before the anchor's range; choose reads the event: Shift extends, Ctrl or ⌘
       toggles, a plain choose follows behavior.
     allSelected is true when every selectable item is selected; someSelected when some but not all are (the mixed state
       of a select-all checkbox). Keys that leave items stay selected until the selection changes; then they are dropped.
   Notes:
     It holds the model, not the look or the keys: show selection with the selected treatment and a check (never color
       alone), expose it with aria-selected (options, rows, tiles) or aria-checked (checkboxes), and move focus with
       useFocusGroup. Space toggles the focused item; Shift with an arrow extends: call toggle and extendTo from the keys.
     Announce bulk changes ("12 selected") with announce() from the live region utility.
*/

const ordered = (items, set) => items.filter(k => set.has(k));
function useSelection(options = {}) {
  const {
    items = [],
    mode = 'multiple',
    selected: controlled,
    defaultSelected = [],
    onChange,
    disallowEmpty = false,
    behavior = 'toggle',
    disabledKeys = []
  } = options;
  const [own, setOwn] = _react.default.useState(() => new Set(defaultSelected));
  const anchor = _react.default.useRef(null);
  const current = controlled ? new Set(controlled) : own;
  const blocked = new Set(disabledKeys);
  const selectable = items.filter(k => !blocked.has(k));
  const commit = next => {
    const keys = ordered(items, next);
    if (!controlled) setOwn(new Set(keys));
    if (onChange) onChange(keys);
  };
  const single = mode === 'single';
  const isSelected = key => current.has(key);
  const select = key => {
    if (blocked.has(key)) return;
    anchor.current = key;
    if (single) {
      if (!(current.size === 1 && current.has(key))) commit(new Set([key]));
      return;
    }
    if (!current.has(key)) commit(new Set(current).add(key));
  };
  const deselect = key => {
    if (!current.has(key) || single && disallowEmpty) return;
    const next = new Set(current);
    next.delete(key);
    commit(next);
  };
  const toggle = key => {
    if (blocked.has(key)) return;
    if (current.has(key)) {
      anchor.current = key;
      deselect(key);
    } else select(key);
  };
  const extendTo = key => {
    if (single || blocked.has(key)) return;
    const from = anchor.current != null && items.indexOf(anchor.current) >= 0 ? items.indexOf(anchor.current) : items.indexOf(key);
    const to = items.indexOf(key);
    if (to < 0) return;
    const next = new Set(current);
    items.slice(Math.min(from, to), Math.max(from, to) + 1).forEach(k => {
      if (!blocked.has(k)) next.add(k);
    });
    commit(next);
  };
  const choose = (key, e) => {
    if (single) {
      if (current.has(key) && !disallowEmpty && e && (e.ctrlKey || e.metaKey)) deselect(key);else select(key);
      return;
    }
    if (e && e.shiftKey) {
      extendTo(key);
      return;
    }
    if (e && (e.ctrlKey || e.metaKey) || behavior === 'toggle') {
      toggle(key);
      return;
    }
    anchor.current = key;
    if (!(current.size === 1 && current.has(key))) commit(new Set([key]));
  };
  const selectAll = () => {
    if (!single) commit(new Set(selectable));
  };
  const clear = () => {
    if (current.size && !(single && disallowEmpty)) commit(new Set());
  };
  const count = ordered(items, current).length;
  const allSelected = selectable.length > 0 && selectable.every(k => current.has(k));
  const someSelected = count > 0 && !allSelected;
  const toggleAll = () => {
    if (allSelected) clear();else selectAll();
  };
  const setSelected = keys => commit(new Set(single ? [].concat(keys).slice(0, 1) : keys));
  return {
    selected: ordered(items, current),
    count,
    isSelected,
    select,
    deselect,
    toggle,
    extendTo,
    choose,
    selectAll,
    clear,
    toggleAll,
    setSelected,
    allSelected,
    someSelected,
    anchor: anchor.current
  };
}
  } },
  "platform/hooks/useGesture.js": { deps: {"react":null,"../utils/direction.js":"platform/utils/direction.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flingDistance = flingDistance;
exports.gestureTokens = gestureTokens;
exports.useGesture = useGesture;
var _react = _interopRequireDefault(require("react"));
var _direction = require("../utils/direction.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix · useGesture
   Summary: Touch, pen and mouse gestures from pointer events, on the gesture motion tokens: tap, long press, pan (drag),
     swipe, fling, pinch to zoom and pull to refresh. It reports what the pointers do; the component decides what moves
     and always offers the same action as a visible control (a button or a menu item).
   Usage:
     const ref = React.useRef(null);
     useGesture(ref, { axis: 'x', onSwipe: (g) => { if (g.direction === 'left') archive(); } });          // swipe a row
     useGesture(ref, { onLongPress: (g) => openMenuAt(g.x, g.y) });                                         // long press
     useGesture(ref, { onPinch: (g) => setZoom(clamp(base * g.scale, 1, g.maxScale)) });                   // pinch to zoom
     useGesture(listRef, { pull: true, onPull: (g) => setPull(g), onRefresh: reload });                      // pull to refresh
     <div ref={ref} className="plx-gesture plx-gesture--pan-y">…</div>                                      // system/gesture.css
   Props:
     ref: a ref to the element that takes the gestures
     options.axis ("both"): "x" | "y" | "both": the pan and swipe axis; movement mostly along the other axis is left to
       the browser (the page still scrolls)
     options.onTap({ x, y, pointerType }): a press released without moving past the slop and before the long-press delay
     options.onLongPress({ x, y, pointerType }): held still for --plx-sys-gesture-long-press-delay
     options.onPanStart(g), options.onPan(g), options.onPanEnd(g): a drag past --plx-sys-gesture-slop; g = { dx, dy (from
       the start), vx, vy (px per ms), pointerType, canceled (onPanEnd: the pointer was canceled) }
     options.onSwipe({ direction, inline, distance, velocity }): a pan released past --plx-sys-gesture-swipe-distance, or
       faster than --plx-sys-gesture-fling-velocity; direction "left" | "right" | "up" | "down", inline "start" | "end"
       (left and right in reading order) or null
     options.onFling({ vx, vy, direction, travelX, travelY }): released faster than the fling velocity; travel is how
       far it would coast on --plx-sys-gesture-fling-decay (flingDistance)
     options.onPinch({ scale, originX, originY, maxScale, first }), options.onPinchEnd({ scale }): two pointers; scale is
       relative to the pinch's start, maxScale the --plx-sys-gesture-pinch-max-scale token
     options.pull (false): pull to refresh: a downward pan that starts with the element scrolled to its top
     options.onPull({ distance, progress, ready, released }): the pull after --plx-sys-gesture-pull-resistance; ready
       once it reaches --plx-sys-gesture-pull-distance; released when the finger lifts (distance 0)
     options.onRefresh(): the pull was released while ready
     options.disabled (false): no gestures
     returns { active }: the gesture under way: null, "press", "pan", "pinch" or "pull" (to style the element)
   Behavior:
     Gestures end on release, so moving back before lifting cancels a swipe (WCAG 2.2, 2.5.2); a pointer that leaves the
       window or is canceled by the system ends the pan with canceled true.
     The pointer is captured once a pan starts, so it is followed outside the element; a tap on a child still clicks it.
     Only the primary mouse button starts a gesture. A second finger turns a press or a pan into a pinch.
     Every distance, time and rate is a token read when the gesture starts, so the density and interaction contexts apply.
   Notes:
     A gesture is a shortcut, never the only way: swipe to archive has an Archive button, pinch has zoom buttons, pull to
       refresh has a Refresh button, a long press has the same menu on its button (WCAG 2.2, 2.5.1 and 2.5.7).
     Give the element touch-action through system/gesture.css (plx-gesture, plx-gesture--pan-x, plx-gesture--pan-y) so
       the browser does not scroll or zoom while the gesture is tracked.
     Moving an element with the finger is the component's own stylesheet's work (steps through a data attribute); the
       settle after it is .plx-gesture-settle (--plx-sys-gesture-settle-duration and -easing). Reduced motion settles at once.
*/

const VELOCITY_WINDOW = 100; // the last 100 ms of movement give the release velocity (a sampling window, not a look)

// a token's value on the element: a length in px (rem converted), a time in ms, or a number
function tokenOn(el, name) {
  const cs = getComputedStyle(el),
    v = cs.getPropertyValue(name).trim(),
    n = parseFloat(v);
  if (isNaN(n)) return NaN;
  if (/rem$/.test(v)) return n * parseFloat(getComputedStyle(document.documentElement).fontSize);
  if (/ms$/.test(v)) return n;
  if (/s$/.test(v)) return n * 1000;
  return n;
}

// the gesture tokens as numbers, read from the element (or the page)
function gestureTokens(el) {
  const at = el || (typeof document !== 'undefined' ? document.documentElement : null);
  const t = name => at ? tokenOn(at, '--plx-sys-gesture-' + name) : NaN;
  return {
    slop: t('slop'),
    swipeDistance: t('swipe-distance'),
    flingVelocity: t('fling-velocity'),
    flingDecay: t('fling-decay'),
    longPressDelay: t('long-press-delay'),
    pullDistance: t('pull-distance'),
    pullResistance: t('pull-resistance'),
    pinchMaxScale: t('pinch-max-scale')
  };
}

// how far something released at velocity v (px per ms) coasts when it keeps decay of its speed each millisecond
function flingDistance(v, decay) {
  if (!(decay > 0 && decay < 1)) return 0;
  return v * decay / (1 - decay);
}
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function useGesture(ref, options = {}) {
  const [active, setActive] = _react.default.useState(null);
  const latest = _react.default.useRef(options);
  latest.current = options;
  const disabled = !!options.disabled;
  _react.default.useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return undefined;
    const pointers = new Map();
    let g = null; // the gesture: { mode, start, samples, tokens, timer, … }
    const call = (name, arg) => {
      const f = latest.current[name];
      if (f) f(arg);
    };
    const mode = m => {
      if (g) g.mode = m;
      setActive(m);
    };
    const velocity = () => {
      const s = g.samples,
        last = s[s.length - 1];
      let first = s[0];
      for (let i = s.length - 1; i >= 0; i--) {
        if (last.t - s[i].t > VELOCITY_WINDOW) break;
        first = s[i];
      }
      const dt = last.t - first.t;
      return dt > 0 ? {
        vx: (last.x - first.x) / dt,
        vy: (last.y - first.y) / dt
      } : {
        vx: 0,
        vy: 0
      };
    };
    const capture = e => {
      if (el.setPointerCapture) {
        try {
          el.setPointerCapture(e.pointerId);
        } catch (err) {/* the pointer is gone */}
      }
    };
    const clearTimer = () => {
      if (g && g.timer) {
        clearTimeout(g.timer);
        g.timer = null;
      }
    };
    const finish = () => {
      clearTimer();
      g = null;
      setActive(null);
    };
    const pinchState = () => {
      const [a, b] = Array.from(pointers.values());
      return {
        a,
        b,
        d: dist(a, b),
        cx: (a.x + b.x) / 2,
        cy: (a.y + b.y) / 2
      };
    };
    const onDown = e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointers.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY
      });
      const o = latest.current;
      if (pointers.size === 2 && o.onPinch) {
        clearTimer();
        if (g && g.mode === 'pan') call('onPanEnd', {
          dx: 0,
          dy: 0,
          vx: 0,
          vy: 0,
          pointerType: g.pointerType,
          canceled: true
        });
        const p = pinchState();
        g = Object.assign(g || {}, {
          startDist: p.d || 1,
          tokens: g && g.tokens || gestureTokens(el)
        });
        mode('pinch');
        call('onPinch', {
          scale: 1,
          originX: p.cx,
          originY: p.cy,
          maxScale: g.tokens.pinchMaxScale,
          first: true
        });
        return;
      }
      if (pointers.size > 1) return;
      const tokens = gestureTokens(el);
      g = {
        mode: 'press',
        pointerId: e.pointerId,
        pointerType: e.pointerType || 'mouse',
        start: {
          x: e.clientX,
          y: e.clientY,
          t: e.timeStamp
        },
        samples: [{
          x: e.clientX,
          y: e.clientY,
          t: e.timeStamp
        }],
        tokens,
        timer: null,
        long: false,
        atTop: el.scrollTop <= 0
      };
      setActive('press');
      if (o.onLongPress) {
        g.timer = setTimeout(() => {
          if (!g || g.mode !== 'press') return;
          g.long = true;
          g.timer = null;
          call('onLongPress', {
            x: g.start.x,
            y: g.start.y,
            pointerType: g.pointerType
          });
        }, tokens.longPressDelay || 0);
      }
    };
    const onMove = e => {
      if (!g || !pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY
      });
      const o = latest.current;
      if (g.mode === 'pinch') {
        if (pointers.size < 2) return;
        const p = pinchState();
        call('onPinch', {
          scale: p.d / g.startDist,
          originX: p.cx,
          originY: p.cy,
          maxScale: g.tokens.pinchMaxScale,
          first: false
        });
        return;
      }
      if (e.pointerId !== g.pointerId) return;
      g.samples.push({
        x: e.clientX,
        y: e.clientY,
        t: e.timeStamp
      });
      if (g.samples.length > 32) g.samples.shift();
      const dx = e.clientX - g.start.x,
        dy = e.clientY - g.start.y;
      if (g.mode === 'press') {
        if (Math.hypot(dx, dy) < (g.tokens.slop || 0)) return;
        clearTimer();
        if (g.long) {
          mode('none');
          return;
        } // moved after a long press: the long press stands, no pan
        const vertical = Math.abs(dy) > Math.abs(dx);
        if (o.pull && vertical && dy > 0 && g.atTop) {
          mode('pull');
          capture(e);
        } else if (o.axis === 'x' && vertical || o.axis === 'y' && !vertical) {
          mode('none');
          return;
        } // the browser scrolls
        else if (o.onPan || o.onPanStart || o.onPanEnd || o.onSwipe || o.onFling) {
          mode('pan');
          capture(e);
          call('onPanStart', {
            dx,
            dy,
            vx: 0,
            vy: 0,
            pointerType: g.pointerType
          });
        } else {
          mode('none');
          return;
        }
      }
      if (g.mode === 'pan') {
        const v = velocity();
        call('onPan', {
          dx: o.axis === 'y' ? 0 : dx,
          dy: o.axis === 'x' ? 0 : dy,
          vx: v.vx,
          vy: v.vy,
          pointerType: g.pointerType
        });
      } else if (g.mode === 'pull') {
        const distance = Math.max(0, dy) * (g.tokens.pullResistance || 0);
        const target = g.tokens.pullDistance || 0;
        g.ready = target > 0 && distance >= target;
        call('onPull', {
          distance,
          progress: target > 0 ? Math.min(1, distance / target) : 0,
          ready: g.ready,
          released: false
        });
      }
    };
    const onUp = e => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (!g) return;
      const canceled = e.type === 'pointercancel';
      if (g.mode === 'pinch') {
        if (pointers.size < 2) {
          call('onPinchEnd', {
            scale: g.lastScale || 1
          });
          finish();
          pointers.clear();
        }
        return;
      }
      if (e.pointerId !== g.pointerId) return;
      const o = latest.current;
      const dx = e.clientX - g.start.x,
        dy = e.clientY - g.start.y;
      if (g.mode === 'press' && !g.long && !canceled) call('onTap', {
        x: e.clientX,
        y: e.clientY,
        pointerType: g.pointerType
      });else if (g.mode === 'pan') {
        const v = velocity(),
          t = g.tokens;
        const px = o.axis === 'y' ? 0 : dx,
          py = o.axis === 'x' ? 0 : dy;
        const vx = o.axis === 'y' ? 0 : v.vx,
          vy = o.axis === 'x' ? 0 : v.vy;
        call('onPanEnd', {
          dx: px,
          dy: py,
          vx,
          vy,
          pointerType: g.pointerType,
          canceled
        });
        if (!canceled) {
          const horizontal = Math.abs(px) >= Math.abs(py);
          const d = horizontal ? px : py,
            vel = horizontal ? vx : vy;
          const fast = Math.hypot(vx, vy) >= (t.flingVelocity || Infinity);
          // a swipe ends moving the way it went: a pan dragged back toward its start does not commit
          if ((Math.abs(d) >= t.swipeDistance || fast && Math.sign(vel) === Math.sign(d)) && d !== 0) {
            const direction = horizontal ? d > 0 ? 'right' : 'left' : d > 0 ? 'down' : 'up';
            const inline = horizontal ? d > 0 !== (0, _direction.isRtl)(el) ? 'end' : 'start' : null;
            call('onSwipe', {
              direction,
              inline,
              distance: Math.abs(d),
              velocity: Math.abs(vel)
            });
          }
          if (fast) {
            const direction = horizontal ? vx > 0 ? 'right' : 'left' : vy > 0 ? 'down' : 'up';
            call('onFling', {
              vx,
              vy,
              direction,
              travelX: flingDistance(vx, t.flingDecay),
              travelY: flingDistance(vy, t.flingDecay)
            });
          }
        }
      } else if (g.mode === 'pull') {
        const ready = g.ready && !canceled;
        call('onPull', {
          distance: 0,
          progress: 0,
          ready: false,
          released: true
        });
        if (ready) call('onRefresh');
      }
      finish();
    };

    // the pinch's last scale, kept for onPinchEnd
    const onPinchTrack = () => {
      if (g && g.mode === 'pinch' && pointers.size === 2) g.lastScale = pinchState().d / g.startDist;
    };
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointermove', onPinchTrack);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    window.addEventListener('pointerup', onUp);
    return () => {
      clearTimer();
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointermove', onPinchTrack);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      window.removeEventListener('pointerup', onUp);
    };
  }, [ref, disabled]);
  return {
    active
  };
}
  } },
  "platform/providers/ReadOnly.jsx": { deps: {"react":null,"../utils/describedBy.js":"platform/utils/describedBy.js","../components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../components/Text/Text.jsx":"platform/components/Text/Text.jsx","../components/Stack/Stack.jsx":"platform/components/Stack/Stack.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadOnlyContext = exports.ReadOnly = void 0;
exports.ReadOnlyProvider = ReadOnlyProvider;
exports.useReadOnly = useReadOnly;
var _react = _interopRequireDefault(require("react"));
var _describedBy = require("../utils/describedBy.js");
var _Icon = require("../components/Icon/Icon.jsx");
var _Text = require("../components/Text/Text.jsx");
var _Stack = require("../components/Stack/Stack.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · ReadOnly, ReadOnlyProvider, useReadOnly
   Summary: A read-only region: everything people could change inside it shows its value and cannot be changed, while
     it stays readable, focusable, selectable and copyable (unlike disabled). A record someone may view but not edit, a
     form that is locked after it was submitted, a setting an administrator controls.
   Usage:
     <ReadOnly reason="Set by your administrator">…fields…</ReadOnly>                         // a region
     <ReadOnly as="form" readOnly={!canEdit} onSubmit={save}>…</ReadOnly>                    // a whole form
     <Field label="Asset ID"><Input value={id} readOnly /></Field>                              // one field: its own prop
     const readOnly = useReadOnly(props.readOnly);                                              // a component adopting it
   Props:
     ReadOnly.as ("div"): the element: "div", "section", "form" or "fieldset"
     ReadOnly.readOnly (true): false makes the region editable again (a nested editable part of a read-only page)
     ReadOnly.reason: why it cannot be changed, shown first in the region with the lock icon and tied to it as its
       description (aria-describedby)
     ReadOnly.className: more classes on the element
     ReadOnly.children: the content; ...rest: other attributes go on the element
     ReadOnlyProvider.readOnly (true): the value the components inside read with useReadOnly, without the region's
       behavior (a component that draws its own read-only state)
     useReadOnly(own): the component's own readOnly prop when it is given, else the nearest region's (false outside one)
   Behavior:
     The region carries data-plx-readonly="true" (system/read-only.css draws its controls: the sunken surface, the quiet
       border, the arrow pointer). Inside it, text fields and text areas become readOnly (the value can be selected,
       copied and focused); checkboxes, switches, radios, selects and sliders keep their value and take focus, but a
       click, Space, the arrow keys or typing do not change them, and they are marked aria-readonly where the role allows
       it. A form inside a read-only region does not submit. Content editable text stops being editable.
     Controls added later are covered as they appear; making the region editable again (or removing it) gives every
       control back exactly what it had.
     A nested <ReadOnly readOnly={false}> is left alone by the outer region.
   Notes:
     Read-only is not disabled: use disabled for a control that is not available now (it leaves the Tab order and dims);
       read-only for a value that is there to read. Hide or remove the actions that would change the region (Save,
       Delete) rather than disabling them.
     Buttons inside stay as they are: actions that only read (Copy, Download, Open) keep working.
*/
const ReadOnlyContext = exports.ReadOnlyContext = /*#__PURE__*/_react.default.createContext(false);
function ReadOnlyProvider({
  readOnly = true,
  children
}) {
  return /*#__PURE__*/_react.default.createElement(ReadOnlyContext.Provider, {
    value: !!readOnly
  }, children);
}
function useReadOnly(own) {
  const ctx = _react.default.useContext(ReadOnlyContext);
  return own === undefined || own === null ? ctx : !!own;
}

// what the region may lock: the controls whose value a person changes
const CONTROLS = 'input,textarea,select,[contenteditable="true"],[contenteditable=""],[role="checkbox"],[role="switch"],[role="radio"],[role="slider"],[role="spinbutton"],[role="combobox"]';
const NOT_VALUES = {
  button: 1,
  submit: 1,
  reset: 1,
  image: 1,
  hidden: 1,
  file: 0
};
const TEXT_TYPES = /^(text|search|email|url|tel|password|number|date|datetime-local|month|week|time)$/;
// roles that may carry aria-readonly (WAI-ARIA 1.2); a radio's group carries it instead
const ARIA_READONLY = {
  checkbox: 1,
  switch: 1,
  slider: 1,
  spinbutton: 1,
  combobox: 1,
  listbox: 1,
  textbox: 1,
  radiogroup: 1
};
// keys that change a locked control's value (Tab, Escape and shortcuts with Ctrl or ⌘ still work)
const CHANGE_KEYS = /^(ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown| |Spacebar|Enter|Backspace|Delete|.)$/;
function roleOf(el) {
  const r = el.getAttribute('role');
  if (r) return r;
  if (el.tagName === 'SELECT') return el.multiple ? 'listbox' : 'combobox';
  if (el.tagName === 'INPUT') return el.type === 'checkbox' ? 'checkbox' : el.type === 'radio' ? 'radio' : el.type === 'range' ? 'slider' : 'textbox';
  return 'textbox';
}

// locks one control; returns what to undo, or null when it is not a value control or is already read-only by its owner
function lock(el) {
  if (el.hasAttribute('data-plx-readonly-set')) return null;
  const tag = el.tagName;
  if (tag === 'INPUT' && NOT_VALUES[el.type]) return null;
  if (el.getAttribute('contenteditable') === 'true' || el.getAttribute('contenteditable') === '') {
    el.setAttribute('contenteditable', 'false');
    el.setAttribute('data-plx-readonly-set', 'editable');
    return () => {
      el.setAttribute('contenteditable', 'true');
      el.removeAttribute('data-plx-readonly-set');
    };
  }
  if (tag === 'TEXTAREA' || tag === 'INPUT' && TEXT_TYPES.test(el.type)) {
    if (el.readOnly) return null;
    el.readOnly = true;
    el.setAttribute('data-plx-readonly-set', 'readonly');
    return () => {
      el.readOnly = false;
      el.removeAttribute('data-plx-readonly-set');
    };
  }
  // a choice, a select or a slider: the value stays, changes are stopped by the region's listeners
  const role = roleOf(el);
  const aria = ARIA_READONLY[role] && !el.hasAttribute('aria-readonly');
  if (aria) el.setAttribute('aria-readonly', 'true');
  el.setAttribute('data-plx-readonly-set', 'locked');
  return () => {
    if (aria) el.removeAttribute('aria-readonly');
    el.removeAttribute('data-plx-readonly-set');
  };
}

// the region's behavior: locks its controls (and the ones added later), stops the events that would change them
function useLockRegion(ref, on) {
  _react.default.useEffect(() => {
    const root = ref.current;
    if (!root || !on) return undefined;
    const undo = new Map();
    const mine = el => el.closest('[data-plx-readonly]') === root;
    const apply = () => {
      root.querySelectorAll(CONTROLS).forEach(el => {
        if (!undo.has(el) && mine(el)) {
          const u = lock(el);
          if (u) undo.set(el, u);
        }
      });
    };
    apply();
    const observer = typeof MutationObserver !== 'undefined' ? new MutationObserver(apply) : null;
    if (observer) observer.observe(root, {
      childList: true,
      subtree: true
    });
    const locked = t => {
      const el = t && t.closest ? t.closest('[data-plx-readonly-set="locked"]') : null;
      return el && mine(el) ? el : null;
    };
    const stop = e => {
      e.preventDefault();
      e.stopPropagation();
    };
    const onClick = e => {
      if (locked(e.target)) stop(e);
    };
    const onKey = e => {
      if (e.key === 'Tab' || e.key === 'Escape' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (locked(e.target) && CHANGE_KEYS.test(e.key)) stop(e);
    };
    const onPointer = e => {
      const el = locked(e.target);
      if (el && (el.tagName === 'SELECT' || roleOf(el) === 'slider' || roleOf(el) === 'combobox')) {
        e.preventDefault();
        el.focus();
      }
    };
    const onSubmit = e => {
      if (e.target === root || mine(e.target)) e.preventDefault();
    };
    root.addEventListener('click', onClick, true);
    root.addEventListener('keydown', onKey, true);
    root.addEventListener('mousedown', onPointer, true);
    root.addEventListener('pointerdown', onPointer, true);
    root.addEventListener('submit', onSubmit, true);
    return () => {
      if (observer) observer.disconnect();
      root.removeEventListener('click', onClick, true);
      root.removeEventListener('keydown', onKey, true);
      root.removeEventListener('mousedown', onPointer, true);
      root.removeEventListener('pointerdown', onPointer, true);
      root.removeEventListener('submit', onSubmit, true);
      undo.forEach(u => u());
    };
  }, [ref, on]);
}
const ReadOnly = exports.ReadOnly = /*#__PURE__*/_react.default.forwardRef(function ReadOnly({
  as = 'div',
  readOnly = true,
  reason,
  className,
  children,
  ...rest
}, ref) {
  const own = _react.default.useRef(null);
  const setRef = el => {
    own.current = el;
    if (typeof ref === 'function') ref(el);else if (ref) ref.current = el;
  };
  const on = !!readOnly;
  useLockRegion(own, on);
  const reasonId = (0, _describedBy.useDescriptionId)('read-only');
  const Tag = ['div', 'section', 'form', 'fieldset'].indexOf(as) >= 0 ? as : 'div';
  return /*#__PURE__*/_react.default.createElement(ReadOnlyContext.Provider, {
    value: on
  }, /*#__PURE__*/_react.default.createElement(Tag, _extends({
    ref: setRef,
    "data-plx-readonly": on ? 'true' : 'false',
    className: className
  }, rest, {
    "aria-describedby": (0, _describedBy.joinIds)(rest['aria-describedby'], on && reason ? reasonId : null)
  }), on && reason ? /*#__PURE__*/_react.default.createElement(_Stack.Inline, {
    gap: "xs"
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "lock",
    size: "sm"
  }), /*#__PURE__*/_react.default.createElement(_Text.Text, {
    variant: "secondary",
    id: reasonId
  }, reason)) : null, children));
});
  } },
  "platform/components/IconTile/IconTile.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconTile = IconTile;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · IconTile
   Summary: An icon on a tinted, rounded square: the marker of an object type, a category or an integration in lists,
     cards and headers (the entity's kind in EntityHeader's { icon, hue } media).
   Usage:
     <IconTile icon="briefcase" hue="blue" />
     <IconTile icon="alert" tone="warning" size="sm" label="Overdue" />
     <IconTile icon="sparkle" hue="purple" size="lg" filled />
   Props:
     icon: the Plenix icon name (platform/icons/map.json)
     hue: the tile's data color: "blue" | "green" | "purple" | "red" | "brown" | "gray" (default) | "surface" (the page
       surface with the icon in the link blue)
     tone: a status tone instead of a hue: "neutral" | "info" | "success" | "warning" | "danger"; it wins over hue
     size: "sm" (a 32px tile, 16px icon) | "md" (40px, 20px; default) | "lg" (48px, 24px; EntityHeader's tile)
     filled: the filled version of the icon (default false)
     label: the accessible name, when the tile alone carries meaning; without it the tile is decorative
     className: more classes on the tile
   Behavior:
     Not interactive: no hover, no focus. A tile that opens something sits inside the row, card or button that does.
     The tile and its icon size together by the named size, on the 4px grid; the icon is centered.
     Hues are the data colors (the same in light and dark); tones are the feedback roles, which follow the theme.
   Notes:
     The icon is the Plenix set (Material Symbols, unedited); no letters or numbers in a tile.
     Other props pass through to the <span>.
*/
const HUES = ['blue', 'green', 'purple', 'red', 'brown', 'gray', 'surface'];
const TONES = ['neutral', 'info', 'success', 'warning', 'danger'];
const SIZES = ['sm', 'md', 'lg'];
function IconTile({
  icon,
  hue = 'gray',
  tone,
  size = 'md',
  filled = false,
  label,
  className,
  ...rest
}) {
  const look = TONES.indexOf(tone) >= 0 ? tone : HUES.indexOf(hue) >= 0 ? hue : 'gray';
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-icon-tile', 'plx-icon-tile--' + s, 'plx-icon-tile--' + look, className),
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true
  }, rest), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon,
    size: s,
    filled: filled,
    className: "plx-icon-tile__icon"
  }));
}
  } },
  "platform/components/Pictogram/Pictogram.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pictogram = Pictogram;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Pictogram
   Summary: A large symbol for a concept (not an action) in a round frame: the picture of an empty state, a feature card
     or an onboarding step, when a full illustration is too much.
   Usage:
     <Pictogram icon="upload" />
     <Pictogram icon="folder-open" size="96" twoTone />
   Props:
     icon: the Plenix icon name (platform/icons/map.json): the set's own symbol, drawn large and never edited
     size: "48" | "64" (default) | "96": the frame's width and height; the symbol is two thirds of it on the 4px grid
       (32, 40, 64px)
     twoTone: the filled symbol on a blue tint instead of the outline on the sunken surface (default false)
     label: the accessible name, when no heading or text next to it says the same; without it the pictogram is decorative
     className: more classes on the frame
   Behavior:
     Not interactive: never a button or a link, never an action icon.
     The symbol uses the icon files drawn for 24px and up (optical size 24), outline or filled.
   Notes:
     One size and one tone per view; always next to a heading or text that names the concept.
     Other props pass through to the <span>.
*/
const SIZES = ['48', '64', '96'];
function Pictogram({
  icon,
  size = '64',
  twoTone = false,
  label,
  className,
  ...rest
}) {
  const s = SIZES.indexOf(String(size)) >= 0 ? String(size) : '64';
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-pictogram', 'plx-pictogram--' + s, twoTone && 'plx-pictogram--two-tone', className),
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true
  }, rest), /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon,
    size: "xl",
    filled: twoTone,
    className: "plx-pictogram__icon"
  }));
}
  } },
  "platform/components/Sticky/Sticky.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sticky = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Sticky
   Summary: A region that scrolls with its content until it reaches the top or bottom edge of its scroll area, then stays there
     (a sticky header, a form's action bar), or one fixed to an edge of the window; it draws a separating shadow while stuck.
   Usage:
     <Stack scroll>
       <Sticky label="Project header"><EntityHeader … /></Sticky>
       …long content…
       <Sticky edge="bottom" label="Actions"><Inline justify="end"><Button>Cancel</Button><Button variant="primary">Save</Button></Inline></Sticky>
     </Stack>
     <Sticky fixed edge="bottom" safeArea label="Selection">…</Sticky>      fixed to the window's bottom edge, clear of the home indicator
   Props:
     Sticky.edge: "top" (default) | "bottom": the edge of the scroll area (or the window) it stays at
     Sticky.fixed: fixed to that edge of the window instead of sticking inside its scroll area (position: fixed)
     Sticky.shadow: "stuck" (default: the shadow and the separator show only while it is stuck) | "always" | "none"
     Sticky.safeArea: pads the stuck edge and both sides by the device's safe-area insets (a notch, the home indicator)
     Sticky.stuck: draws it as stuck (documentation and tests; the browser decides otherwise)
     Sticky.label: names the region (role="region"); without it the element has no role of its own
     Sticky.as: the element; "div" by default (header, footer, section, …)
     Sticky.className, Sticky.children: more classes; the content
   Behavior:
     It sticks inside its nearest scroll area (a Stack with scroll, the main region): never to the page behind a fixed shell.
     While stuck it lies on the sticky layer (--plx-sys-layer-sticky) on the surface, with a shadow and its hairline
       around it. The browser reports the stuck state (a scroll-state container query); where a browser does not, the
       region still sticks, without the shadow.
     A fixed region leaves the flow: the page reserves its space (AppShell's regions do this for the header and the bars).
   Notes:
     Keep it short: two sticky regions in one scroll area at most, and none taller than a toolbar on a narrow window.
     Other props pass through to the element.
*/
const Sticky = exports.Sticky = /*#__PURE__*/_react.default.forwardRef(function Sticky({
  as: As = 'div',
  edge = 'top',
  fixed = false,
  shadow = 'stuck',
  safeArea = false,
  stuck = false,
  label,
  className,
  children,
  ...rest
}, ref) {
  return /*#__PURE__*/_react.default.createElement(As, _extends({
    ref: ref,
    role: label ? 'region' : undefined,
    "aria-label": label,
    className: (0, _cx.cx)('plx-sticky', 'plx-sticky--' + edge, fixed && 'plx-sticky--fixed', 'plx-sticky--shadow-' + shadow, safeArea && 'plx-sticky--safe-area', stuck && 'is-stuck', className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-sticky__body"
  }, children));
});
  } },
  "platform/components/Illustration/illustrations.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illustrationByName = exports.ILLUSTRATIONS = void 0;
/* Plenix · ILLUSTRATIONS
   Summary: The Plenix illustration set: each drawing as data (its shapes and the color role of each), for Illustration to
     draw in the theme's colors. Two sets: the empty states and the errors.
   Usage:
     import { ILLUSTRATIONS, illustrationByName } from './illustrations.js';
     ILLUSTRATIONS.filter((x) => x.set === 'error').map((x) => x.name)     // error, offline, not-found, no-access
   Props:
     ILLUSTRATIONS[i].name: the name Illustration takes ("no-results")
     ILLUSTRATIONS[i].set: "empty" (an empty state) | "error" (an error state)
     ILLUSTRATIONS[i].title: what it shows, in words (its accessible name when it is not decorative)
     ILLUSTRATIONS[i].parts: [role, element, attributes]: the role picks the color (back, shape, stroke, ghost, accent,
       accent-stroke, knock, danger, danger-stroke, danger-knock); element is circle, rect or path; the attributes are the
       geometry on a 120-unit square
   Behavior:
     The geometry is drawing data, not styling: every color, stroke width and size comes from the illustration tokens.
   Notes:
     The drawings follow the brand mark: square corners and ends, straight strokes, one accent. Add a drawing here (on the
       120-unit square, 4-unit steps) and it is in the set; never color a part by hand.
*/
const BACK = ['back', 'circle', {
  cx: 60,
  cy: 60,
  r: 52
}];
const ILLUSTRATIONS = exports.ILLUSTRATIONS = [{
  name: 'empty-folder',
  set: 'empty',
  title: 'An empty folder',
  parts: [BACK, ['shape', 'path', {
    d: 'M20 36h28l8 8h44v48H20z'
  }], ['shape', 'path', {
    d: 'M20 52h80v40H20z'
  }], ['accent-stroke', 'path', {
    d: 'M52 72h16'
  }]]
}, {
  name: 'no-results',
  set: 'empty',
  title: 'A magnifier that found nothing',
  parts: [BACK, ['stroke', 'path', {
    d: 'M69 69l23 23'
  }], ['shape', 'circle', {
    cx: 52,
    cy: 52,
    r: 24
  }], ['accent-stroke', 'path', {
    d: 'M44 52h16'
  }]]
}, {
  name: 'inbox-zero',
  set: 'empty',
  title: 'An empty tray, all done',
  parts: [BACK, ['shape', 'path', {
    d: 'M20 64l12-28h56l12 28v28H20z'
  }], ['stroke', 'path', {
    d: 'M20 64h24l4 8h24l4-8h24'
  }], ['accent', 'circle', {
    cx: 84,
    cy: 32,
    r: 12
  }], ['knock', 'path', {
    d: 'M78 32l4 4l8-8'
  }]]
}, {
  name: 'no-data',
  set: 'empty',
  title: 'A chart with no data yet',
  parts: [BACK, ['ghost', 'rect', {
    x: 36,
    y: 60,
    width: 12,
    height: 32
  }], ['ghost', 'rect', {
    x: 56,
    y: 44,
    width: 12,
    height: 48
  }], ['ghost', 'rect', {
    x: 76,
    y: 68,
    width: 12,
    height: 24
  }], ['stroke', 'path', {
    d: 'M24 24v68h72'
  }]]
}, {
  name: 'get-started',
  set: 'empty',
  title: 'A new page with a plus',
  parts: [BACK, ['shape', 'rect', {
    x: 32,
    y: 20,
    width: 52,
    height: 72
  }], ['stroke', 'path', {
    d: 'M44 40h28M44 52h28M44 64h16'
  }], ['accent', 'circle', {
    cx: 84,
    cy: 84,
    r: 16
  }], ['knock', 'path', {
    d: 'M84 76v16M76 84h16'
  }]]
}, {
  name: 'error',
  set: 'error',
  title: 'A window with a warning',
  parts: [BACK, ['shape', 'rect', {
    x: 20,
    y: 28,
    width: 80,
    height: 60
  }], ['stroke', 'path', {
    d: 'M20 40h80'
  }], ['danger', 'path', {
    d: 'M60 48l18 32H42z'
  }], ['danger-knock', 'path', {
    d: 'M60 58v10M60 72v2'
  }]]
}, {
  name: 'offline',
  set: 'error',
  title: 'A cloud with no connection',
  parts: [BACK, ['shape', 'path', {
    d: 'M36 84h48a16 16 0 0 0 0-32a24 24 0 0 0-46-6a20 20 0 0 0-2 38z'
  }], ['danger-stroke', 'path', {
    d: 'M28 28l64 64'
  }]]
}, {
  name: 'not-found',
  set: 'error',
  title: 'A page that is not there',
  parts: [BACK, ['shape', 'path', {
    d: 'M36 20h36l16 16v56H36z'
  }], ['stroke', 'path', {
    d: 'M72 20v16h16'
  }], ['accent-stroke', 'path', {
    d: 'M52 50a8 8 0 1 1 12 7l-4 3v6'
  }], ['accent', 'circle', {
    cx: 60,
    cy: 76,
    r: 3
  }]]
}, {
  name: 'no-access',
  set: 'error',
  title: 'A closed lock',
  parts: [BACK, ['stroke', 'path', {
    d: 'M44 56V44a16 16 0 0 1 32 0v12'
  }], ['shape', 'rect', {
    x: 36,
    y: 56,
    width: 48,
    height: 36
  }], ['danger', 'circle', {
    cx: 60,
    cy: 70,
    r: 5
  }], ['danger', 'rect', {
    x: 58,
    y: 72,
    width: 4,
    height: 10
  }]]
}];
const illustrationByName = name => ILLUSTRATIONS.find(x => x.name === name) || null;
exports.illustrationByName = illustrationByName;
  } },
  "platform/components/Illustration/Illustration.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","./illustrations.js":"platform/components/Illustration/illustrations.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Illustration = Illustration;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _illustrations = require("./illustrations.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Illustration
   Summary: A drawing from the Plenix illustration set that supports a message: an empty state, a first run or an error page.
     Drawn in the theme's colors (no colors of its own), so it follows light and dark mode and sits on the accent.
   Usage:
     <Stack align="center"><Illustration name="no-results" size="sm" /><EmptyState title="No results" … /></Stack>
     <Center maxWidth="sm" text intrinsic><Illustration name="offline" size="lg" /><Text>…</Text></Center>
     <Illustration name="get-started" tone="on-accent" />                  on the accent surface
   Props:
     Illustration.name: a drawing of the set (ILLUSTRATIONS): the empty states "empty-folder" | "no-results" | "inbox-zero" |
       "no-data" | "get-started"; the errors "error" | "offline" | "not-found" | "no-access"
     Illustration.size: "sm" (64px: a spot beside a short message) | "md" (default, 120px: a scene) | "lg" (200px: a full-page state)
     Illustration.tone: "default" | "on-accent" (on the blue header, an accent banner or a welcome panel)
     Illustration.label: names the drawing (role="img"); true uses its title. Without it the drawing is decorative: the
       message beside it says everything
     Illustration.className: more classes
   Behavior:
     Each part of a drawing has a color role (backdrop, shape, line, accent, danger): the illustration tokens give each
       role a theme role, so nothing in a drawing is a color of its own. Lines keep their width at every size.
     It never shrinks below its size; a narrow container takes the smaller size (sm) instead.
   Notes:
     One illustration per view, in empty, first-run and error states: never in tables, forms or dense work areas. The
       heading and text beside it carry the message; the drawing adds no information and holds no words.
     The set and its geometry are in illustrations.js; other props pass through to the <svg>.
*/
function Illustration({
  name,
  size = 'md',
  tone = 'default',
  label,
  className,
  ...rest
}) {
  const art = (0, _illustrations.illustrationByName)(name);
  if (!art) return null;
  const named = label === true ? art.title : label;
  return /*#__PURE__*/_react.default.createElement("svg", _extends({
    viewBox: "0 0 120 120",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    className: (0, _cx.cx)('plx-illustration', 'plx-illustration--' + size, tone !== 'default' && 'plx-illustration--' + tone, className),
    role: named ? 'img' : undefined,
    "aria-label": named || undefined,
    "aria-hidden": named ? undefined : true,
    "data-plx-illustration": art.name
  }, rest), art.parts.map(([role, el, attrs], i) => /*#__PURE__*/_react.default.createElement(el, {
    key: i,
    className: 'plx-illustration__' + role,
    ...attrs
  })));
}
  } },
  "platform/components/Image/Image.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Image
   Summary: A picture in a frame of a fixed ratio and fit: an asset preview, a photo or a screenshot, with a placeholder
     while it loads and a fallback when it cannot load.
   Usage:
     <Image src="kitchen.jpg" alt="The finished kitchen, oak cabinets" ratio="4-3" />
     <Image src="hero-1600.jpg" srcSet="hero-800.jpg 800w, hero-1600.jpg 1600w" sizes="(max-width: 600px) 100vw, 50vw"
       alt="…" ratio="16-9" placeholder="blur" placeholderSrc="hero-24.jpg" />
     <Image sources={[{ media: '(max-width: 599px)', srcSet: 'hero-square.jpg' }]} src="hero-wide.jpg" alt="…" />
   Props:
     src: the picture's address (required)
     alt: the text alternative (required): what the picture shows or is for; "" for a decorative picture
     ratio: "auto" (default: the picture's own shape; give width and height) | "1-1" | "4-3" | "3-2" | "16-9" | "21-9" |
       "3-4" | "9-16" (the aspect-ratio scale)
     fit: "cover" (default: fills the frame, cropping the edges) | "contain" (the whole picture, on the frame's fill)
     srcSet: the responsive sources of the same picture, by width (800w) or density (2x); the browser picks one
     sizes: how wide the picture is drawn at each window width, for srcSet by width
     sources: art direction, [{ media, srcSet, sizes?, type? }]: other crops or formats by media query, drawn as a <picture>
     loading: "lazy" (default: loads when it nears the screen) | "eager"
     priority: the picture people see first (eager, fetched first); never more than one or two on a page
     placeholder: "color" (default: the neutral fill until it loads) | "blur" (placeholderSrc, a tiny copy, blurred) | "none"
     placeholderSrc: the tiny copy for placeholder="blur"
     rounded: the media corners (default false: square, for a picture inside a card or a preview that clips it)
     width, height: the picture's size in pixels, so its space is kept before it loads (ratio="auto")
     fallback: what shows when it cannot load (default: the image icon and strings.error)
     strings: { error: "Image not available" }
     onLoad: called when the picture has loaded
     onError: called when it cannot load
     className: more classes on the frame
   Behavior:
     The frame keeps its space before the picture arrives (a ratio, or width and height), so nothing moves when it loads.
     While loading the frame shows its placeholder; the picture fades in over it once loaded (no fade with reduced motion).
     When the picture fails, the frame keeps its size and shows the fallback; a picture that loaded from the cache shows
       at once.
     Every source is the same picture: the alt text is the same for all of them.
   Notes:
     Not for icons (Icon) or illustrations of the Plenix set (Illustration), and never for text.
     Other props pass through to the <img>.
*/
const RATIOS = ['1-1', '4-3', '3-2', '16-9', '21-9', '3-4', '9-16'];
const STRINGS = {
  error: 'Image not available'
};
const Image = exports.Image = /*#__PURE__*/_react.default.forwardRef(function Image({
  src,
  alt,
  ratio = 'auto',
  fit = 'cover',
  srcSet,
  sizes,
  sources,
  loading = 'lazy',
  priority = false,
  placeholder = 'color',
  placeholderSrc,
  rounded = false,
  width,
  height,
  fallback,
  strings,
  onLoad,
  onError,
  className,
  ...rest
}, ref) {
  const s = Object.assign({}, STRINGS, strings);
  const own = _react.default.useRef(null);
  const [status, setStatus] = _react.default.useState('loading');
  const setRef = el => {
    own.current = el;
    if (typeof ref === 'function') ref(el);else if (ref) ref.current = el;
  };
  // a new source starts over; a picture already in the cache is complete before React listens
  _react.default.useEffect(() => {
    const el = own.current;
    if (el && el.complete && el.currentSrc) setStatus(el.naturalWidth > 0 ? 'loaded' : 'error');else setStatus('loading');
  }, [src, srcSet]);
  const img = /*#__PURE__*/_react.default.createElement("img", _extends({
    ref: setRef,
    className: "plx-image__img",
    src: src,
    srcSet: srcSet,
    sizes: sizes,
    alt: alt,
    width: width,
    height: height,
    loading: priority ? 'eager' : loading,
    decoding: "async",
    fetchpriority: priority ? 'high' : undefined,
    onLoad: e => {
      setStatus('loaded');
      if (onLoad) onLoad(e);
    },
    onError: e => {
      setStatus('error');
      if (onError) onError(e);
    }
  }, rest));
  return /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-image', 'plx-image--' + fit, 'plx-image--placeholder-' + placeholder, rounded && 'plx-image--rounded', RATIOS.indexOf(ratio) >= 0 ? 'plx-ratio-' + ratio : null, 'is-' + status, className)
  }, placeholder === 'blur' && placeholderSrc && status !== 'loaded' ? /*#__PURE__*/_react.default.createElement("img", {
    className: "plx-image__placeholder",
    src: placeholderSrc,
    alt: "",
    "aria-hidden": "true"
  }) : null, sources && sources.length ? /*#__PURE__*/_react.default.createElement("picture", {
    className: "plx-image__picture"
  }, sources.map((x, i) => /*#__PURE__*/_react.default.createElement("source", {
    key: i,
    media: x.media,
    srcSet: x.srcSet,
    sizes: x.sizes,
    type: x.type
  })), img) : img, status === 'error' ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-image__fallback",
    role: alt ? 'img' : undefined,
    "aria-label": alt || undefined,
    "aria-hidden": alt ? undefined : true
  }, fallback || /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: "image-a-2",
    className: "plx-image__fallback-icon"
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-image__fallback-text"
  }, s.error))) : null);
});
  } },
  "platform/components/Figure/Figure.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Figure = Figure;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Figure
   Summary: A picture, chart or diagram with the caption that explains it, and the credit or data source when it has one.
   Usage:
     <Figure caption="The kitchen after the remodel, with the oak finish the client chose." credit="Photo: Ana Ruiz">
       <Image src="kitchen.jpg" alt="The finished kitchen" ratio="4-3" />
     </Figure>
     <Figure caption="Uploads per week" credit="Source: Plenix storage report, October"><LineChart … /></Figure>
     <Figure captionPosition="overlay" caption="Lisbon office, east wing"><Image … /></Figure>
   Props:
     children: the media: an Image, a chart, a diagram or a code block (required)
     caption: one sentence that says what the media shows and why it is there (a string or nodes)
     credit: who made it or where the data comes from, after the caption ("Photo: Ana Ruiz", "Source: …")
     captionPosition: "below" (default) | "overlay" (on the bottom of a picture, over a dark scrim; short captions only)
     className: more classes on the <figure>
   Behavior:
     The caption stays next to the media at every width; it wraps under it and never moves away from it.
     An overlay caption sits on the picture's bottom edge on the media scrim, in the content-on-media color; a credit
       below an overlay caption moves under the picture.
     The <figure> and <figcaption> tie the caption to the media for assistive technology.
   Notes:
     A decorative picture needs no figure: use the Image with alt="".
     The caption adds to the alt text, never repeats it.
     Other props pass through to the <figure>.
*/
function Figure({
  children,
  caption,
  credit,
  captionPosition = 'below',
  className,
  ...rest
}) {
  const overlay = captionPosition === 'overlay' && caption;
  return /*#__PURE__*/_react.default.createElement("figure", _extends({
    className: (0, _cx.cx)('plx-figure', 'plx-figure--' + (overlay ? 'overlay' : 'below'), credit && 'plx-figure--credited', className)
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-figure__media"
  }, children, overlay ? /*#__PURE__*/_react.default.createElement("figcaption", {
    className: "plx-figure__caption plx-figure__caption--overlay"
  }, caption) : null), !overlay && (caption || credit) ? /*#__PURE__*/_react.default.createElement("figcaption", {
    className: "plx-figure__caption"
  }, caption ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-figure__text"
  }, caption) : null, credit ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-figure__credit"
  }, credit) : null) : null, overlay && credit ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-figure__caption"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-figure__credit"
  }, credit)) : null);
}
  } },
  "platform/utils/barcode.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BARCODE_QUIET_ZONE = void 0;
exports.barcodeCheckDigit = barcodeCheckDigit;
exports.encodeBarcode = encodeBarcode;
/* Plenix · Barcode encoding (platform/utils/barcode.js)
   Summary: Turns a value into the bars of a one-dimensional barcode: Code 128 (any printable ASCII text), EAN-13 and
     UPC-A (retail numbers, with their check digit). The Barcode component draws the result; nothing here touches the page.
   Usage:
     encodeBarcode('PLX-2026-0042')                 // { format: 'code128', modules: 167, bars: [[0, 2], …], text: 'PLX-2026-0042' }
     encodeBarcode('400638133393', 'ean13')         // the check digit is added: text '4 006381 333931'
     encodeBarcode('03600029145', 'upca')           // text '0 36000 29145 2'
     barcodeCheckDigit('400638133393')              // 1
   Props:
     encodeBarcode(value, format): format "code128" (default) | "ean13" | "upca"; returns { format, value, modules (the
       width in narrow bars), bars ([start, width] pairs in modules), text (the human-readable line) } or null when the
       value cannot be written in that format (letters in an EAN, a wrong check digit, text outside printable ASCII)
     barcodeCheckDigit(digits): the EAN / UPC check digit of 11 (UPC-A) or 12 (EAN-13) digits
     BARCODE_QUIET_ZONE: the empty modules kept on each side (10), so a scanner finds the first bar
   Behavior:
     Code 128 uses code set C (two digits per symbol) when the whole value is an even number of four or more digits, else
       code set B. The symbol check character is added.
     EAN-13 takes 12 digits (the check digit is computed) or 13 (the check digit must match); UPC-A takes 11 or 12, and
       is drawn as the EAN-13 with a leading 0, which is the same pattern.
   Notes:
     The bars are geometry for an SVG viewBox in modules: the stylesheet sets the height and the width follows.
*/

// Code 128: the bar and space widths of symbols 0–106 (106 is the stop, with its final bar)
const C128 = ('212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 ' + '123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 ' + '111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 ' + '231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 ' + '141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 ' + '124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 ' + '311141 411131 211412 211214 211232 2331112').split(' ');
const START_B = 104,
  START_C = 105,
  STOP = 106;

// EAN: the left odd (L) patterns; R is L inverted, G is R reversed; the first digit sets the left half's L/G parity
const L = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
const R = L.map(p => p.replace(/./g, b => b === '1' ? '0' : '1'));
const G = R.map(p => p.split('').reverse().join(''));
const PARITY = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
const BARCODE_QUIET_ZONE = exports.BARCODE_QUIET_ZONE = 10;

// widths ("212222", bar first) to [start, width] bars from a module offset
function widthsToBars(widths, at, out) {
  let x = at;
  for (let i = 0; i < widths.length; i++) {
    const w = +widths[i];
    if (i % 2 === 0) out.push([x, w]);
    x += w;
  }
  return x;
}
// a module string ("1011…") to [start, width] bars
function modulesToBars(bits) {
  const out = [];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] !== '1') continue;
    let j = i;
    while (bits[j + 1] === '1') j++;
    out.push([i, j - i + 1]);
    i = j;
  }
  return out;
}
function code128(value) {
  const text = String(value);
  if (!text.length || !/^[\x20-\x7E]+$/.test(text)) return null;
  const digits = /^\d+$/.test(text) && text.length >= 4 && text.length % 2 === 0;
  const codes = digits ? [START_C] : [START_B];
  if (digits) for (let i = 0; i < text.length; i += 2) codes.push(+text.slice(i, i + 2));else for (const ch of text) codes.push(ch.charCodeAt(0) - 32);
  const check = codes.reduce((sum, c, i) => sum + c * (i || 1), 0) % 103;
  codes.push(check, STOP);
  const bars = [];
  let x = 0;
  codes.forEach(c => {
    x = widthsToBars(C128[c], x, bars);
  });
  return {
    format: 'code128',
    value: text,
    modules: x,
    bars,
    text
  };
}
function barcodeCheckDigit(digits) {
  const d = String(digits).split('').map(Number);
  // weights from the right: 3, 1, 3, … (the digit next to the check digit weighs 3)
  const sum = d.reverse().reduce((s, n, i) => s + n * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - sum % 10) % 10;
}
function ean13(value, upc) {
  const raw = String(value).replace(/\s+/g, '');
  const len = upc ? 11 : 12;
  if (!/^\d+$/.test(raw) || raw.length !== len && raw.length !== len + 1) return null;
  const body = raw.slice(0, len);
  const check = barcodeCheckDigit(body);
  if (raw.length === len + 1 && +raw[len] !== check) return null;
  const full = (upc ? '0' : '') + body + check; // UPC-A is EAN-13 with a leading 0
  const parity = PARITY[+full[0]];
  let bits = '101';
  for (let i = 1; i <= 6; i++) bits += (parity[i - 1] === 'L' ? L : G)[+full[i]];
  bits += '01010';
  for (let i = 7; i <= 12; i++) bits += R[+full[i]];
  bits += '101';
  const shown = upc ? full.slice(1) : full;
  const text = upc ? shown[0] + ' ' + shown.slice(1, 6) + ' ' + shown.slice(6, 11) + ' ' + shown[11] : full[0] + ' ' + full.slice(1, 7) + ' ' + full.slice(7);
  return {
    format: upc ? 'upca' : 'ean13',
    value: shown,
    modules: bits.length,
    bars: modulesToBars(bits),
    text
  };
}
function encodeBarcode(value, format = 'code128') {
  if (value === undefined || value === null) return null;
  if (format === 'ean13') return ean13(value, false);
  if (format === 'upca') return ean13(value, true);
  return code128(value);
}
  } },
  "platform/components/Barcode/Barcode.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/barcode.js":"platform/utils/barcode.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Barcode = Barcode;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _barcode = require("../../utils/barcode.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Barcode
   Summary: A one-dimensional barcode drawn as SVG from a value (Code 128, EAN-13 or UPC-A), with the value printed under
     the bars for people to read and type: an asset tag, a product number, a shipment label.
   Usage:
     <Barcode value="PLX-2026-0042" />
     <Barcode value="400638133393" format="ean13" />
     <Barcode value="03600029145" format="upca" size="lg" showText={false} />
   Props:
     value: the text (Code 128: printable ASCII) or the digits (EAN-13: 12 or 13, UPC-A: 11 or 12; the check digit is
       computed, or checked when given)
     format: "code128" (default) | "ean13" | "upca"
     size: "md" (default; the bars 64px high) | "sm" (48px, a dense label) | "lg" (96px, a code to scan from the screen);
       the width follows the value's length at the same narrow-bar width
     showText: the human-readable line under the bars, in the data font (default true)
     label: the accessible name (default strings.label filled with the format and the value)
     strings: the words it uses, for other languages: { label: "Barcode {format}: {value}", invalid: "Not a valid {format} code",
       formats: { code128: "Code 128", ean13: "EAN-13", upca: "UPC-A" } }
     className: more classes on the barcode
   Behavior:
     The barcode is one image (role="img") named by its format and value; the bars and the line under them are hidden from
       assistive technology, which reads the name.
     A value the format cannot hold draws no bars: the line says it is not valid, in the danger color on the surface.
     The bars keep a quiet zone of ten narrow bars on each side, on the barcode's plate, so scanners find the start.
     Black on white in both themes, as the QR code (the media roles do not follow the theme), so scanners read it; the line
       under the bars is on the plate in the bars' black. An invalid value has no plate (the message is on the surface).
   Notes:
     Encoding is platform/utils/barcode.js (encodeBarcode). Other props pass through to the outer <div>.
*/
// the height of the drawing in narrow bars: the stylesheet's height token sets the size, the width follows the viewBox
const HEIGHT_MODULES = 32;
const STRINGS = {
  label: 'Barcode {format}: {value}',
  invalid: 'Not a valid {format} code',
  formats: {
    code128: 'Code 128',
    ean13: 'EAN-13',
    upca: 'UPC-A'
  }
};
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (all, k) => v[k] !== undefined ? v[k] : all);
function Barcode({
  value,
  format = 'code128',
  size = 'md',
  showText = true,
  label,
  strings,
  className,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings, {
    formats: Object.assign({}, STRINGS.formats, strings && strings.formats)
  });
  const code = _react.default.useMemo(() => (0, _barcode.encodeBarcode)(value, format), [value, format]);
  const name = t.formats[format] || format;
  if (!code) {
    return /*#__PURE__*/_react.default.createElement("div", _extends({
      className: (0, _cx.cx)('plx-barcode', 'plx-barcode--' + size, className)
    }, rest), /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-barcode__error"
    }, fill(t.invalid, {
      format: name
    })));
  }
  const width = code.modules + _barcode.BARCODE_QUIET_ZONE * 2;
  const path = code.bars.map(([x, w]) => 'M' + (x + _barcode.BARCODE_QUIET_ZONE) + ' 0h' + w + 'v' + HEIGHT_MODULES + 'h-' + w + 'z').join('');
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-barcode', 'plx-barcode--' + size, className),
    role: "img",
    "aria-label": label || fill(t.label, {
      format: name,
      value: code.value
    })
  }, rest), /*#__PURE__*/_react.default.createElement("svg", {
    className: "plx-barcode__svg",
    viewBox: '0 0 ' + width + ' ' + HEIGHT_MODULES,
    preserveAspectRatio: "xMidYMid meet",
    shapeRendering: "crispEdges",
    "aria-hidden": "true",
    focusable: "false"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    className: "plx-barcode__background",
    x: "0",
    y: "0",
    width: width,
    height: HEIGHT_MODULES
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "plx-barcode__bars",
    d: path
  })), showText ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-barcode__text",
    "aria-hidden": "true"
  }, code.text) : null);
}
  } },
  "platform/patterns/Retry/Retry.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/tokenTime.js":"platform/utils/tokenTime.js","../../utils/announce.jsx":"platform/utils/announce.jsx","../../utils/format.js":"platform/utils/format.js","../../components/Notice/Notice.jsx":"platform/components/Notice/Notice.jsx","../../components/Button/Button.jsx":"platform/components/Button/Button.jsx","../../components/Text/Text.jsx":"platform/components/Text/Text.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RetryNotice = RetryNotice;
exports.useRetry = useRetry;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _tokenTime = require("../../utils/tokenTime.js");
var _announce = require("../../utils/announce.jsx");
var _format = require("../../utils/format.js");
var _Notice = require("../../components/Notice/Notice.jsx");
var _Button = require("../../components/Button/Button.jsx");
var _Text = require("../../components/Text/Text.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Retry (useRetry, RetryNotice)
   Summary: Recovering from a failed load or save: useRetry runs a task, counts its attempts and, when asked, tries again by
     itself after a growing wait (backoff); RetryNotice is the danger Notice that says what failed, how long until the next
     attempt and which attempt it is, with the Retry button.
   Usage:
     const load = useRetry(() => fetchAssets(), { auto: true, attempts: 3 });
     <RetryNotice retry={load} title="The assets could not load" showCount>The server did not answer.</RetryNotice>
     {load.status === 'done' ? <AssetGrid items={load.result} /> : null}
   Props:
     useRetry(task, options): task() returns a promise (or a value); options:
       attempts: the attempts in one series, the first included (default 3)
       auto: after a failure, try again by itself until the series ends (default false: only the Retry button does)
       delay: the first wait in milliseconds (default the --plx-comp-retry-delay token); each next wait doubles
       maxDelay: the longest wait in milliseconds (default the --plx-comp-retry-delay-max token)
       immediate: run the task when the component mounts (default true)
     useRetry returns { status, attempt, attempts, seconds, error, result, retry, cancel }:
       status: "idle" | "running" | "waiting" (auto: counting down to the next attempt) | "failed" | "done"
       attempt: the number of the current or last attempt (1 is the first); seconds: the seconds left while waiting
       retry(): runs the task now (from a failure, a wait or a finished series; after the last attempt it starts a new series)
       cancel(): stops the countdown; the status becomes "failed"
     RetryNotice.retry: what useRetry returned
     RetryNotice.title: what failed, in a few words (default strings.title)
     RetryNotice.children: why, or what people can do meanwhile
     RetryNotice.tone: "danger" (default) | "warning" (a failure that leaves the page usable)
     RetryNotice.showCount: show which attempt it is ("Attempt 2 of 3") (default false)
     RetryNotice.onDismiss(event): a dismiss button, for a failure people may leave as it is
     RetryNotice.strings: { title: "Couldn’t load", retry: "Retry", retryNow: "Retry now", retrying: "Retrying…",
       waiting: "Retrying in {time}", attempt: "Attempt {attempt} of {attempts}", stopped: "Stopped after {attempts} attempts",
       dismiss: "Dismiss" } ({…} are filled with the values, set in the data font)
     RetryNotice.className: more classes on the notice
   Behavior:
     RetryNotice shows only while there is a failure: from the first failed attempt until an attempt succeeds. While an
       attempt runs the Retry button shows its spinner and does nothing more; while waiting it reads Retry now.
     A danger notice is an alert when it appears; each later wait and each failure after the first are announced
       politely (announce), never every second of the countdown.
     The wait doubles after each failed attempt (2, 4, 8 … seconds with the default tokens), up to maxDelay; the timer and
       a late answer are dropped when the component unmounts.
   Notes:
     A whole region that could not load uses EmptyState tone="error" with useRetry's retry as its action; RetryNotice is
       for a message beside content that is still there (a list that could not refresh, a save that failed).
     Other props of RetryNotice pass through to the Notice.
*/
function useRetry(task, {
  attempts = 3,
  auto = false,
  delay,
  maxDelay,
  immediate = true
} = {}) {
  const [state, setState] = _react.default.useState({
    status: immediate ? 'running' : 'idle',
    attempt: immediate ? 1 : 0,
    seconds: 0,
    error: null,
    result: undefined
  });
  const live = _react.default.useRef({
    run: 0,
    timer: null,
    tick: null,
    mounted: true
  });
  const taskRef = _react.default.useRef(task);
  taskRef.current = task;
  const opts = _react.default.useRef({});
  opts.current = {
    attempts,
    auto,
    delay,
    maxDelay
  };
  const stopTimers = () => {
    clearTimeout(live.current.timer);
    clearInterval(live.current.tick);
    live.current.timer = null;
    live.current.tick = null;
  };
  const run = _react.default.useCallback(attempt => {
    stopTimers();
    const id = ++live.current.run;
    setState(s => Object.assign({}, s, {
      status: 'running',
      attempt,
      seconds: 0
    }));
    Promise.resolve().then(() => taskRef.current()).then(result => {
      if (!live.current.mounted || id !== live.current.run) return;
      setState({
        status: 'done',
        attempt,
        seconds: 0,
        error: null,
        result
      });
    }, error => {
      if (!live.current.mounted || id !== live.current.run) return;
      const o = opts.current;
      if (!o.auto || attempt >= o.attempts) {
        setState(s => Object.assign({}, s, {
          status: 'failed',
          attempt,
          seconds: 0,
          error
        }));
        return;
      }
      const first = o.delay !== undefined ? o.delay : (0, _tokenTime.tokenMs)('--plx-comp-retry-delay', 2000);
      const most = o.maxDelay !== undefined ? o.maxDelay : (0, _tokenTime.tokenMs)('--plx-comp-retry-delay-max', 30000);
      const wait = Math.min(first * Math.pow(2, attempt - 1), most);
      const until = Date.now() + wait;
      setState(s => Object.assign({}, s, {
        status: 'waiting',
        attempt,
        seconds: Math.ceil(wait / 1000),
        error
      }));
      live.current.tick = setInterval(() => {
        if (live.current.mounted) setState(s => Object.assign({}, s, {
          seconds: Math.max(0, Math.ceil((until - Date.now()) / 1000))
        }));
      }, 1000);
      live.current.timer = setTimeout(() => run(attempt + 1), wait);
    });
  }, []);
  _react.default.useEffect(() => {
    live.current.mounted = true;
    if (immediate) run(1);
    return () => {
      live.current.mounted = false;
      stopTimers();
    };
  }, []);
  const current = _react.default.useRef(state);
  current.current = state;
  const retry = _react.default.useCallback(() => {
    const s = current.current;
    if (s.status === 'running') return;
    run(s.status === 'done' || s.attempt === 0 || s.attempt >= opts.current.attempts ? 1 : s.attempt + 1);
  }, [run]);
  const cancel = _react.default.useCallback(() => {
    stopTimers();
    live.current.run++;
    setState(s => s.status === 'waiting' ? Object.assign({}, s, {
      status: 'failed',
      seconds: 0
    }) : s);
  }, []);
  return Object.assign({}, state, {
    attempts,
    retry,
    cancel
  });
}
const STRINGS = {
  title: 'Couldn’t load',
  retry: 'Retry',
  retryNow: 'Retry now',
  retrying: 'Retrying…',
  waiting: 'Retrying in {time}',
  attempt: 'Attempt {attempt} of {attempts}',
  stopped: 'Stopped after {attempts} attempts',
  dismiss: 'Dismiss'
};

// a string with {name} places filled by values in the data font (numbers and durations are technical values)
const fill = (template, values) => template.split(/(\{\w+\})/).filter(Boolean).map((part, i) => {
  const m = /^\{(\w+)\}$/.exec(part);
  return m && values[m[1]] !== undefined ? /*#__PURE__*/_react.default.createElement(_Text.Text, {
    key: i,
    variant: "data"
  }, values[m[1]]) : part;
});
const plain = (template, values) => template.replace(/\{(\w+)\}/g, (all, k) => values[k] !== undefined ? String(values[k]) : all);
function RetryNotice({
  retry,
  title,
  tone = 'danger',
  showCount = false,
  onDismiss,
  strings,
  className,
  children,
  ...rest
}) {
  const t = Object.assign({}, STRINGS, strings);
  const r = retry || {};
  const failing = r.status === 'failed' || r.status === 'waiting' || r.status === 'running' && r.attempt > 1;
  const values = {
    attempt: r.attempt,
    attempts: r.attempts,
    time: (0, _format.formatDuration)(r.seconds || 0)
  };
  const shown = _react.default.useRef(false);
  _react.default.useEffect(() => {
    if (!failing) {
      shown.current = false;
      return;
    }
    if (!shown.current) {
      shown.current = true;
      return;
    } // the notice's own alert says the first failure
    if (r.status === 'waiting') (0, _announce.announce)(plain(t.waiting, values));else if (r.status === 'failed') (0, _announce.announce)((title || t.title) + '. ' + plain(r.attempt >= r.attempts ? t.stopped : t.attempt, values));
  }, [r.status, r.attempt]);
  if (!failing) return null;
  const stopped = r.status === 'failed' && r.attempt >= r.attempts;
  const status = r.status === 'waiting' ? fill(t.waiting, values) : r.status === 'running' ? t.retrying : stopped && showCount ? fill(t.stopped, values) : null;
  const count = showCount && !stopped ? fill(t.attempt, values) : null;
  return /*#__PURE__*/_react.default.createElement(_Notice.Notice, _extends({
    className: (0, _cx.cx)('plx-retry', className),
    tone: tone,
    title: title || t.title,
    onDismiss: onDismiss,
    strings: {
      dismiss: t.dismiss
    },
    actions: /*#__PURE__*/_react.default.createElement(_Button.Button, {
      size: "xs",
      icon: "refresh",
      loading: r.status === 'running',
      onClick: r.retry
    }, r.status === 'waiting' ? t.retryNow : t.retry)
  }, rest), children, status || count ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-retry__status"
  }, status ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-retry__wait"
  }, status) : null, count ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-retry__count"
  }, count) : null) : null);
}
  } },
  "platform/components/AvatarGroup/AvatarGroup.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarGroup = AvatarGroup;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Avatar = require("../Avatar/Avatar.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · AvatarGroup
   Summary: The people of one item (owners, collaborators, assignees) as a row of avatars: overlapped in a stack or spaced
     in a grid, up to a maximum, then a +N tile for the rest (03 Content & Identity › Identity › Avatar group).
   Usage:
     <AvatarGroup label="Collaborators" people={[{ name: 'Maya Chen' }, { name: 'Alex Kim', presence: 'away' }]} />
     <AvatarGroup label="Assignees" people={team} max={3} size="md" onMore={() => setOpen(true)} />
     <AvatarGroup label="Members" people={team} layout="grid" max={12} />
   Props:
     people: [{ id, name, src, color, presence }]: each person as an Avatar (name gives the initials and the accessible
       name; src a picture; color a data color; presence "online" | "away" | "busy" | "dnd" | "offline")
     label: the group's accessible name, by role ("Collaborators", "Assignees")
     max: how many avatars show before the rest collapse into +N (default 4)
     size: "xs" (24px) | "sm" (28px, default) | "md" (32px) | "lg" (40px): every avatar of a group has the same size
     layout: "stack" (default: overlapped, each ringed in the surface color) | "grid" (spaced, wrapping to more rows)
     onMore: called when the +N tile is pressed (open the full list); without it the tile is a count, not a control
     strings: the words, for other languages: { more: "+{n}", moreLabel: "{n} more", online, away, busy, offline }
     className: more classes on the group
   Behavior:
     The group is one named group (role="group"); each avatar is an image named by the person (and their presence).
     With onMore the +N tile is a button: Enter or Space opens the full list; its focus changes the tile's ring to the
       focus color.
     People keep the order they are given (put the owner first).
   Notes:
     The count is a number: DM Mono (the data font), like other technical values.
     Other props pass through to the wrapper.
*/
const SIZES = ['xs', 'sm', 'md', 'lg'];
const STRINGS = {
  more: '+{n}',
  moreLabel: '{n} more'
};
function AvatarGroup({
  people = [],
  label,
  max = 4,
  size = 'sm',
  layout = 'stack',
  onMore,
  strings,
  className,
  ...rest
}) {
  const s = SIZES.indexOf(size) >= 0 ? size : 'sm';
  const l = layout === 'grid' ? 'grid' : 'stack';
  const words = Object.assign({}, STRINGS, strings);
  const limit = Math.max(1, max | 0);
  const shown = people.length > limit ? people.slice(0, limit) : people;
  const rest_ = people.length - shown.length;
  const fill = t => t.replace('{n}', String(rest_));
  const more = rest_ > 0 ? /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    initials: fill(words.more),
    size: s,
    label: onMore ? undefined : fill(words.moreLabel),
    className: "plx-avatar-group__more"
  }) : null;
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-avatar-group', 'plx-avatar-group--' + l, 'plx-avatar-group--' + s, className),
    role: "group",
    "aria-label": label
  }, rest), shown.map((p, i) => /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    key: p.id != null ? p.id : i,
    name: p.name,
    src: p.src,
    color: p.color,
    presence: p.presence,
    size: s,
    label: p.name,
    strings: strings,
    className: "plx-avatar-group__avatar"
  })), more && onMore ? /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    className: "plx-avatar-group__more-button",
    "aria-label": fill(words.moreLabel),
    onClick: onMore
  }, more) : more);
}
  } },
  "platform/components/Persona/Persona.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx","../Badge/Badge.jsx":"platform/components/Badge/Badge.jsx","../Link/Link.jsx":"platform/components/Link/Link.jsx","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Persona = Persona;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Avatar = require("../Avatar/Avatar.jsx");
var _Badge = require("../Badge/Badge.jsx");
var _Link = require("../Link/Link.jsx");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Persona
   Summary: A person in one compact line: their avatar, their name and one detail (a role, a team, an email), with their
     presence and a role badge when they help (03 Content & Identity › Identity › Profile summary).
   Usage:
     <Persona name="Maya Chen" />
     <Persona name="Maya Chen" secondary="Designer · Brand team" presence="online" />
     <Persona name="Alex Kim" secondary="alex.kim@example.org" role="Owner" size="lg" href="../contacts/?id=12" />
   Props:
     name: the person's display name (the name they chose); the avatar's initials come from it
     src: the person's picture; color: their data color (Avatar's color)
     secondary: one detail under the name: a role, a team or an email
     role: a short role on a neutral badge after the name ("Owner", "Admin")
     presence: "online" | "away" | "busy" | "dnd" (do not disturb) | "offline": the dot on the avatar, and the state in
       words for assistive technology
     size: "xs" (24px avatar) | "sm" (28px) | "md" (32px, default) | "lg" (40px) | "xl" (48px): the avatar and the text
       sizes step together
     href: the person's profile: the name becomes a link to it
     strings: the words of presence, for other languages: { online: "Online", away: "Away", busy: "Busy",
       dnd: "Do not disturb", offline: "Offline" }
     className: more classes on the wrapper
   Behavior:
     The avatar is decorative (the name is next to it); the presence state is read after the name ("Maya Chen, Online").
     A long name or detail is cut with an ellipsis; its full text is in the title, shown on hover.
     Not interactive itself; with href the name is a link (one Tab stop).
   Notes:
     Other props pass through to the wrapper.
*/
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
const PRESENCE = ['online', 'away', 'busy', 'dnd', 'offline'];
const STRINGS = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  dnd: 'Do not disturb',
  offline: 'Offline'
};
function Persona({
  name,
  src,
  color,
  secondary,
  role,
  presence,
  size = 'md',
  href,
  strings,
  className,
  ...rest
}) {
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const p = PRESENCE.indexOf(presence) >= 0 ? presence : null;
  const words = Object.assign({}, STRINGS, strings);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-persona', 'plx-persona--' + s, className)
  }, rest), /*#__PURE__*/_react.default.createElement(_Avatar.Avatar, {
    name: name,
    src: src,
    color: color,
    presence: p || undefined,
    size: s,
    className: "plx-persona__avatar"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-persona__text"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-persona__primary"
  }, href ? /*#__PURE__*/_react.default.createElement(_Link.Link, {
    href: href,
    variant: "standalone",
    className: "plx-persona__name",
    title: name
  }, name) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-persona__name",
    title: name
  }, name), p ? /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, ', ' + words[p]) : null, role ? /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    tone: "neutral",
    variant: "soft",
    size: "sm",
    className: "plx-persona__role"
  }, role) : null), secondary ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-persona__secondary",
    title: typeof secondary === 'string' ? secondary : undefined
  }, secondary) : null));
}
  } },
  "platform/components/ProgressCircle/ProgressCircle.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressCircle = ProgressCircle;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · ProgressCircle
   Summary: How far a task has come, as a ring: a faint track and an arc in a tone that fills clockwise from the top, or
     turns while the amount is unknown (08 Feedback & System State › Loading and progress › Circular progress).
   Usage:
     <ProgressCircle value={62} label="Uploading 3 files" />
     <ProgressCircle label="Loading assets" size="sm" />
     <ProgressCircle value={7} max={12} tone="success" size="lg" showValue label="Tasks done" />
   Props:
     value: how much is done; leave it out while the amount is unknown (the ring then turns: indeterminate)
     max: the whole (default 100)
     label: what is progressing: the accessible name (required; say what loads, "Loading assets")
     size: "sm" (16px, inside a control or beside a line of text) | "md" (24px, default) | "lg" (48px, a panel; it can show
       the value)
     tone: "info" (default) | "success" | "warning" | "danger" | "neutral": the arc's color, as ProgressBar's tones
     showValue: the whole percent in the ring's center, in the data font ("62%"); size lg only (default false)
     locale: the language the percent is formatted in (default: the page's language)
     className: more classes on the ring
   Behavior:
     role="progressbar" named by label; a known amount reports aria-valuenow (the percent) with aria-valuemin 0 and
       aria-valuemax 100; an unknown amount reports no value.
     The arc is drawn as SVG geometry from the amount (no style is written); its width is the size's stroke token and
       stays the same however the ring is scaled.
     People who ask their system for less motion see the indeterminate arc still.
   Notes:
     Use a ProgressBar where there is room for a bar and a label; the ring is for tight places and short waits.
     Other props pass through to the wrapper.
*/
const SIZES = ['sm', 'md', 'lg'];
const TONES = ['info', 'success', 'warning', 'danger', 'neutral'];
// the geometry in the 48-unit box: the ring's center and radius (the strokes do not scale, so they fit at every size)
const C = 24,
  R = 21;
const round = n => Math.round(n * 100) / 100;
// an arc from the top, clockwise, over pct percent of the ring
function arc(pct) {
  const a = Math.min(pct, 99.99) / 100 * 2 * Math.PI;
  const x = round(C + R * Math.sin(a)),
    y = round(C - R * Math.cos(a));
  return 'M ' + C + ' ' + (C - R) + ' A ' + R + ' ' + R + ' 0 ' + (pct > 50 ? 1 : 0) + ' 1 ' + x + ' ' + y;
}
function ProgressCircle({
  value,
  max = 100,
  label,
  size = 'md',
  tone = 'info',
  showValue = false,
  locale,
  className,
  ...rest
}) {
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const t = TONES.indexOf(tone) >= 0 ? tone : 'info';
  const known = typeof value === 'number' && !Number.isNaN(value);
  const pct = known ? Math.max(0, Math.min(100, value / (max || 100) * 100)) : null;
  const loc = locale || typeof document !== 'undefined' && document.documentElement.lang || undefined;
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-progress-circle', 'plx-progress-circle--' + s, 'plx-progress-circle--' + t, !known && 'is-indeterminate', className),
    role: "progressbar",
    "aria-label": label,
    "aria-valuemin": known ? 0 : undefined,
    "aria-valuemax": known ? 100 : undefined,
    "aria-valuenow": known ? Math.round(pct) : undefined
  }, rest), /*#__PURE__*/_react.default.createElement("svg", {
    className: "plx-progress-circle__svg",
    viewBox: "0 0 48 48",
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    className: "plx-progress-circle__track",
    cx: C,
    cy: C,
    r: R
  }), known && pct >= 100 ? /*#__PURE__*/_react.default.createElement("circle", {
    className: "plx-progress-circle__indicator",
    cx: C,
    cy: C,
    r: R
  }) : known ? pct > 0 ? /*#__PURE__*/_react.default.createElement("path", {
    className: "plx-progress-circle__indicator",
    d: arc(pct)
  }) : null : /*#__PURE__*/_react.default.createElement("path", {
    className: "plx-progress-circle__indicator",
    d: arc(25)
  })), showValue && known && s === 'lg' ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-progress-circle__value",
    "aria-hidden": "true"
  }, new Intl.NumberFormat(loc, {
    style: 'percent',
    maximumFractionDigits: 0
  }).format(pct / 100)) : null);
}
  } },
  "platform/utils/qr.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qrEncode = qrEncode;
/* Plenix · qrEncode
   Summary: The Plenix QR code encoder (ISO/IEC 18004, model 2): a text becomes the matrix of dark and light modules that
     QRCode draws. Plenix's own code, no dependency.
   Usage:
     const qr = qrEncode('https://plenix.lighthouseway.org/notes/', { level: 'M' });
     qr.size            // 29 (modules per side, without the quiet zone)
     qr.modules[y][x]   // true = a dark module
   Props:
     text: the value to encode, as UTF-8 bytes (byte mode)
     options.level: the error correction level: "L" (7%) | "M" (15%, default) | "Q" (25%) | "H" (30%)
     options.mask: a mask pattern 0..7; without it the encoder scores all eight and keeps the best
     options.minVersion, options.maxVersion: the versions to search (1..40); the smallest that holds the text wins
   Behavior:
     Returns { version, size, level, mask, modules } or throws a RangeError when the text does not fit in version 40.
     Function patterns (finders, timing, alignment, format and version information) follow the standard; the data is
       split into Reed-Solomon blocks over GF(256) (polynomial 0x11D) and interleaved.
   Notes:
     The quiet zone (four light modules on every side) is the drawing's job (QRCode adds it).
*/

const LEVELS = {
  L: {
    bits: 1,
    i: 0
  },
  M: {
    bits: 0,
    i: 1
  },
  Q: {
    bits: 3,
    i: 2
  },
  H: {
    bits: 2,
    i: 3
  }
};
// error correction codewords per block, and the number of blocks, by level (L, M, Q, H) and version (index 1..40)
const ECC_PER_BLOCK = [[-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28], [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30], [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]];
const BLOCKS = [[-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25], [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49], [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68], [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]];
const bit = (x, i) => (x >>> i & 1) !== 0;

// the modules a version has for data and error correction (everything but the function patterns)
function rawModules(ver) {
  let n = (16 * ver + 128) * ver + 64;
  if (ver >= 2) {
    const align = Math.floor(ver / 7) + 2;
    n -= (25 * align - 10) * align - 55;
    if (ver >= 7) n -= 36;
  }
  return n;
}
const dataCodewords = (ver, li) => Math.floor(rawModules(ver) / 8) - ECC_PER_BLOCK[li][ver] * BLOCKS[li][ver];

// GF(256) with the QR polynomial 0x11D
function mul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i--) {
    z = z << 1 ^ (z >>> 7) * 0x11d;
    z ^= (y >>> i & 1) * x;
  }
  return z & 0xff;
}
function divisor(degree) {
  const out = new Array(degree).fill(0);
  out[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < out.length; j++) {
      out[j] = mul(out[j], root);
      if (j + 1 < out.length) out[j] ^= out[j + 1];
    }
    root = mul(root, 0x02);
  }
  return out;
}
function remainder(data, div) {
  const out = new Array(div.length).fill(0);
  for (const b of data) {
    const f = b ^ out.shift();
    out.push(0);
    div.forEach((c, i) => {
      out[i] ^= mul(c, f);
    });
  }
  return out;
}
function utf8(text) {
  return Array.from(new TextEncoder().encode(String(text)));
}
function alignmentPositions(ver, size) {
  if (ver === 1) return [];
  const n = Math.floor(ver / 7) + 2;
  const step = ver === 32 ? 26 : Math.ceil((ver * 4 + 4) / (n * 2 - 2)) * 2;
  const out = [6];
  for (let pos = size - 7; out.length < n; pos -= step) out.splice(1, 0, pos);
  return out;
}
function penalty(m, size) {
  let score = 0;
  const line = get => {
    for (let a = 0; a < size; a++) {
      let run = 1,
        s = '';
      for (let b = 0; b < size; b++) {
        const v = get(a, b);
        s += v ? '1' : '0';
        if (b > 0 && v === get(a, b - 1)) {
          run++;
          if (run === 5) score += 3;else if (run > 5) score += 1;
        } else run = 1;
      }
      // a finder-like pattern with four light modules on one side
      for (const p of ['10111010000', '00001011101']) {
        let i = s.indexOf(p);
        while (i >= 0) {
          score += 40;
          i = s.indexOf(p, i + 1);
        }
      }
    }
  };
  line((y, x) => m[y][x]);
  line((x, y) => m[y][x]);
  for (let y = 0; y < size - 1; y++) for (let x = 0; x < size - 1; x++) {
    const c = m[y][x];
    if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3;
  }
  let dark = 0;
  m.forEach(row => row.forEach(v => {
    if (v) dark++;
  }));
  score += Math.floor(Math.abs(dark * 100 / (size * size) - 50) / 5) * 10;
  return score;
}
const MASKS = [(x, y) => (x + y) % 2 === 0, (x, y) => y % 2 === 0, x => x % 3 === 0, (x, y) => (x + y) % 3 === 0, (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0, (x, y) => x * y % 2 + x * y % 3 === 0, (x, y) => (x * y % 2 + x * y % 3) % 2 === 0, (x, y) => ((x + y) % 2 + x * y % 3) % 2 === 0];
function qrEncode(text, options = {}) {
  const level = LEVELS[options.level] ? options.level : 'M';
  const li = LEVELS[level].i;
  const bytes = utf8(text);
  const minV = Math.max(1, options.minVersion || 1),
    maxV = Math.min(40, options.maxVersion || 40);
  let ver = minV;
  for (; ver <= maxV; ver++) if (4 + (ver < 10 ? 8 : 16) + bytes.length * 8 <= dataCodewords(ver, li) * 8) break;
  if (ver > maxV) throw new RangeError('qrEncode: the text is too long for a QR code at level ' + level);
  const size = ver * 4 + 17;

  // the data bits: byte mode, the count, the bytes, the terminator, then the pad codewords
  const bits = [];
  const put = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push(val >>> i & 1);
  };
  put(4, 4);
  put(bytes.length, ver < 10 ? 8 : 16);
  bytes.forEach(b => put(b, 8));
  const capacity = dataCodewords(ver, li) * 8;
  put(0, Math.min(4, capacity - bits.length));
  put(0, (8 - bits.length % 8) % 8);
  for (let pad = 0xec; bits.length < capacity; pad ^= 0xec ^ 0x11) put(pad, 8);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = b << 1 | bits[i + j];
    data.push(b);
  }

  // the blocks with their error correction, interleaved
  const nBlocks = BLOCKS[li][ver],
    eccLen = ECC_PER_BLOCK[li][ver],
    raw = Math.floor(rawModules(ver) / 8);
  const nShort = nBlocks - raw % nBlocks,
    shortLen = Math.floor(raw / nBlocks);
  const div = divisor(eccLen),
    blocks = [];
  for (let i = 0, k = 0; i < nBlocks; i++) {
    const dat = data.slice(k, k + shortLen - eccLen + (i < nShort ? 0 : 1));
    k += dat.length;
    const ecc = remainder(dat, div);
    if (i < nShort) dat.push(0);
    blocks.push(dat.concat(ecc));
  }
  const codewords = [];
  for (let i = 0; i < blocks[0].length; i++) blocks.forEach((b, j) => {
    if (i !== shortLen - eccLen || j >= nShort) codewords.push(b[i]);
  });

  // the function patterns
  const modules = Array.from({
    length: size
  }, () => new Array(size).fill(false));
  const fixed = Array.from({
    length: size
  }, () => new Array(size).fill(false));
  const set = (x, y, dark) => {
    modules[y][x] = dark;
    fixed[y][x] = true;
  };
  for (let i = 0; i < size; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  [[3, 3], [size - 4, 3], [3, size - 4]].forEach(([cx, cy]) => {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const d = Math.max(Math.abs(dx), Math.abs(dy)),
        x = cx + dx,
        y = cy + dy;
      if (x >= 0 && x < size && y >= 0 && y < size) set(x, y, d !== 2 && d !== 4);
    }
  });
  const al = alignmentPositions(ver, size),
    last = al.length - 1;
  al.forEach((ay, i) => al.forEach((ax, j) => {
    if (i === 0 && j === 0 || i === 0 && j === last || i === last && j === 0) return;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  }));
  const drawFormat = mask => {
    const d = LEVELS[level].bits << 3 | mask;
    let r = d;
    for (let i = 0; i < 10; i++) r = r << 1 ^ (r >>> 9) * 0x537;
    const f = (d << 10 | r) ^ 0x5412;
    for (let i = 0; i <= 5; i++) set(8, i, bit(f, i));
    set(8, 7, bit(f, 6));
    set(8, 8, bit(f, 7));
    set(7, 8, bit(f, 8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(f, i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(f, i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(f, i));
    set(8, size - 8, true);
  };
  drawFormat(0);
  if (ver >= 7) {
    let r = ver;
    for (let i = 0; i < 12; i++) r = r << 1 ^ (r >>> 11) * 0x1f25;
    const v = ver << 12 | r;
    for (let i = 0; i < 18; i++) {
      const a = size - 11 + i % 3,
        b = Math.floor(i / 3);
      set(a, b, bit(v, i));
      set(b, a, bit(v, i));
    }
  }

  // the codewords, in two-module columns from the bottom right, zigzagging up and down
  let n = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) for (let j = 0; j < 2; j++) {
      const x = right - j,
        up = (right + 1 & 2) === 0,
        y = up ? size - 1 - vert : vert;
      if (!fixed[y][x] && n < codewords.length * 8) {
        modules[y][x] = bit(codewords[n >>> 3], 7 - (n & 7));
        n++;
      }
    }
  }

  // the mask: the one asked for, or the one with the lowest penalty
  const apply = mask => {
    const f = MASKS[mask];
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!fixed[y][x] && f(x, y)) modules[y][x] = !modules[y][x];
  };
  let mask = options.mask;
  if (!(mask >= 0 && mask <= 7)) {
    let best = Infinity;
    for (let k = 0; k < 8; k++) {
      apply(k);
      drawFormat(k);
      const p = penalty(modules, size);
      if (p < best) {
        best = p;
        mask = k;
      }
      apply(k);
    }
  }
  apply(mask);
  drawFormat(mask);
  return {
    version: ver,
    size,
    level,
    mask,
    modules
  };
}
  } },
  "platform/components/QRCode/QRCode.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/qr.js":"platform/utils/qr.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCode = QRCode;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _qr = require("../../utils/qr.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · QRCode
   Summary: A QR code that moves a link or a short value from the screen to a phone camera: dark modules on a light plate
     with its quiet zone, in both modes, with what scanning does and the value as text (03 Content & Identity › Images and
     media › QR code).
   Usage:
     <QRCode value="https://plenix.lighthouseway.org/notes/" label="QR code: open Notes on your phone" />
     <QRCode value={shareUrl} label="QR code for the shared folder" caption="Scan to open the folder on your phone" showValue />
     <QRCode value={url} label="QR code: sign in on your phone" level="H" logo={<BrandMark size="lg" label="Plenix" />} />
   Props:
     value: the text to encode (a URL or a short value), as UTF-8
     label: the image's accessible name: what the code is for (required)
     level: the error correction: "L" (7%) | "M" (15%, default) | "Q" (25%) | "H" (30%); a higher level survives damage
       and glare but makes a denser code
     size: "sm" (96px) | "md" (160px, default) | "lg" (240px), quiet zone included
     logo: a mark for the center: the modules under it are left out and the code is encoded at level H, so it still scans
     caption: what scanning does, under the code ("Scan to open on your phone")
     showValue: the encoded value as text under the code, in the data font, so people can copy or type it (default false)
     onAccent: the caption and value in the accent colors, for an accent surface; the code keeps its light plate (default false)
     className: more classes on the wrapper
   Behavior:
     The matrix comes from qrEncode (platform/utils/qr.js): byte mode, the smallest version that holds the value, the mask
       with the lowest penalty. It is one SVG path drawn on the plate; the quiet zone is four modules on every side.
     The plate and the modules keep their colors in dark mode: scanners read dark on light.
     A value too long for a QR code draws nothing and warns in the console.
   Notes:
     Always offer the value another way (showValue, or a copy action next to it): not everyone can scan.
     Other props pass through to the wrapper.
*/
const SIZES = ['sm', 'md', 'lg'];
const QUIET = 4; // the quiet zone, in modules
const LOGO_SHARE = 0.25; // the share of the code's width the logo's clear square takes

function QRCode({
  value,
  label,
  level = 'M',
  size = 'md',
  logo,
  caption,
  showValue = false,
  onAccent = false,
  className,
  ...rest
}) {
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const lv = logo ? 'H' : level;
  const code = _react.default.useMemo(() => {
    try {
      return (0, _qr.qrEncode)(value == null ? '' : String(value), {
        level: lv
      });
    } catch (e) {
      console.warn('QRCode: ' + e.message);
      return null;
    }
  }, [value, lv]);
  const d = _react.default.useMemo(() => {
    if (!code) return '';
    const n = code.size;
    let clear = 0;
    if (logo) {
      clear = Math.round(n * LOGO_SHARE);
      if (clear % 2 === 0) clear++;
    }
    const lo = (n - clear) / 2,
      hi = lo + clear;
    const out = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      if (!code.modules[y][x]) continue;
      if (clear && x >= lo && x < hi && y >= lo && y < hi) continue;
      out.push('M' + (x + QUIET) + ' ' + (y + QUIET) + 'h1v1h-1z');
    }
    return out.join('');
  }, [code, logo]);
  if (!code) return null;
  const box = code.size + QUIET * 2;
  return /*#__PURE__*/_react.default.createElement("figure", _extends({
    className: (0, _cx.cx)('plx-qr-code', 'plx-qr-code--' + s, onAccent && 'plx-qr-code--on-accent', className)
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-qr-code__frame"
  }, /*#__PURE__*/_react.default.createElement("svg", {
    className: "plx-qr-code__svg",
    viewBox: '0 0 ' + box + ' ' + box,
    role: "img",
    "aria-label": label,
    focusable: "false",
    "data-plx-qr-version": code.version,
    "data-plx-qr-level": code.level
  }, /*#__PURE__*/_react.default.createElement("path", {
    className: "plx-qr-code__modules",
    d: d
  })), logo ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-qr-code__logo"
  }, logo) : null), caption || showValue ? /*#__PURE__*/_react.default.createElement("figcaption", {
    className: "plx-qr-code__caption"
  }, caption ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-qr-code__text"
  }, caption) : null, showValue ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-qr-code__value"
  }, String(value)) : null) : null);
}
  } },
  "platform/components/VersionLabel/VersionLabel.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Badge/Badge.jsx":"platform/components/Badge/Badge.jsx","../Link/Link.jsx":"platform/components/Link/Link.jsx","../VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VersionLabel = VersionLabel;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Badge = require("../Badge/Badge.jsx");
var _Link = require("../Link/Link.jsx");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · VersionLabel
   Summary: Which version of an item this is: a number ("v12") or a semantic version ("2.1.0") in the data font, with a
     qualifier when it helps ("Latest", "Draft") (03 Content & Identity › Metadata › Version label).
   Usage:
     <VersionLabel version={12} />
     <VersionLabel version="2.1.0" status="latest" />
     <VersionLabel version={3} status="draft" size="sm" href="#history" />
   Props:
     version: a whole number (drawn "v12") or a semantic version string (drawn as it is, "2.1.0"); never both mixed
     status: "latest" | "draft": the qualifier on a neutral badge after the number; leave it out for any other version
     size: "md" (default: 12px text and a 20px badge) | "sm" (compact: 11px text and a 16px badge, for table rows and
       dense lists)
     href: the version history: the number becomes a link to it
     strings: the words, for other languages: { version: "Version", prefix: "v", latest: "Latest", draft: "Draft" }
     className: more classes on the label
   Behavior:
     Read as "Version 12" (the prefix "v" is hidden from assistive technology and the word is said instead), then the
       qualifier.
     Not interactive itself; with href the number is a link (one Tab stop).
   Notes:
     One format across the product: numbers for an item's saved versions, semantic versions for releases.
     Mark only one version "Latest" at a time.
     Other props pass through to the <span>.
*/
const STRINGS = {
  version: 'Version',
  prefix: 'v',
  latest: 'Latest',
  draft: 'Draft'
};
const STATUSES = ['latest', 'draft'];
function VersionLabel({
  version,
  status,
  size = 'md',
  href,
  strings,
  className,
  ...rest
}) {
  const words = Object.assign({}, STRINGS, strings);
  const s = size === 'sm' ? 'sm' : 'md';
  const numbered = typeof version === 'number' || /^\d+$/.test(String(version));
  const number = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_VisuallyHidden.VisuallyHidden, null, words.version + ' '), numbered ? /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }, words.prefix) : null, String(version));
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _cx.cx)('plx-version-label', 'plx-version-label--' + s, className)
  }, rest), href ? /*#__PURE__*/_react.default.createElement(_Link.Link, {
    href: href,
    className: "plx-version-label__number"
  }, number) : /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-version-label__number"
  }, number), STATUSES.indexOf(status) >= 0 ? /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
    tone: "neutral",
    variant: "soft",
    size: s === 'sm' ? 'sm' : 'md',
    className: "plx-version-label__status"
  }, words[status]) : null);
}
  } },
  "platform/components/Banner/Banner.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Banner = Banner;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Icon = require("../Icon/Icon.jsx");
var _Button = require("../Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Banner
   Summary: A message about the whole page or a whole pane, across its full width at its top: a system notice, an expiring
     plan, a sync failure, read-only mode (08 Feedback › Messages › Banner). Notice is the message inside content.
   Usage:
     <Banner tone="warning" title="Your plan ends in 3 days">Renew it to keep sharing links active.</Banner>
     <Banner tone="danger" actions={<Button size="sm">Retry</Button>} onDismiss={() => …}>The library could not sync.</Banner>
     <Banner tone="info" placement="pane">This folder is read-only.</Banner>
   Props:
     tone: "info" (default) | "success" | "warning" | "danger" | "neutral": the soft fill, edge, text color and status icon
     title: a short bold lead before the message (optional)
     children: the message, one or two sentences
     actions: one or two Buttons (size "sm") after the message (optional)
     onDismiss(): shows a Dismiss button that runs it; the owner removes the banner (optional: without it the banner stays)
     placement: "page" (default; the top of the page, under the app header) | "pane" (the top of a pane or a panel)
     icon: an icon name in place of the tone's icon (optional)
     strings: the words it shows and announces, for other languages: { dismiss: "Dismiss" } and the StatusIcon tone words
     className: more classes on the banner
   Behavior:
     A danger banner is an alert (role="alert"): screen readers announce it when it appears. The other tones are a status
       (role="status"), announced politely.
     It spans the full width of its page or pane with an edge under it only; it has no corners and no shadow, and it pushes
       the content down rather than covering it.
     The message wraps; the actions and the Dismiss button stay on the first line's end at every width.
   Notes:
     One banner per page or pane at a time: show the most important one.
     Other props pass through to the banner element.
*/
const TONES = ['info', 'success', 'warning', 'danger', 'neutral'];
function Banner({
  tone = 'info',
  title,
  children,
  actions,
  onDismiss,
  placement = 'page',
  icon,
  strings,
  className,
  ...rest
}) {
  const t = TONES.indexOf(tone) >= 0 ? tone : 'info';
  const words = Object.assign({
    dismiss: 'Dismiss'
  }, strings);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-banner', 'plx-banner--' + t, 'plx-banner--' + (placement === 'pane' ? 'pane' : 'page'), className),
    role: t === 'danger' ? 'alert' : 'status'
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-banner__icon"
  }, icon ? /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _cx.cx)('plx-status-icon', 'plx-status-icon--' + t, 'plx-status-icon--md')
  }, /*#__PURE__*/_react.default.createElement(_Icon.Icon, {
    name: icon,
    className: "plx-status-icon__glyph"
  })) : /*#__PURE__*/_react.default.createElement(_Icon.StatusIcon, {
    tone: t,
    strings: strings
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-banner__body"
  }, title ? /*#__PURE__*/_react.default.createElement("strong", {
    className: "plx-banner__title"
  }, title) : null, children ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-banner__text"
  }, children) : null), actions ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-banner__actions"
  }, actions) : null, onDismiss ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    variant: "ghost",
    size: "sm",
    iconOnly: true,
    icon: "close",
    label: words.dismiss,
    className: "plx-banner__dismiss",
    onClick: onDismiss
  }) : null);
}
  } },
  "platform/components/Scrim/Scrim.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/scrollLock.js":"platform/utils/scrollLock.js"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrim = Scrim;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _scrollLock = require("../../utils/scrollLock.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Scrim
   Summary: The translucent layer behind a modal layer or over a busy region that dims what is under it and takes its
     clicks (09 Overlays › Layer behavior › Backdrop / scrim).
   Usage:
     <Scrim onClick={close} />                          a modal layer's backdrop over the window
     <Scrim variant="light" contained />                 over one region (its positioned parent)
     <Scrim variant="inverse" contained />              a veil in the page color, behind a loading indicator
   Props:
     variant: "modal" (default; the scrim role at the middle opacity: dialogs, drawers, sheets) | "light" (the scrim role at
       the low opacity: a non-blocking dim, a drawer over a narrow window) | "inverse" (the canvas at the high opacity: a
       veil that keeps the content faintly readable, behind a loading indicator)
     contained: covers its nearest positioned parent instead of the window (default false)
     lockScroll: stops the page scrolling while the scrim is shown (default: true over the window, false when contained)
     onClick(event): runs on a click on the scrim (a modal layer closes when it is safe to); without it the click does nothing
     className: more classes on the scrim
   Behavior:
     The scrim is decoration: it is hidden from assistive technology and is never a Tab stop. The modal layer above it makes
       the page inert and traps focus (utils/layer.js); the scrim only shows that the page is unavailable and takes the
       pointer.
     It fades in with the modal layer (motion-fade-in at the fast duration); with reduced motion it appears at once.
     Over the window it stops the page scrolling (utils/scrollLock.js) for as long as it is shown; locks are counted, so
       nested layers release the page only when the last one closes.
   Notes:
     Never put text or controls on the scrim: they go in the layer above it. One scrim at a time.
     Dialog, Drawer and Sheet draw their own backdrop today; they adopt Scrim in a later wave.
     Other props pass through to the <div>.
*/
const VARIANTS = ['modal', 'light', 'inverse'];
function Scrim({
  variant = 'modal',
  contained = false,
  lockScroll,
  onClick,
  className,
  ...rest
}) {
  const v = VARIANTS.indexOf(variant) >= 0 ? variant : 'modal';
  (0, _scrollLock.useScrollLock)(lockScroll !== undefined ? !!lockScroll : !contained);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-scrim', 'plx-scrim--' + v, contained && 'plx-scrim--contained', className),
    "aria-hidden": "true",
    onClick: onClick
  }, rest));
}
  } },
  "platform/components/LoadingOverlay/LoadingOverlay.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../Scrim/Scrim.jsx":"platform/components/Scrim/Scrim.jsx","../Loading/Loading.jsx":"platform/components/Loading/Loading.jsx","../ProgressBar/ProgressBar.jsx":"platform/components/ProgressBar/ProgressBar.jsx","../Button/Button.jsx":"platform/components/Button/Button.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingOverlay = LoadingOverlay;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _Scrim = require("../Scrim/Scrim.jsx");
var _Loading = require("../Loading/Loading.jsx");
var _ProgressBar = require("../ProgressBar/ProgressBar.jsx");
var _Button = require("../Button/Button.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · LoadingOverlay
   Summary: Covers a region (or the whole window) while it saves or refreshes: a veil over the content, a spinner or a
     progress bar in its middle and a short message, so nobody edits what is about to change (08 Feedback › Loading and
     progress › Loading overlay).
   Usage:
     <LoadingOverlay active={saving} message="Saving changes"><AssetTable … /></LoadingOverlay>
     <LoadingOverlay active={importing} progress={42} message="Importing 120 assets" onCancel={stop}>…</LoadingOverlay>
     <LoadingOverlay active fullPage message="Signing you in" />
   Props:
     active: covers the content while true (default true)
     fullPage: covers the whole window instead of its own region, and stops the page scrolling (default false)
     message: what is happening, in a few words ("Saving changes"); shown under the indicator and announced
     progress: how much is done (0 to 100); with it a progress bar replaces the spinner
     delay: milliseconds to wait before it shows, so a quick save does not flash (default 0)
     onCancel(): shows a Cancel button under the indicator that runs it, for work that can stop (optional)
     strings: the words it announces and shows, for other languages: { loading: "Loading", cancel: "Cancel" }
     children: the region it covers
     className: more classes on the region
   Behavior:
     While active the region is aria-busy and its content is inert: no pointer, no keyboard, no screen reader inside it.
     Only the covered region is blocked; the rest of the page keeps working (fullPage blocks the window).
     The indicator is a status: its message is announced politely when it shows (the Spinner's or the ProgressBar's name).
     When the work ends, focus returns to the element inside the region that had it.
     The veil is the inverse Scrim (the canvas at the high opacity): the content stays faintly visible, so nothing jumps.
   Notes:
     For content that loads the first time with a known layout, use skeletons; for work of minutes, run it in the
       background and report it with a toast.
     Other props pass through to the region element.
*/
function LoadingOverlay({
  active = true,
  fullPage = false,
  message,
  progress,
  delay = 0,
  onCancel,
  strings,
  children,
  className,
  ...rest
}) {
  const words = Object.assign({
    loading: 'Loading',
    cancel: 'Cancel'
  }, strings);
  const [shown, setShown] = _react.default.useState(active && !delay);
  const content = _react.default.useRef(null);
  const focused = _react.default.useRef(null);
  _react.default.useEffect(() => {
    if (!active) {
      setShown(false);
      return undefined;
    }
    if (!delay) {
      setShown(true);
      return undefined;
    }
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  // the content is inert while covered; the element that had focus inside it gets it back afterwards
  _react.default.useEffect(() => {
    const el = content.current;
    if (!el || !shown) return undefined;
    const a = document.activeElement;
    focused.current = a && el.contains(a) ? a : null;
    el.inert = true;
    return () => {
      el.inert = false;
      const back = focused.current;
      focused.current = null;
      if (back && back.isConnected && typeof back.focus === 'function') back.focus();
    };
  }, [shown]);
  const name = message || words.loading;
  const known = typeof progress === 'number' && !Number.isNaN(progress);
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _cx.cx)('plx-loading-overlay', fullPage && 'plx-loading-overlay--page', className),
    "aria-busy": shown ? true : undefined
  }, rest), children !== undefined ? /*#__PURE__*/_react.default.createElement("div", {
    ref: content,
    className: "plx-loading-overlay__content"
  }, children) : null, shown ? /*#__PURE__*/_react.default.createElement(_Scrim.Scrim, {
    variant: "inverse",
    contained: !fullPage,
    lockScroll: fullPage
  }) : null, shown ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-loading-overlay__status"
  }, known ? /*#__PURE__*/_react.default.createElement(_ProgressBar.ProgressBar, {
    value: progress,
    label: name,
    showValue: true,
    className: "plx-loading-overlay__progress"
  }) : /*#__PURE__*/_react.default.createElement(_Loading.Spinner, {
    size: "lg",
    label: name
  }), message && !known ? /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-loading-overlay__message",
    "aria-hidden": "true"
  }, message) : null, onCancel ? /*#__PURE__*/_react.default.createElement(_Button.Button, {
    size: "sm",
    onClick: onCancel
  }, words.cancel) : null) : null);
}
  } },
  "platform/components/Time/Time.jsx": { deps: {"react":null,"../../utils/cx.js":"platform/utils/cx.js","../../utils/format.js":"platform/utils/format.js","../../utils/tokenTime.js":"platform/utils/tokenTime.js","../Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx"}, externals: { "react": function () { return window.React; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Time = Time;
var _react = _interopRequireDefault(require("react"));
var _cx = require("../../utils/cx.js");
var _format = require("../../utils/format.js");
var _tokenTime = require("../../utils/tokenTime.js");
var _Tooltip = require("../Tooltip/Tooltip.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · Time
   Summary: A date or a time as a technical value: a timestamp, a relative time ("5 minutes ago"), a date label ("Today",
     "Yesterday", "Oct 8"), a date or a time alone, in the reader's locale and in DM Mono, on a <time> element with the
     machine-readable value (03 Content › Metadata › Timestamp, Relative time, Date label).
   Usage:
     <Time value={asset.modified} />                                  Oct 8, 2026, 2:05 PM
     <Time value={comment.created} format="relative" />               5 minutes ago (updates by itself)
     <Time value={task.due} format="label" />                         Today · Yesterday · Oct 8
     <Time value={invoice.date} format="date" dateStyle="long" />     October 8, 2026
     <Time value={log.at} format="time" seconds />                    2:05:33 PM
   Props:
     value: the moment: a Date, an ISO 8601 string or milliseconds since 1970
     format: "datetime" (default; the date and the time) | "relative" | "label" | "date" | "time"
     dateStyle: the date's length, as formatDate: "short" | "medium" (default) | "long" | "full" (datetime and date)
     seconds: shows the seconds (time; only when order within a minute matters) (default false)
     timeZone: an IANA zone ("Europe/Lisbon") to show the moment in; default the reader's
     timeZoneName: "short" names the zone after the time ("2:05 PM PST") (datetime and time)
     tooltip: the full date and time with its zone in a tooltip, on hover and keyboard focus; default true for relative and
       label, false otherwise
     live: updates the text as time passes, every --plx-comp-time-refresh-interval (default true for relative and label)
     now: the moment "now" is measured from (relative and label; for tests and previews)
     strings: the words it shows, for other languages: { now: "Just now" }
     locale: the language it is written in (default the page's language)
     className: more classes on the <time>
   Behavior:
     Under a minute a relative time reads "Just now"; after 7 days (the Formats standard) it becomes the date.
     A date label names the calendar day: "Today", "Yesterday" and "Tomorrow", else the short date (the year only when it
       is not this year).
     With the tooltip the <time> is a Tab stop, so keyboard users can reach the full value; the tooltip describes it.
     The live text changes in place without moving the layout and is never announced (it is not a live region).
     A value that is not a valid date renders nothing.
   Notes:
     The words and the order come from utils/format.js (Intl): never build a date by hand.
     The <time> carries dateTime: the ISO 8601 moment, or the calendar day ("2026-10-08") for date and label.
     It is set in the data font (DM Mono) at the size and line height of the text around it.
     Other props pass through to the <time>.
*/
const FORMATS = ['datetime', 'relative', 'label', 'date', 'time'];
const toDate = v => {
  if (v === undefined || v === null || v === '') return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d.getTime()) ? null : d;
};
const dayStart = d => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
const pad = n => (n < 10 ? '0' : '') + n;
const calendarDay = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

// "Today", "Yesterday", "Tomorrow" (Intl, numeric auto), else the short date
function dayLabel(d, now, o) {
  const days = Math.round((dayStart(d) - dayStart(now)) / 86400000);
  if (Math.abs(days) > 1) return (0, _format.formatDate)(d, {
    dateStyle: 'short',
    timeZone: o.timeZone,
    locale: o.locale
  });
  const lang = o.locale || (0, _format.formatLocale)();
  const w = new Intl.RelativeTimeFormat(lang, {
    numeric: 'auto'
  }).format(days, 'day');
  return w.charAt(0).toLocaleUpperCase(lang) + w.slice(1);
}
function Time({
  value,
  format = 'datetime',
  dateStyle,
  seconds = false,
  timeZone,
  timeZoneName,
  tooltip,
  live,
  now,
  strings,
  locale,
  className,
  ...rest
}) {
  const f = FORMATS.indexOf(format) >= 0 ? format : 'datetime';
  const moving = f === 'relative' || f === 'label';
  const ticking = live !== undefined ? !!live : moving;
  const [, tick] = _react.default.useState(0);
  _react.default.useEffect(() => {
    if (!ticking || now) return undefined;
    const t = setInterval(() => tick(n => n + 1), (0, _tokenTime.tokenMs)('--plx-comp-time-refresh-interval', 60000));
    return () => clearInterval(t);
  }, [ticking, now]);
  const d = toDate(value);
  if (!d) return null;
  const words = Object.assign({
    now: 'Just now'
  }, strings);
  const o = {
    locale,
    timeZone,
    timeZoneName,
    dateStyle,
    seconds
  };
  const at = toDate(now) || new Date();
  let text;
  if (f === 'relative') text = Math.abs(d.getTime() - at.getTime()) < 60000 ? words.now : (0, _format.formatRelative)(d, {
    now: at,
    locale,
    timeZone
  });else if (f === 'label') text = dayLabel(d, at, o);else if (f === 'date') text = (0, _format.formatDate)(d, o);else if (f === 'time') text = (0, _format.formatTime)(d, o);else text = (0, _format.formatDateTime)(d, o);
  const tip = tooltip !== undefined ? !!tooltip : moving;
  const el = /*#__PURE__*/_react.default.createElement("time", _extends({
    className: (0, _cx.cx)('plx-time', className),
    dateTime: f === 'date' || f === 'label' ? calendarDay(d) : (0, _format.dateTimeAttr)(d),
    tabIndex: tip ? 0 : undefined
  }, rest), text);
  return tip ? /*#__PURE__*/_react.default.createElement(_Tooltip.Tooltip, {
    content: (0, _format.formatDateTime)(d, {
      locale,
      timeZone,
      dateStyle: 'long',
      timeZoneName: 'short'
    })
  }, el) : el;
}
  } },
  "platform/index.js": { deps: {"./components/Badge/Badge.jsx":"platform/components/Badge/Badge.jsx","./components/VisuallyHidden/VisuallyHidden.jsx":"platform/components/VisuallyHidden/VisuallyHidden.jsx","./components/Count/Count.jsx":"platform/components/Count/Count.jsx","./components/Metric/Metric.jsx":"platform/components/Metric/Metric.jsx","./components/ProgressBar/ProgressBar.jsx":"platform/components/ProgressBar/ProgressBar.jsx","./components/DateBadge/DateBadge.jsx":"platform/components/DateBadge/DateBadge.jsx","./components/EventChip/EventChip.jsx":"platform/components/EventChip/EventChip.jsx","./components/RadioTiles/RadioTiles.jsx":"platform/components/RadioTiles/RadioTiles.jsx","./components/StatusDot/StatusDot.jsx":"platform/components/StatusDot/StatusDot.jsx","./components/Tag/Tag.jsx":"platform/components/Tag/Tag.jsx","./components/Kbd/Kbd.jsx":"platform/components/Kbd/Kbd.jsx","./components/Avatar/Avatar.jsx":"platform/components/Avatar/Avatar.jsx","./components/Divider/Divider.jsx":"platform/components/Divider/Divider.jsx","./components/Stack/Stack.jsx":"platform/components/Stack/Stack.jsx","./components/Text/Text.jsx":"platform/components/Text/Text.jsx","./components/Thumbnail/Thumbnail.jsx":"platform/components/Thumbnail/Thumbnail.jsx","./components/Notice/Notice.jsx":"platform/components/Notice/Notice.jsx","./components/Brand/Brand.jsx":"platform/components/Brand/Brand.jsx","./components/ColorSwatch/ColorSwatch.jsx":"platform/components/ColorSwatch/ColorSwatch.jsx","./components/ColorSwatch/dataColors.js":"platform/components/ColorSwatch/dataColors.js","./components/ColorSwatch/categoryColors.js":"platform/components/ColorSwatch/categoryColors.js","./components/DropZone/DropZone.jsx":"platform/components/DropZone/DropZone.jsx","./components/Preview/Preview.jsx":"platform/components/Preview/Preview.jsx","./components/Fieldset/Fieldset.jsx":"platform/components/Fieldset/Fieldset.jsx","./components/Columns/Columns.jsx":"platform/components/Columns/Columns.jsx","./components/Breadcrumbs/Breadcrumbs.jsx":"platform/components/Breadcrumbs/Breadcrumbs.jsx","./components/List/List.jsx":"platform/components/List/List.jsx","./components/CodeBlock/CodeBlock.jsx":"platform/components/CodeBlock/CodeBlock.jsx","./components/SectionHeading/SectionHeading.jsx":"platform/components/SectionHeading/SectionHeading.jsx","./components/CollapsibleSection/CollapsibleSection.jsx":"platform/components/CollapsibleSection/CollapsibleSection.jsx","./components/Loading/Loading.jsx":"platform/components/Loading/Loading.jsx","./components/Chat/Chat.jsx":"platform/components/Chat/Chat.jsx","./components/EmptyState/EmptyState.jsx":"platform/components/EmptyState/EmptyState.jsx","./components/Pagination/Pagination.jsx":"platform/components/Pagination/Pagination.jsx","./components/Rating/Rating.jsx":"platform/components/Rating/Rating.jsx","./components/Icon/Icon.jsx":"platform/components/Icon/Icon.jsx","./components/Button/Button.jsx":"platform/components/Button/Button.jsx","./components/RowButton/RowButton.jsx":"platform/components/RowButton/RowButton.jsx","./components/SegmentedControl/SegmentedControl.jsx":"platform/components/SegmentedControl/SegmentedControl.jsx","./components/Input/Input.jsx":"platform/components/Input/Input.jsx","./components/Field/Field.jsx":"platform/components/Field/Field.jsx","./components/Checkbox/Checkbox.jsx":"platform/components/Checkbox/Checkbox.jsx","./components/Combobox/Combobox.jsx":"platform/components/Combobox/Combobox.jsx","./components/SearchField/SearchField.jsx":"platform/components/SearchField/SearchField.jsx","./components/Tooltip/Tooltip.jsx":"platform/components/Tooltip/Tooltip.jsx","./components/Slider/Slider.jsx":"platform/components/Slider/Slider.jsx","./components/Toolbar/Toolbar.jsx":"platform/components/Toolbar/Toolbar.jsx","./components/Menu/Menu.jsx":"platform/components/Menu/Menu.jsx","./components/Dialog/Dialog.jsx":"platform/components/Dialog/Dialog.jsx","./components/Sheet/Sheet.jsx":"platform/components/Sheet/Sheet.jsx","./components/Toast/Toast.jsx":"platform/components/Toast/Toast.jsx","./components/Tabs/Tabs.jsx":"platform/components/Tabs/Tabs.jsx","./components/Card/Card.jsx":"platform/components/Card/Card.jsx","./components/DataTable/DataTable.jsx":"platform/components/DataTable/DataTable.jsx","./components/Table/Table.jsx":"platform/components/Table/Table.jsx","./patterns/ActionBar/ActionBar.jsx":"platform/patterns/ActionBar/ActionBar.jsx","./components/NavList/NavList.jsx":"platform/components/NavList/NavList.jsx","./components/Tree/Tree.jsx":"platform/components/Tree/Tree.jsx","./components/MediaViewer/MediaViewer.jsx":"platform/components/MediaViewer/MediaViewer.jsx","./patterns/AppHeader/AppHeader.jsx":"platform/patterns/AppHeader/AppHeader.jsx","./patterns/FilterBar/FilterBar.jsx":"platform/patterns/FilterBar/FilterBar.jsx","./patterns/SearchWorkspace/SearchWorkspace.jsx":"platform/patterns/SearchWorkspace/SearchWorkspace.jsx","./patterns/DataToolbar/DataToolbar.jsx":"platform/patterns/DataToolbar/DataToolbar.jsx","./patterns/BulkActions/BulkActions.jsx":"platform/patterns/BulkActions/BulkActions.jsx","./patterns/ContentGrid/ContentGrid.jsx":"platform/patterns/ContentGrid/ContentGrid.jsx","./patterns/PropertyList/PropertyList.jsx":"platform/patterns/PropertyList/PropertyList.jsx","./patterns/RecordPage/RecordPage.jsx":"platform/patterns/RecordPage/RecordPage.jsx","./patterns/EntityHeader/EntityHeader.jsx":"platform/patterns/EntityHeader/EntityHeader.jsx","./patterns/ActivityList/ActivityList.jsx":"platform/patterns/ActivityList/ActivityList.jsx","./patterns/NotificationList/NotificationList.jsx":"platform/patterns/NotificationList/NotificationList.jsx","./patterns/SettingsLayout/SettingsLayout.jsx":"platform/patterns/SettingsLayout/SettingsLayout.jsx","./patterns/ToolRail/ToolRail.jsx":"platform/patterns/ToolRail/ToolRail.jsx","./patterns/AppShell/AppShell.jsx":"platform/patterns/AppShell/AppShell.jsx","./patterns/SidePanel/SidePanel.jsx":"platform/patterns/SidePanel/SidePanel.jsx","./patterns/SecondaryPane/SecondaryPane.jsx":"platform/patterns/SecondaryPane/SecondaryPane.jsx","./patterns/NavPane/NavPane.jsx":"platform/patterns/NavPane/NavPane.jsx","./patterns/StatusBar/StatusBar.jsx":"platform/patterns/StatusBar/StatusBar.jsx","./providers/ThemeProvider.jsx":"platform/providers/ThemeProvider.jsx","./providers/themes.js":"platform/providers/themes.js","./providers/SessionProvider.jsx":"platform/providers/SessionProvider.jsx","./providers/apps.js":"platform/providers/apps.js","./providers/pageLayouts.js":"platform/providers/pageLayouts.js","./hooks/useDensity.js":"platform/hooks/useDensity.js","./hooks/useInteraction.js":"platform/hooks/useInteraction.js","./providers/ScreenLocation.js":"platform/providers/ScreenLocation.js","./providers/UnsavedGuard.jsx":"platform/providers/UnsavedGuard.jsx","./patterns/TimeGrid/TimeGrid.jsx":"platform/patterns/TimeGrid/TimeGrid.jsx","./utils/prefetch.js":"platform/utils/prefetch.js","./patterns/WidgetGrid/WidgetGrid.jsx":"platform/patterns/WidgetGrid/WidgetGrid.jsx","./patterns/ImageEditor/imageEditorSteps.js":"platform/patterns/ImageEditor/imageEditorSteps.js","./utils/format.js":"platform/utils/format.js","./utils/announce.jsx":"platform/utils/announce.jsx","./utils/clipboard.js":"platform/utils/clipboard.js","./utils/hotkey.js":"platform/utils/hotkey.js","./hooks/useVirtualizer.js":"platform/hooks/useVirtualizer.js","./utils/floating.js":"platform/utils/floating.js","./utils/portal.jsx":"platform/utils/portal.jsx","./hooks/useIntersection.js":"platform/hooks/useIntersection.js","./utils/contrast.js":"platform/utils/contrast.js","./utils/dataviz.js":"platform/utils/dataviz.js","./utils/describedBy.js":"platform/utils/describedBy.js","./utils/scrollLock.js":"platform/utils/scrollLock.js","./components/Link/Link.jsx":"platform/components/Link/Link.jsx","./components/Code/Code.jsx":"platform/components/Code/Code.jsx","./components/Blockquote/Blockquote.jsx":"platform/components/Blockquote/Blockquote.jsx","./components/RichText/RichText.jsx":"platform/components/RichText/RichText.jsx","./providers/DirectionProvider.jsx":"platform/providers/DirectionProvider.jsx","./utils/direction.js":"platform/utils/direction.js","./hooks/usePressable.js":"platform/hooks/usePressable.js","./hooks/useFocusable.js":"platform/hooks/useFocusable.js","./hooks/useSelection.js":"platform/hooks/useSelection.js","./hooks/useGesture.js":"platform/hooks/useGesture.js","./providers/ReadOnly.jsx":"platform/providers/ReadOnly.jsx","./components/IconTile/IconTile.jsx":"platform/components/IconTile/IconTile.jsx","./components/Pictogram/Pictogram.jsx":"platform/components/Pictogram/Pictogram.jsx","./components/Sticky/Sticky.jsx":"platform/components/Sticky/Sticky.jsx","./components/Illustration/Illustration.jsx":"platform/components/Illustration/Illustration.jsx","./components/Illustration/illustrations.js":"platform/components/Illustration/illustrations.js","./components/Image/Image.jsx":"platform/components/Image/Image.jsx","./components/Figure/Figure.jsx":"platform/components/Figure/Figure.jsx","./components/Barcode/Barcode.jsx":"platform/components/Barcode/Barcode.jsx","./utils/barcode.js":"platform/utils/barcode.js","./patterns/Retry/Retry.jsx":"platform/patterns/Retry/Retry.jsx","./components/AvatarGroup/AvatarGroup.jsx":"platform/components/AvatarGroup/AvatarGroup.jsx","./components/Persona/Persona.jsx":"platform/components/Persona/Persona.jsx","./components/ProgressCircle/ProgressCircle.jsx":"platform/components/ProgressCircle/ProgressCircle.jsx","./components/QRCode/QRCode.jsx":"platform/components/QRCode/QRCode.jsx","./utils/qr.js":"platform/utils/qr.js","./components/VersionLabel/VersionLabel.jsx":"platform/components/VersionLabel/VersionLabel.jsx","./components/Banner/Banner.jsx":"platform/components/Banner/Banner.jsx","./components/Scrim/Scrim.jsx":"platform/components/Scrim/Scrim.jsx","./components/LoadingOverlay/LoadingOverlay.jsx":"platform/components/LoadingOverlay/LoadingOverlay.jsx","./components/Time/Time.jsx":"platform/components/Time/Time.jsx"}, externals: {  }, run: function (module, exports, require) {
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
Object.defineProperty(exports, "AvatarGroup", {
  enumerable: true,
  get: function () {
    return _AvatarGroup.AvatarGroup;
  }
});
Object.defineProperty(exports, "BARCODE_QUIET_ZONE", {
  enumerable: true,
  get: function () {
    return _barcode.BARCODE_QUIET_ZONE;
  }
});
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function () {
    return _Badge.Badge;
  }
});
Object.defineProperty(exports, "Banner", {
  enumerable: true,
  get: function () {
    return _Banner.Banner;
  }
});
Object.defineProperty(exports, "Barcode", {
  enumerable: true,
  get: function () {
    return _Barcode.Barcode;
  }
});
Object.defineProperty(exports, "Bleed", {
  enumerable: true,
  get: function () {
    return _Stack.Bleed;
  }
});
Object.defineProperty(exports, "Blockquote", {
  enumerable: true,
  get: function () {
    return _Blockquote.Blockquote;
  }
});
Object.defineProperty(exports, "BrandMark", {
  enumerable: true,
  get: function () {
    return _Brand.BrandMark;
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
Object.defineProperty(exports, "CATEGORY_COLORS", {
  enumerable: true,
  get: function () {
    return _categoryColors.CATEGORY_COLORS;
  }
});
Object.defineProperty(exports, "CONTRAST_MINIMUMS", {
  enumerable: true,
  get: function () {
    return _contrast.CONTRAST_MINIMUMS;
  }
});
Object.defineProperty(exports, "CONTRAST_PAIRS", {
  enumerable: true,
  get: function () {
    return _contrast.CONTRAST_PAIRS;
  }
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function () {
    return _Card.Card;
  }
});
Object.defineProperty(exports, "Center", {
  enumerable: true,
  get: function () {
    return _Stack.Center;
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
Object.defineProperty(exports, "Code", {
  enumerable: true,
  get: function () {
    return _Code.Code;
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
Object.defineProperty(exports, "ColorPicker", {
  enumerable: true,
  get: function () {
    return _ColorSwatch.ColorPicker;
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
Object.defineProperty(exports, "DATAVIZ_ALERT", {
  enumerable: true,
  get: function () {
    return _dataviz.DATAVIZ_ALERT;
  }
});
Object.defineProperty(exports, "DATAVIZ_SCALES", {
  enumerable: true,
  get: function () {
    return _dataviz.DATAVIZ_SCALES;
  }
});
Object.defineProperty(exports, "DATAVIZ_STATUS", {
  enumerable: true,
  get: function () {
    return _dataviz.DATAVIZ_STATUS;
  }
});
Object.defineProperty(exports, "DATA_COLORS", {
  enumerable: true,
  get: function () {
    return _dataColors.DATA_COLORS;
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
Object.defineProperty(exports, "DirectionContext", {
  enumerable: true,
  get: function () {
    return _DirectionProvider.DirectionContext;
  }
});
Object.defineProperty(exports, "DirectionProvider", {
  enumerable: true,
  get: function () {
    return _DirectionProvider.DirectionProvider;
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
Object.defineProperty(exports, "EntityHeader", {
  enumerable: true,
  get: function () {
    return _EntityHeader.EntityHeader;
  }
});
Object.defineProperty(exports, "EventChip", {
  enumerable: true,
  get: function () {
    return _EventChip.EventChip;
  }
});
Object.defineProperty(exports, "FLOATING_PLACEMENTS", {
  enumerable: true,
  get: function () {
    return _floating.PLACEMENTS;
  }
});
Object.defineProperty(exports, "FORMATS", {
  enumerable: true,
  get: function () {
    return _format.FORMATS;
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
Object.defineProperty(exports, "Figure", {
  enumerable: true,
  get: function () {
    return _Figure.Figure;
  }
});
Object.defineProperty(exports, "FilterBar", {
  enumerable: true,
  get: function () {
    return _FilterBar.FilterBar;
  }
});
Object.defineProperty(exports, "Hide", {
  enumerable: true,
  get: function () {
    return _AppShell.Hide;
  }
});
Object.defineProperty(exports, "ILLUSTRATIONS", {
  enumerable: true,
  get: function () {
    return _illustrations.ILLUSTRATIONS;
  }
});
Object.defineProperty(exports, "IMAGE_EDITOR_STEPS", {
  enumerable: true,
  get: function () {
    return _imageEditorSteps.IMAGE_EDITOR_STEPS;
  }
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function () {
    return _Icon.Icon;
  }
});
Object.defineProperty(exports, "IconTile", {
  enumerable: true,
  get: function () {
    return _IconTile.IconTile;
  }
});
Object.defineProperty(exports, "Illustration", {
  enumerable: true,
  get: function () {
    return _Illustration.Illustration;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function () {
    return _Image.Image;
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
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function () {
    return _Link.Link;
  }
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function () {
    return _List.List;
  }
});
Object.defineProperty(exports, "LiveRegion", {
  enumerable: true,
  get: function () {
    return _announce.LiveRegion;
  }
});
Object.defineProperty(exports, "LoadingOverlay", {
  enumerable: true,
  get: function () {
    return _LoadingOverlay.LoadingOverlay;
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
Object.defineProperty(exports, "Persona", {
  enumerable: true,
  get: function () {
    return _Persona.Persona;
  }
});
Object.defineProperty(exports, "Pictogram", {
  enumerable: true,
  get: function () {
    return _Pictogram.Pictogram;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function () {
    return _portal.Portal;
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
Object.defineProperty(exports, "ProgressCircle", {
  enumerable: true,
  get: function () {
    return _ProgressCircle.ProgressCircle;
  }
});
Object.defineProperty(exports, "PropertyList", {
  enumerable: true,
  get: function () {
    return _PropertyList.PropertyList;
  }
});
Object.defineProperty(exports, "QRCode", {
  enumerable: true,
  get: function () {
    return _QRCode.QRCode;
  }
});
Object.defineProperty(exports, "RTL_LANGUAGES", {
  enumerable: true,
  get: function () {
    return _direction.RTL_LANGUAGES;
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
Object.defineProperty(exports, "ReadOnly", {
  enumerable: true,
  get: function () {
    return _ReadOnly.ReadOnly;
  }
});
Object.defineProperty(exports, "ReadOnlyContext", {
  enumerable: true,
  get: function () {
    return _ReadOnly.ReadOnlyContext;
  }
});
Object.defineProperty(exports, "ReadOnlyProvider", {
  enumerable: true,
  get: function () {
    return _ReadOnly.ReadOnlyProvider;
  }
});
Object.defineProperty(exports, "RecordPage", {
  enumerable: true,
  get: function () {
    return _RecordPage.RecordPage;
  }
});
Object.defineProperty(exports, "RetryNotice", {
  enumerable: true,
  get: function () {
    return _Retry.RetryNotice;
  }
});
Object.defineProperty(exports, "RichText", {
  enumerable: true,
  get: function () {
    return _RichText.RichText;
  }
});
Object.defineProperty(exports, "RowButton", {
  enumerable: true,
  get: function () {
    return _RowButton.RowButton;
  }
});
Object.defineProperty(exports, "Scrim", {
  enumerable: true,
  get: function () {
    return _Scrim.Scrim;
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
Object.defineProperty(exports, "Sheet", {
  enumerable: true,
  get: function () {
    return _Sheet.Sheet;
  }
});
Object.defineProperty(exports, "Show", {
  enumerable: true,
  get: function () {
    return _AppShell.Show;
  }
});
Object.defineProperty(exports, "ShowMore", {
  enumerable: true,
  get: function () {
    return _CollapsibleSection.ShowMore;
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
Object.defineProperty(exports, "StatusIcon", {
  enumerable: true,
  get: function () {
    return _Icon.StatusIcon;
  }
});
Object.defineProperty(exports, "Sticky", {
  enumerable: true,
  get: function () {
    return _Sticky.Sticky;
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
Object.defineProperty(exports, "ThemeZone", {
  enumerable: true,
  get: function () {
    return _ThemeProvider.ThemeZone;
  }
});
Object.defineProperty(exports, "Thumbnail", {
  enumerable: true,
  get: function () {
    return _Thumbnail.Thumbnail;
  }
});
Object.defineProperty(exports, "Time", {
  enumerable: true,
  get: function () {
    return _Time.Time;
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
Object.defineProperty(exports, "VIRTUAL_STICKY_CLASS", {
  enumerable: true,
  get: function () {
    return _useVirtualizer.VIRTUAL_STICKY_CLASS;
  }
});
Object.defineProperty(exports, "VersionLabel", {
  enumerable: true,
  get: function () {
    return _VersionLabel.VersionLabel;
  }
});
Object.defineProperty(exports, "VirtualGap", {
  enumerable: true,
  get: function () {
    return _useVirtualizer.VirtualGap;
  }
});
Object.defineProperty(exports, "VirtualProbe", {
  enumerable: true,
  get: function () {
    return _useVirtualizer.VirtualProbe;
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
Object.defineProperty(exports, "announce", {
  enumerable: true,
  get: function () {
    return _announce.announce;
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
Object.defineProperty(exports, "arrowStep", {
  enumerable: true,
  get: function () {
    return _direction.arrowStep;
  }
});
Object.defineProperty(exports, "barcodeCheckDigit", {
  enumerable: true,
  get: function () {
    return _barcode.barcodeCheckDigit;
  }
});
Object.defineProperty(exports, "below", {
  enumerable: true,
  get: function () {
    return _AppShell.below;
  }
});
Object.defineProperty(exports, "choosePicture", {
  enumerable: true,
  get: function () {
    return _SessionProvider.choosePicture;
  }
});
Object.defineProperty(exports, "confirmLeave", {
  enumerable: true,
  get: function () {
    return _UnsavedGuard.confirmLeave;
  }
});
Object.defineProperty(exports, "contrastRatio", {
  enumerable: true,
  get: function () {
    return _contrast.contrastRatio;
  }
});
Object.defineProperty(exports, "copyImage", {
  enumerable: true,
  get: function () {
    return _clipboard.copyImage;
  }
});
Object.defineProperty(exports, "copyRich", {
  enumerable: true,
  get: function () {
    return _clipboard.copyRich;
  }
});
Object.defineProperty(exports, "copyText", {
  enumerable: true,
  get: function () {
    return _clipboard.copyText;
  }
});
Object.defineProperty(exports, "datavizCategory", {
  enumerable: true,
  get: function () {
    return _dataviz.datavizCategory;
  }
});
Object.defineProperty(exports, "datavizStep", {
  enumerable: true,
  get: function () {
    return _dataviz.datavizStep;
  }
});
Object.defineProperty(exports, "datavizToken", {
  enumerable: true,
  get: function () {
    return _dataviz.datavizToken;
  }
});
Object.defineProperty(exports, "dateTimeAttr", {
  enumerable: true,
  get: function () {
    return _format.dateTimeAttr;
  }
});
Object.defineProperty(exports, "directionOf", {
  enumerable: true,
  get: function () {
    return _direction.directionOf;
  }
});
Object.defineProperty(exports, "encodeBarcode", {
  enumerable: true,
  get: function () {
    return _barcode.encodeBarcode;
  }
});
Object.defineProperty(exports, "flingDistance", {
  enumerable: true,
  get: function () {
    return _useGesture.flingDistance;
  }
});
Object.defineProperty(exports, "formatAddress", {
  enumerable: true,
  get: function () {
    return _format.formatAddress;
  }
});
Object.defineProperty(exports, "formatBytes", {
  enumerable: true,
  get: function () {
    return _format.formatBytes;
  }
});
Object.defineProperty(exports, "formatCompact", {
  enumerable: true,
  get: function () {
    return _format.formatCompact;
  }
});
Object.defineProperty(exports, "formatCurrency", {
  enumerable: true,
  get: function () {
    return _format.formatCurrency;
  }
});
Object.defineProperty(exports, "formatDate", {
  enumerable: true,
  get: function () {
    return _format.formatDate;
  }
});
Object.defineProperty(exports, "formatDateTime", {
  enumerable: true,
  get: function () {
    return _format.formatDateTime;
  }
});
Object.defineProperty(exports, "formatDuration", {
  enumerable: true,
  get: function () {
    return _format.formatDuration;
  }
});
Object.defineProperty(exports, "formatList", {
  enumerable: true,
  get: function () {
    return _format.formatList;
  }
});
Object.defineProperty(exports, "formatLocale", {
  enumerable: true,
  get: function () {
    return _format.formatLocale;
  }
});
Object.defineProperty(exports, "formatNumber", {
  enumerable: true,
  get: function () {
    return _format.formatNumber;
  }
});
Object.defineProperty(exports, "formatPercent", {
  enumerable: true,
  get: function () {
    return _format.formatPercent;
  }
});
Object.defineProperty(exports, "formatPersonName", {
  enumerable: true,
  get: function () {
    return _format.formatPersonName;
  }
});
Object.defineProperty(exports, "formatPhone", {
  enumerable: true,
  get: function () {
    return _format.formatPhone;
  }
});
Object.defineProperty(exports, "formatRange", {
  enumerable: true,
  get: function () {
    return _format.formatRange;
  }
});
Object.defineProperty(exports, "formatRelative", {
  enumerable: true,
  get: function () {
    return _format.formatRelative;
  }
});
Object.defineProperty(exports, "formatTime", {
  enumerable: true,
  get: function () {
    return _format.formatTime;
  }
});
Object.defineProperty(exports, "formatUnit", {
  enumerable: true,
  get: function () {
    return _format.formatUnit;
  }
});
Object.defineProperty(exports, "gapPieces", {
  enumerable: true,
  get: function () {
    return _useVirtualizer.gapPieces;
  }
});
Object.defineProperty(exports, "gestureTokens", {
  enumerable: true,
  get: function () {
    return _useGesture.gestureTokens;
  }
});
Object.defineProperty(exports, "getDirection", {
  enumerable: true,
  get: function () {
    return _direction.getDirection;
  }
});
Object.defineProperty(exports, "goToParent", {
  enumerable: true,
  get: function () {
    return _ScreenLocation.goToParent;
  }
});
Object.defineProperty(exports, "hasUnsaved", {
  enumerable: true,
  get: function () {
    return _UnsavedGuard.hasUnsaved;
  }
});
Object.defineProperty(exports, "hotkeyKeys", {
  enumerable: true,
  get: function () {
    return _hotkey.hotkeyKeys;
  }
});
Object.defineProperty(exports, "hotkeyLabel", {
  enumerable: true,
  get: function () {
    return _hotkey.hotkeyLabel;
  }
});
Object.defineProperty(exports, "hotkeyList", {
  enumerable: true,
  get: function () {
    return _hotkey.hotkeyList;
  }
});
Object.defineProperty(exports, "illustrationByName", {
  enumerable: true,
  get: function () {
    return _illustrations.illustrationByName;
  }
});
Object.defineProperty(exports, "initialsOf", {
  enumerable: true,
  get: function () {
    return _Avatar.initialsOf;
  }
});
Object.defineProperty(exports, "isMac", {
  enumerable: true,
  get: function () {
    return _hotkey.isMac;
  }
});
Object.defineProperty(exports, "isRtl", {
  enumerable: true,
  get: function () {
    return _direction.isRtl;
  }
});
Object.defineProperty(exports, "isScrollLocked", {
  enumerable: true,
  get: function () {
    return _scrollLock.isScrollLocked;
  }
});
Object.defineProperty(exports, "joinIds", {
  enumerable: true,
  get: function () {
    return _describedBy.joinIds;
  }
});
Object.defineProperty(exports, "leavePage", {
  enumerable: true,
  get: function () {
    return _UnsavedGuard.leavePage;
  }
});
Object.defineProperty(exports, "lockScroll", {
  enumerable: true,
  get: function () {
    return _scrollLock.lockScroll;
  }
});
Object.defineProperty(exports, "meetsContrast", {
  enumerable: true,
  get: function () {
    return _contrast.meetsContrast;
  }
});
Object.defineProperty(exports, "navigate", {
  enumerable: true,
  get: function () {
    return _ScreenLocation.navigate;
  }
});
Object.defineProperty(exports, "pageLayout", {
  enumerable: true,
  get: function () {
    return _pageLayouts.pageLayout;
  }
});
Object.defineProperty(exports, "parseColor", {
  enumerable: true,
  get: function () {
    return _contrast.parseColor;
  }
});
Object.defineProperty(exports, "parseHotkey", {
  enumerable: true,
  get: function () {
    return _hotkey.parseHotkey;
  }
});
Object.defineProperty(exports, "parseScreen", {
  enumerable: true,
  get: function () {
    return _ScreenLocation.parseScreen;
  }
});
Object.defineProperty(exports, "physicalSide", {
  enumerable: true,
  get: function () {
    return _direction.physicalSide;
  }
});
Object.defineProperty(exports, "qrEncode", {
  enumerable: true,
  get: function () {
    return _qr.qrEncode;
  }
});
Object.defineProperty(exports, "regionName", {
  enumerable: true,
  get: function () {
    return _format.regionName;
  }
});
Object.defineProperty(exports, "registerHotkey", {
  enumerable: true,
  get: function () {
    return _hotkey.registerHotkey;
  }
});
Object.defineProperty(exports, "relativeLuminance", {
  enumerable: true,
  get: function () {
    return _contrast.relativeLuminance;
  }
});
Object.defineProperty(exports, "screenHref", {
  enumerable: true,
  get: function () {
    return _ScreenLocation.screenHref;
  }
});
Object.defineProperty(exports, "scrollLockCount", {
  enumerable: true,
  get: function () {
    return _scrollLock.scrollLockCount;
  }
});
Object.defineProperty(exports, "setSingleKeyHotkeys", {
  enumerable: true,
  get: function () {
    return _hotkey.setSingleKeyHotkeys;
  }
});
Object.defineProperty(exports, "singleKeyHotkeys", {
  enumerable: true,
  get: function () {
    return _hotkey.singleKeyHotkeys;
  }
});
Object.defineProperty(exports, "subscribeHotkeys", {
  enumerable: true,
  get: function () {
    return _hotkey.subscribeHotkeys;
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
Object.defineProperty(exports, "useClipboard", {
  enumerable: true,
  get: function () {
    return _clipboard.useClipboard;
  }
});
Object.defineProperty(exports, "useDensity", {
  enumerable: true,
  get: function () {
    return _useDensity.useDensity;
  }
});
Object.defineProperty(exports, "useDescribedBy", {
  enumerable: true,
  get: function () {
    return _describedBy.useDescribedBy;
  }
});
Object.defineProperty(exports, "useDescriptionId", {
  enumerable: true,
  get: function () {
    return _describedBy.useDescriptionId;
  }
});
Object.defineProperty(exports, "useDirection", {
  enumerable: true,
  get: function () {
    return _DirectionProvider.useDirection;
  }
});
Object.defineProperty(exports, "useFloating", {
  enumerable: true,
  get: function () {
    return _floating.useFloating;
  }
});
Object.defineProperty(exports, "useFocusGroup", {
  enumerable: true,
  get: function () {
    return _useFocusable.useFocusGroup;
  }
});
Object.defineProperty(exports, "useFocusable", {
  enumerable: true,
  get: function () {
    return _useFocusable.useFocusable;
  }
});
Object.defineProperty(exports, "useGesture", {
  enumerable: true,
  get: function () {
    return _useGesture.useGesture;
  }
});
Object.defineProperty(exports, "useHotkey", {
  enumerable: true,
  get: function () {
    return _hotkey.useHotkey;
  }
});
Object.defineProperty(exports, "useHotkeyList", {
  enumerable: true,
  get: function () {
    return _hotkey.useHotkeyList;
  }
});
Object.defineProperty(exports, "useInteraction", {
  enumerable: true,
  get: function () {
    return _useInteraction.useInteraction;
  }
});
Object.defineProperty(exports, "useIntersection", {
  enumerable: true,
  get: function () {
    return _useIntersection.useIntersection;
  }
});
Object.defineProperty(exports, "usePressable", {
  enumerable: true,
  get: function () {
    return _usePressable.usePressable;
  }
});
Object.defineProperty(exports, "useReadOnly", {
  enumerable: true,
  get: function () {
    return _ReadOnly.useReadOnly;
  }
});
Object.defineProperty(exports, "useRetry", {
  enumerable: true,
  get: function () {
    return _Retry.useRetry;
  }
});
Object.defineProperty(exports, "useScreenLocation", {
  enumerable: true,
  get: function () {
    return _ScreenLocation.useScreenLocation;
  }
});
Object.defineProperty(exports, "useScrollLock", {
  enumerable: true,
  get: function () {
    return _scrollLock.useScrollLock;
  }
});
Object.defineProperty(exports, "useSelection", {
  enumerable: true,
  get: function () {
    return _useSelection.useSelection;
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
Object.defineProperty(exports, "useUndo", {
  enumerable: true,
  get: function () {
    return _Toast.useUndo;
  }
});
Object.defineProperty(exports, "useUnsavedGuard", {
  enumerable: true,
  get: function () {
    return _UnsavedGuard.useUnsavedGuard;
  }
});
Object.defineProperty(exports, "useViewState", {
  enumerable: true,
  get: function () {
    return _ScreenLocation.useViewState;
  }
});
Object.defineProperty(exports, "useVirtualizer", {
  enumerable: true,
  get: function () {
    return _useVirtualizer.useVirtualizer;
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
var _Brand = require("./components/Brand/Brand.jsx");
var _ColorSwatch = require("./components/ColorSwatch/ColorSwatch.jsx");
var _dataColors = require("./components/ColorSwatch/dataColors.js");
var _categoryColors = require("./components/ColorSwatch/categoryColors.js");
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
var _Sheet = require("./components/Sheet/Sheet.jsx");
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
var _EntityHeader = require("./patterns/EntityHeader/EntityHeader.jsx");
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
var _ScreenLocation = require("./providers/ScreenLocation.js");
var _UnsavedGuard = require("./providers/UnsavedGuard.jsx");
var _TimeGrid = require("./patterns/TimeGrid/TimeGrid.jsx");
require("./utils/prefetch.js");
var _WidgetGrid = require("./patterns/WidgetGrid/WidgetGrid.jsx");
var _imageEditorSteps = require("./patterns/ImageEditor/imageEditorSteps.js");
var _format = require("./utils/format.js");
var _announce = require("./utils/announce.jsx");
var _clipboard = require("./utils/clipboard.js");
var _hotkey = require("./utils/hotkey.js");
var _useVirtualizer = require("./hooks/useVirtualizer.js");
var _floating = require("./utils/floating.js");
var _portal = require("./utils/portal.jsx");
var _useIntersection = require("./hooks/useIntersection.js");
var _contrast = require("./utils/contrast.js");
var _dataviz = require("./utils/dataviz.js");
var _describedBy = require("./utils/describedBy.js");
var _scrollLock = require("./utils/scrollLock.js");
var _Link = require("./components/Link/Link.jsx");
var _Code = require("./components/Code/Code.jsx");
var _Blockquote = require("./components/Blockquote/Blockquote.jsx");
var _RichText = require("./components/RichText/RichText.jsx");
var _DirectionProvider = require("./providers/DirectionProvider.jsx");
var _direction = require("./utils/direction.js");
var _usePressable = require("./hooks/usePressable.js");
var _useFocusable = require("./hooks/useFocusable.js");
var _useSelection = require("./hooks/useSelection.js");
var _useGesture = require("./hooks/useGesture.js");
var _ReadOnly = require("./providers/ReadOnly.jsx");
var _IconTile = require("./components/IconTile/IconTile.jsx");
var _Pictogram = require("./components/Pictogram/Pictogram.jsx");
var _Sticky = require("./components/Sticky/Sticky.jsx");
var _Illustration = require("./components/Illustration/Illustration.jsx");
var _illustrations = require("./components/Illustration/illustrations.js");
var _Image = require("./components/Image/Image.jsx");
var _Figure = require("./components/Figure/Figure.jsx");
var _Barcode = require("./components/Barcode/Barcode.jsx");
var _barcode = require("./utils/barcode.js");
var _Retry = require("./patterns/Retry/Retry.jsx");
var _AvatarGroup = require("./components/AvatarGroup/AvatarGroup.jsx");
var _Persona = require("./components/Persona/Persona.jsx");
var _ProgressCircle = require("./components/ProgressCircle/ProgressCircle.jsx");
var _QRCode = require("./components/QRCode/QRCode.jsx");
var _qr = require("./utils/qr.js");
var _VersionLabel = require("./components/VersionLabel/VersionLabel.jsx");
var _Banner = require("./components/Banner/Banner.jsx");
var _Scrim = require("./components/Scrim/Scrim.jsx");
var _LoadingOverlay = require("./components/LoadingOverlay/LoadingOverlay.jsx");
var _Time = require("./components/Time/Time.jsx");
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
