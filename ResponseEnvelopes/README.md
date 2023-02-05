# 📨 Response Envelopes

API response envelopes create a uniform response structure – for success responses as well as for error responses.

_This an essential part for creating end to end type safe code._

# 📖 Table of contents
<!-- TOC -->
* [📨 Response Envelopes](#-response-envelopes)
* [📖 Table of contents](#-table-of-contents)
* [👘 Structure](#-structure)
* [🧐 But why?](#-but-why)
* [🫧 Envelope type](#-envelope-type)
* [🧑‍🏫 Tutorial](#-tutorial)
  * [🧶 Infer your Problem Detail Super Type](#-infer-your-problem-detail-super-type)
  * [⚡️ Define an API endpoint payload type](#-define-an-api-endpoint-payload-type)
  * [🔌 Use the type in your backend](#-use-the-type-in-your-backend)
  * [📞 Perform a 100% type safe API call](#-perform-a-100-type-safe-api-call)
* [🎭 Utilities](#-utilities)
  * [🧱 SuccessEnvelope create function](#-successenvelope-create-function)
  * [🔎 Check if a variable is an envelope](#-check-if-a-variable-is-an-envelope)
<!-- TOC -->

# 👘 Structure
This library advocates the following very simple success response envelope:
```typescript
type SuccessResponseEnvelope<PAYLOAD> = {
  success: true,
  status: number,
  payload: PAYLOAD
}
```

The field `paylod` in the actual type can be optional, if `PAYLOAD extends undefined`.

# 🧐 But why?
To understand this, you should have read the [Problem Details Docs 🔗](./../ProblemDetails/README.md).

When comparing `ProblemDetail` and `SuccessEnvelope`, you will see,
that both have the field `success` – the former one with `false` and the latter one with `true`.

You might think:
> _**"This looks like an excellent discriminator field! 💡"**_

Indeed, it's a **fantastic** discriminator field!

In the next section is described, how this library enables a consumer
to make use of this. 🚀

# 🫧 Envelope type
Let me introduce the `ResponseEnvelope` type:

```typescript
import { SuccessEnvelope } from "./types";

type ResponseEnvelope<
  PROBLEM_DETAIL_SUPER_TYPE,
  SUCCESS_PAYLOAD
> = PROBLEM_DETAIL_SUPER_TYPE | SuccessEnvelope<SUCCESS_PAYLOAD>
```

An instance of type `ResponseEnvelope` reflects an API response with all possible errors respectively
Problem Details.

**And any consumer / client can work with such a response in a type safe way!**

# 🧑‍🏫 Tutorial

**🚨 Attention:**

This tutorial is based on the tutorial of the [Problem Details Docs 🔗](./../ProblemDetails/README.md). 

## 🧶 Infer your Problem Detail Super Type

```typescript
import ProblemDetailsCollection from "@problemDetails/ProblemDetailsCollection"

type ProblemDetailSuperType = ProblemDetails.infer<typeof ProblemDetailsCollection>

// ProblemDetailsSuperType.type = "unauthorized" | "internal-server-error"
```

## ⚡️ Define an API endpoint payload type
```typescript
type API_GetUsers_Response = {
  email: string,
  name: string
}[]
```

## 🔌 Use the type in your backend
Express, Nest.js ... please just use the response type properly in your backend,
so that never an invalid response is created. ☺️

## 📞 Perform a 100% type safe API call

```typescript
import { ResponseEnvelopes } from "@tectonique/api-standards"

const data = await axios.get("/api/users")
  .then((response) => response.data)
  .catch((error) => error.response.data)

if ( ResponseEnvelopes.isEnvelope(data) ) {
  const envelope = data as ResponseEnvelopes.Envelope<
    ProblemDetailSuperType,
    API_GetUsers_Response
  >
  
  if ( envelope.success ) {
    console.log(
      "User email adresses:",
      evelope.payload.map(user => user.email).join(', ')
    )
  } else if ( envelope.type === "unauthorized" ) {
    throw new Error("Session expired")
  }
}
```

Isn't that cool? 🤩

# 🎭 Utilities

## 🧱 SuccessEnvelope create function

```typescript
import { ResponseEnvelopes } from "@tectonique/api-standards"

// Without payload
const NoPayloadEnvelope = ResponseEnvelopes.success(201)

// With paylod
type User = {
  email: string,
  name: string
}

const UserEnvelope = ResponseEnvelopes.success<User>(201, {
  email: "test@test.com",
  name: "Theo Tester"
})

```

## 🔎 Check if a variable is an envelope

```typescript
import { ResponseEnvelopes, ProblemDetails } from "@tectonique/api-standards"


const SuccessEnvelope = ResponseEnvelopes.success(201)

const ProblemDetail = ProblemDetails.create({
  status: 422,
  type: "malformed-data",
  title: "Malformed Data",
  detail: "Hello World",
  instance: `urn:timestamp:${new Date().getTime()}`,
})


// Check for success envelopes
console.log(ResponseEnvelopes.isSuccess(
  SuccessEnvelope
)) // > true

console.log(ResponseEnvelopes.isSuccess(
  ProblemDetail
)) // > false

console.log(ResponseEnvelopes.isSuccess({})) // > false


// Check for envelope (either success OR problem detail)
console.log(ResponseEnvelopes.isOne(
  SuccessEnvelope
)) // > true

console.log(ResponseEnvelopes.isOne(
  ProblemDetail
)) // > true

console.log(ResponseEnvelopes.isOne({})) // > false
```