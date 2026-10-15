const fs = require('fs');
const f = __dirname + '/gen2.js';
let s = fs.readFileSync(f, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing ' + a); s = s.split(a).join(b); };
rep("views: 'setBottomEdge(TriangleEdgeTreatment(px(4.dp).toFloat(), false)) on the bubble shape, with 4 dp of bottom padding'", "views: 'Not drawn in Views: the bubble alone'");
rep("        '    val caret = c.px(4.dp)',\n", '');
rep('c.px(PlenixSpace.spaceInsetXs) + caret)', 'c.px(PlenixSpace.spaceInsetXs))');
rep("        '        background = MaterialShapeDrawable(ShapeAppearanceModel.builder()',\n        '            .setAllCornerSizes(c.px(PlenixRadius.radiusCompact4px).toFloat())',\n        '            .setBottomEdge(TriangleEdgeTreatment(caret.toFloat(), false)).build()).apply {',",
  "        '        background = MaterialShapeDrawable(ShapeAppearanceModel.builder().setAllCornerSizes(c.px(PlenixRadius.radiusCompact4px).toFloat()).build()).apply {',");
rep("        '            setPadding(0, 0, 0, caret)   // the caret sits in the bottom padding',\n", '');
fs.writeFileSync(f, s);
console.log('fixed');
