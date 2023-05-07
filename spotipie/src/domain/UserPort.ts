import { User } from './User';

export interface UserPort {
  getUserProfile(access_token: string): Promise<User>;
}