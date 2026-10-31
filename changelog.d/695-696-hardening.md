### Changed
- The login service trusts the proxy's `X-Real-IP` header only when `TRUST_PROXY=1` (#695, audit finding #684). The default is the connection's own address, so a client that reaches the service without the proxy cannot start a fresh sign-in budget with every request by sending its own header. The container's Dockerfile already sets `TRUST_PROXY=1`, so the deployed service behaves as before; the README and the nginx example say so. The save service looks a token up by own property, so a token named `constructor` no longer reaches the global `Object`. `tests/login.test.js` has cases for both.

### Added
- Dependency watch (#696): `.github/dependabot.yml` opens weekly pull requests for npm packages and GitHub Actions, and the CI build job runs `npm audit --omit=dev` as a step that informs and never blocks. The vendored libraries in `platform/vendor/` are not npm dependencies and are not watched by either.
