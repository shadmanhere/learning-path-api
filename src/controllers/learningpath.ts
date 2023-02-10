import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
import capitalize from '../utils/capitalize';
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getPaths = catchAsyncErrors(async (req: Request, res: Response) => {
  const category = req.header('App-Name');
  const learningPaths = await prisma.learningPath.findMany({
    where: {
      CategoryToLearningPath: {
        some: { Category: { name: category } },
      },
    },
  });
  res.send({ success: true, learningPaths });
});

export const getPath = catchAsyncErrors(async (req: Request, res: Response) => {
  const category = req.header('App-Name');
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
      CategoryToLearningPath: {
        some: { Category: { name: category } },
      },
    },
    include: {
      Section: {
        include: {
          SectionToTutorial: {
            include: {
              Tutorial: true,
            },
          },
        },
      },
    },
  });
  res.send({
    success: true,
    learningPath,
  });
});

// Admin
export const addPath = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorHandler('Please enter learning path name', 400));
  }

  const learningPath = await prisma.learningPath.create({
    data: {
      name,
    },
  });
  res.send({
    success: true,
    learningPath,
  });
});

export const updatePath = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id, name } = req.body;
  if (!name) {
    return next(new ErrorHandler('Please enter learning path name', 400));
  }

  const learningPath = await prisma.learningPath.update({
    where: {
      id: +id,
    },
    data: {
      name,
    },
  });
  res.send({
    success: true,
    learningPath,
  });
});
