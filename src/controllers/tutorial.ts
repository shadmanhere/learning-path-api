import { Request, Response, NextFunction } from 'express';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';

// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

export const getRandomTutorials = catchAsyncErrors(async (req: Request, res: Response) => {
  const category = req.header('App-Name');
  // const totalTutorials = await prisma.tutorial.count({
  //   where: {
  //     CategoryToTutorial: {
  //       some: { Category: { name: category } },
  //     },
  //   },
  // });
  const randomvalue = Math.floor(Math.random() * 10);
  const tutorials = await prisma.tutorial.findMany({
    where: {
      CategoryToTutorial: {
        some: { Category: { name: category } },
      },
    },
    skip: randomvalue,
    take: 10,
  });
  res.send({
    success: true,
    tutorials,
  });
});

// /api/v1/tutorial/videoId
export const getTutorial = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const videoId = req.params.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const tutorial = await prisma.tutorial.findFirst({
    where: {
      url: videoUrl,
    },
    include: {
      Chapter: true,
    },
  });
  res.send({ success: true, tutorial });
});

// Admin
export const getAllTutorials = catchAsyncErrors(async (req: Request, res: Response) => {
  const resPerPage = 10;
  const pageNumber = (req.query.pageNumber as unknown as number) || 1;
  const totalCount = await prisma.tutorial.count({});
  const tutorials = await prisma.tutorial.findMany({
    skip: (pageNumber - 1) * resPerPage,
    take: +resPerPage,
  });
  res.status(200).json({
    success: true,
    totalCount,
    resPerPage,
    pageNumber,
    tutorials,
  });
});

export const addTutorial = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { title, url, image_url } = req.body;
  const tutorial = await prisma.tutorial.create({
    data: {
      title,
      url,
      imageUrl: image_url,
    },
  });
  res.status(200).json({ success: true, tutorial });
});

export const updateTutorial = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id, title, url, image_url } = req.body;

  const tutorial = await prisma.tutorial.update({
    where: {
      id: +id,
    },
    data: {
      title,
      url,
      imageUrl: image_url,
    },
  });
  res.status(200).json({ success: true, tutorial });
});

export const deleteTutorial = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler('Please enter id', 400));
  }

  const deleteTutorial = await prisma.tutorial.delete({
    where: {
      id: +id,
    },
  });

  res.status(200).json({
    success: true,
    deleteTutorial,
  });
});
