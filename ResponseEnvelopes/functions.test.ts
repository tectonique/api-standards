import { describe, expect, it } from "@jest/globals";
import { createSuccessEnvelope } from "./functions";

describe("ResponseEnvelopes – functions", () => {
  describe("createSuccessEnvelope(...)", () => {
    it("Without payload", () => {
      const successEnvelope = createSuccessEnvelope(201);
      isValid(successEnvelope, { status: 201 });
    });

    it("With string payload", () => {
      const successEnvelope = createSuccessEnvelope<string>(201, "abc");
      isValid(successEnvelope, { status: 201, payload: "abc" });
    });

    it("With object payload", () => {
      const successEnvelope = createSuccessEnvelope<{ text: string }>(201, {
        text: "def",
      });
      isValid(successEnvelope, { status: 201, payload: { text: "def" } });
    });
  });
});

function isValid(
  envelope: any,
  expected: {
    status: number;
    payload?: any;
  }
) {
  expect(envelope.success).toBe(true);
  expect(envelope.status).toBe(expected.status);

  if (expected.payload === undefined) {
    expect(envelope.payload).toBeUndefined();
  } else {
    expect(JSON.stringify(envelope.payload)).toBe(
      JSON.stringify(expected.payload)
    );
  }
}
