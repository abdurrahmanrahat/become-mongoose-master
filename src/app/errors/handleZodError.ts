import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';

export const handleZodError = (err: ZodError) => {
  const statusCode = 400;

  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
