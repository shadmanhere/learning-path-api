export interface User {
  id: number;
  createdAt: Date;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
}

enum Role {
  USER,
  ADMIN,
}
