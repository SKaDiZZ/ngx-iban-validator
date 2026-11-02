# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`ngx-iban-validator` is a zero-dependency IBAN validator published to npm. It works standalone in any JS project and as a form validator (Angular, React, Vue). This repo is a pnpm workspace (`pnpm-workspace.yaml`). Use pnpm only: the package's `preinstall` runs `only-allow pnpm`.

- `packages/ngx-iban-validator/` is the published library. It is built twice with `tsc`: ESM into `dist/esm` (`tsconfig.json`) and CommonJS into `dist/cjs` (`tsconfig.cjs.json`). `scripts/write-dist-package-json.mjs` then writes a `package.json` with the matching `type` into each folder, and the `exports` map points `import` and `require` at them. Only `dist/` is published (`files`).
- `apps/angular`, `apps/react`, `apps/vue` are demo apps. They depend on the library via `workspace:*` and consume its built `dist/`, so run `pnpm build` at least once before starting them. `pnpm dev:<app>` runs the library watch (ESM only) and the app dev server in parallel.
- `apps/docs` is an Astro Starlight docs site. It deploys to GitHub Pages through a manually dispatched workflow.
- `scripts/check-iban-structure.js` checks the supported countries against iban.com and syncs them (see below).

## Commands

Run these from the repo root:

```sh
pnpm i
pnpm build            # library: clean → tsc (ESM) → tsc (CJS) → write dist/*/package.json
pnpm test             # library Jest tests (ts-jest)
pnpm test:dist        # require() and import() the built package from Node (run after build)
pnpm check            # biome format + lint check, no writes (what CI runs)
pnpm watch            # tsc --watch for the library
pnpm dev:angular | dev:react | dev:vue | dev:docs
pnpm test:script      # node --test for scripts/check-iban-structure.test.js
pnpm check:iban       # report differences vs https://www.iban.com/structure (no writes)
pnpm update:iban      # sync code, docs, tests, and country counts from iban.com
```

Run a single test:

```sh
pnpm --filter ngx-iban-validator exec jest -t "Bosnia"
```

To apply Biome fixes, run `pnpm --filter ngx-iban-validator fix`. Biome is configured in `packages/ngx-iban-validator/biome.jsonc` (2-space indent, 120 columns, `noExplicitAny` off).

## Library architecture

- `src/code-lengths.ts` holds `CODE_LENGTHS`, a map from country code to IBAN length. This map is the only per-country data. The validator does not check country-specific BBAN patterns.
- Relative imports in `src/` must use a `.js` extension (needed for Node ESM). Jest maps them back to `.ts` through `moduleNameMapper` in `jest.config.js`.
- `src/iban.validator.ts`: `validateIBAN(control)` accepts either a string or an object with a `value` property, such as an Angular `AbstractControl`. `isValidIBAN(value)` returns a boolean. Both use `check()`, which strips non-alphanumerics, uppercases the input, then checks in order: two-letter country code (`patternInvalid`) → country supported → length → numeric check digits (`patternInvalid`) → mod-97.
- The return contract differs by input type and is easy to break:
  - **object input** (form-control mode): returns `null` when valid, or `{ ibanInvalid: true, error: {...} }`.
  - **string input**: returns `{ ibanInvalid: false, error: null }` when valid, never `null`.
  - empty or falsy input returns `null`.
  - A failed mod-97 checksum sets both `checksumInvalid` and `patternInvalid` (the latter for backwards compatibility).
- `src/types.ts` defines `IBANValidationResult` and `IBANError`, re-exported from `src/index.ts` with `export type`.

## Country data is duplicated across many files

The supported-country list and count appear in several places, and `scripts/check-iban-structure.js` (`--update`) regenerates all of them:

- `packages/ngx-iban-validator/src/code-lengths.ts`
- `SUPPORTED_COUNTRIES.md` and `apps/docs/src/content/docs/reference/supported-countries.mdx`
- `packages/ngx-iban-validator/src/__tests__/iban.validator.spec.ts`. After the hand-written header tests, the script regenerates this file with one `it("validateIBAN for <Country> <IBAN> should return null")` per country, sorted by country name. Put other tests in `src/__tests__/iban.validator.edge-cases.spec.ts`, which the script does not touch.
- The sentence "Currently N countries are supported." in both `package.json` files, both READMEs, and `apps/docs/src/content/docs/index.mdx`.

After an update, the script runs the library's biome format and then `pnpm test`. To add or change a country by hand, keep all of the files above consistent. Afterward, run `pnpm check:iban` to report internal discrepancies, or `node scripts/check-iban-structure.js --fix-internal` to sync them without remote changes. Other script flags include `--ci` (exit 1 on differences), `--file <html>` (offline input), and `--json`.

## CI

`ci.yaml` runs `pnpm check`, `pnpm test`, `pnpm test:script`, `pnpm build` and `pnpm test:dist` on pushes to master and on pull requests. `iban-structure.yaml` runs `check-iban-structure.js --ci` every Monday and fails if iban.com or the package files disagree.

## Release

The `npm-publish.yaml` workflow runs when a GitHub release is created. It runs `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm build`, `pnpm test:dist` and `pnpm release` (`npm publish --access public` inside the package). It authenticates with npm trusted publishing (OIDC, `id-token: write`), not a token. The trusted publisher configured on npmjs.com must name `npm-publish.yaml`, so renaming the workflow file breaks publishing. Bump the version in `packages/ngx-iban-validator/package.json` and update both `CHANGELOG.md` files (the root one and the package one).
