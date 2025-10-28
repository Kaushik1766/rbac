import { Role, User } from "../models/user";

export let MockUsers: User[] = [
  {
    email: 'kaushik@a.com',
    name: 'kaushik',
    password: '123',
    role: Role.User
  },
  {
    email: 'admin@a.com',
    name: 'admin',
    password: '123',
    role: Role.Admin
  },
  {
    email: 'manager@a.com',
    name: 'manager',
    password: '123',
    role: Role.Manager
  }
]

export function updateMockUsers(users: User[]) {
  MockUsers = users
}
