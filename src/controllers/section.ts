import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

// Admin

export const getAllSection = catchAsyncErrors(async (req: Request, res: Response) => {
  const resPerPage = 10;
  const pageNumber = (req.query.pageNumber as unknown as number) || 1;
  const totalCount = await prisma.section.count({});
  const categories = await prisma.section.findMany({
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

export const deleteSection = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler('Please enter id', 400));
  }

  const deleteSection = await prisma.section.delete({
    where: {
      id: +id,
    },
  });

  res.status(200).json({
    success: true,
    deleteSection,
  });
});
