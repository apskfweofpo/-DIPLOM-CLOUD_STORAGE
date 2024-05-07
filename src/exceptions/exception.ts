import { LogicExceptionList } from './types/logic-exceptions.enum';

type LogicExceptionBody = {
  httpStatusCode: number;
  message: string;
};

type LogicExceptionType = {
  [key in LogicExceptionList]: LogicExceptionBody;
};

export const Exceptions: LogicExceptionType = {
  [LogicExceptionList.UserNotFound]: {
    httpStatusCode: 404,
    message: 'User не найден.',
  },

  [LogicExceptionList.RoleNotFound]: {
    httpStatusCode: 404,
    message: 'Role не найден.',
  },
};
