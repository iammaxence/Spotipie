import React from 'react';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';
import { SongCard } from './song-card/SongCard';
import { Select } from './select/Select';
import { UserPort } from '../../../domain/UserPort';

interface HomeProps {
  userAdapter: UserPort
}

export function Home({ userAdapter }: HomeProps) {

	const { topSongs, selectOptions, setSelectedOptions } = useHomeHelper({ userAdapter });

	return (
		<div className="home">
			<h1 className='home--title'> Top 10 listening </h1>
			<Select selection={setSelectedOptions} options={selectOptions}/>
			<div className="home--songs" >
				{topSongs.map((song) => (
					<SongCard
						key={song.getTitle()}
						artists={song.getArtists()}
						title={song.getTitle()}
						albumName={song.getAlbumName()}
						urlImage={song.getImage()}
					/>))
				}
			</div>
		</div>
	);
}