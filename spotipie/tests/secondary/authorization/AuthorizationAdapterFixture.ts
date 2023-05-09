import { vi } from 'vitest';
import { AuthorizationPort } from '../../../src/domain/AuthorizationPort';

export const AuthorizationAdapterFixture = (options: Partial<AuthorizationPort> = {}): AuthorizationPort => {
	const authorizationAdapterMock = {
		getAuthorizationCode: vi.fn(),
		getToken: vi.fn(),
		...options
	};
	return authorizationAdapterMock;
};