# Plenix color palette

The canonical Plenix palette (`platform/tokens/reference.tokens.json`): 83 colors in 12 families, plus 4 transparent tokens. Generated 2026-10-15 from `platform/system/tokens/reference.css` (Plenix 0.31.72).

The palette consolidation (owner, 2026-10-15; `docs/color-consolidation/`):

- A token belongs to the family its name says: Gray, Red, Pink, Magenta, Orange, Brown, Yellow, Green, Teal, Cyan, Blue, Purple.
- Each family runs darkest to lightest by OKLCH lightness (L).
- Category colors are no longer their own primitives: each category role (`--plx-sys-category-<name>`, `-soft`, `-soft-border`, `-on-soft`) points to a canonical token.
- The retired tokens stay one release as deprecated aliases of their destination (listed at the end); nothing in Plenix uses them.
- Components never use these values directly: the theme maps them to roles (`--plx-sys-*`), and a component reads a color by its token name.

## Families

| Family | Colors |
|---|---|
| [Gray](#gray) | 15 |
| [Red](#red) | 6 |
| [Pink](#pink) | 3 |
| [Magenta](#magenta) | 4 |
| [Orange](#orange) | 7 |
| [Brown](#brown) | 6 |
| [Yellow](#yellow) | 10 |
| [Green](#green) | 6 |
| [Teal](#teal) | 4 |
| [Cyan](#cyan) | 4 |
| [Blue](#blue) | 13 |
| [Purple](#purple) | 5 |
| [Transparent](#transparent) | 4 |

## Gray

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-black` | `#000000` | 0.000 |
| `--plx-ref-color-gray-950` | `#1e1f22` | 0.239 |
| `--plx-ref-color-gray-900` | `#34363b` | 0.333 |
| `--plx-ref-color-gray-800` | `#444444` | 0.387 |
| `--plx-ref-color-gray-700` | `#56585e` | 0.461 |
| `--plx-ref-color-gray-600` | `#6e6e6e` | 0.538 |
| `--plx-ref-color-gray-500` | `#8e9094` | 0.653 |
| `--plx-ref-color-gray-400` | `#a3a6ad` | 0.725 |
| `--plx-ref-color-gray-350` | `#c0c2c8` | 0.814 |
| `--plx-ref-color-gray-300` | `#d0d0d0` | 0.858 |
| `--plx-ref-color-gray-200` | `#e8e9ec` | 0.934 |
| `--plx-ref-color-gray-100` | `#f3f3f3` | 0.964 |
| `--plx-ref-color-gray-75` | `#f7f7f8` | 0.976 |
| `--plx-ref-color-gray-50` | `#fcfcfc` | 0.991 |
| `--plx-ref-color-white` | `#ffffff` | 1.000 |

## Red

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-red-800` | `#990000` | 0.429 |
| `--plx-ref-color-red-700` | `#b70000` | 0.489 |
| `--plx-ref-color-red-500` | `#f60000` | 0.611 |
| `--plx-ref-color-red-300` | `#e96060` | 0.663 |
| `--plx-ref-color-red-200` | `#f8aca2` | 0.815 |
| `--plx-ref-color-red-100` | `#fde7e7` | 0.946 |

## Pink

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-pink-700` | `#6c3b4f` | 0.419 |
| `--plx-ref-color-pink-300` | `#f3b7cd` | 0.840 |
| `--plx-ref-color-pink-100` | `#ffeef4` | 0.964 |

## Magenta

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-magenta-700` | `#752870` | 0.420 |
| `--plx-ref-color-magenta-500` | `#f032e6` | 0.680 |
| `--plx-ref-color-magenta-300` | `#f4b0ec` | 0.839 |
| `--plx-ref-color-magenta-100` | `#ffedfc` | 0.965 |

## Orange

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-orange-900` | `#5c2800` | 0.344 |
| `--plx-ref-color-orange-800` | `#7a3400` | 0.414 |
| `--plx-ref-color-orange-700` | `#963f00` | 0.477 |
| `--plx-ref-color-orange-500` | `#d96800` | 0.642 |
| `--plx-ref-color-orange-300` | `#f2ad70` | 0.800 |
| `--plx-ref-color-orange-200` | `#f8d0ad` | 0.883 |
| `--plx-ref-color-orange-100` | `#fff0e3` | 0.963 |

## Brown

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-brown-900` | `#3a2e22` | 0.311 |
| `--plx-ref-color-brown-800` | `#7d3c00` | 0.433 |
| `--plx-ref-color-brown-500` | `#c05a00` | 0.584 |
| `--plx-ref-color-brown-300` | `#dfaa7c` | 0.776 |
| `--plx-ref-color-brown-200` | `#eed2ba` | 0.881 |
| `--plx-ref-color-brown-100` | `#fef3e2` | 0.968 |

## Yellow

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-yellow-900` | `#4d3800` | 0.355 |
| `--plx-ref-color-yellow-700` | `#765600` | 0.474 |
| `--plx-ref-color-yellow-600` | `#808000` | 0.581 |
| `--plx-ref-color-yellow-500` | `#b88700` | 0.654 |
| `--plx-ref-color-yellow-400` | `#d5a300` | 0.741 |
| `--plx-ref-color-yellow-300` | `#e8c34a` | 0.828 |
| `--plx-ref-color-yellow-250` | `#d2cd9c` | 0.840 |
| `--plx-ref-color-yellow-200` | `#f4dfa0` | 0.906 |
| `--plx-ref-color-yellow-175` | `#ffe119` | 0.907 |
| `--plx-ref-color-yellow-100` | `#fff8df` | 0.978 |

## Green

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-green-700` | `#1b5e0c` | 0.424 |
| `--plx-ref-color-green-500` | `#107c10` | 0.510 |
| `--plx-ref-color-green-300` | `#58ad58` | 0.674 |
| `--plx-ref-color-green-200` | `#9bd39b` | 0.814 |
| `--plx-ref-color-green-150` | `#bfef45` | 0.888 |
| `--plx-ref-color-green-100` | `#dff6dd` | 0.950 |

## Teal

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-teal-700` | `#065a53` | 0.422 |
| `--plx-ref-color-teal-500` | `#469990` | 0.629 |
| `--plx-ref-color-teal-300` | `#8adcd2` | 0.839 |
| `--plx-ref-color-teal-100` | `#dafcf7` | 0.965 |

## Cyan

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-cyan-700` | `#045766` | 0.421 |
| `--plx-ref-color-cyan-500` | `#42d4f4` | 0.807 |
| `--plx-ref-color-cyan-300` | `#6bddf8` | 0.841 |
| `--plx-ref-color-cyan-100` | `#e2f8fe` | 0.965 |

## Blue

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-blue-950` | `#000075` | 0.254 |
| `--plx-ref-color-blue-900` | `#1f2a3a` | 0.282 |
| `--plx-ref-color-blue-800` | `#2d4498` | 0.419 |
| `--plx-ref-color-blue-700` | `#005a9e` | 0.461 |
| `--plx-ref-color-blue-650` | `#3d5a80` | 0.462 |
| `--plx-ref-color-blue-600` | `#1f5bb8` | 0.488 |
| `--plx-ref-color-blue-500` | `#4363d8` | 0.542 |
| `--plx-ref-color-blue-400` | `#2a6fdb` | 0.559 |
| `--plx-ref-color-blue-300` | `#a2c0e3` | 0.798 |
| `--plx-ref-color-blue-250` | `#c0ccda` | 0.840 |
| `--plx-ref-color-blue-200` | `#c8dff7` | 0.894 |
| `--plx-ref-color-blue-100` | `#ebf0f7` | 0.953 |
| `--plx-ref-color-blue-50` | `#f8fafd` | 0.984 |

## Purple

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-purple-900` | `#551a8b` | 0.378 |
| `--plx-ref-color-purple-700` | `#6a2e7f` | 0.420 |
| `--plx-ref-color-purple-500` | `#911eb4` | 0.497 |
| `--plx-ref-color-purple-300` | `#d7aefb` | 0.814 |
| `--plx-ref-color-purple-100` | `#f6f0fe` | 0.964 |

## Transparent

| Token | Value | L |
|---|---|---|
| `--plx-ref-color-black-alpha-50` | `#00000080` | 0.000 |
| `--plx-ref-color-black-alpha-14` | `#00000024` | 0.000 |
| `--plx-ref-color-black-alpha-20` | `#00000033` | 0.000 |
| `--plx-ref-color-black-alpha-12` | `#0000001f` | 0.000 |

## Deprecated aliases

83 retired tokens, each an alias of its canonical destination until the next release removes it.

| Retired token | Use instead |
|---|---|
| `--plx-ref-color-brown-950` | `--plx-ref-color-brown-900` |
| `--plx-ref-color-category-apricot` | `--plx-ref-color-orange-200` |
| `--plx-ref-color-category-apricot-100` | `--plx-ref-color-orange-100` |
| `--plx-ref-color-category-apricot-300` | `--plx-ref-color-orange-300` |
| `--plx-ref-color-category-apricot-700` | `--plx-ref-color-brown-800` |
| `--plx-ref-color-category-beige` | `--plx-ref-color-yellow-100` |
| `--plx-ref-color-category-beige-100` | `--plx-ref-color-yellow-100` |
| `--plx-ref-color-category-beige-300` | `--plx-ref-color-yellow-250` |
| `--plx-ref-color-category-beige-700` | `--plx-ref-color-yellow-700` |
| `--plx-ref-color-category-blue` | `--plx-ref-color-blue-500` |
| `--plx-ref-color-category-blue-100` | `--plx-ref-color-blue-100` |
| `--plx-ref-color-category-blue-300` | `--plx-ref-color-blue-300` |
| `--plx-ref-color-category-blue-700` | `--plx-ref-color-blue-800` |
| `--plx-ref-color-category-brown` | `--plx-ref-color-brown-500` |
| `--plx-ref-color-category-brown-100` | `--plx-ref-color-brown-100` |
| `--plx-ref-color-category-brown-300` | `--plx-ref-color-brown-300` |
| `--plx-ref-color-category-brown-700` | `--plx-ref-color-brown-800` |
| `--plx-ref-color-category-cyan` | `--plx-ref-color-cyan-500` |
| `--plx-ref-color-category-cyan-100` | `--plx-ref-color-cyan-100` |
| `--plx-ref-color-category-cyan-300` | `--plx-ref-color-cyan-300` |
| `--plx-ref-color-category-cyan-700` | `--plx-ref-color-cyan-700` |
| `--plx-ref-color-category-green` | `--plx-ref-color-green-300` |
| `--plx-ref-color-category-green-100` | `--plx-ref-color-green-100` |
| `--plx-ref-color-category-green-300` | `--plx-ref-color-green-200` |
| `--plx-ref-color-category-green-700` | `--plx-ref-color-green-700` |
| `--plx-ref-color-category-grey` | `--plx-ref-color-gray-400` |
| `--plx-ref-color-category-grey-100` | `--plx-ref-color-gray-100` |
| `--plx-ref-color-category-grey-300` | `--plx-ref-color-gray-300` |
| `--plx-ref-color-category-grey-700` | `--plx-ref-color-gray-700` |
| `--plx-ref-color-category-lavender` | `--plx-ref-color-purple-300` |
| `--plx-ref-color-category-lavender-100` | `--plx-ref-color-purple-100` |
| `--plx-ref-color-category-lavender-300` | `--plx-ref-color-purple-300` |
| `--plx-ref-color-category-lavender-700` | `--plx-ref-color-purple-700` |
| `--plx-ref-color-category-lime` | `--plx-ref-color-green-150` |
| `--plx-ref-color-category-lime-100` | `--plx-ref-color-green-100` |
| `--plx-ref-color-category-lime-300` | `--plx-ref-color-green-200` |
| `--plx-ref-color-category-lime-700` | `--plx-ref-color-green-700` |
| `--plx-ref-color-category-magenta` | `--plx-ref-color-magenta-500` |
| `--plx-ref-color-category-magenta-100` | `--plx-ref-color-magenta-100` |
| `--plx-ref-color-category-magenta-300` | `--plx-ref-color-magenta-300` |
| `--plx-ref-color-category-magenta-700` | `--plx-ref-color-magenta-700` |
| `--plx-ref-color-category-maroon` | `--plx-ref-color-red-800` |
| `--plx-ref-color-category-maroon-100` | `--plx-ref-color-red-100` |
| `--plx-ref-color-category-maroon-300` | `--plx-ref-color-red-200` |
| `--plx-ref-color-category-maroon-700` | `--plx-ref-color-red-800` |
| `--plx-ref-color-category-mint` | `--plx-ref-color-green-100` |
| `--plx-ref-color-category-mint-100` | `--plx-ref-color-green-100` |
| `--plx-ref-color-category-mint-300` | `--plx-ref-color-green-200` |
| `--plx-ref-color-category-mint-700` | `--plx-ref-color-green-700` |
| `--plx-ref-color-category-navy` | `--plx-ref-color-blue-950` |
| `--plx-ref-color-category-navy-100` | `--plx-ref-color-blue-100` |
| `--plx-ref-color-category-navy-300` | `--plx-ref-color-blue-300` |
| `--plx-ref-color-category-navy-700` | `--plx-ref-color-blue-800` |
| `--plx-ref-color-category-olive` | `--plx-ref-color-yellow-600` |
| `--plx-ref-color-category-olive-100` | `--plx-ref-color-yellow-100` |
| `--plx-ref-color-category-olive-300` | `--plx-ref-color-yellow-250` |
| `--plx-ref-color-category-olive-700` | `--plx-ref-color-yellow-700` |
| `--plx-ref-color-category-orange` | `--plx-ref-color-orange-500` |
| `--plx-ref-color-category-orange-100` | `--plx-ref-color-orange-100` |
| `--plx-ref-color-category-orange-300` | `--plx-ref-color-orange-300` |
| `--plx-ref-color-category-orange-700` | `--plx-ref-color-orange-800` |
| `--plx-ref-color-category-pink` | `--plx-ref-color-pink-300` |
| `--plx-ref-color-category-pink-100` | `--plx-ref-color-pink-100` |
| `--plx-ref-color-category-pink-300` | `--plx-ref-color-pink-300` |
| `--plx-ref-color-category-pink-700` | `--plx-ref-color-pink-700` |
| `--plx-ref-color-category-purple` | `--plx-ref-color-purple-500` |
| `--plx-ref-color-category-purple-100` | `--plx-ref-color-purple-100` |
| `--plx-ref-color-category-purple-300` | `--plx-ref-color-purple-300` |
| `--plx-ref-color-category-purple-700` | `--plx-ref-color-purple-700` |
| `--plx-ref-color-category-red` | `--plx-ref-color-red-500` |
| `--plx-ref-color-category-red-100` | `--plx-ref-color-red-100` |
| `--plx-ref-color-category-red-300` | `--plx-ref-color-red-200` |
| `--plx-ref-color-category-red-700` | `--plx-ref-color-red-800` |
| `--plx-ref-color-category-teal` | `--plx-ref-color-teal-500` |
| `--plx-ref-color-category-teal-100` | `--plx-ref-color-teal-100` |
| `--plx-ref-color-category-teal-300` | `--plx-ref-color-teal-300` |
| `--plx-ref-color-category-teal-700` | `--plx-ref-color-teal-700` |
| `--plx-ref-color-category-yellow` | `--plx-ref-color-yellow-175` |
| `--plx-ref-color-category-yellow-100` | `--plx-ref-color-yellow-100` |
| `--plx-ref-color-category-yellow-300` | `--plx-ref-color-yellow-300` |
| `--plx-ref-color-category-yellow-700` | `--plx-ref-color-yellow-700` |
| `--plx-ref-color-purple-visited` | `--plx-ref-color-purple-900` |
| `--plx-ref-color-purple-visited-light` | `--plx-ref-color-purple-300` |
