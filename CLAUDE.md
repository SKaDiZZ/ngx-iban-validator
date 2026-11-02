# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`ngx-iban-validator` is a zero-dependency IBAN validator published to npm. It works standalone in any JS project and as a form validator (Angular, React, Vue). This repo is a pnpm workspace (`pnpm-workspace.yaml`). Use pnpm only: the package's `preinstall` runs `only-allow pnpm`.

- `packages/ngx-iban-validator/` is the published library. TypeScript compiles to `dist/` (ES6 modules plus `.d.ts`).
- `apps/angular`, `apps/react`, `apps/vue` are demo apps. They depend on the library via `workspace:*` and consume its built `dist/`, so run `pnpm build` at least once before starting them.
- `apps/docs` is an Astro Starlight docs site. It deploys to GitHub Pages through a manually dispatched workflow.
- `scripts/check-iban-structure.js` checks the supported countries against iban.com and syncs them (see below).

## Commands

Run these from the repo root:

```sh
pnpm i
pnpm build            # library: clean → biome format+lint (writes fixes) → tsc → copy README/LICENCE into dist
pnpm test             # library Jest tests (ts-jest)
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

To lint or format without building, run `format:check`, `lint:check`, or `fix` with `pnpm --filter ngx-iban-validator <script>`. Biome is configured in `packages/ngx-iban-validator/biome.jsonc` (2-space indent, 120 columns, `noExplicitAny` off).

## Library architecture

- `src/code-lengths.ts` holds `CODE_LENGTHS`, a map from country code to IBAN length. This map is the only per-country data. The validator does not check country-specific BBAN patterns.
- `src/iban.validator.ts`: `validateIBAN(control)` accepts either a string or an object with a `value` property, such as an Angular `AbstractControl`. It strips non-alphanumerics, uppercases the input, then checks in order: country supported → length → generic pattern → mod-97.
- The return contract differs by input type and is easy to break:
  - **object input** (form-control mode): returns `null` when valid, or `{ ibanInvalid: true, error: {...} }`.
  - **string input**: returns `{ ibanInvalid: false, error: null }` when valid, never `null`.
  - empty or falsy input returns `null`.
  - A failed mod-97 checksum is reported as `patternInvalid: true`.
- `src/types.ts` defines `IBANValidationResult` and `IBANError`, both re-exported from `src/index.ts`.

## Country data is duplicated across many files

The supported-country list and count appear in several places, and `scripts/check-iban-structure.js` (`--update`) regenerates all of them:

- `packages/ngx-iban-validator/src/code-lengths.ts`
- `SUPPORTED_COUNTRIES.md` and `apps/docs/src/content/docs/reference/supported-countries.mdx`
- `packages/ngx-iban-validator/src/__tests__/iban.validator.spec.ts`. After the hand-written header tests, the script regenerates this file with one `it("validateIBAN for <Country> <IBAN> should return null")` per country, sorted by country name.
- The sentence "Currently N countries are supported." in both `package.json` files, both READMEs, and `apps/docs/src/content/docs/index.mdx`.

After an update, the script runs the library's biome format and then `pnpm test`. To add or change a country by hand, keep all of the files above consistent. Afterward, run `pnpm check:iban` to report internal discrepancies, or `node scripts/check-iban-structure.js --fix-internal` to sync them without remote changes. Other script flags include `--ci` (exit 1 on differences), `--file <html>` (offline input), and `--json`.

## Release

The `npm-publish.yaml` workflow runs when a GitHub release is created. It runs `pnpm install && pnpm test && pnpm build && pnpm release` (`pnpm publish --no-git-checks --access public` inside the package). Bump the version in `packages/ngx-iban-validator/package.json` and update both `CHANGELOG.md` files (the root one and the package one).
