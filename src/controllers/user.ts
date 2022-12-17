import express from 'express';
import jwt from 'jsonwebtoken';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import { sendToken } from '../utils/jwtToken';
import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';

const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());

// Exclude keys from user
function exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

export const getUsers = catchAsyncErrors(async (req: express.Request, res: express.Response) => {
  // try {
  const users = await prisma.user.findMany({
    select: {
      email: true,
      firstName: true,
      lastName: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });
  res.send(users);
});

export const signin = catchAsyncErrors(async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
  if (password !== existingUser.password) return res.status(404).json('Invalid Credentials');
  const existingUserWithoutPassword = exclude(existingUser, ['password']);
  sendToken(existingUserWithoutPassword, 200, res);
});

export const signup = catchAsyncErrors(async (req: express.Request, res: express.Response) => {
  const { email, username, password, confirmPassword, firstName, lastName } = req.body;
  if (password !== confirmPassword) res.status(400).json({ message: "Passwords don't match" });
  const user = await prisma.user.create({
    data: {
      email,
      username,
      firstName,
      lastName,
      password,
    },
  });
  const userWithoutPassword = exclude(user, ['password']);
  sendToken(userWithoutPassword, 200, res);
});
