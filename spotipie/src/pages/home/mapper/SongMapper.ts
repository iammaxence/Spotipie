import { Song } from "../../../domain/Song";
import { TopSongResponse } from "../response/TopSongResponse";

const songMapper = (topSongResponse: TopSongResponse): Song => (Song.of(topSongResponse.artistName, topSongResponse.name, topSongResponse.numberOfListenning))
export const songListMapper = (topSongResponse: TopSongResponse[]): Song[] => topSongResponse.map(songMapper);