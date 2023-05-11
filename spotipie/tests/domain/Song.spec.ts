import { describe, expect } from 'vitest';
import { Song } from '../../src/domain/Song';

describe('Song', () => {
	// it('Should throw exception if artistName of Song is missing', () => {
	// 	expect(() => Song.of('', 'title', 10)).toThrow('Song attribut is missing');
	// });

	// it('Should throw exception if title of Song is missing', () => {
	// 	expect(() => Song.of('artistName', '', 10)).toThrow('Song attribut is missing');
	// });

	// it('Should get artistName of a Song', () => {
	// 	const artistName= 'The Arstist';
	// 	const title= 'the song title';
	// 	const numberOfListening = 10;

	// 	expect(Song.of(artistName, title, numberOfListening).getArtistName()).toEqual(artistName);
	// });

	// it('Should get title of a Song', () => {
	// 	const artistName= 'The Arstist';
	// 	const title= 'the song title';
	// 	const numberOfListening = 10;

	// 	expect(Song.of(artistName, title, numberOfListening).getTitle()).toEqual(title);
	// });

	// it('Should get number of listenning of a Song', () => {
	// 	const artistName= 'The Arstist';
	// 	const title= 'the song title';
	// 	const numberOfListening = 10;

	// 	expect(Song.of(artistName, title, numberOfListening).getNumberOfListenning()).toEqual(numberOfListening);
	// });
});