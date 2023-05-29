import { Artist } from './../../src/domain/Artist';
import { describe, it } from 'vitest';

describe('Artists', () => {
	const artist = Artist.of('artistName');

	it('returns the correct name', () => {
		expect(artist.getName()).toEqual('artistName');
	});
});