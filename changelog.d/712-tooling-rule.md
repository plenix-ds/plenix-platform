### Changed
- The owner's rule on custom tooling is in `CLAUDE.md` (#712, word for word): standard tools for build, check, test and release work; a new custom script, generator or check only when its pull request shows no standard tool or plugin can do the job; every remaining custom tool listed in `docs/build.md`; one-time scripts deleted after use. `docs/build.md` is the one inventory of the custom tools (what each writes or checks, necessary or replaceable, the standard replacement), linked from `CLAUDE.md` and `HANDOFF.md` (#698). `CLAUDE.md` also loses its unfilled title, the old Windows drive path and a stale capability count (#697).

### Removed
- 59 one-time scripts from `tools/agent` (migrations, one-off patches and throwaway probes that no build, check, workflow, test or npm script referenced); the pull request lists each and why.
