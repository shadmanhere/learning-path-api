import express from 'express';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
import { fieldEncryptionMiddleware } from 'prisma-field-encryption';

const prisma = new PrismaClient();
prisma.$use(fieldEncryptionMiddleware());

export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({});
    res.send(users);
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
    const token = await jwt.sign({ email: user.username, id: user.id }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
