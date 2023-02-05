import { ProblemDetails, ResponseEnvelopes } from "./index";
import { SuccessEnvelope } from "./ResponseEnvelopes";
import { v4 as uuidv4 } from "uuid";

const UntypedCollectionA = {
  NotFound: ProblemDetails.factory({
    type: "not-found",
    title: "Not found",
    status: 404,
    payloadType: {} as number,
  }),
  Unauthorized: ProblemDetails.factory({
    type: "unauthorized",
    title: "Unauthorized",
    status: 401,
  }),
};

const UntypedCollectionB = {
  Test: ProblemDetails.factory({ type: "test", title: "Test", status: 442 }),

  // It's also possible to define custom generators.
  Custom: ProblemDetails.factory({
    type: "custom",
    title: "Custom",
    status: 442,
    generator: ({ input }: { input: number }) => {
      return {
        payload: {
          input,
          squared: input * input,
        },
      };
    },
  }),
};

const collection = {
  ...UntypedCollectionA,
  ...UntypedCollectionB,
};

// Here you can see, that a `data` attribute is needed
const testProblem1 = collection.NotFound({ detail: "PD 1", payload: 1 });

// If `dataType` is not used, `data` can be omitted ...
// or even the complete object, as detail is also optional.
const testProblem2 = collection.Test({ detail: "PD 2" });
const testProblem3 = collection.Test();

const testProblem4 = collection.Custom({ input: 5 });

console.log("PD 1:", testProblem1);
console.log("PD 2:", testProblem2);
console.log("PD 3:", testProblem3);
console.log("PD 3:", testProblem4);

type ProblemDetailSuperType = ProblemDetails.infer<typeof collection>;

const genericallyTypedProblem = testProblem1 as ProblemDetailSuperType;

// Here you can see, that the `type` is strictly typed
if (genericallyTypedProblem.type === "not-found") {
  console.log("Dummy message: Resource was not found.");
} else if (genericallyTypedProblem.type === "unauthorized") {
  console.log("Dummy message: Unauthorized.");
} else if (genericallyTypedProblem.type === "test") {
  console.log("Dummy message: Test.");

  // ... and access to data as well.
} else if (genericallyTypedProblem.type === "custom") {
  console.log(
    "Dummy message: Test. Squared output: ",
    genericallyTypedProblem.payload.squared
  );
}

// You can use ProblemDetail.isInstance to check
// if a certain object is a ProblemDetail instance.
console.log(
  "Is problem detail 1? (should be true):",
  ProblemDetails.isOne(genericallyTypedProblem)
);

console.log(
  "Is problem detail 2? (should be false):",
  ProblemDetails.isOne({})
);

const nonFactoryProblemDetailInstance = ProblemDetails.create({
  status: 431,
  type: "hello-world",
  title: "Hello World",
  detail: "Hello World",
});

const thisHereIsTheLongForm: ProblemDetails.ProblemDetail<431, "hello-world"> =
  {
    success: false,
    status: 431,
    type: "hello-world",
    title: "Hello World",
    detail: "Hello World",
    instance: `urn:uuid:${uuidv4()}`,
  };

console.log(
  "Non factory instance: isOne()?",
  ProblemDetails.isOne(nonFactoryProblemDetailInstance)
);

console.log(
  "Non factory instance (long form): isOne()?",
  ProblemDetails.isOne(thisHereIsTheLongForm)
);

// And now here comes the beauty with envelopes:
const someResponse1: SuccessEnvelope = {
  success: true,
  status: 200,
};

type Response2Payload = { userName: string };

const someResponse2 = ResponseEnvelopes.success<Response2Payload>(200, {
  userName: "Peter",
});

// We wrap the response using the Envelope type.
// > here we don't have an expected payload type (by default undefined is used).
const envelope1 =
  someResponse1 as ResponseEnvelopes.Envelope<ProblemDetailSuperType>;

// But here we add the expected success payload type
const envelope2 = someResponse2 as ResponseEnvelopes.Envelope<
  ProblemDetailSuperType,
  Response2Payload
>;

// And now we can check the envelopes in a type safe way?
// - Success?
//  > yes: Work with typed payload?
//  > no: Check "type" field?
//    > Evaluate Problem Detail
if (envelope1.success) {
  console.log("Envelope 1 > Success!");
} else {
  console.log("Envelope 1 > Failure:", envelope1.status, envelope1.title);
}

if (envelope2.success) {
  console.log("Envelope 2 > Success! User name:", envelope2.payload.userName);
} else {
  if (envelope2.type === "unauthorized") {
    throw new Error("Authorization expired.");
  }
}
