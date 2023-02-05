export function matchesProblemDetailSchema(data: unknown) {
  if (!data || typeof data !== "object") {
    return false;
  }

  const obj = data as { [key: string]: unknown };

  // As the payload is optional, it's not necessary to check for it.
  return (
    obj.success === false &&
    typeof obj.status === "number" &&
    typeof obj.type === "string" &&
    typeof obj.title === "string" &&
    typeof obj.detail === "string" &&
    typeof obj.instance === "string"
  );
}
