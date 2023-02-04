# 📜 Changelog

# 📖 Table of contents

<!-- TOC -->
* [📜 Changelog](#-changelog)
* [📖 Table of contents](#-table-of-contents)
* [0.x.y](#0xy)
  * [0.0.4](#004)
  * [0.0.3](#003)
  * [0.0.2](#002)
  * [0.0.1](#001)
<!-- TOC -->

# 0.x.y

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