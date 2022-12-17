import express from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';

// util
import { sendToken } from '../utils/jwtToken';
import ErrorHandler from '../utils/errorHandler';
import excludeKey from '../utils/excludeKey';

const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());

export const getUsers = catchAsyncErrors(async (req: express.Request, res: express.Response) => {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });
  res.send(users);
});

export const signin = catchAsyncErrors(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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

export const signup = catchAsyncErrors(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
