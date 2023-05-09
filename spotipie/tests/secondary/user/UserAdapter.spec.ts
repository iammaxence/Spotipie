import { describe, vi } from 'vitest';
import { UserAdapter } from '../../../src/secondary/user/UserAdapter';
import { User } from '../../../src/domain/User';
import { AxiosHttpFixture } from '../http/AxiosHttpFixture';

const axiosHttp = AxiosHttpFixture({
	get: vi.fn(() => Promise.resolve({
		data: {
			email: 'user@email.com',
			pseudo: 'username',
			country: 'fr',
			images: []
		},
		status: 200,
		statusText: 'OK',
		headers: {},
		config: {},
	})) as any,
});

const userAdapter = new UserAdapter(axiosHttp);

describe('UserAdapter', () => {
	it('Should get user data', async () => {
		const response = await userAdapter.getUserProfile('fake_token');

		expect(response).toEqual(User.of('user@email.com', 'username', 'fr', 'fake_token'));
	});
});