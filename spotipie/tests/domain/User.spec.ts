import { expect } from 'vitest';
import { User } from '../../src/domain/User';

describe('User', () => {
	const user = User.of('test@example.com', 'Test User', 'USA', 'access_token');

	it('returns the correct name', () => {
		expect(user.getName()).toEqual('Test User');
	});

	it('returns the correct email', () => {
		expect(user.getEmail()).toEqual('test@example.com');
	});
});