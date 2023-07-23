import { describe, expect } from 'vitest';
import { Song } from '../../src/domain/Song';
import { Artist } from '../../src/domain/Artist';

describe('Song', () => {
	it('Should get artists of a Song', () => {
		const artists = [Artist.of('artistName')];
		const song = Song.of(artists, 'titleName', 'albumName', 'image');

		expect(song.getArtists()).toEqual(artists);
	});

	it('Should get title of a Song', () => {
		const title= 'titleName';
		const song = Song.of([Artist.of('artistName')], title, 'albumName', 'image');

		expect(song.getTitle()).toEqual(title);
	});

	it('Should get album name', () => {
		const albumName= 'albumName';
		const song = Song.of([Artist.of('artistName')], 'titleName', albumName, 'image');

		expect(song.getAlbumName()).toEqual(albumName);
	});

	it('Should get image', () => {
		const image_url = 'image';
		const song = Song.of([Artist.of('artistName')], 'titleName', 'albumName', image_url);

		expect(song.getImage()).toEqual(image_url);
	});
});