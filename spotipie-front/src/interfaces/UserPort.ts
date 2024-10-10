import type { User } from '@/interfaces/User'
import type { Song } from '@/interfaces/Song'

export interface UserPort {
  getUser(token: string): User;
  getSongs(accessToken: string, timeRange: string, limit: number, offset: number): Promise<Song[]>;
}