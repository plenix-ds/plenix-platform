# ScatterChart zero-overlap proof

Base81f48a80964fc2e09e4516734e50952d49f88b38, design-system e5365a05, same local Chrome/light/1440px. Four actual React combinations cover points and bubbles, each with and without two trend lines. All computed noncustom/nonanimation properties on32owned elements, including root context sizing, remain identical; strict runtime overlap remains zero. Two ancestor selectors are removed from the selector backlog. Color and opacity now have single declarations and registered noninheriting state values, and each point carries its own kind. No visible change, new tokens, baseline update or state-matrix exception.

After rebuilding, run node tests/scatter-zero-overlap-207.test.js. The compressed capture is the immutable before-comparison artifact. edit-scatter.cjs documents the guarded transformation and lab overlay; it rejects unmatched input. The w09C lab overlay stamps the same part kinds. This is a small batch of #207; the larger lane remains open.
