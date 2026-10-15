# Plenix color consolidation proposal

Status: proposal only; no repository files modified.

The supplied tables contain 139 opaque tokens. The four Transparent tokens mentioned in the summary were not supplied and are excluded. Proposed result: 83 canonical opaque tokens, a net reduction of 56.

## Rules

- Preserve all retained hexadecimal values; do not recalculate existing scales.
- Remove category-specific primitive names; retain category identities and category-role aliases separately.
- Use conventional color-family names and numeric shades, not apricot, mint, lime, lavender, navy, beige, maroon, or grey primitive names.
- Keep dark orange and yellow scale endpoints within their parent scales. Do not classify all warm dark values as brown.
- Separate cyan from teal and magenta from pink.
- Numbering is a custom scale, not a claim of perceptual uniformity.
- Every value-changing merge below is a proposed palette simplification, not an assertion that the two colors are indistinguishable.
- All value changes require role, visual, and contrast review.

## Safe migration procedure

1. Verify the actual source of truth and token schema in the repository. Do not edit generated CSS as the source.
2. Inventory all token dependencies, system/theme aliases, component tokens, category metadata, generated names, and stored user category IDs.
3. Add canonical destinations first. Keep deprecated old names as temporary aliases using the project's existing reference syntax.
4. Migrate references by resolved token identity using this manifest. Do not perform unrestricted substring or hexadecimal replacement.
5. Preserve system-role names and category IDs. Category aliases may share primitives without acquiring status semantics.
6. Review changed colors in context, including all themes and interaction states. The old 20-color category distinction is not guaranteed after consolidation.
7. Build tokens, detect missing and circular references, and review visual and contrast regressions.
8. Remove deprecated aliases only after external consumers and persisted data have migrated.
9. Rebuild generated outputs and documentation; retain the migration manifest and per-file change report.

## Canonical palette

