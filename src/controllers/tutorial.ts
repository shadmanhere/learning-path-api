import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';

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
  });
  res.send({ success: true, tutorial });
});

// Admin
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
