import { LogicExceptionList } from './types/logic-exceptions.enum';

export class LogicException extends Error {
  constructor(
    public error: LogicExceptionList,
    public info?: string
  ) {
    super(error);
  }
}
