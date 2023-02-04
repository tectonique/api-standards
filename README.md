# API Standards

This library provides utilities for creating end to end type safe APIs.

The library advocates:

- API response envelopes
- Error handling with [RFC 7807 Problem Details 🔗](https://www.rfc-editor.org/rfc/rfc7807)

# npmjs.com

- https://www.npmjs.com/package/@tectonique/api-standards

# Changelog

## 0.0.3
- If ProblemDetail `DATA` type is `undefined`
  - the `data` attribute of the ProblemDetail factory function can be omitted
  - or even the complete factory function argument.

## 0.0.2
- Support for both CommonJS and ESM.

## 0.0.1
- Initial release.

# Author

Peter Kuhmann
<br>[hedgehogs-mind @ GitHub](https://github.com/hedgehogs-mind)
<br>Tectonique

![Tectonique Logo](.assets/tectonique-small.png)
