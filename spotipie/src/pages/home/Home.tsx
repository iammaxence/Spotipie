import { HttpPort } from '../../config/HttpPort';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';

interface HomeProps {
  axiosHttp: HttpPort
}


export function Home({ axiosHttp }: HomeProps) {

  const { topSongs } = useHomeHelper({ axiosHttp });

  return (
    <div className="home">
      <h1> Top 3 listening</h1>
      {topSongs.map((song) => (<li key={song.getTitle()}>
        <span>{song.getArtistName()}</span>
      </li>))}
    </div>)
}