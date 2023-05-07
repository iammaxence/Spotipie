import { User } from '../../domain/User';

export interface UserResponse {
  email: string,
  pseudo: string,
  country: string,
  images: string[]
}

export const toUser = ({ email, country, pseudo }: UserResponse, token: string): User => User.of(email, pseudo, country, token);