| Token | Hex |
|---|---|
| `--plx-ref-color-black` | `#000000` |
| `--plx-ref-color-gray-950` | `#1e1f22` |
| `--plx-ref-color-gray-900` | `#34363b` |
| `--plx-ref-color-gray-800` | `#444444` |
| `--plx-ref-color-gray-700` | `#56585e` |
| `--plx-ref-color-gray-600` | `#6e6e6e` |
| `--plx-ref-color-gray-500` | `#8e9094` |
| `--plx-ref-color-gray-400` | `#a3a6ad` |
| `--plx-ref-color-gray-350` | `#c0c2c8` |
| `--plx-ref-color-gray-300` | `#d0d0d0` |
| `--plx-ref-color-gray-200` | `#e8e9ec` |
| `--plx-ref-color-gray-100` | `#f3f3f3` |
| `--plx-ref-color-gray-75` | `#f7f7f8` |
| `--plx-ref-color-gray-50` | `#fcfcfc` |
| `--plx-ref-color-white` | `#ffffff` |
| `--plx-ref-color-red-800` | `#990000` |
| `--plx-ref-color-red-700` | `#b70000` |
| `--plx-ref-color-red-500` | `#f60000` |
| `--plx-ref-color-red-300` | `#e96060` |
| `--plx-ref-color-red-200` | `#f8aca2` |
| `--plx-ref-color-red-100` | `#fde7e7` |
| `--plx-ref-color-pink-700` | `#6c3b4f` |
| `--plx-ref-color-pink-300` | `#f3b7cd` |
| `--plx-ref-color-pink-100` | `#ffeef4` |
| `--plx-ref-color-magenta-700` | `#752870` |
| `--plx-ref-color-magenta-500` | `#f032e6` |
| `--plx-ref-color-magenta-300` | `#f4b0ec` |
| `--plx-ref-color-magenta-100` | `#ffedfc` |
| `--plx-ref-color-orange-900` | `#5c2800` |
| `--plx-ref-color-orange-800` | `#7a3400` |
| `--plx-ref-color-orange-700` | `#963f00` |
| `--plx-ref-color-orange-500` | `#d96800` |
| `--plx-ref-color-orange-300` | `#f2ad70` |
| `--plx-ref-color-orange-200` | `#f8d0ad` |
| `--plx-ref-color-orange-100` | `#fff0e3` |
| `--plx-ref-color-brown-900` | `#3a2e22` |
| `--plx-ref-color-brown-800` | `#7d3c00` |
| `--plx-ref-color-brown-500` | `#c05a00` |
| `--plx-ref-color-brown-300` | `#dfaa7c` |
| `--plx-ref-color-brown-200` | `#eed2ba` |
| `--plx-ref-color-brown-100` | `#fef3e2` |
| `--plx-ref-color-yellow-900` | `#4d3800` |
| `--plx-ref-color-yellow-700` | `#765600` |
| `--plx-ref-color-yellow-600` | `#808000` |
| `--plx-ref-color-yellow-500` | `#b88700` |
| `--plx-ref-color-yellow-400` | `#d5a300` |
| `--plx-ref-color-yellow-300` | `#e8c34a` |
| `--plx-ref-color-yellow-250` | `#d2cd9c` |
| `--plx-ref-color-yellow-200` | `#f4dfa0` |
| `--plx-ref-color-yellow-175` | `#ffe119` |
| `--plx-ref-color-yellow-100` | `#fff8df` |
| `--plx-ref-color-green-700` | `#1b5e0c` |
| `--plx-ref-color-green-500` | `#107c10` |
| `--plx-ref-color-green-300` | `#58ad58` |
| `--plx-ref-color-green-200` | `#9bd39b` |
| `--plx-ref-color-green-150` | `#bfef45` |
| `--plx-ref-color-green-100` | `#dff6dd` |
| `--plx-ref-color-teal-700` | `#065a53` |
| `--plx-ref-color-teal-500` | `#469990` |
| `--plx-ref-color-teal-300` | `#8adcd2` |
| `--plx-ref-color-teal-100` | `#dafcf7` |
| `--plx-ref-color-cyan-700` | `#045766` |
| `--plx-ref-color-cyan-500` | `#42d4f4` |
| `--plx-ref-color-cyan-300` | `#6bddf8` |
| `--plx-ref-color-cyan-100` | `#e2f8fe` |
| `--plx-ref-color-blue-950` | `#000075` |
| `--plx-ref-color-blue-900` | `#1f2a3a` |
| `--plx-ref-color-blue-800` | `#2d4498` |
| `--plx-ref-color-blue-700` | `#005a9e` |
| `--plx-ref-color-blue-650` | `#3d5a80` |
| `--plx-ref-color-blue-600` | `#1f5bb8` |
| `--plx-ref-color-blue-500` | `#4363d8` |
| `--plx-ref-color-blue-400` | `#2a6fdb` |
| `--plx-ref-color-blue-300` | `#a2c0e3` |
| `--plx-ref-color-blue-250` | `#c0ccda` |
| `--plx-ref-color-blue-200` | `#c8dff7` |
| `--plx-ref-color-blue-100` | `#ebf0f7` |
| `--plx-ref-color-blue-50` | `#f8fafd` |
| `--plx-ref-color-purple-900` | `#551a8b` |
| `--plx-ref-color-purple-700` | `#6a2e7f` |
| `--plx-ref-color-purple-500` | `#911eb4` |
| `--plx-ref-color-purple-300` | `#d7aefb` |
| `--plx-ref-color-purple-100` | `#f6f0fe` |

## Complete migration log

Delta E OK is Euclidean Oklab distance on the 0–1 coordinate scale, used to flag changes, not as an automatic approval threshold. The file is derived from the pasted values rather than a repository dependency audit.

