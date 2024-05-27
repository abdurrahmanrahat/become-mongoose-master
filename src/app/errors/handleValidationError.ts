import mongoose from 'mongoose';
import { TErrorSource } from '../interface/error';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = 400;

  const errorSources: TErrorSource = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};
