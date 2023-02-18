import { describe, expect, it } from "@jest/globals";
import {
  createInstanceWithInferredTypes,
  createProblemDetailFactory,
} from "./functions";
import * as uuid from "uuid";

describe("ProblemDetails – functions", () => {
  describe("createProblemDetailFactory(...)", () => {
    it("Without payload", () => {
      const factory = createProblemDetailFactory({
        status: 433,
        type: "hello-world",
        title: "Hello World",
      });

      // Some instances with default detail
      let previousInstance: null | string = null;
      for (let i = 0; i < 5; i++) {
        const problemDetail = factory();

        isValidFactoryProblemDetail(factory, problemDetail, {
          status: 433,
          type: "hello-world",
          title: "Hello World",
          detail: "Hello World",
        });

        if (previousInstance) {
          expect(problemDetail.instance != previousInstance).toBe(true);
        }

        previousInstance = problemDetail.instance;
      }

      // Custom detail
      const problemDetailWithDifferentDetail = factory({
        detail: "Banana!",
      });

      isValidFactoryProblemDetail(factory, problemDetailWithDifferentDetail, {
        status: 433,
        type: "hello-world",
        title: "Hello World",
        detail: "Banana!",
      });
    });

    it("With string payload", () => {
      const factory = createProblemDetailFactory({
        status: 378,
        type: "banana-boat",
        title: "Banana Boat",
        payloadType: {} as string,
      });

      // Some instances with default detail
      let previousInstance: null | string = null;
      for (let i = 0; i < 5; i++) {
        const text = `round-${i}`;
        const problemDetail = factory({ payload: text });

        isValidFactoryProblemDetail(factory, problemDetail, {
          status: 378,
          type: "banana-boat",
          title: "Banana Boat",
          detail: "Banana Boat",
          payload: text,
        });

        if (previousInstance) {
          expect(problemDetail.instance != previousInstance).toBe(true);
        }

        previousInstance = problemDetail.instance;
      }

      // Custom detail
      const problemDetailWithDifferentDetail = factory({
        detail: "Apples!",
        payload: "apple-round",
      });

      isValidFactoryProblemDetail(factory, problemDetailWithDifferentDetail, {
        status: 378,
        type: "banana-boat",
        title: "Banana Boat",
        detail: "Apples!",
        payload: "apple-round",
      });
    });

    it("With object payload", () => {
      const factory = createProblemDetailFactory({
        status: 378,
        type: "banana-boat",
        title: "Banana Boat",
        payloadType: {} as { t: true; f: false; text: string },
      });

      // Some instances with default detail
      let previousInstance: null | string = null;
      for (let i = 0; i < 5; i++) {
        const text = `round-${i}`;
        const problemDetail = factory({ payload: { t: true, f: false, text } });

        isValidFactoryProblemDetail(factory, problemDetail, {
          status: 378,
          type: "banana-boat",
          title: "Banana Boat",
          detail: "Banana Boat",
          payload: { t: true, f: false, text },
        });

        if (previousInstance) {
          expect(problemDetail.instance != previousInstance).toBe(true);
        }

        previousInstance = problemDetail.instance;
      }

      // Custom detail
      const problemDetailWithDifferentDetail = factory({
        detail: "Cherries!",
        payload: { t: true, f: false, text: "cherry-round" },
      });

      isValidFactoryProblemDetail(factory, problemDetailWithDifferentDetail, {
        status: 378,
        type: "banana-boat",
        title: "Banana Boat",
        detail: "Cherries!",
        payload: { t: true, f: false, text: "cherry-round" },
      });
    });

    it("With custom payload generator", () => {
      const factory = createProblemDetailFactory({
        status: 222,
        type: "calc",
        title: "Calc",
        payloadType: {} as { original: number; squared: number },
        generator: (n: number) => {
          return {
            payload: {
              original: n,
              squared: n * n,
            },
            detail: `Squared = ${n * n}`,
          };
        },
      });

      let previousInstance: null | string = null;
      for (let i = 0; i < 5; i++) {
        const problemDetail = factory(i);
        const expectedSquared = i * i;

        isValidFactoryProblemDetail(factory, problemDetail, {
          status: 222,
          type: "calc",
          title: "Calc",
          detail: `Squared = ${expectedSquared}`,
          payload: { original: i, squared: expectedSquared },
        });

        if (previousInstance) {
          expect(problemDetail.instance != previousInstance).toBe(true);
        }

        previousInstance = problemDetail.instance;
      }
    });
  });

  describe("createInstanceWithInferredTypes(...)", () => {
    it("Without payload", () => {
      const problemDetail = createInstanceWithInferredTypes({
        status: 123,
        type: "bee",
        title: "Bee",
        detail: "Fly",
      });

      isValid(problemDetail, {
        status: 123,
        type: "bee",
        title: "Bee",
        detail: "Fly",
      });
    });

    it("With string payload", () => {
      const problemDetail = createInstanceWithInferredTypes<123, "owl", string>(
        {
          status: 123,
          type: "owl",
          title: "Owl",
          detail: "Kukuk",
          payload: "Bird",
        }
      );

      isValid(problemDetail, {
        status: 123,
        type: "owl",
        title: "Owl",
        detail: "Kukuk",
        payload: "Bird",
      });
    });

    it("With object payload", () => {
      const problemDetail = createInstanceWithInferredTypes<
        321,
        "nemo",
        { text: string }
      >({
        status: 321,
        type: "nemo",
        title: "Nemo",
        detail: "Clown",
        payload: { text: "Fish" },
      });

      isValid(problemDetail, {
        status: 321,
        type: "nemo",
        title: "Nemo",
        detail: "Clown",
        payload: { text: "Fish" },
      });
    });
  });
});

function isValid(
  problemDetail: any,
  expected: {
    status: number;
    type: string;
    title: string;
    detail: string;
    payload?: any;
  }
) {
  expect(problemDetail.success).toBe(false);
  expect(problemDetail.status).toBe(expected.status);
  expect(problemDetail.type).toBe(expected.type);
  expect(problemDetail.title).toBe(expected.title);
  expect(problemDetail.detail).toBe(expected.detail);

  expect(typeof problemDetail.instance).toBe("string");
  expect(problemDetail.instance.startsWith("urn:uuid:")).toBeTruthy();
  expect(
    uuid.validate(problemDetail.instance.substring("urn:uuid:".length))
  ).toBeTruthy();

  if (expected.payload === undefined) {
    expect(problemDetail.payload).toBeUndefined();
  } else {
    expect(JSON.stringify(problemDetail.payload)).toBe(
      JSON.stringify(expected.payload)
    );
  }
}

function isValidFactoryProblemDetail(
  factory: any,
  problemDetail: any,
  expected: {
    status: number;
    type: string;
    title: string;
    detail: string;
    payload?: any;
  }
) {
  isValid(problemDetail, expected);

  expect(problemDetail instanceof factory).toBe(true);
  expect({} instanceof factory).toBe(false);

  // Check instanceof for copied object
  const copied = JSON.parse(JSON.stringify(problemDetail));
  expect(copied instanceof factory).toBe(true);
}
