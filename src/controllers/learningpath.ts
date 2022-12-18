import express, { Request, Response } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import capitalize from '../utils/capitalize';
// import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getPaths = catchAsyncErrors(async (req: Request, res: Response) => {
  const learningPaths = await prisma.learningPath.findMany({});
  res.send(learningPaths);
});

export const getPath = catchAsyncErrors(async (req: Request, res: Response) => {
  const pathName = req.params.pathname.split('-').join(' ');
  const pathNameCapitalized = pathName
    .split(' ')
    .map((word) => {
      return capitalize(word);
    })
    .join(' ');
  const learningPath = await prisma.learningPath.findMany({
    where: {
      name: pathNameCapitalized,
    },
    include: {
      Section: {
        include: {
          tutorials: true,
        },
      },
    },
  });
  res.send(learningPath);
});
