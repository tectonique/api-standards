import { ProblemDetail } from "../ProblemDetails";

export type SuccessEnvelope<PAYLOAD = undefined> = {
  success: true;
  status: number;
} & (PAYLOAD extends undefined
  ? { payload?: undefined }
  : { payload: PAYLOAD });

export type Envelope<
  PROBLEM_DETAIL extends ProblemDetail<
    PROBLEM_STATUS,
    PROBLEM_TYPE,
    PROBLEM_PAYLOAD
  >,
  SUCCESS_PAYLOAD = undefined,
  PROBLEM_STATUS extends number = PROBLEM_DETAIL["status"],
  PROBLEM_TYPE extends string = PROBLEM_DETAIL["type"],
  PROBLEM_PAYLOAD = PROBLEM_DETAIL["payload"]
> =
  | SuccessEnvelope<SUCCESS_PAYLOAD>
  | ProblemDetail<PROBLEM_STATUS, PROBLEM_TYPE, PROBLEM_PAYLOAD>;
