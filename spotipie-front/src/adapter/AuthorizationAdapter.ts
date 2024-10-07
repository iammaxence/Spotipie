import type { Token } from '@/interfaces/Token'

export class AuthorizationAdapter {
  async getAuthorizationCode(): Promise<string> {
    const url = process.env.VUE_APP_SERVER_URL + '/login'
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
        redirectUri: 'http://localhost:1420/login'
      })
    })

    return response.json()
  }

  async getToken(code: string, state: string): Promise<Token> {
    const url = process.env.VUE_APP_SERVER_URL + '/token'

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        code,
        state,
        clientId: process.env.VUE_APP_CLIENT_ID,
        redirectUri: process.env.VUE_APP_REDIRECT_URI,
        show_dialog: true
      })
    })

    return response.json()
  }
}
