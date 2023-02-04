import { pd } from "./index";

const UntypedCollectionA = {
  NotFound: pd.define({ type: "not-found", title: "Not found", status: 404 }),
  Unauthorized: pd.define({
    type: "unauthorized",
    title: "Unauthorized",
    status: 401,
  }),
};

const UntypedCollectionB = {
  Test: pd.define({ type: "test", title: "Test", status: 442 }),
};

const collection = pd.collection({
  ...UntypedCollectionA,
  ...UntypedCollectionB,
});

const testProblem = collection.NotFound({ detail: "asd", data: undefined });

type ProblemDetailType = pd.infer<typeof collection>;

const genericallyTypedProblem = testProblem as ProblemDetailType;

// Here you can see, that the `type` is strictly typed.
if (genericallyTypedProblem.type === "not-found") {
  console.log("Dummy message: Resource was not found.");
} else if (genericallyTypedProblem.type === "unauthorized") {
  console.log("Dummy message: Unauthorized.");
} else if (genericallyTypedProblem.type === "test") {
  console.log("Dummy message: Test.");
}
