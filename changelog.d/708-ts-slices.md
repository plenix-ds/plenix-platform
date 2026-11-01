### Changed
- More of the Platform is TypeScript (#708, slices 2 to 4): the hooks and providers, and the core display and status parts (Icon, Button, Text, Stack, Tooltip and 24 more), with their public types in the npm package. No behavior change.
- The size limit for importing the whole npm package (`* as P`) is 1,420 KB (was 1,400), for the parts added in this release.
