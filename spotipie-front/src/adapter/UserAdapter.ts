import { HttpHelper } from '@/adapter/HttpHelper'
import type { UserPort } from '@/interfaces/UserPort'
import type { User } from '@/interfaces/User'

export class UserAdapter implements UserPort {
  private userAuthStore;

  constructor(private userAuthStore) {
    this.userAuthStore = userAuthStore;
  }

  async getUser(token: string): Promise<User> {
    const url = import.meta.env.VITE_SERVER_URL + '/user'
    const params =  'token='+token

    const user: User = await (await HttpHelper.get(url, params)).json();
    await this.userAuthStore.setUser(user)

    return user;
  }
}