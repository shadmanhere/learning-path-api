import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

// Admin
export const addCategory = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler('Please enter category name', 400));
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  res.send({
    success: true,
    category,
  });
});

export const updateCategory = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.body;
  if (!name) {
    return next(new ErrorHandler('Please enter category name', 400));
  }

  const category = await prisma.category.update({
    where: {
      id: +id,
    },
    data: {
      name,
    },
  });
  res.send({
    success: true,
    category,
  });
});
