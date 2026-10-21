# Line and Area chart zero-overlap proof

Base81f48a80964fc2e09e4516734e50952d49f88b38, DS e5365a05, same local Chrome/light/1440px. Five actual React configurations cover linear/step lines plus unstacked/stacked/percent areas, all with two series and points. Every computed noncustom/nonanimation property on56owned elements remains identical; strict runtime overlap is zero. One ancestor selector is removed from the backlog. Area opacity is declared once, with a registered noninheriting state value selected by the area part's own stacked class. No visible change, token/color/font change, baseline relaxation or matrix exception.

After rebuilding, run node tests/line-area-zero-overlap-207.test.js. The compressed capture is the immutable before-comparison artifact. edit-line-area.cjs documents the guarded source transformation and DS lab overlay; it rejects unmatched input. The w09A overlay stamps the same class on stacked and percent area paths. The larger #207 lane remains open.
