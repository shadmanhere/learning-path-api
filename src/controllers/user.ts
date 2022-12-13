import express from 'express';
import jwt from 'jsonwebtoken';

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

export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signin = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
    if (password !== existingUser.password) return res.status(404).json('Invalid Credentials');
    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'secret', { expiresIn: '1h' });
    const existingUserWithoutPassword = exclude(existingUser, ['password']);
    res.status(200).json({ result: existingUserWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password, confirmPassword, name } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUser) return res.status(400).json({ message: 'User already exist' });
    if (password !== confirmPassword) res.status(400).json({ message: "Passwords don't match" });
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
        name: name,
      },
    });
    const userWithoutPassword = exclude(user, ['password']);
    const token = await jwt.sign({ email: user.username, id: user.id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ userWithoutPassword, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
