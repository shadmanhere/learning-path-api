import { Response, NextFunction } from 'express';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
// util
import ErrorHandler from '../utils/errorHandler';
import excludeKey from '../utils/excludeKey';

const prisma = new PrismaClient();

//types
import { Role } from '../types/user';
import { CustomRequest } from '../types/customRequest';
// to make the file a module and avoid the TypeScript error
export {};

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
  const newUser = excludeKey(user, ['password'] as never);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.userDetails = newUser as any;
  next();
});

// Handling users roles
export const authorizeRoles = (...roles: (Role | undefined)[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.userDetails?.role)) {
      return next(new ErrorHandler(`Role (${req?.userDetails?.role}) is not allowed to acccess this resource`, 403));
    }
    next();
  };
};
