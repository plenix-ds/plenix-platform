// The Plenix icon guidance as numbers (platform/standards/icons.md explains each rule). Measured from the working set
// by tools/icons/measure-material.js (Material Symbols Sharp, weight 300): change a number only after measuring again.
'use strict';

// Every Plenix drawing: viewBox "0 -960 960 960", in "units". 960 units = the whole square.
const CANVAS = { viewBox: [0, -960, 960, 960], units: 960 };

// Two optical sizes. 20 serves the xs (12), sm (16) and md (20) sizes; 24 serves lg (24) and xl (48).
const OPTICAL = {
  20: {
    px: 20, unitsPerPx: 48,
    lineWeight: 52, // 1.08px
    // Keyline shapes, outer edges (stroke included), in units.
    keylines: {
      circle: { x: [116, 844], y: [116, 844] }, // 15.17px
      square: { x: [164, 796], y: [164, 796] }, // 13.17px
      portrait: { x: [212, 748], y: [116, 844] }, // 11.17 × 15.17px
      landscape: { x: [116, 844], y: [212, 748] }, // 15.17 × 11.17px
    },
  },
  24: {
    px: 24, unitsPerPx: 40,
    lineWeight: 60, // 1.5px
    keylines: {
      circle: { x: [100, 860], y: [100, 860] }, // 19px
      square: { x: [140, 820], y: [140, 820] }, // 17px
      portrait: { x: [180, 780], y: [100, 860] }, // 15 × 19px
      landscape: { x: [100, 860], y: [180, 780] }, // 19 × 15px
    },
    // Axis-aligned edges sit on the half-pixel grid: multiples of 20 units.
    edgeGrid: 20,
  },
};

const RULES = {
  padding: 80, // units: nothing nearer the edge than 1/12 of the square (2px at 24, 1.67px at 20)
  lineWeightTolerance: 4, // units either way (0.1px)
  roundedCorners: 0, // straight segments meet at a sharp corner
  edgesOnGrid: 0.9, // share of axis-aligned edges on the half-pixel grid (24 only); a warning, not a failure
  keylineTolerance: 8, // units: the live area may differ this much from its keyline shape
};

// Display sizes (Icon size prop and --plx-sys-icon-size-*): the optical drawing each one takes.
const SIZES = { xs: { px: 12, optical: 20 }, sm: { px: 16, optical: 20 }, md: { px: 20, optical: 20 }, lg: { px: 24, optical: 24 }, xl: { px: 48, optical: 24 } };

module.exports = { CANVAS, OPTICAL, RULES, SIZES };
