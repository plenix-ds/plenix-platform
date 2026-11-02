### Fixed
- Carousel: with several slides per view, a strip too narrow for the least slide width shows fewer at once, down to one with the next slide peeking (#883). At 320px a three-up carousel (the Storefront's "Recommended for you") had slides 65px wide that cut off their title, rating and Add to cart.
  - The least slide width is the new token `--plx-comp-carousel-slide-min` (152px). The pages and dots follow what shows. `perView` is still the most that shows.
