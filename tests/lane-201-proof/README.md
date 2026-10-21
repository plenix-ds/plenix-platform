# Lane 201 verification

Owner scope approval: issue201 comment6304988872. Only Collection view state is added to the taxonomy and its matching STANDARD tree; the new native map uses existing iOS Collections and Android Collection/States. Existing records and native fragments remain intact. The new limit surface declares its caption text contract as required by Styling Standard6.

Focused local Chrome light checks:
- resize-browser-201.test.js: controlled/uncontrolled exact fractional pointer sizing, release grid/caller-step snapping,1400px limits, polite status, visible top-layer tooltip/Escape, other-pane320px constraint/reason, reduced-motion on/off, single bump, unmount cleanup, automatic SplitView claim/release. The tooltip has zero strict runtime overlap.
- resize-scale-201.test.js: clamp, grid, explicit-step sorting/deduplication and existing keyboard token stepping with4px extension beyond900.
- collection-types-201.test.js: isolated TypeScript5.6.3/@types/react; inferred rows and expected errors for invalid rows, directions, heights and callback result types. Set TYPECHECK_DEPS to that isolated dependency directory.
- collection-docs-201.test.js: the new page renders its live DataGrid without page exceptions or unwritten sections; release aliases/index and source options are present.
- component-docs-201.test.js: aliases list multiple matching records and preserve canonical pages.
- cdn-types.test.js:579 exports, matching declarations, hashed manifest and offline archive.
- LABS_ONLY=resizable:56 checks,6 tokens pass (raw log retained).

Build/app, usage, native guidance, packages and performance checks pass. SYSTEM_OK1063; SPEC_OK1172 leaves/768 records. Selector and text contract checks pass. No baseline was changed. Full browser CI/proof are dispatched with the PR; they are not claimed complete here.

After rebase onto bded375d219e4ea43dd1f54ba41bc21ef323af5f: build/app, usage and native guidance pass; SPEC_OK1172/768. SYSTEM now reports6 Commerce text-contract findings inherited from that exact target. An isolated detached target checkout produces byte-identical text-contract output; the Commerce CSS is unchanged by this lane. Raw head/base logs retained. SYSTEM was clean on the prior e711 base; it is not claimed clean on bded375d. The new tooltip's own strict overlap and declared text contract remain covered. No baseline/contract backlog is relaxed to hide these findings.
