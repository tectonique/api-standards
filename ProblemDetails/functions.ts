import {
  type ProblemDetail,
  ProblemDetailFactory,
  ProblemDetailFactoryProps,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { ProblemDetailClazz } from "./helpers";

export function createProblemDetailFactory<
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined,
  GENERATOR_PROPS extends unknown[] = DATA extends undefined
    ? [factoryProps?: ProblemDetailFactoryProps<DATA>]
    : [factoryProps: ProblemDetailFactoryProps<DATA>]
>(props: {
  type: TYPE;
  status: STATUS;
  title: TITLE;
  dataType?: DATA;
  generator?: (
    ...generatorProps: GENERATOR_PROPS
  ) => ProblemDetailFactoryProps<DATA>;
}): ProblemDetailFactory<STATUS, TYPE, TITLE, DATA, GENERATOR_PROPS> {
  return function (
    ...optionalFactoryProps: GENERATOR_PROPS
  ): ProblemDetail<STATUS, TYPE, TITLE, DATA> {
    const finalFactoryProps: ProblemDetailFactoryProps<DATA> =
      typeof props.generator === "function"
        ? props.generator(...optionalFactoryProps)
        : (optionalFactoryProps[0] as ProblemDetailFactoryProps<DATA>);

    return new ProblemDetailClazz(
      props.status,
      props.type,
      props.title,
      `urn:uuid:${uuidv4()}`,
      finalFactoryProps?.detail ?? props.title,
      finalFactoryProps?.data as DATA
    );
  };
}
