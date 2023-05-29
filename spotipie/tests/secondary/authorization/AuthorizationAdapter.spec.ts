import { describe, expect, it, vi } from 'vitest';
import { AxiosHttpFixture } from '../http/AxiosHttpFixture';
import { AuthorizationAdapter } from '../../../src/secondary/authorization/AuthorizationAdapter';

const axiosHttp = AxiosHttpFixture({
	post: vi.fn(() => Promise.resolve({
		data: {
			accessToken: 'fake_access_token',
			refreshToken: 'fake_refresh_token',
			expiresIn: 10
		},
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
	})) as any,
});

const authorizationAdapter = new AuthorizationAdapter(axiosHttp);

describe('AuthorizationAdapter', () => {
	it('Should call login endpoint to get authorization code', async () => {
		vi.spyOn(axiosHttp, 'post');

		await authorizationAdapter.getAuthorizationCode();

		expect(axiosHttp.post).toHaveBeenCalledWith('/login', {
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			redirectUri: 'http://localhost:1420/login',
		});
	});

	it('Should call token endpoint to get token', async () => {
		vi.spyOn(axiosHttp, 'post');

		await authorizationAdapter.getToken('fake_code', 'fake_state');

		expect(axiosHttp.post).toHaveBeenCalledWith('/token', {
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			code: 'fake_code',
			redirectUri: 'http://localhost:1420/login',
			show_dialog: true,
			state: 'fake_state'
		});
	});

	it('Should call token endpoint to get token', () => {
		vi.spyOn(axiosHttp, 'post').mockImplementationOnce(vi.fn(() => Promise.resolve({
			data: {
				accessToken: 'fake_access_token',
				refreshToken: 'fake_refresh_token',
				expiresIn: 10
			},
			status: 400,
			statusText: 'OK',
			headers: {},
			config: {},
		})) as any);
  
		expect(authorizationAdapter.getToken('fake_code', 'fake_state')).rejects.toThrowError();
	});
});