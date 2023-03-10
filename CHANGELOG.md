# 📜 Changelog

# 📖 Table of contents

<!-- TOC -->
* [📜 Changelog](#-changelog)
* [📖 Table of contents](#-table-of-contents)
* [0.x.y](#0xy)
  * [1.0.0](#100)
  * [0.0.13](#0013)
  * [0.0.12](#0012)
  * [0.0.11](#0011)
  * [0.0.10](#0010)
  * [0.0.9](#009)
  * [0.0.8](#008)
  * [0.0.7](#007)
  * [0.0.6](#006)
  * [0.0.5](#005)
  * [0.0.4](#004)
  * [0.0.3](#003)
  * [0.0.2](#002)
  * [0.0.1](#001)
<!-- TOC -->

# 0.x.y

## 1.0.0
- `instanceof` support for ProblemDetail factories
- Unit testing
- NPM badge
- unit test coverage badge + GitHub action reporting coverage

## 0.0.13
- Fresh rebuild

## 0.0.12
- `ProblemDetails.create(data)` attribute `data` must not contain anymore an `success` value. It's instead auto generated.

## 0.0.11
- `ProblemDetails.create(data)` attribute `data` must not contain anymore an `instance` value. It's instead auto generated.

## 0.0.10
- Library now has a logo

## 0.0.9
- Minor changes in docs
- Some package.json metadata

## 0.0.8
- Removed `TITLE` generic type from ProblemDetails.
- Added ResponseEnvelopes code
  - success envelopes
  - generic envelopes (either success or problem detail)
  - checker functions
  - create function
  - docs

## 0.0.7
- `data` field for payload is now named `payload` to be more explicit.
- Renamed all generic types `DATA` to `PAYLOAD`.

## 0.0.6
- Keywords and description in package.json.
- Dropped helper class `ProblemDetailClazz`.
- `isInstance` is now `isOne` and just checks for the schema.
- New: Method `ProblemDetails.create(data)` allows to create a typed `ProblemDetail` object with inferred types from the `data` parameter.

## 0.0.5
- Updated package.json to include repository URL.

## 0.0.4
- Custom `generator` option.
    - Allows to change the data to be passed to a ProblemDetail factory function.
    - The `generator` can then translate the custom data to `detail` and/or `data`.

## 0.0.3
- If ProblemDetail `DATA` type is `undefined`
    - the `data` attribute of the ProblemDetail factory function can be omitted
    - or even the complete factory function argument.

## 0.0.2
- Support for both CommonJS and ESM.

## 0.0.1
- Initial release.