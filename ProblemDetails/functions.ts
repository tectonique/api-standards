import {
  type ProblemDetail,
  ProblemDetailFactory,
  ProblemDetailFactoryCollection,
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
    factoryProps: ProblemDetailFactoryProps<DATA>
  ): ProblemDetail<STATUS, TYPE, TITLE, DATA> {
    return new ProblemDetailClazz(
      props.status,
      props.type,
      props.title,
      `urn:uuid:${uuidv4()}`,
      factoryProps.detail ?? props.title,
      factoryProps.data
    );
  };
}

export function createProblemDetailFactoryCollection<
  KEY extends string,
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined
>(
  collection: ProblemDetailFactoryCollection<KEY, STATUS, TYPE, TITLE, DATA>
): ProblemDetailFactoryCollection<KEY, STATUS, TYPE, TITLE, DATA> {
  return collection;
}

export function mergeProblemDetailFactoryCollections<
  KEY extends string,
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined
>(
  collections: ProblemDetailFactoryCollection<KEY, STATUS, TYPE, TITLE, DATA>[]
): ProblemDetailFactoryCollection<KEY, STATUS, TYPE, TITLE, DATA> {
  return collections.reduce((prev, cur) => {
    return { ...prev, ...cur };
  }, {} as ProblemDetailFactoryCollection<KEY, STATUS, TYPE, TITLE, DATA>);
}
