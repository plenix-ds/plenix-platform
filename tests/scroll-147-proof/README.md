# Issue 147: horizontal header alignment

Exact base: f500fa5eab9a3ee843c8976a884d8409d92fd52b, design-system a9db5ad1566951bb0cdc817a90ac0f07192be68d. Both versions were built with portable Node 22 on the same Chrome runner. The same regression test was copied to a detached exact-base checkout; it fails there and passes all 16 scenarios on the fix. All assertions remain enabled.

At scrollLeft=300 the original header remains at zero because its inner overflow container clips away the outer header's scroll extent (398px rather than the body's 960px). The fix exposes that extent to the existing body-to-header scroll handler. Header scrollLeft then equals body scrollLeft, with columns aligned.

The expanded test also exposed frozen RTL cells choosing a sticky side from their automatic content direction. Frozen grid cells now inherit the grid's layout direction; their content keeps automatic bidi in a display-contents wrapper (or its existing render slot). Static Table's content markup is unchanged. Frozen headers use the existing raised layer, and frozen cells inherit their row's existing background/state so scrolling fields cannot paint through them.

The sixteen cases cover LTR/RTL scrolling, header/body alignment, pinned header hit visibility, frozen row backgrounds, wider/narrower viewports, sorting, hiding/reordering/resizing columns, two frozen columns, and custom cell links. before.json and after.json contain measured offsets and coverage. The screenshot pair uses the same LTR fixture at scrollLeft=480: before has header B over column D and text painting through the pinned field; after has header D over D and an opaque, readable pinned field.

Before:

![Before](before.png)

After:

![After](after.png)

Reproduce: set CHROME_PATH, build the checkout, then run `node tests/data-grid-scroll-147.test.js`. SCROLL_SCREENSHOTS optionally saves the scrolled fixture. No baseline or shared test was changed; no new colors, sizing tokens or design variants were introduced.
