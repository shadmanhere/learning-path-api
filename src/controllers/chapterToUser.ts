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

// Admin
export const updateChapterToUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { chapterId, userId, newUserId, newChapterId } = req.body;
  if (!chapterId) {
    return next(new ErrorHandler('Please enter chapter id', 400));
  }
  if (!userId) {
    return next(new ErrorHandler('Please enter user id', 400));
  }

  const updatedChapterToUser = await prisma.chapterToUser.update({
    where: {
      chapterId_userId: {
        chapterId: +chapterId,
        userId: +userId,
      },
    },
    data: {
      chapterId: +newUserId,
      userId: +newChapterId,
    },
  });
  res.send({
    success: true,
    updatedChapterToUser,
  });
});
