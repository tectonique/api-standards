import { ProblemDetail } from "./types";

export class ProblemDetailClazz<
  STATUS extends number,
  TYPE extends string,
  TITLE extends string,
  DATA = undefined
> implements ProblemDetail<STATUS, TYPE, TITLE, DATA>
{
  success: false;
  status: STATUS;
  type: TYPE;
  title: TITLE;
  instance: string;
  detail: string;
  data: DATA;

  constructor(
    status: STATUS,
    type: TYPE,
    title: TITLE,
    instance: string,
    detail: string,
    data: DATA
  ) {
    this.success = false;
    this.status = status;
    this.type = type;
    this.title = title;
    this.instance = instance;
    this.detail = detail;
    this.data = data;
  }
}

export function isProblemDetail(data: unknown) {
  return data instanceof ProblemDetailClazz;
}
