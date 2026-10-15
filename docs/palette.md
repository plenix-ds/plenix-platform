# Plenix color palette

Every color of the Plenix palette (`platform/tokens/reference.tokens.json`), 143 tokens in 11 families. Generated 2026-10-15 from `platform/system/tokens/reference.css` (Plenix 0.31.71).

Families follow what each color looks like (owner, 2026-10-15):

- A category color joins its family by meaning: navy is blue, lavender purple, beige brown, lime, mint and olive green, maroon red, apricot orange, grey gray.
- Any dark warm shade (an orange-to-yellow hue, OKLCH lightness under 0.50) is brown, whatever its scale.
- Everything else stays in its scale's family.
- Token names do not change. Each family runs darkest to lightest by OKLCH lightness (L).

Components never use these values directly: the theme maps them to roles (`--plx-sys-*`).

## Families

| Family | Colors |
|---|---|
| [Gray](#gray) | 19 |
| [Red](#red) | 14 |
| [Pink](#pink) | 8 |
| [Orange](#orange) | 10 |
| [Brown](#brown) | 23 |
| [Yellow](#yellow) | 8 |
| [Green](#green) | 21 |
| [Teal](#teal) | 8 |
| [Blue](#blue) | 18 |
| [Purple](#purple) | 10 |
| [Transparent](#transparent) | 4 |

## Gray

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-black` | `#000000` | 0.00 | Scale |
| `--plx-ref-color-gray-950` | `#1e1f22` | 0.24 | Scale |
| `--plx-ref-color-gray-900` | `#34363b` | 0.33 | Scale |
| `--plx-ref-color-gray-800` | `#444444` | 0.39 | Scale |
| `--plx-ref-color-category-grey-700` | `#4d4d4d` | 0.42 | Category |
| `--plx-ref-color-gray-700` | `#56585e` | 0.46 | Scale |
| `--plx-ref-color-gray-600` | `#6e6e6e` | 0.54 | Scale |
| `--plx-ref-color-gray-500` | `#8e9094` | 0.65 | Scale |
| `--plx-ref-color-gray-400` | `#a3a6ad` | 0.72 | Scale |
| `--plx-ref-color-category-grey` | `#a9a9a9` | 0.73 | Category |
| `--plx-ref-color-gray-350` | `#c0c2c8` | 0.81 | Scale |
| `--plx-ref-color-category-grey-300` | `#cacaca` | 0.84 | Category |
| `--plx-ref-color-gray-300` | `#d0d0d0` | 0.86 | Scale |
| `--plx-ref-color-gray-200` | `#e8e9ec` | 0.93 | Scale |
| `--plx-ref-color-gray-100` | `#f3f3f3` | 0.96 | Scale |
| `--plx-ref-color-category-grey-100` | `#f3f3f3` | 0.96 | Category |
| `--plx-ref-color-gray-75` | `#f7f7f8` | 0.98 | Scale |
| `--plx-ref-color-gray-50` | `#fcfcfc` | 0.99 | Scale |
| `--plx-ref-color-white` | `#ffffff` | 1.00 | Scale |

## Red

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-category-maroon` | `#800000` | 0.38 | Category |
| `--plx-ref-color-category-maroon-700` | `#892219` | 0.42 | Category |
| `--plx-ref-color-category-red-700` | `#891f31` | 0.42 | Category |
| `--plx-ref-color-red-800` | `#990000` | 0.43 | Scale |
| `--plx-ref-color-red-700` | `#b70000` | 0.49 | Scale |
| `--plx-ref-color-category-red` | `#e6194b` | 0.59 | Category |
| `--plx-ref-color-red-500` | `#f60000` | 0.61 | Scale |
| `--plx-ref-color-red-300` | `#e96060` | 0.66 | Scale |
| `--plx-ref-color-red-200` | `#f8aca2` | 0.81 | Scale |
| `--plx-ref-color-category-maroon-300` | `#ffb5a9` | 0.84 | Category |
| `--plx-ref-color-category-red-300` | `#ffb4b6` | 0.84 | Category |
| `--plx-ref-color-red-100` | `#fde7e7` | 0.95 | Scale |
| `--plx-ref-color-category-red-100` | `#ffefef` | 0.96 | Category |
| `--plx-ref-color-category-maroon-100` | `#fff0ed` | 0.97 | Category |

## Pink

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-category-pink-700` | `#6c3b4f` | 0.42 | Category |
| `--plx-ref-color-category-magenta-700` | `#752870` | 0.42 | Category |
| `--plx-ref-color-category-magenta` | `#f032e6` | 0.68 | Category |
| `--plx-ref-color-category-magenta-300` | `#f4b0ec` | 0.84 | Category |
| `--plx-ref-color-category-pink-300` | `#f3b7cd` | 0.84 | Category |
| `--plx-ref-color-category-pink` | `#fabed4` | 0.86 | Category |
| `--plx-ref-color-category-pink-100` | `#ffeef4` | 0.96 | Category |
| `--plx-ref-color-category-magenta-100` | `#ffedfc` | 0.96 | Category |

## Orange

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-orange-500` | `#d96800` | 0.64 | Scale |
| `--plx-ref-color-category-orange` | `#f58231` | 0.72 | Category |
| `--plx-ref-color-orange-300` | `#f2ad70` | 0.80 | Scale |
| `--plx-ref-color-category-orange-300` | `#ffb890` | 0.84 | Category |
| `--plx-ref-color-category-apricot-300` | `#e9c39c` | 0.84 | Category |
| `--plx-ref-color-orange-200` | `#f8d0ad` | 0.88 | Scale |
| `--plx-ref-color-category-apricot` | `#ffd8b1` | 0.91 | Category |
| `--plx-ref-color-orange-100` | `#fff0e3` | 0.96 | Scale |
| `--plx-ref-color-category-orange-100` | `#fff0e8` | 0.96 | Category |
| `--plx-ref-color-category-apricot-100` | `#fff1e4` | 0.97 | Category |

## Brown

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-brown-950` | `#4a2400` | 0.31 | Scale |
| `--plx-ref-color-brown-900` | `#3a2e22` | 0.31 | Scale |
| `--plx-ref-color-orange-900` | `#5c2800` | 0.34 | Scale |
| `--plx-ref-color-yellow-900` | `#4d3800` | 0.35 | Scale |
| `--plx-ref-color-orange-800` | `#7a3400` | 0.41 | Scale |
| `--plx-ref-color-category-beige-700` | `#544e22` | 0.42 | Category |
| `--plx-ref-color-category-yellow-700` | `#594d02` | 0.42 | Category |
| `--plx-ref-color-category-orange-700` | `#793802` | 0.42 | Category |
| `--plx-ref-color-category-apricot-700` | `#664522` | 0.42 | Category |
| `--plx-ref-color-category-brown-700` | `#6f4102` | 0.42 | Category |
| `--plx-ref-color-brown-800` | `#7d3c00` | 0.43 | Scale |
| `--plx-ref-color-yellow-700` | `#765600` | 0.47 | Scale |
| `--plx-ref-color-orange-700` | `#963f00` | 0.48 | Scale |
| `--plx-ref-color-category-brown` | `#9a6324` | 0.55 | Category |
| `--plx-ref-color-brown-500` | `#c05a00` | 0.58 | Scale |
| `--plx-ref-color-brown-300` | `#dfaa7c` | 0.78 | Scale |
| `--plx-ref-color-category-beige-300` | `#d2cd9c` | 0.84 | Category |
| `--plx-ref-color-category-brown-300` | `#fabd80` | 0.84 | Category |
| `--plx-ref-color-brown-200` | `#eed2ba` | 0.88 | Scale |
| `--plx-ref-color-category-beige-100` | `#f7f5da` | 0.96 | Category |
| `--plx-ref-color-category-brown-100` | `#fff1e4` | 0.97 | Category |
| `--plx-ref-color-brown-100` | `#fef3e2` | 0.97 | Scale |
| `--plx-ref-color-category-beige` | `#fffac8` | 0.98 | Category |

## Yellow

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-yellow-500` | `#b88700` | 0.65 | Scale |
| `--plx-ref-color-yellow-400` | `#d5a300` | 0.74 | Scale |
| `--plx-ref-color-yellow-300` | `#e8c34a` | 0.83 | Scale |
| `--plx-ref-color-category-yellow-300` | `#dccc75` | 0.84 | Category |
| `--plx-ref-color-yellow-200` | `#f4dfa0` | 0.91 | Scale |
| `--plx-ref-color-category-yellow` | `#ffe119` | 0.91 | Category |
| `--plx-ref-color-category-yellow-100` | `#f9f4da` | 0.96 | Category |
| `--plx-ref-color-yellow-100` | `#fff8df` | 0.98 | Scale |

## Green

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-category-green-700` | `#025e17` | 0.42 | Category |
| `--plx-ref-color-category-mint-700` | `#045d2f` | 0.42 | Category |
| `--plx-ref-color-category-lime-700` | `#415601` | 0.42 | Category |
| `--plx-ref-color-category-olive-700` | `#515102` | 0.42 | Category |
| `--plx-ref-color-green-700` | `#1b5e0c` | 0.42 | Scale |
| `--plx-ref-color-green-500` | `#107c10` | 0.51 | Scale |
| `--plx-ref-color-category-olive` | `#808000` | 0.58 | Category |
| `--plx-ref-color-green-300` | `#58ad58` | 0.67 | Scale |
| `--plx-ref-color-category-green` | `#3cb44b` | 0.68 | Category |
| `--plx-ref-color-green-200` | `#9bd39b` | 0.81 | Scale |
| `--plx-ref-color-category-lime-300` | `#bbd786` | 0.84 | Category |
| `--plx-ref-color-category-green-300` | `#9cde9e` | 0.84 | Category |
| `--plx-ref-color-category-olive-300` | `#cfd17a` | 0.84 | Category |
| `--plx-ref-color-category-mint-300` | `#91e0a8` | 0.84 | Category |
| `--plx-ref-color-category-lime` | `#bfef45` | 0.89 | Category |
| `--plx-ref-color-category-mint` | `#aaffc3` | 0.93 | Category |
| `--plx-ref-color-green-100` | `#dff6dd` | 0.95 | Scale |
| `--plx-ref-color-category-olive-100` | `#f4f6db` | 0.96 | Category |
| `--plx-ref-color-category-green-100` | `#e6fae5` | 0.96 | Category |
| `--plx-ref-color-category-lime-100` | `#eef8df` | 0.96 | Category |
| `--plx-ref-color-category-mint-100` | `#e3fbe9` | 0.97 | Category |

## Teal

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-category-cyan-700` | `#045766` | 0.42 | Category |
| `--plx-ref-color-category-teal-700` | `#065a53` | 0.42 | Category |
| `--plx-ref-color-category-teal` | `#469990` | 0.63 | Category |
| `--plx-ref-color-category-cyan` | `#42d4f4` | 0.81 | Category |
| `--plx-ref-color-category-teal-300` | `#8adcd2` | 0.84 | Category |
| `--plx-ref-color-category-cyan-300` | `#6bddf8` | 0.84 | Category |
| `--plx-ref-color-category-cyan-100` | `#e2f8fe` | 0.96 | Category |
| `--plx-ref-color-category-teal-100` | `#dafcf7` | 0.97 | Category |

## Blue

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-category-navy` | `#000075` | 0.25 | Category |
| `--plx-ref-color-blue-900` | `#1f2a3a` | 0.28 | Scale |
| `--plx-ref-color-category-navy-700` | `#244698` | 0.42 | Category |
| `--plx-ref-color-category-blue-700` | `#2d4498` | 0.42 | Category |
| `--plx-ref-color-blue-700` | `#005a9e` | 0.46 | Scale |
| `--plx-ref-color-blue-650` | `#3d5a80` | 0.46 | Scale |
| `--plx-ref-color-blue-600` | `#1f5bb8` | 0.49 | Scale |
| `--plx-ref-color-category-blue` | `#4363d8` | 0.54 | Category |
| `--plx-ref-color-blue-400` | `#2a6fdb` | 0.56 | Scale |
| `--plx-ref-color-blue-300` | `#a2c0e3` | 0.80 | Scale |
| `--plx-ref-color-category-blue-300` | `#b5c9fe` | 0.84 | Category |
| `--plx-ref-color-blue-250` | `#c0ccda` | 0.84 | Scale |
| `--plx-ref-color-category-navy-300` | `#b1cbfe` | 0.84 | Category |
| `--plx-ref-color-blue-200` | `#c8dff7` | 0.89 | Scale |
| `--plx-ref-color-blue-100` | `#ebf0f7` | 0.95 | Scale |
| `--plx-ref-color-category-blue-100` | `#eff3fe` | 0.96 | Category |
| `--plx-ref-color-category-navy-100` | `#eef4fe` | 0.97 | Category |
| `--plx-ref-color-blue-50` | `#f8fafd` | 0.98 | Scale |

## Purple

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-purple-visited` | `#551a8b` | 0.38 | Scale |
| `--plx-ref-color-category-purple-700` | `#6a2e7f` | 0.42 | Category |
| `--plx-ref-color-category-lavender-700` | `#5a3e76` | 0.42 | Category |
| `--plx-ref-color-category-purple` | `#911eb4` | 0.50 | Category |
| `--plx-ref-color-purple-visited-light` | `#d7aefb` | 0.81 | Scale |
| `--plx-ref-color-category-purple-300` | `#e7b4fb` | 0.84 | Category |
| `--plx-ref-color-category-lavender-300` | `#d9bbfc` | 0.84 | Category |
| `--plx-ref-color-category-lavender` | `#dcbeff` | 0.85 | Category |
| `--plx-ref-color-category-lavender-100` | `#f6f0fe` | 0.96 | Category |
| `--plx-ref-color-category-purple-100` | `#faeffe` | 0.97 | Category |

## Transparent

| Token | Value | L | Kind |
|---|---|---|---|
| `--plx-ref-color-black-alpha-50` | `#00000080` | — | Transparent |
| `--plx-ref-color-black-alpha-14` | `#00000024` | — | Transparent |
| `--plx-ref-color-black-alpha-20` | `#00000033` | — | Transparent |
| `--plx-ref-color-black-alpha-12` | `#0000001f` | — | Transparent |
