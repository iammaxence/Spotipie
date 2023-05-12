import { HttpPort } from '../../domain/HttpPort';
import { AuthorizationPort } from '../../domain/AuthorizationPort';
import { Token } from '../../domain/Token';
import { TokenResponse } from '../../primary/pages/home/response/TokenResponse';

export class AuthorizationAdapter implements AuthorizationPort {

	constructor(private axiosHttp: HttpPort){}

	public getAuthorizationCode = async (): Promise<string> => {
		return (await this.axiosHttp.post('/login', {
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			redirectUri: 'http://localhost:1420/login'
		})).data as string;
	};

	public getToken = async (code: string, state: string): Promise<Token> => {
		const response = await this.axiosHttp.post('/token', {
			code,
			state,
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			redirectUri: 'http://localhost:1420/login',
			show_dialog: true
		});

		if(response.status === 200) {
			const tokenResponse: TokenResponse = response.data as TokenResponse;
			return Token.of(tokenResponse.accessToken, tokenResponse.refreshToken, +tokenResponse.expiresIn);
		}

		throw new Error(response.statusText);
	};
}