# Contributing to ngx-iban-validator

Thank you for your interest in contributing to ngx-iban-validator! This project is maintained by [Samir Kahvedzic](https://github.com/SKaDiZZ).

## Code of Conduct

This project and everyone participating in it is governed by the [Contributor Code of Conduct][code-of-conduct]. By participating, you are expected to uphold this code. Please report unacceptable behavior to [SKaDiZZ](mailto:akirapowered@gmail.com).

## Reporting Issues

If you encounter any issues while using ngx-iban-validator, please report them to the [issue tracker][issues]. Please provide as much information as possible, like:

- The version of ngx-iban-validator you are using
- The version of your dependencies (like Angular, React, Vue, Express, etc.)
- The code that causes the issue
- The error message you receive

## Development

To contribute to ngx-iban-validator, you need to have [Node.js](https://nodejs.org/en/download/) installed on your machine. To develop and build ngx-iban-validator, you can use the following commands:

###

# Development

## Install dependencies

```sh
pnpm i
```

## Buld library at least once so that it can be used by demo apps

```sh
pnpm build
```

## Adding a new country

If you want to add a new country to ngx-iban-validator, you can do so by editing code-lengths.ts file.

Add a new property to the `CODE_LENGTHS` object, with the following structure:

- `code`: **string** - The name of the country
- `length`: **number** - The length of the IBAN

###

```ts
export const CODE_LENGTHS = {
    AD: 24,
    ...
}
```

## Adding a new test

[JEST](https://jestjs.io) testing framework is used for testing. Once you have added the new country, you need to add a tests for a new country. Add a new test to the `iban.validator.spec.ts` file.

## Run tests

```sh
pnpm test
```

### Building the library

```sh
pnpm build
```

### Testing inside demo apps

#### Angular

```sh
pnpm dev:agnular
```

#### Vue

```sh
pnpm dev:vue
```

####

```sh
pnpm dev:react
```

## Submitting Changes

If you have made changes to the codebase, you can submit them as a pull request. Please make sure to:

- Include a clear description of the changes you made
- Include a reference to the issue(s) you are fixing
- Include tests for the changes you made

[code-of-conduct]: https://github.com/SKaDiZZ/ngx-iban-validator/blob/master/CODE_OF_CONDUCT.md
[issues]: https://github.com/SKaDiZZ/ngx-iban-validator/issues
