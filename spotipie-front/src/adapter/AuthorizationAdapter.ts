import type { Token } from '@/interfaces/Token'
import { HttpHelper } from '@/adapter/HttpHelper'
import type { AuthorizationPort } from '@/interfaces/AuthorizationPort'

export class AuthorizationAdapter implements AuthorizationPort {
  async getAuthorizationCode(): Promise<string> {
    const url = import.meta.env.VITE_SERVER_URL + '/login'
    const body = {
      clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
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

    return (await HttpHelper.post(url, body)).json();
  }
}
