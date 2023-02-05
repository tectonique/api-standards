export function matchesProblemDetailSchema(rawObject: unknown) {
  if (!rawObject || typeof rawObject !== "object") {
    return false;
  }

  const obj = rawObject as { [key: string]: unknown };

  // As `payload` is optional, it's not necessary to check for it.
  return (
    obj.success === false &&
    typeof obj.status === "number" &&
    typeof obj.type === "string" &&
    typeof obj.title === "string" &&
    typeof obj.detail === "string" &&
    typeof obj.instance === "string"
  );
}
