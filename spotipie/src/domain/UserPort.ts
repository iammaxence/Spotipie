import { Song } from './Song';
import { User } from './User';

export interface UserPort {
  getUserProfile(access_token: string): Promise<User>;
  getTopSongs(accessToken:string, timeRange: string, limit: number, offset: number): Promise<Song[]>;
}