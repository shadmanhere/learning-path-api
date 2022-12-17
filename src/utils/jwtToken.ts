import { Response } from 'express';
import jwt from 'jsonwebtoken';
// Create and send token and save in the cookie.
// const token = jwt.sign({ email: user.username, id: user.id }, 'secret', { expiresIn: '1h' });
//   res.status(200).json({ userWithoutPassword, token });
export const sendToken = (
  user: { id: number; email: string; username: string; firstName: string; lastName: string },
  statusCode: number,
  res: Response,
) => {
  // Create Jwt token
  const token = jwt.sign({ email: user.username, id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME || '1h',
  });
  const cookieexpiretime: string = process.env.COOKIE_EXPIRES_TIME || '1';
  // Options for cookie
  const options = {
    expires: new Date(Date.now() + parseInt(cookieexpiretime) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user,
  });
};
