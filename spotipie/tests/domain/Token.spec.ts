import { expect } from 'vitest';
import { Token } from '../../src/domain/Token';

describe('Token', () => {
	const token = Token.of('access_token', 'refresh_token', 3600);

	it('returns the correct access token', () => {
		expect(token.getAccessToken()).toEqual('access_token');
	});
});