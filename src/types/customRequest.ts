import { Request } from 'express';
import { User } from './user';

export interface CustomRequest extends Request {
  user?: User;
}
