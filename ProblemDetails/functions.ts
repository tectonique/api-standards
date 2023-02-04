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
  DATA = undefined
>(props: {
  type: TYPE;
  status: STATUS;
  title: TITLE;
  dataType?: DATA;
}): ProblemDetailFactory<STATUS, TYPE, TITLE, DATA> {
  return function (
    ...optionalFactoryProps: DATA extends undefined
      ? [factoryProps?: ProblemDetailFactoryProps<DATA>]
      : [factoryProps: ProblemDetailFactoryProps<DATA>]
  ): ProblemDetail<STATUS, TYPE, TITLE, DATA> {
    const [factoryProps] = optionalFactoryProps;

    return new ProblemDetailClazz(
      props.status,
      props.type,
      props.title,
      `urn:uuid:${uuidv4()}`,
      factoryProps?.detail ?? props.title,
      factoryProps?.data as DATA
    );
  };
}
