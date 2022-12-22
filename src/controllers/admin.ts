import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';

//util
import excludeKey from '../utils/excludeKey';
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getUsers = catchAsyncErrors(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({});
  users.forEach((user) => {
    excludeKey(user, ['password']);
  });
  res.status(200).json({
    success: true,
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
