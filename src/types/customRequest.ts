import { Request } from 'express';
import { UserDetails } from './user';

export interface CustomRequest extends Request {
  userDetails?: UserDetails;
}
