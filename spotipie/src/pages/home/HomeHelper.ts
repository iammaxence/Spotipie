import { useEffect, useState } from "react"
import { Song } from "../../domain/Song";
import { AxiosHttp } from "../../config/AxiosHttp";
import axios from "axios";
import { TopSongResponse } from "./response/TopSongResponse";
import { songListMapper } from "./mapper/SongMapper";

export function useHomeHelper() {
  const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }))

  const [topSongs, setTopSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchTopSongs = async () => {
      const { data } = await axiosHttp.get<TopSongResponse[]>('/top?num=3');
      setTopSongs(songListMapper(data));
    }

    fetchTopSongs();
  })

  return {
    topSongs
  } 
}