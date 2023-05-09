import { vi } from 'vitest';
import { UserPort } from '../../../src/domain/UserPort';

export const UserAdapterFixture = (options: Partial<UserPort> = {}): UserPort => {
	const userAdapterMock = {
		getUserProfile: vi.fn(),
		...options
	};
	return userAdapterMock;
};