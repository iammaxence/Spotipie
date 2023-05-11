import { Artist } from './Artist';

export class Song {
	constructor(private artists: Artist[], private title: string, private albumName: string, private image: string){}

	public static of(artists: Artist[], title: string, albumName: string, image: string): Song {
		return new Song(artists, title, albumName, image);
	}

	public getTitle(): string {
		return this.title;
	}

	public getArtists(): Artist[] {
		return this.artists;
	}

	public getAlbumName(): string {
		return this.albumName;
	}

	public getImage(): string {
		return this.image;
	}
}