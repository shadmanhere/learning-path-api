import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const addCategoryToLearningPath = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId, learningPathId } = req.body;
  if (!categoryId) {
    return next(new ErrorHandler('Please enter category id', 400));
  }
  if (!learningPathId) {
    return next(new ErrorHandler('Please enter learning path id', 400));
  }

  const categoryToLearningPath = await prisma.categoryToLearningPath.create({
    data: {
      categoryId: +categoryId,
      learningPathId: +learningPathId,
    },
  });
  res.send({
    success: true,
    categoryToLearningPath,
  });
});

export const updateCategoryToLearningPath = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { categoryId, learningPathId, newCategoryId, newLearningPathId } = req.body;
  if (!categoryId) {
    return next(new ErrorHandler('Please enter category id', 400));
  }
  if (!learningPathId) {
    return next(new ErrorHandler('Please enter learning path id', 400));
  }

  const categoryToLearningPath = await prisma.categoryToLearningPath.update({
    where: {
      categoryId_learningPathId: { categoryId: +categoryId, learningPathId: +learningPathId },
    },
    data: {
      categoryId: +newCategoryId,
      learningPathId: +newLearningPathId,
    },
  });
  res.send({
    success: true,
    categoryToLearningPath,
  });
});
