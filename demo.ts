import { ProblemDetails } from "./index";

const UntypedCollectionA = {
  NotFound: ProblemDetails.define({
    type: "not-found",
    title: "Not found",
    status: 404,
    dataType: {} as number,
  }),
  Unauthorized: ProblemDetails.define({
    type: "unauthorized",
    title: "Unauthorized",
    status: 401,
  }),
};

const UntypedCollectionB = {
  Test: ProblemDetails.define({ type: "test", title: "Test", status: 442 }),

  // It's also possible to define custom generators.
  Custom: ProblemDetails.define({
    type: "custom",
    title: "Custom",
    status: 442,
    generator: ({ input }: { input: number }) => {
      return {
        data: {
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
const testProblem1 = collection.NotFound({ detail: "PD 1", data: 1 });

// If `dataType` is not used, `data` can be omitted ...
// or even the complete object, as detail is also optional.
const testProblem2 = collection.Test({ detail: "PD 2" });
const testProblem3 = collection.Test();

const testProblem4 = collection.Custom({ input: 5 });

console.log("PD 1:", testProblem1);
console.log("PD 2:", testProblem2);
console.log("PD 3:", testProblem3);
console.log("PD 3:", testProblem4);

type ProblemDetailType = ProblemDetails.infer<typeof collection>;

const genericallyTypedProblem = testProblem1 as ProblemDetailType;

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
    genericallyTypedProblem.data.squared
  );
}

// You can use ProblemDetail.isInstance to check
// if a certain object is a ProblemDetail instance.
console.log(
  "Is problem detail 1? (should be true):",
  ProblemDetails.isInstance(genericallyTypedProblem)
);

console.log(
  "Is problem detail 2? (should be false):",
  ProblemDetails.isInstance({})
);
