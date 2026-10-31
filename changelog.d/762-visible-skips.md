### Fixed
- Tests (#762): w15c-packages and cdn-devx no longer look like a pass when the design system is not checked out. They print "skipped: design system not available … nothing was checked", and on GitHub they add a warning to the run's summary.
- Tests (#762): readonly-adoption now also starts when TimePicker, Cascader or RelativeDateInput changes, the three controls it checked but was not started by.
