import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const errorHandler = (err: ErrorHandler | Prisma.PrismaClientKnownRequestError | any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.error(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };

    error.message = err.message;

    if (err.meta.target === 'User_username_key') {
      const message = 'Username already exists';
      error = new ErrorHandler(message, 400);
    }

    if (err.meta.target === 'User_email_key') {
      const message = 'Email already exists';
      error = new ErrorHandler(message, 400);
    }

    // Handling Expired JWT error
    if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token is expired. Try Again!!!';
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
