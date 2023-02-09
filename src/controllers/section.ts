import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

// Admin
export const addSection = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name, learningPathId } = req.body;
  if (!name) {
    return next(new ErrorHandler('Please enter name', 400));
  }

  const section = await prisma.section.create({
    data: {
      name,
      learningPathId: +learningPathId,
    },
  });

  res.send({
    success: true,
    section,
  });
});

export const updateSection = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name, learningPathId } = req.body;
  if (!name) {
    return next(new ErrorHandler('Please enter name', 400));
  }

  const section = await prisma.section.update({
    where: {
      id: +id,
    },
    data: { name, learningPathId: +learningPathId },
  });

  res.send({
    success: true,
    section,
  });
});
