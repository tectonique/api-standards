import { describe, expect, it } from "@jest/globals";
import { matchesEnvelopeSchema, matchesSuccessEnvelopeSchema } from "./helpers";

describe("ResponseEnvelopes – helpers", () => {
  describe("matchesSuccessEnvelopeSchema(...)", () => {
    describe("Success", () => {
      it("Without payload", () => {
        expect(
          matchesSuccessEnvelopeSchema({ success: true, status: 200 })
        ).toBe(true);
      });

      it("With string payload", () => {
        expect(
          matchesSuccessEnvelopeSchema({
            success: true,
            status: 200,
            payload: "ghi",
          })
        ).toBe(true);
      });

      it("With object payload", () => {
        expect(
          matchesSuccessEnvelopeSchema({
            success: true,
            status: 200,
            payload: { yellow: "banana" },
          })
        ).toBe(true);
      });
    });

    describe("Failure", () => {
      it("Not an object", () => {
        expect(matchesSuccessEnvelopeSchema("lala")).toBe(false);
      });

      it("Success is false", () => {
        expect(
          matchesSuccessEnvelopeSchema({
            success: false,
            status: 404,
          })
        ).toBe(false);
      });

      it("Success is missing", () => {
        expect(
          matchesSuccessEnvelopeSchema({
            status: 404,
          })
        ).toBe(false);
      });

      it("Status is missing", () => {
        expect(
          matchesSuccessEnvelopeSchema({
            success: true,
          })
        ).toBe(false);
      });
    });
  });

  describe("matchesEnvelopeSchema(...)", () => {
    describe("Success", () => {
      it("Success envelope", () => {
        expect(
          matchesEnvelopeSchema({
            success: true,
            status: 200,
            payload: { yellow: "banana" },
          })
        ).toBe(true);
      });

      it("Problem detail", () => {
        expect(
          matchesEnvelopeSchema({
            success: false,
            status: 111,
            type: "abc",
            title: "ABC",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
          })
        ).toBe(true);
      });
    });

    describe("Failure", () => {
      it("Missing success", () => {
        expect(
          matchesEnvelopeSchema({
            status: 200,
          })
        ).toBe(false);
      });

      it("Invalid success envelope", () => {
        expect(
          matchesEnvelopeSchema({
            success: true,
          })
        ).toBe(false);
      });

      it("Invalid problem detail", () => {
        expect(
          matchesEnvelopeSchema({
            success: false,
            status: 111,
            type: "abc",
            detail: "ABC detail",
          })
        ).toBe(false);
      });
    });
  });
});
