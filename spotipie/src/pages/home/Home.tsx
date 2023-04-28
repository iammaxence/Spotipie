import { HttpPort } from '../../config/HttpPort';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';
import { SongCard } from './song-card/SongCard';

interface HomeProps {
  axiosHttp: HttpPort
}


export function Home({ axiosHttp }: HomeProps) {

  const { topSongs } = useHomeHelper({ axiosHttp });

  return (
    <div className="home">
      <h1> Top 3 listening</h1>
      <div className="home--songs" >
        {topSongs.map((song) => (
          <SongCard
            key={song.getTitle()}
            artistName={song.getArtistName()}
            title={song.getTitle()}
            numberOfListenning={song.getNumberOfListenning()}
          />))
        }
      </div>
    </div>)
}