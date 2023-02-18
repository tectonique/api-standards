import { ProblemDetails, ResponseEnvelopes } from "./index";
import { describe, expect, it } from "@jest/globals";
import {
  createInstanceWithInferredTypes,
  createProblemDetailFactory,
} from "./ProblemDetails/functions";
import { matchesProblemDetailSchema } from "./ProblemDetails/helpers";
import { createSuccessEnvelope } from "./ResponseEnvelopes/functions";
import {
  matchesEnvelopeSchema,
  matchesSuccessEnvelopeSchema,
} from "./ResponseEnvelopes/helpers";

describe("Library export tests", () => {
  describe("ProblemDetails", () => {
    it("Collection defined", () => {
      expect(ProblemDetails).toBeDefined();
    });

    it("Check ProblemDetails.factory", () => {
      expect(ProblemDetails.factory).toBe(createProblemDetailFactory);
    });

    it("Check ProblemDetails.isOne", () => {
      expect(ProblemDetails.isOne).toBe(matchesProblemDetailSchema);
    });

    it("Check ProblemDetails.create", () => {
      expect(ProblemDetails.create).toBe(createInstanceWithInferredTypes);
    });
  });

  describe("ResponseEnvelopes", () => {
    it("Collection defined", () => {
      expect(ResponseEnvelopes).toBeDefined();
    });

    it("Check ResponseEnvelopes.success", () => {
      expect(ResponseEnvelopes.success).toBe(createSuccessEnvelope);
    });

    it("Check ResponseEnvelopes.isSuccess", () => {
      expect(ResponseEnvelopes.isSuccess).toBe(matchesSuccessEnvelopeSchema);
    });

    it("Check ResponseEnvelopes.isOne", () => {
      expect(ResponseEnvelopes.isOne).toBe(matchesEnvelopeSchema);
    });
  });
});