| Old token | Old hex | Destination | Destination hex | Operation | Delta E OK |
|---|---|---|---|---|---|
| `--plx-ref-color-gray-950` | `#1e1f22` | `--plx-ref-color-gray-950` | `#1e1f22` | keep | 0.00000 |
| `--plx-ref-color-gray-900` | `#34363b` | `--plx-ref-color-gray-900` | `#34363b` | keep | 0.00000 |
| `--plx-ref-color-gray-800` | `#444444` | `--plx-ref-color-gray-800` | `#444444` | keep | 0.00000 |
| `--plx-ref-color-gray-700` | `#56585e` | `--plx-ref-color-gray-700` | `#56585e` | keep | 0.00000 |
| `--plx-ref-color-gray-600` | `#6e6e6e` | `--plx-ref-color-gray-600` | `#6e6e6e` | keep | 0.00000 |
| `--plx-ref-color-gray-500` | `#8e9094` | `--plx-ref-color-gray-500` | `#8e9094` | keep | 0.00000 |
| `--plx-ref-color-gray-400` | `#a3a6ad` | `--plx-ref-color-gray-400` | `#a3a6ad` | keep | 0.00000 |
| `--plx-ref-color-gray-350` | `#c0c2c8` | `--plx-ref-color-gray-350` | `#c0c2c8` | keep | 0.00000 |
| `--plx-ref-color-gray-300` | `#d0d0d0` | `--plx-ref-color-gray-300` | `#d0d0d0` | keep | 0.00000 |
| `--plx-ref-color-gray-200` | `#e8e9ec` | `--plx-ref-color-gray-200` | `#e8e9ec` | keep | 0.00000 |
| `--plx-ref-color-gray-100` | `#f3f3f3` | `--plx-ref-color-gray-100` | `#f3f3f3` | keep | 0.00000 |
| `--plx-ref-color-gray-75` | `#f7f7f8` | `--plx-ref-color-gray-75` | `#f7f7f8` | keep | 0.00000 |
| `--plx-ref-color-gray-50` | `#fcfcfc` | `--plx-ref-color-gray-50` | `#fcfcfc` | keep | 0.00000 |
| `--plx-ref-color-red-800` | `#990000` | `--plx-ref-color-red-800` | `#990000` | keep | 0.00000 |
| `--plx-ref-color-red-700` | `#b70000` | `--plx-ref-color-red-700` | `#b70000` | keep | 0.00000 |
| `--plx-ref-color-red-500` | `#f60000` | `--plx-ref-color-red-500` | `#f60000` | keep | 0.00000 |
| `--plx-ref-color-red-300` | `#e96060` | `--plx-ref-color-red-300` | `#e96060` | keep | 0.00000 |
| `--plx-ref-color-red-200` | `#f8aca2` | `--plx-ref-color-red-200` | `#f8aca2` | keep | 0.00000 |
| `--plx-ref-color-red-100` | `#fde7e7` | `--plx-ref-color-red-100` | `#fde7e7` | keep | 0.00000 |
| `--plx-ref-color-orange-900` | `#5c2800` | `--plx-ref-color-orange-900` | `#5c2800` | keep | 0.00000 |
| `--plx-ref-color-orange-800` | `#7a3400` | `--plx-ref-color-orange-800` | `#7a3400` | keep | 0.00000 |
| `--plx-ref-color-orange-700` | `#963f00` | `--plx-ref-color-orange-700` | `#963f00` | keep | 0.00000 |
| `--plx-ref-color-orange-500` | `#d96800` | `--plx-ref-color-orange-500` | `#d96800` | keep | 0.00000 |
| `--plx-ref-color-orange-300` | `#f2ad70` | `--plx-ref-color-orange-300` | `#f2ad70` | keep | 0.00000 |
| `--plx-ref-color-orange-200` | `#f8d0ad` | `--plx-ref-color-orange-200` | `#f8d0ad` | keep | 0.00000 |
| `--plx-ref-color-orange-100` | `#fff0e3` | `--plx-ref-color-orange-100` | `#fff0e3` | keep | 0.00000 |
| `--plx-ref-color-brown-950` | `#4a2400` | `--plx-ref-color-brown-900` | `#3a2e22` | merge_with_value_change | 0.04735 |
| `--plx-ref-color-brown-900` | `#3a2e22` | `--plx-ref-color-brown-900` | `#3a2e22` | keep | 0.00000 |
| `--plx-ref-color-brown-800` | `#7d3c00` | `--plx-ref-color-brown-800` | `#7d3c00` | keep | 0.00000 |
| `--plx-ref-color-brown-500` | `#c05a00` | `--plx-ref-color-brown-500` | `#c05a00` | keep | 0.00000 |
| `--plx-ref-color-brown-300` | `#dfaa7c` | `--plx-ref-color-brown-300` | `#dfaa7c` | keep | 0.00000 |
| `--plx-ref-color-brown-200` | `#eed2ba` | `--plx-ref-color-brown-200` | `#eed2ba` | keep | 0.00000 |
| `--plx-ref-color-brown-100` | `#fef3e2` | `--plx-ref-color-brown-100` | `#fef3e2` | keep | 0.00000 |
| `--plx-ref-color-yellow-900` | `#4d3800` | `--plx-ref-color-yellow-900` | `#4d3800` | keep | 0.00000 |
| `--plx-ref-color-yellow-700` | `#765600` | `--plx-ref-color-yellow-700` | `#765600` | keep | 0.00000 |
| `--plx-ref-color-yellow-500` | `#b88700` | `--plx-ref-color-yellow-500` | `#b88700` | keep | 0.00000 |
| `--plx-ref-color-yellow-400` | `#d5a300` | `--plx-ref-color-yellow-400` | `#d5a300` | keep | 0.00000 |
| `--plx-ref-color-yellow-300` | `#e8c34a` | `--plx-ref-color-yellow-300` | `#e8c34a` | keep | 0.00000 |
| `--plx-ref-color-yellow-200` | `#f4dfa0` | `--plx-ref-color-yellow-200` | `#f4dfa0` | keep | 0.00000 |
| `--plx-ref-color-yellow-100` | `#fff8df` | `--plx-ref-color-yellow-100` | `#fff8df` | keep | 0.00000 |
| `--plx-ref-color-green-700` | `#1b5e0c` | `--plx-ref-color-green-700` | `#1b5e0c` | keep | 0.00000 |
| `--plx-ref-color-green-500` | `#107c10` | `--plx-ref-color-green-500` | `#107c10` | keep | 0.00000 |
| `--plx-ref-color-green-300` | `#58ad58` | `--plx-ref-color-green-300` | `#58ad58` | keep | 0.00000 |
| `--plx-ref-color-green-200` | `#9bd39b` | `--plx-ref-color-green-200` | `#9bd39b` | keep | 0.00000 |
| `--plx-ref-color-green-100` | `#dff6dd` | `--plx-ref-color-green-100` | `#dff6dd` | keep | 0.00000 |
| `--plx-ref-color-blue-900` | `#1f2a3a` | `--plx-ref-color-blue-900` | `#1f2a3a` | keep | 0.00000 |
| `--plx-ref-color-blue-700` | `#005a9e` | `--plx-ref-color-blue-700` | `#005a9e` | keep | 0.00000 |
| `--plx-ref-color-blue-650` | `#3d5a80` | `--plx-ref-color-blue-650` | `#3d5a80` | keep | 0.00000 |
| `--plx-ref-color-blue-600` | `#1f5bb8` | `--plx-ref-color-blue-600` | `#1f5bb8` | keep | 0.00000 |
| `--plx-ref-color-blue-400` | `#2a6fdb` | `--plx-ref-color-blue-400` | `#2a6fdb` | keep | 0.00000 |
| `--plx-ref-color-blue-300` | `#a2c0e3` | `--plx-ref-color-blue-300` | `#a2c0e3` | keep | 0.00000 |
| `--plx-ref-color-blue-250` | `#c0ccda` | `--plx-ref-color-blue-250` | `#c0ccda` | keep | 0.00000 |
| `--plx-ref-color-blue-200` | `#c8dff7` | `--plx-ref-color-blue-200` | `#c8dff7` | keep | 0.00000 |
| `--plx-ref-color-blue-100` | `#ebf0f7` | `--plx-ref-color-blue-100` | `#ebf0f7` | keep | 0.00000 |
| `--plx-ref-color-blue-50` | `#f8fafd` | `--plx-ref-color-blue-50` | `#f8fafd` | keep | 0.00000 |
| `--plx-ref-color-black` | `#000000` | `--plx-ref-color-black` | `#000000` | keep | 0.00000 |
| `--plx-ref-color-white` | `#ffffff` | `--plx-ref-color-white` | `#ffffff` | keep | 0.00000 |
| `--plx-ref-color-purple-visited` | `#551a8b` | `--plx-ref-color-purple-900` | `#551a8b` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-purple-visited-light` | `#d7aefb` | `--plx-ref-color-purple-300` | `#d7aefb` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-red` | `#e6194b` | `--plx-ref-color-red-500` | `#f60000` | merge_with_value_change | 0.05904 |
| `--plx-ref-color-category-red-100` | `#ffefef` | `--plx-ref-color-red-100` | `#fde7e7` | merge_with_value_change | 0.02027 |
| `--plx-ref-color-category-red-300` | `#ffb4b6` | `--plx-ref-color-red-200` | `#f8aca2` | merge_with_value_change | 0.03103 |
| `--plx-ref-color-category-red-700` | `#891f31` | `--plx-ref-color-red-800` | `#990000` | merge_with_value_change | 0.05051 |
| `--plx-ref-color-category-green` | `#3cb44b` | `--plx-ref-color-green-300` | `#58ad58` | merge_with_value_change | 0.03443 |
| `--plx-ref-color-category-green-100` | `#e6fae5` | `--plx-ref-color-green-100` | `#dff6dd` | merge_with_value_change | 0.01641 |
| `--plx-ref-color-category-green-300` | `#9cde9e` | `--plx-ref-color-green-200` | `#9bd39b` | merge_with_value_change | 0.02971 |
| `--plx-ref-color-category-green-700` | `#025e17` | `--plx-ref-color-green-700` | `#1b5e0c` | merge_with_value_change | 0.01106 |
| `--plx-ref-color-category-yellow` | `#ffe119` | `--plx-ref-color-yellow-175` | `#ffe119` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-yellow-100` | `#f9f4da` | `--plx-ref-color-yellow-100` | `#fff8df` | merge_with_value_change | 0.01403 |
| `--plx-ref-color-category-yellow-300` | `#dccc75` | `--plx-ref-color-yellow-300` | `#e8c34a` | merge_with_value_change | 0.03810 |
| `--plx-ref-color-category-yellow-700` | `#594d02` | `--plx-ref-color-yellow-700` | `#765600` | merge_with_value_change | 0.06089 |
| `--plx-ref-color-category-blue` | `#4363d8` | `--plx-ref-color-blue-500` | `#4363d8` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-blue-100` | `#eff3fe` | `--plx-ref-color-blue-100` | `#ebf0f7` | merge_with_value_change | 0.01220 |
| `--plx-ref-color-category-blue-300` | `#b5c9fe` | `--plx-ref-color-blue-300` | `#a2c0e3` | merge_with_value_change | 0.04926 |
| `--plx-ref-color-category-blue-700` | `#2d4498` | `--plx-ref-color-blue-800` | `#2d4498` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-orange` | `#f58231` | `--plx-ref-color-orange-500` | `#d96800` | merge_with_value_change | 0.08126 |
| `--plx-ref-color-category-orange-100` | `#fff0e8` | `--plx-ref-color-orange-100` | `#fff0e3` | merge_with_value_change | 0.00668 |
| `--plx-ref-color-category-orange-300` | `#ffb890` | `--plx-ref-color-orange-300` | `#f2ad70` | merge_with_value_change | 0.04654 |
| `--plx-ref-color-category-orange-700` | `#793802` | `--plx-ref-color-orange-800` | `#7a3400` | merge_with_value_change | 0.00899 |
| `--plx-ref-color-category-purple` | `#911eb4` | `--plx-ref-color-purple-500` | `#911eb4` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-purple-100` | `#faeffe` | `--plx-ref-color-purple-100` | `#f6f0fe` | merge_with_value_change | 0.00567 |
| `--plx-ref-color-category-purple-300` | `#e7b4fb` | `--plx-ref-color-purple-300` | `#d7aefb` | merge_with_value_change | 0.02992 |
| `--plx-ref-color-category-purple-700` | `#6a2e7f` | `--plx-ref-color-purple-700` | `#6a2e7f` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-cyan` | `#42d4f4` | `--plx-ref-color-cyan-500` | `#42d4f4` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-cyan-100` | `#e2f8fe` | `--plx-ref-color-cyan-100` | `#e2f8fe` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-cyan-300` | `#6bddf8` | `--plx-ref-color-cyan-300` | `#6bddf8` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-cyan-700` | `#045766` | `--plx-ref-color-cyan-700` | `#045766` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-magenta` | `#f032e6` | `--plx-ref-color-magenta-500` | `#f032e6` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-magenta-100` | `#ffedfc` | `--plx-ref-color-magenta-100` | `#ffedfc` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-magenta-300` | `#f4b0ec` | `--plx-ref-color-magenta-300` | `#f4b0ec` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-magenta-700` | `#752870` | `--plx-ref-color-magenta-700` | `#752870` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-lime` | `#bfef45` | `--plx-ref-color-green-150` | `#bfef45` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-lime-100` | `#eef8df` | `--plx-ref-color-green-100` | `#dff6dd` | merge_with_value_change | 0.02053 |
| `--plx-ref-color-category-lime-300` | `#bbd786` | `--plx-ref-color-green-200` | `#9bd39b` | merge_with_value_change | 0.04669 |
| `--plx-ref-color-category-lime-700` | `#415601` | `--plx-ref-color-green-700` | `#1b5e0c` | merge_with_value_change | 0.04182 |
| `--plx-ref-color-category-pink` | `#fabed4` | `--plx-ref-color-pink-300` | `#f3b7cd` | merge_with_value_change | 0.02147 |
| `--plx-ref-color-category-pink-100` | `#ffeef4` | `--plx-ref-color-pink-100` | `#ffeef4` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-pink-300` | `#f3b7cd` | `--plx-ref-color-pink-300` | `#f3b7cd` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-pink-700` | `#6c3b4f` | `--plx-ref-color-pink-700` | `#6c3b4f` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-teal` | `#469990` | `--plx-ref-color-teal-500` | `#469990` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-teal-100` | `#dafcf7` | `--plx-ref-color-teal-100` | `#dafcf7` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-teal-300` | `#8adcd2` | `--plx-ref-color-teal-300` | `#8adcd2` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-teal-700` | `#065a53` | `--plx-ref-color-teal-700` | `#065a53` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-lavender` | `#dcbeff` | `--plx-ref-color-purple-300` | `#d7aefb` | merge_with_value_change | 0.04050 |
| `--plx-ref-color-category-lavender-100` | `#f6f0fe` | `--plx-ref-color-purple-100` | `#f6f0fe` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-lavender-300` | `#d9bbfc` | `--plx-ref-color-purple-300` | `#d7aefb` | merge_with_value_change | 0.03274 |
| `--plx-ref-color-category-lavender-700` | `#5a3e76` | `--plx-ref-color-purple-700` | `#6a2e7f` | merge_with_value_change | 0.04969 |
| `--plx-ref-color-category-brown` | `#9a6324` | `--plx-ref-color-brown-500` | `#c05a00` | merge_with_value_change | 0.06903 |
| `--plx-ref-color-category-brown-100` | `#fff1e4` | `--plx-ref-color-brown-100` | `#fef3e2` | merge_with_value_change | 0.00665 |
| `--plx-ref-color-category-brown-300` | `#fabd80` | `--plx-ref-color-brown-300` | `#dfaa7c` | merge_with_value_change | 0.06696 |
| `--plx-ref-color-category-brown-700` | `#6f4102` | `--plx-ref-color-brown-800` | `#7d3c00` | merge_with_value_change | 0.02913 |
| `--plx-ref-color-category-beige` | `#fffac8` | `--plx-ref-color-yellow-100` | `#fff8df` | merge_with_value_change | 0.03173 |
| `--plx-ref-color-category-beige-100` | `#f7f5da` | `--plx-ref-color-yellow-100` | `#fff8df` | merge_with_value_change | 0.01468 |
| `--plx-ref-color-category-beige-300` | `#d2cd9c` | `--plx-ref-color-yellow-250` | `#d2cd9c` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-beige-700` | `#544e22` | `--plx-ref-color-yellow-700` | `#765600` | merge_with_value_change | 0.06910 |
| `--plx-ref-color-category-maroon` | `#800000` | `--plx-ref-color-red-800` | `#990000` | merge_with_value_change | 0.05639 |
| `--plx-ref-color-category-maroon-100` | `#fff0ed` | `--plx-ref-color-red-100` | `#fde7e7` | merge_with_value_change | 0.02225 |
| `--plx-ref-color-category-maroon-300` | `#ffb5a9` | `--plx-ref-color-red-200` | `#f8aca2` | merge_with_value_change | 0.02527 |
| `--plx-ref-color-category-maroon-700` | `#892219` | `--plx-ref-color-red-800` | `#990000` | merge_with_value_change | 0.03739 |
| `--plx-ref-color-category-mint` | `#aaffc3` | `--plx-ref-color-green-100` | `#dff6dd` | merge_with_value_change | 0.07872 |
| `--plx-ref-color-category-mint-100` | `#e3fbe9` | `--plx-ref-color-green-100` | `#dff6dd` | merge_with_value_change | 0.01862 |
| `--plx-ref-color-category-mint-300` | `#91e0a8` | `--plx-ref-color-green-200` | `#9bd39b` | merge_with_value_change | 0.03378 |
| `--plx-ref-color-category-mint-700` | `#045d2f` | `--plx-ref-color-green-700` | `#1b5e0c` | merge_with_value_change | 0.03395 |
| `--plx-ref-color-category-olive` | `#808000` | `--plx-ref-color-yellow-600` | `#808000` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-olive-100` | `#f4f6db` | `--plx-ref-color-yellow-100` | `#fff8df` | merge_with_value_change | 0.01681 |
| `--plx-ref-color-category-olive-300` | `#cfd17a` | `--plx-ref-color-yellow-250` | `#d2cd9c` | merge_with_value_change | 0.04612 |
| `--plx-ref-color-category-olive-700` | `#515102` | `--plx-ref-color-yellow-700` | `#765600` | merge_with_value_change | 0.06844 |
| `--plx-ref-color-category-apricot` | `#ffd8b1` | `--plx-ref-color-orange-200` | `#f8d0ad` | merge_with_value_change | 0.02310 |
| `--plx-ref-color-category-apricot-100` | `#fff1e4` | `--plx-ref-color-orange-100` | `#fff0e3` | merge_with_value_change | 0.00245 |
| `--plx-ref-color-category-apricot-300` | `#e9c39c` | `--plx-ref-color-orange-300` | `#f2ad70` | merge_with_value_change | 0.06078 |
| `--plx-ref-color-category-apricot-700` | `#664522` | `--plx-ref-color-brown-800` | `#7d3c00` | merge_with_value_change | 0.04735 |
| `--plx-ref-color-category-navy` | `#000075` | `--plx-ref-color-blue-950` | `#000075` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-navy-100` | `#eef4fe` | `--plx-ref-color-blue-100` | `#ebf0f7` | merge_with_value_change | 0.01284 |
| `--plx-ref-color-category-navy-300` | `#b1cbfe` | `--plx-ref-color-blue-300` | `#a2c0e3` | merge_with_value_change | 0.04827 |
| `--plx-ref-color-category-navy-700` | `#244698` | `--plx-ref-color-blue-800` | `#2d4498` | merge_with_value_change | 0.00977 |
| `--plx-ref-color-category-grey` | `#a9a9a9` | `--plx-ref-color-gray-400` | `#a3a6ad` | merge_with_value_change | 0.01455 |
| `--plx-ref-color-category-grey-100` | `#f3f3f3` | `--plx-ref-color-gray-100` | `#f3f3f3` | rename_or_exact_alias | 0.00000 |
| `--plx-ref-color-category-grey-300` | `#cacaca` | `--plx-ref-color-gray-300` | `#d0d0d0` | merge_with_value_change | 0.01859 |
| `--plx-ref-color-category-grey-700` | `#4d4d4d` | `--plx-ref-color-gray-700` | `#56585e` | merge_with_value_change | 0.04167 |

## Source grounding

Token alias/reference semantics: https://www.designtokens.org/TR/2025.10/format/
OKLCH lightness, chroma, and hue: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch
