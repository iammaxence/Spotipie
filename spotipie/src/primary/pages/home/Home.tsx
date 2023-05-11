import React from 'react';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';
import { HttpPort } from '../../../domain/HttpPort';
import { SongCard } from './song-card/SongCard';
import { Select } from './select/Select';

interface HomeProps {
  axiosHttp: HttpPort
}

export function Home({ axiosHttp }: HomeProps) {

	const { topSongs, selectOptions, setSelectedOptions } = useHomeHelper({ axiosHttp });

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
					/>))
				}
			</div>
		</div>
	);
}