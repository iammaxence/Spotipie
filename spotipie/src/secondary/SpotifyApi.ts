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
	redirect_uri = 'http://localhost:1420/home';
	client_id = '1d41a7bc4b7e491eb7951830ba5d4756';
	client_secret = '9bed6b3894264f76bd63dff22d0b89a8';

	constructor(private axiosHttp: HttpPort){}

	public async getToken(authorization_code: string): Promise<AccessTokenResponse> {
		const authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			method: 'POST',
			data: querystring.stringify({
				code: authorization_code,
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
}