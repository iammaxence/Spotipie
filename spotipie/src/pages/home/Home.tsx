import './Home.scss';
import { useHomeHelper } from './HomeHelper';

export function Home() {

  const { topSongs } = useHomeHelper();

  return (
    <div className="home">
      <h1> Top 3 listening</h1>
      {topSongs.map((song) => (<li key={song.getTitle()}>
        <span>{song.getArtistName()}</span>
      </li>))}
    </div>)
}