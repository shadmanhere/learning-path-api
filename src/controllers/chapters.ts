import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getChapters = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const resPerPage = 10;
  const pageNumber = (req.query.pageNumber as unknown as number) || 1;
  const tutorialId = req.query.tutorialId;

  if (!tutorialId) {
    return next(new ErrorHandler('Please enter category tutorial id', 400));
  }

  const totalCount = await prisma.chapter.count({});
  const chapters = await prisma.chapter.findMany({
    skip: (pageNumber - 1) * resPerPage,
    take: +resPerPage,
    where: {
      tutorialId: +tutorialId,
    },
  });
  res.status(200).json({
    success: true,
    totalCount,
    resPerPage,
    pageNumber,
    chapters,
  });
});

// Admin
export const addChapter = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { title, url, imageUrl, tutorialId } = req.body;
  if (!title) {
    return next(new ErrorHandler('Please enter category title', 400));
  } else if (!url) {
    return next(new ErrorHandler('Please enter category url', 400));
  } else if (!imageUrl) {
    return next(new ErrorHandler('Please enter category image url', 400));
  } else if (!tutorialId) {
    return next(new ErrorHandler('Please enter category tutorial id', 400));
  }

  const chapter = await prisma.chapter.create({
    data: {
      title,
      url,
      imageUrl,
      tutorialId,
    },
  });
  res.send({
    success: true,
    chapter,
  });
});

export const updateChapter = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id, title, url, imageUrl, tutorialId } = req.body;

  const chapter = await prisma.chapter.update({
    where: {
      id: +id,
    },
    data: {
      title,
      url,
      imageUrl,
      tutorialId,
    },
  });
  res.status(200).json({ success: true, chapter });
});

export const deleteChapter = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler('Please enter id', 400));
  }

  const deletedChapter = await prisma.chapter.delete({
    where: {
      id: +id,
    },
  });

  res.status(200).json({ success: true, deletedChapter });
});
