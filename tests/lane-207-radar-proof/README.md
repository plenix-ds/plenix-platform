# RadarChart zero-overlap proof

Base81f48a80964fc2e09e4516734e50952d49f88b38, DS e5365a05, same local Chrome/light/1440px. Three actual React configurations cover four/five/eight axes, one/two series and points on/off. All computed noncustom/nonanimation properties on92owned elements remain identical; strict owned overlap is zero. The before capture is an immutable comparison artifact, not a baseline to relax.

Radar areas/points now own their shared chart-role values, removing the cross-block area selector. The redundant ring fill is removed because its grid-line class owns it. Axis anchor, baseline and transform each have one declaration with registered noninheriting state values and mutually exclusive placement assignments. Horizontal priority start > middle > end; vertical above > below > beside. Existing React output emits one placement in each dimension. Typography and all colors remain unchanged. No visible state-matrix exception, new token, baseline or native design changes.

After rebuilding, run node tests/radar-zero-overlap-207.test.js. edit-radar.cjs documents the guarded transformation, requiring the exact verified input stylesheet and rejecting unmatched JSX/lab markup. DS w09B overlay uses the same owned area/point classes. The larger #207 lane remains open.
