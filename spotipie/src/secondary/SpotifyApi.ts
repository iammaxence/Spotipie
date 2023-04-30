import { AxiosResponse } from 'axios';
import { HttpPort } from '../config/HttpPort';
import querystring from 'querystring';


interface AuthorizationResponse {
  code: string,
  state: string
}

interface AccessTokenResponse {
  access_token: string,
  refresh_token: string
}

export class SpotifyApi {
	redirect_uri = '';
	client_id = '1d41a7bc4b7e491eb7951830ba5d4756';
	client_secret = '9bed6b3894264f76bd63dff22d0b89a8';
	authorization_code= '';

	constructor(private axiosHttp: HttpPort){}

	public async getAuthorization(): Promise<void> {

		const state = this.generateRandomString(16);
		const scope = 'user-read-private user-read-email';

		const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(this.redirect_uri)}&state=${state}`;

		const response = await this.axiosHttp.get<AuthorizationResponse>(authUrl);
		this.authorization_code = response.data.code;
	}

	public async getToken(): Promise<AccessTokenResponse> {
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			method: 'POST',
			data: querystring.stringify({
				code: this.authorization_code,
				redirect_uri: this.redirect_uri,
				grant_type: 'authorization_code',
			}),
			headers: {
				Authorization: `Basic ${Buffer.from(
					`${this.client_id}:${this.client_secret}`
				).toString('base64')}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		const response: AxiosResponse = await this.axiosHttp.post(authOptions.url, authOptions);
		const access_token = response.data.access_token;
		const refresh_token = response.data.refresh_token;
		return { access_token, refresh_token };
	}

	private generateRandomString(length: number): string {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	}
}