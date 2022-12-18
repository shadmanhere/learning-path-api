import express from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
// util
// import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getPaths = catchAsyncErrors(async (req: express.Request, res: express.Response) => {
  const users = await prisma.learningPath.findMany({
    include: {
      Section: {
        include: {
          tutorials: true,
        },
      },
    },
  });
  res.send(users);
});
