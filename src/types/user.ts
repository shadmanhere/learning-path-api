export interface User {
  id?: number;
  createdAt?: Date;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: Role;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
