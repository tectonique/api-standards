import { SuccessEnvelope } from "./types";

export function createSuccessEnvelope<SUCCESS_PAYLOAD = undefined>(
  status: number,
  ...rest: SUCCESS_PAYLOAD extends undefined
    ? []
    : [successPaylod: SUCCESS_PAYLOAD]
): SuccessEnvelope<SUCCESS_PAYLOAD> {
  const [successPayload] = rest;

  return {
    success: true,
    status: status,
    ...({ payload: successPayload } as SUCCESS_PAYLOAD extends undefined
      ? { payload?: undefined }
      : { payload: SUCCESS_PAYLOAD }),
  };
}
