import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  // checking if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
  }

  // checking if the user is already deleted
  const isUserDeleted = user.isDeleted;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // checking if the user is already deleted
  const isUserBlocked = user.status;
  if (isUserBlocked === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload.password,
    user.password,
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
