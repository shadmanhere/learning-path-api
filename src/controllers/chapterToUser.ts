import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const addChapterToUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { chapterId, userId } = req.body;
  if (!chapterId) {
    return next(new ErrorHandler('Please enter chapter id', 400));
  }
  if (!userId) {
    return next(new ErrorHandler('Please enter userId id', 400));
  }

  const chapterToUser = await prisma.chapterToUser.create({
    data: {
      chapterId: +chapterId,
      userId: +userId,
    },
  });
  res.send({
    success: true,
    chapterToUser,
  });
});
