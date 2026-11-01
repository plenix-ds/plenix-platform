### Added
- Control cards (#804, idea 4 of the component study #767): ChoiceList takes `control`: "radio" (the default, one choice), "checkbox" (several) or "switch" (each option on or off).
  - Each card is the label of its native control. A click anywhere on the card changes it. The keyboard and screen readers meet one control, named by the card's label alone (`aria-labelledby`) and described by its description (`aria-describedby`), so neither is read twice. A switch is the native checkbox with `role="switch"`.
  - A checkbox or switch card takes `values` and gives `onChange(values)`. A radio card keeps `value` and `onChange(value)`.
  - Keys: radio cards are a native radio group (the arrows move the choice); checkbox and switch cards toggle with Space, with no arrow keys.
  - An option can be `disabled`: the card is dimmed, has no hover fill and is skipped by the keys.
  - The switch sits at the card's end, as in a settings row. Inside a switch card the card's outline is the one focus mark.
- The design spec's Choice card page shows one example of each kind.

### Upgrading from 0.79.0
- Nothing to change: a ChoiceList without `control` is a radio group of cards, as before. Its radios are now named by each card's label alone (`aria-labelledby`) and described by the card's description (`aria-describedby`).
