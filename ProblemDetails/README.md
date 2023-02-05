# ⚠️ Problem Details

Problem Details are RFC that factories a common data structure for errors
occurring on the server side.

The goal is to provide clients a clear way to handle errors – especially
by introducing unique `type` identifiers.

Here is the RFC specification: [RFC 7807 Problem Details 🔗](https://www.rfc-editor.org/rfc/rfc7807)

# 📖 Table of contents

<!-- TOC -->
* [⚠️ Problem Details](#-problem-details)
* [📖 Table of contents](#-table-of-contents)
* [🤔 What will you set up?](#-what-will-you-set-up)
* [👘 Structure of a Problem Detail](#-structure-of-a-problem-detail)
* [💬 Terminology](#-terminology)
* [🧑‍🏫 Tutorial](#-tutorial)
  * [📂 Prepare folder structure](#-prepare-folder-structure)
  * [✍️ Create your Problem Details](#-create-your-problem-details)
  * [🗄 Assemble your collection](#-assemble-your-collection)
  * [🧨 Create/throw a Problem Detail](#-createthrow-a-problem-detail)
  * [🔎 Is it a Problem Detail?](#-is-it-a-problem-detail)
  * [⚡️ Use the inferred Super Type](#-use-the-inferred-super-type)
  * [🔢 Use typed payloads](#-use-typed-payloads)
  * [🏭 Use custom factory properties](#-use-custom-factory-properties)
  * [🔨 Creating typed instances without factories](#-creating-typed-instances-without-factories)
<!-- TOC -->

# 🤔 What will you set up?

You will:
1. **create various Problem Detail types**, that you can safely throw.
2. **create a collection** that contains all Problem Detail types you factoryd.
3. learn how to **throw a Problem Detail**.
4. **infer a "super type"** that represents all possible Problem Details

# 👘 Structure of a Problem Detail

The RFC requires at least the following structure:
```typescript
type RfcProblemDetail = {
  // HTTP status code
  status: number;
  
  // Unique type. Can also be a uuid
  // by using "urn:uuid:{uuid}".
  type: string;
  
  // Short title.
  title: string;
  
  // Description (for simple errors just the title).
  detail: string;
  
  // Identifier of the type's instance.
  // Useful for log searches.
  instance: string;
}
```

This library adds two more fields:
```typescript
type ProblemDetail<..., PAYLOAD> = RfcProblemDetail & {
  // This makes it very easy for TypeScript
  // clients to distinguish between a 
  // Problem Detail or a success reponse envelope.
  success: false;
  
  // Optional payload.
  payload: PAYLOAD
}
```

# 💬 Terminology
This documentation/library uses some terminology, that you should know:

| Term                      | Explanation                                                                                                                                                                                                                       |
|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Problem Detail            | An object instance that carries all the attributes explained above in "Structure". Such an instance shall be thrown/send back to the caller.                                                                                      |
| Problem Detail Factory    | A "Problem Detail Factory" is a reusable function. For every Problem Detail type you factory one factory. You then can use the factory to create instance of the Problem Detail type.                                             |
| Problem Detail Collection | A "Problem Detail Collection" is a plain object that holds all of your Problem Detail Types / Factories.                                                                                                                          |
| Inferred Super Type       | To get type safety on the frontend by just checking a Problem Detail's `type` field (and e.g. correctly accessing payload), you need to infer your generic "ProblemDetail" type that represents all of your Problem Detail types. | 

# 🧑‍🏫 Tutorial

## 📂 Prepare folder structure
Pick a folder to start at. Then create the following folders and files.

**_You can change names at the end how you like!_**

```
- ProblemDetails/
    - types/
        - auth.ts
        - base.ts
    - ProblemDetailsCollection.ts
```

## ✍️ Create your Problem Details

In `auth.ts` write:
```typescript
import { ProblemDetails } from "@tectonique/api-standards"

export default {
  Unauthorized: ProblemDetails.factory({
    status: 401,
    type: "unauthorized",
    title: "Unauthorized"
  }) 
}
```

In `base.ts` write:
```typescript
import { ProblemDetails } from "@tectonique/api-standards"

export default {
  InternalServerError: ProblemDetails.factory({
    status: 500,
    type: "internal-server-error",
    title: "Internal Server Error"
  }) 
}
```

## 🗄 Assemble your collection
In `ProblemDetailsCollection.ts` write:
```typescript
import auth from "./types/auth"
import base from "./types/base"

export default {
  ...auth,
  ...base
}
```

## 🧨 Create/throw a Problem Detail
In some other file import your `ProblemDetailsCollection.ts` and do the following:
```typescript
import { Unauthorized, InternalServerError } from "@problemDetails/ProblemDetailsCollection"

// No additional data need.
// `title` will be used for `detail` as well
function throwUnauthorized() {
  throw Unauthorized()
}

// But you can also set a detailed message.
function throwInternalServerError(message: string) {
  throw InternalServerError({ detail: message })
}
```

## 🔎 Is it a Problem Detail?
Imagine you want to handle thrown Problem Details and send them back
to as an HTTP response. You can check if an object is a Problem Detail instance
with `ProblemDetails.isOne(...)`:

```typescript
import { ProblemDetails } from "@tectonique/api-standards"

try {
  // ...
} catch ( e: unknown ) {
  if ( ProblemDetails.isOne(e) ) {
    // Handle Problem Detail instance.
  }
  
  // Rethrow all other errors
  throw e;
}
```

The method `isOne(...)` checks if the given value is
- an object
- and matches the ProblemDetail schema (including the `success: false` flag).


## ⚡️ Use the inferred Super Type
Check out the following code. It
- obtains the "Inferred Super Type"
- and makes use of it to properly act based on the `type`.

```typescript
import { ProblemDetails } from "@tectonique/api-standards"
import ProblemDetailsCollection from "@problemDetails/ProblemDetailsCollection"

type ProblemDetailSuperType = ProblemDetails.infer<typeof ProblemDetailsCollection>

// ProblemDetailsSuperType.type = "unauthorized" | "internal-server-error"

try {
  // ...
} catch ( error ) {
  if ( problemDetails.isOne(error) ) {
    const problemDetail = error as ProblemDetailSuperType
    
    if ( problemDetail.type === "internal-server-error" ) {
      alert("Problem occurred on the server side.")
    } else {
      // ...
    }
  }
}
```

## 🔢 Use typed payloads
Okay, here comes the real power: **_Typed payload!_** 💪

1️⃣ Let's introduce a new type file `types/validation.ts`:
```typescript
import { ProblemDetails } from "@tectonique/api-standards"

export default {
  InvalidData: ProblemDetails.factory({
    status: 422,
    type: "invalid-data",
    title: "Invalid data",
    payloadType: {} as {
      path: string,
      violations: string[]
    }[]
  })
}
```

2️⃣ Let's add the new type/factory to the collection in `ProblemDetailsCollection.ts`:
```typescript
// ...
import validation from "./types/validation"

export default {
  // ...
  ...validation
}
```

3️⃣ Throw such an error:
```
import { InvalidData } from "@problemDetails/ProblemDetailsCollection"

function throwInvalidData() {
    throw InvalidData({
        payload: [
            {
                path: "email",
                violations: ["Must not be empty", "Must be a valid email"]
            }
        ]
    })
}
```

4️⃣ Work with the payload in a type safe manner:
```typescript
import { ProblemDetails } from "@tectonique/api-standards"
import ProblemDetailsCollection from "@problemDetails/ProblemDetailsCollection"

type ProblemDetailSuperType = ProblemDetails.infer<typeof ProblemDetailsCollection>

// ProblemDetailsSuperType.type = "invalid-data" | "unauthorized" | "internal-server-error"

try {
  // ...
} catch ( error ) {
  if ( problemDetails.isOne(error) ) {
    const problemDetail = error as ProblemDetailSuperType
    
    if ( problemDetail.type === "invalid-data" ) {
      const message = problemDetail.payload.map(entry => {
        return `[${entry.path}]: ${entry.violations.join(', ')}`
      }).join(' – ')
      
      alert('Data is invalid: ' + message)
    } else {
      // ...
    }
  }
}
```

## 🏭 Use custom factory properties
In case you need to map one type your Problem Detail's payload type, you
can specify a so-called "generator" and override the factory's props.

1️⃣ Let's refactor/optimize `InvalidData` Problem Detail a bit:
```typescript
import { ProblemDetails } from "@tectonique/api-standards"

type Violation = {
  path: string,
  violations: string[]
}

export default {
  InvalidData: ProblemDetails.factory({
    status: 422,
    type: "invalid-data",
    title: "Invalid data",
    generator: (violations: Violation[]) => {
      // We want to return a list of messages
      const messages: string[] = violations.map(entry => {
        return `[${entry.path}]: ${entry.violations.join(', ')}`
      })
      
      return {
        payload: messages,
        detail: messages.join(' – ')
      }
    }
  })
}
```

2️⃣ Now throw more readable Problem Details:
```
import { InvalidData } from "@problemDetails/ProblemDetailsCollection"

function throwInvalidData() {
    throw InvalidData([{
        path: "email",
        violations: ["Must not be empty", "Must be a valid email"]
    }])
}
```

**In this case you do not need to specify `dataType`!**

3️⃣ Use the typed data:
```typescript
import { ProblemDetails } from "@tectonique/api-standards"
import ProblemDetailsCollection from "@problemDetails/ProblemDetailsCollection"

type ProblemDetailSuperType = ProblemDetails.infer<typeof ProblemDetailsCollection>

// ProblemDetailsSuperType.type = "invalid-data" | "unauthorized" | "internal-server-error"

try {
  // ...
} catch ( error ) {
  if ( problemDetails.isOne(error) ) {
    const problemDetail = error as ProblemDetailSuperType
    
    if ( problemDetail.type === "invalid-data" ) {
      // Here we use the message array ...
      console.error("Invalid data:", problemDetail.payload)
      
      // ... and here the pre-joined detail message!
      alert('Data is invalid: ' + problemDetail.detail)
    } else {
      // ...
    }
  }
}
```

## 🔨 Creating typed instances without factories
In case you want to create a typed `ProblemDetail` object,
use `ProblemdDetails.create(data)`. This method helps with inferring types:

```typescript
const nonFactoryProblemDetailInstance = ProblemDetails.create({
  success: false,
  status: 431,
  type: "hello-world",
  title: "Hello World",
  detail: "Hello World",
});
```

It does the same as:
```typescript
const thisHereIsTheLongForm: ProblemDetails.ProblemDetail<
  431,
  "hello-world",
> = {
  success: false,
  status: 431,
  type: "hello-world",
  detail: "Hello World",
  instance: `urn:uuid:${uuidv4()}`,
};
```