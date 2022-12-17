import { Request, Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
// util
import ErrorHandler from '../utils/errorHandler';

const prisma = new PrismaClient();

import { User } from '../types/user';
// to make the file a module and avoid the TypeScript error
export {};

export interface CustomRequest extends Request {
  user?: User;
}

// check whether user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.user = user as any;
  next();
});
