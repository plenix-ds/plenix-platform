/* Plenix · the release this build is (platform/version.ts, issue 842)
   Summary: Plenix.version, the release of the Platform bundle a page loaded ("0.80.0"), so a page, the loader and a check
     can tell which release runs. The build writes it from package.json (Vite's define, __PLENIX_VERSION__); a module read
     without the build (a test, a tool) says "source". The released stylesheet carries the same release as --plx-version,
     and plenix.js warns once when the two differ (vite.platform.config.mjs).
   Usage: if (Plenix.version !== '0.80.0') …   import { version } from '@plenix-ds/react' */
export const version: string = typeof __PLENIX_VERSION__ === 'string' ? __PLENIX_VERSION__ : 'source';
