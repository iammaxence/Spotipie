import { HttpHelper } from '@/adapter/HttpHelper'
import type { UserPort } from '@/interfaces/UserPort'
import type { User } from '@/interfaces/User'
import type { Song } from '@/interfaces/Song'

export class UserAdapter implements UserPort {
  private userAuthStore;
  private BASE_URL = import.meta.env.VITE_SERVER_URL + '/user'

  constructor(private userAuthStore) {
    this.userAuthStore = userAuthStore;
  }

  async getUser(token: string): Promise<User> {
    const params =  'token='+token

    const user: User = await (await HttpHelper.get(this.BASE_URL, params)).json();
    await this.userAuthStore.setUser(user)

    return user;
  }

  async getSongs(accessToken: string, timeRange: string, limit: number, offset: number): Promise<Song[]> {
    const url = this.BASE_URL + '/top';
    const params = `timeRange=${timeRange}&numberOfItems=${limit}&offset=${offset}`
    const headers = [{
      'Authorization': `Bearer ${accessToken}`
    }]

    return (await HttpHelper.get(url, params, headers)).json()
  }
}