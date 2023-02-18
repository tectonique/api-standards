import {
  type ProblemDetail,
  ProblemDetailFactory,
  ProblemDetailFactoryProps,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { matchesProblemDetailSchema } from "./helpers";

export function createProblemDetailFactory<
  STATUS extends number,
  TYPE extends string,
  PAYLOAD = undefined,
  GENERATOR_PROPS extends unknown[] = PAYLOAD extends undefined
    ? [factoryProps?: ProblemDetailFactoryProps<PAYLOAD>]
    : [factoryProps: ProblemDetailFactoryProps<PAYLOAD>]
>(props: {
  type: TYPE;
  status: STATUS;
  title: string;
  payloadType?: PAYLOAD;
  generator?: (
    ...generatorProps: GENERATOR_PROPS
  ) => ProblemDetailFactoryProps<PAYLOAD>;
}): ProblemDetailFactory<STATUS, TYPE, PAYLOAD, GENERATOR_PROPS> {
  function NewProblemDetailFactory(
    ...optionalFactoryProps: GENERATOR_PROPS
  ): ProblemDetail<STATUS, TYPE, PAYLOAD> {
    const finalFactoryProps: ProblemDetailFactoryProps<PAYLOAD> =
      typeof props.generator === "function"
        ? props.generator(...optionalFactoryProps)
        : (optionalFactoryProps[0] as ProblemDetailFactoryProps<PAYLOAD>);

    return {
      success: false,
      status: props.status,
      type: props.type,
      title: props.title,
      instance: `urn:uuid:${uuidv4()}`,
      detail: finalFactoryProps?.detail ?? props.title,
      ...({
        payload: finalFactoryProps?.payload,
      } as PAYLOAD extends undefined
        ? { payload?: undefined }
        : { payload: PAYLOAD }),
    };
  }

  Object.defineProperty(NewProblemDetailFactory, Symbol.hasInstance, {
    value(instance: unknown) {
      return (
        matchesProblemDetailSchema(instance) &&
        (<any>instance).status === props.status &&
        (<any>instance).type === props.type
      );
    },
  });

  return NewProblemDetailFactory;
}

export function createInstanceWithInferredTypes<
  STATUS extends number,
  TYPE extends string,
  PAYLOAD = undefined
>(
  problemDetail: Omit<
    ProblemDetail<STATUS, TYPE, PAYLOAD>,
    "instance" | "success"
  >
): ProblemDetail<STATUS, TYPE, PAYLOAD> {
  return {
    success: false,
    status: problemDetail.status,
    type: problemDetail.type,
    title: problemDetail.title,
    detail: problemDetail.detail,
    instance: `urn:uuid:${uuidv4()}`,
    ...({
      payload: problemDetail.payload,
    } as PAYLOAD extends undefined
      ? { payload?: undefined }
      : { payload: PAYLOAD }),
  };
}
