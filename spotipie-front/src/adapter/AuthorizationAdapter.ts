import type { Token } from '@/interfaces/Token'
import { HttpHelper } from '@/adapter/HttpHelper'
import type { AuthorizationPort } from '@/interfaces/AuthorizationPort'

export class AuthorizationAdapter implements AuthorizationPort {
  private userAuthStore;

  constructor(private userAuthStore) {
    this.userAuthStore = userAuthStore;
  }

  async getAuthorizationCode(): Promise<string> {
    const url = import.meta.env.VITE_SERVER_URL + '/login'
    const body = {
      clientId: import.meta.env.VITE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_REDIRECT_URI,
      show_dialog: true
    }

    return (await HttpHelper.post(url, body)).text();
  }

  async getToken(code: string, state: string): Promise<Token> {
    const url = import.meta.env.VITE_SERVER_URL + '/token'
    const body = {
      code,
      state,
      clientId: import.meta.env.VITE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_REDIRECT_URI,
      show_dialog: true
    }

    const token: Token = await (await HttpHelper.post(url, body)).json();
    await this.userAuthStore.setAccessToken(token.accessToken);

    return token;
  }
}
