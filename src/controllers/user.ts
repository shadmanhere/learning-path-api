import express from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const users = await prisma.user.findMany({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};
