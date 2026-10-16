## Batch 397 (2026-10-16): the pill on the middle line
- Cause: resizable.css gives .plx-resizable__edge::after an inset (its hover line); the study's pill (position relative)
  took it as an offset. Fixed with inset:auto. Measured: line at 7.5 to 8.5px, pill 4 to 12px in the 16px gap. Released as {V}.
