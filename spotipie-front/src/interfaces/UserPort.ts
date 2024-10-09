import type { User } from '@/interfaces/User'

export interface UserPort {
  getUser(token: string): User;
}