import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getChapters = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const resPerPage = 10;
  const pageNumber = (req.query.pageNumber as unknown as number) || 1;
  const totalCount = await prisma.chapter.count({});
  const chapters = await prisma.chapter.findMany({
    skip: (pageNumber - 1) * resPerPage,
    take: +resPerPage,
  });
  res.status(200).json({
    success: true,
    totalCount,
    resPerPage,
    pageNumber,
    chapters,
  });
});
