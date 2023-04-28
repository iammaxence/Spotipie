import './SongCard.scss';

interface SongCardProps {
  artistName: string,
  title: string,
  numberOfListenning: number,
}

export function SongCard({artistName, title, numberOfListenning}: SongCardProps) {
  return (
  <div className="song-card">
    <img className="song-card--img" src="https://www.aquaportail.com/pictures1609/cosmos-bipinnatus-fleur-mauve.jpg" alt="song-card-image"/>
    <div className="song-card--text">
      <span>{title}</span>
      <span>{artistName}</span>
      <span>{numberOfListenning}</span>
    </div>
  </div>)
}