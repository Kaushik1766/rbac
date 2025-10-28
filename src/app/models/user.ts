export interface User {
  email: string;
  password: string;
  name: string;
  role: Role
}

export enum Role {
  Admin,
  Manager,
  User
}
