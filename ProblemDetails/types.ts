export type ProblemDetail<
  STATUS extends number,
  TYPE extends string,
  PAYLOAD = undefined
> = {
  success: false;
  status: STATUS;
  type: TYPE;
  title: string;
  instance: string;
  detail: string;
} & (PAYLOAD extends undefined
  ? { payload?: undefined }
  : { payload: PAYLOAD });

export type ProblemDetailFactoryProps<PAYLOAD = undefined> = {
  detail?: string;
} & (PAYLOAD extends undefined
  ? { payload?: undefined }
  : { payload: PAYLOAD });

export type ProblemDetailFactory<
  STATUS extends number,
  TYPE extends string,
  PAYLOAD = undefined,
  GENERATOR_PROPS extends unknown[] = PAYLOAD extends undefined
    ? [factoryProps?: ProblemDetailFactoryProps<PAYLOAD>]
    : [factoryProps: ProblemDetailFactoryProps<PAYLOAD>]
> = (
  ...optionalFactoryProps: GENERATOR_PROPS
) => ProblemDetail<STATUS, TYPE, PAYLOAD>;

export type ProblemDetailFactoryCollection<
  KEY extends string,
  STATUS extends number,
  TYPE extends string,
  PAYLOAD = undefined,
  GENERATOR_PROPS extends unknown[] = PAYLOAD extends undefined
    ? [factoryProps?: ProblemDetailFactoryProps<PAYLOAD>]
    : [factoryProps: ProblemDetailFactoryProps<PAYLOAD>]
> = {
  [key in KEY]: ProblemDetailFactory<STATUS, TYPE, PAYLOAD, GENERATOR_PROPS>;
};

export type InferProblemDetailsFromFactoryCollection<
  COLLECTION_TYPE extends ProblemDetailFactoryCollection<
    any,
    any,
    any,
    any,
    any
  >
> = ReturnType<COLLECTION_TYPE[keyof COLLECTION_TYPE]>;
