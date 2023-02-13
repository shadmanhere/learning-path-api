import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

// Admin
export const getCategory = catchAsyncErrors(async (req: Request, res: Response) => {
  const resPerPage = 10;
  const pageNumber = (req.query.pageNumber as unknown as number) || 1;
  const totalCount = await prisma.category.count({});
  const categories = await prisma.category.findMany({
    skip: (pageNumber - 1) * resPerPage,
    take: +resPerPage,
  });
  res.status(200).json({
    success: true,
    totalCount,
    resPerPage,
    pageNumber,
    categories,
  });
});

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

export const deleteCategory = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler('Please enter id', 400));
  }

  const deleteCategory = await prisma.category.delete({
    where: {
      id: +id,
    },
  });

  res.status(200).json({
    success: true,
    deleteCategory,
  });
});
