import { Token } from './Token';

export interface AuthorizationPort {
  getAuthorizationCode(): Promise<string>
  getToken(code: string, state: string): Promise<Token>
}