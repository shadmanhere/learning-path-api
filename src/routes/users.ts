import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    res.send(users);
  } catch (err) {
    next(err);
  }
});

export default router;
