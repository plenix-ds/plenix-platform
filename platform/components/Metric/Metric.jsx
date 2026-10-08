/* Plenix · Metric
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
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Metric({ value, label, unit, change, changeTone = 'neutral', description, size = 'md', className, ...rest }) {
  return (
    <div className={cx('plx-metric', 'plx-metric--' + size, className)} {...rest}>
      <div className="plx-metric__figure">
        <span className="plx-metric__value">{value}</span>
        {unit ? <span className="plx-metric__unit">{unit}</span> : null}
        {change ? <span className={cx('plx-metric__change', 'plx-metric__change--' + changeTone)}>{change}</span> : null}
      </div>
      <div className="plx-metric__label">{label}</div>
      {description ? <div className="plx-metric__description">{description}</div> : null}
    </div>
  );
}

Metric.Group = function MetricGroup({ label, className, children, ...rest }) {
  return (
    <div className={cx('plx-metric-group', className)} role="list" aria-label={label} {...rest}>
      {React.Children.map(children, (c) => (c ? <div role="listitem" className="plx-metric-group__item">{c}</div> : null))}
    </div>
  );
};
