import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await User.findOne({ id: payload.id });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // checking if the user is already deleted
  const isUserDeleted = isUserExists.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking if the user is already deleted
  const isUserBlocked = isUserExists.status;
  if (isUserBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // checking if the password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExists.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is not match');
  }

  // access granted: send accessToken and refreshToken

  return {};
};

export const AuthServices = {
  loginUser,
};
