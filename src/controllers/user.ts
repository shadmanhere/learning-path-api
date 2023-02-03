import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';
import crypto from 'crypto';

// util
import { sendToken } from '../utils/jwtToken';
import ErrorHandler from '../utils/errorHandler';
import excludeKey from '../utils/excludeKey';

//types
import { CustomRequest } from '../types/customRequest';
import { getResetPasswordToken } from '../utils/cryptoToken';
import { sendEmail } from '../utils/sendEmail';

const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());

export const signin = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  // Checks if email and password is entered by user
  if (!username || !password) {
    return next(new ErrorHandler('Please enter username & password', 400));
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
  if (password !== existingUser.password) return res.status(404).json('Invalid Credentials');
  const existingUserWithoutPassword = excludeKey(existingUser, ['password']);
  sendToken(existingUserWithoutPassword, 200, res);
});

export const signup = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, confirmPassword, firstName, lastName } = req.body;

  // Checks if email, username, password, confirmPassword, firstName and lastName is entered by user
  if (!username) {
    return next(new ErrorHandler('Please enter username', 400));
  } else if (!password) {
    return next(new ErrorHandler('Please enter password', 400));
  } else if (!firstName) {
    return next(new ErrorHandler('Please enter first name', 400));
  } else if (!lastName) {
    return next(new ErrorHandler('Please enter last name', 400));
  }

  if (password !== confirmPassword) next(new ErrorHandler("Passwords don't match", 400));
  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password,
    },
  });
  const userWithoutPassword = excludeKey(user, ['password']);
  sendToken(userWithoutPassword, 200, res);
});

export const getUserProfile = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.id,
    },
  });
  const userWithoutPassword = user ? excludeKey(user, ['password']) : '';
  res.status(200).json({
    success: true,
    user: userWithoutPassword,
  });
});

export const logout = catchAsyncErrors(async (req: CustomRequest, res: Response) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'Logged Out' });
});

export const forgotPassword = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const category = req.header('App-Name');
  if (!email) {
    return next(new ErrorHandler('Please enter email', 400));
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return next(new ErrorHandler('User not found with this email', 404));
  }
  const resetToken = getResetPasswordToken(user);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });

  let frontEndDomain = process.env.FRONT_END_DOMAINS?.split(' ')[0];
  if (category === 'upsc') frontEndDomain = process.env.FRONT_END_DOMAINS?.split(' ')[1];

  const resetUrl = `${frontEndDomain}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Learning Path Password Recovery',
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error: any) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken: null,
        resetPasswordExpire: null,
      },
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

export const getResetPassword = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  // Hash URL token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken,
      resetPasswordExpire: { gte: new Date(Date.now()) },
    },
  });

  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
  sendToken(user, 200, res);
});

export const updatePassword = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const id = req?.user?.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (user?.password !== req.body.oldPassword) return next(new ErrorHandler('Old password is incorrect', 404));
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: req.body.password,
    },
  });
  sendToken(user, 200, res);
});

export const updateProfile = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  const user = await prisma.user.update({
    where: {
      id: req?.user?.id,
    },
    data: {
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    },
  });

  const userWithoutPassword = excludeKey(user, ['password']);

  res.status(200).json({
    success: true,
    user: userWithoutPassword,
  });
});

// Admin Route
export const getUsers = catchAsyncErrors(async (req: Request, res: Response) => {
  const resPerPage = 10;
  const pageNumber = (req.query.pageNumber as unknown as number) || 0;
  const totalCount = await prisma.user.count({});
  const users = await prisma.user.findMany({
    skip: (pageNumber - 1) * resPerPage,
    take: +resPerPage,
  });
  users.forEach((user) => {
    excludeKey(user, ['password']);
  });
  res.status(200).json({
    success: true,
    totalCount,
    resPerPage,
    pageNumber,
    users,
  });
});

export const getUserDetails = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +req.params.id,
    },
  });
  if (!user) {
    return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 404));
  }
  const userWithoutPassword = excludeKey(user, ['password']);

  res.status(200).json({
    success: true,
    userWithoutPassword,
  });
});

export const updateUserDetails = catchAsyncErrors(async (req: Request, res: Response) => {
  const newUserDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
  };

  await prisma.user.update({
    where: {
      id: +req.params.id,
    },
    data: {
      ...newUserDetails,
    },
  });

  res.status(200).json({
    success: true,
  });
});

export const deleteUser = catchAsyncErrors(async (req: Request, res: Response) => {
  await prisma.user.delete({
    where: {
      id: +req.params.id,
    },
  });

  res.status(200).json({
    success: true,
  });
});
