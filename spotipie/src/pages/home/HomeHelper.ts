import { useEffect, useState } from "react"
import { Song } from "../../domain/Song";
import { TopSongResponse } from "./response/TopSongResponse";
import { songListMapper } from "./mapper/SongMapper";
import { HttpPort } from "../../config/HttpPort";

interface HomeHelperProps {
  axiosHttp: HttpPort
}

export function useHomeHelper({ axiosHttp }: HomeHelperProps) {
  const [topSongs, setTopSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const { data } = await axiosHttp.get<TopSongResponse[]>('/top?num=3');
      setTopSongs(songListMapper(data));
    }

    fetchTopSongs();
  }, [])

  return {
    topSongs
  } 
}