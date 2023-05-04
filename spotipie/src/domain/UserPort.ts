import { User } from './User';

export interface UserPort {
  getUserProfile(): Promise<User>;
}