import { matchesProblemDetailSchema } from "../ProblemDetails/helpers";

export function matchesSuccessEnvelopeSchema(rawObject: unknown) {
  if (!rawObject || typeof rawObject !== "object") {
    return false;
  }

  const obj = rawObject as { [key: string]: unknown };

  // As `payload` is optional, it's not necessary to check for it.
  return obj.success === true && typeof obj.status === "number";
}

export function matchesEnvelopeSchema(rawObject: unknown) {
  return (
    matchesSuccessEnvelopeSchema(rawObject) ||
    matchesProblemDetailSchema(rawObject)
  );
}
