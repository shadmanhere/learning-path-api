import { User } from '@prisma/client';
import crypto from 'crypto';

export const getResetPasswordToken = (user: User) => {
  const resetToken = crypto.randomBytes(20).toString('hex');

  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordExpire = new Date(Date.now() + 30 * 30 * 1000);

  return resetToken;
};
