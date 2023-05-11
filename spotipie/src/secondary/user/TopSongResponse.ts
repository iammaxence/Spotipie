import { Artist } from '../../domain/Artist';
import { Song } from '../../domain/Song';

export interface TopSongResponse {
  artists: ArtistResponse[]
  title: string,
  albumName: string,
  urlImages: ImageResponse[]
}

interface ArtistResponse {
  name: string
}

interface ImageResponse {
  url: string
}

const toArtist = (artistResponse: ArtistResponse): Artist => Artist.of(artistResponse.name); 
const toArtistList = (artistResponseList: ArtistResponse[]): Artist[] => artistResponseList.map(toArtist); 

const toSong = (topSongResponse: TopSongResponse): Song => Song.of(
	toArtistList(topSongResponse.artists),
	topSongResponse.title,
	topSongResponse.albumName,
	topSongResponse.urlImages[0].url
);

export const toSongList = (topSongResponse: TopSongResponse[]): Song[] => topSongResponse.map(toSong);