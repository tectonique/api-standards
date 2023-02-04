export type ProblemDetail<
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined
> = {
  success: false;
  status: STATUS;
  type: TYPE;
  title: TITLE;
  instance: string;
  detail: string;
  data: DATA;
};

export type ProblemDetailFactoryProps<DATA = undefined> = {
  detail?: string;
} & (DATA extends undefined ? { data?: undefined } : { data: DATA });

export type ProblemDetailFactory<
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined
> = (
  ...optionalFactoryProps: DATA extends undefined
    ? [factoryProps?: ProblemDetailFactoryProps<DATA>]
    : [factoryProps: ProblemDetailFactoryProps<DATA>]
) => ProblemDetail<STATUS, TYPE, TITLE, DATA>;

export type ProblemDetailFactoryCollection<
  KEY extends string,
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined
> = { [key in KEY]: ProblemDetailFactory<STATUS, TYPE, TITLE, DATA> };

export type InferProblemDetailsFromFactoryCollection<
  COLLECTION_TYPE extends ProblemDetailFactoryCollection<
    any,
    any,
    any,
    any,
    any
  >
> = ReturnType<COLLECTION_TYPE[keyof COLLECTION_TYPE]>;
