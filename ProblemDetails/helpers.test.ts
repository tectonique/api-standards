import { describe, expect, it } from "@jest/globals";
import { matchesProblemDetailSchema } from "./helpers";

describe("ProblemDetail helpers", () => {
  describe("matchesProblemDetailSchema(...)", () => {
    describe("Success", () => {
      it("No payload", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            status: 111,
            type: "abc",
            title: "ABC",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
          })
        ).toBe(true);
      });

      it("With payload", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            status: 111,
            type: "abc",
            title: "ABC",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
            payload: { text: "abc def ghi" },
          })
        ).toBe(true);
      });
    });

    describe("Failure", () => {
      it("string", () => {
        expect(matchesProblemDetailSchema("asdas")).toBe(false);
      });

      it("boolean", () => {
        expect(matchesProblemDetailSchema(true)).toBe(false);
      });

      it("number", () => {
        expect(matchesProblemDetailSchema(12312323)).toBe(false);
      });

      it("Object – missing success attribute", () => {
        expect(
          matchesProblemDetailSchema({
            status: 111,
            type: "abc",
            title: "ABC",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
          })
        ).toBe(false);
      });

      it("Object – missing status attribute", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            type: "abc",
            title: "ABC",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
          })
        ).toBe(false);
      });

      it("Object – missing type attribute", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            status: 111,
            title: "ABC",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
          })
        ).toBe(false);
      });

      it("Object – missing title attribute", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            status: 111,
            type: "abc",
            detail: "ABC detail",
            instance: "urn:uuid:12123..",
          })
        ).toBe(false);
      });

      it("Object – missing detail attribute", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            status: 111,
            type: "abc",
            title: "ABC",
            instance: "urn:uuid:12123..",
          })
        ).toBe(false);
      });
      it("Object – missing instance attribute", () => {
        expect(
          matchesProblemDetailSchema({
            success: false,
            status: 111,
            type: "abc",
            title: "ABC",
            detail: "ABC detail",
          })
        ).toBe(false);
      });
    });
  });
});
