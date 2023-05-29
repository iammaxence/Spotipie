/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';
import { SongCard } from './song-card/SongCard';
import { Select } from './select/Select';
import { UserPort } from '../../../domain/UserPort';
import { NotFoundError } from '../error/NotFoundError';
import { Loading } from '../loading/Loading';

interface HomeProps {
  userAdapter: UserPort
}

export function Home({ userAdapter }: HomeProps) {

	const { user, topSongs, selectOptions, setSelectedOptions, hasError, isSongsLoading } = useHomeHelper({ userAdapter });

	function displaySongCards() {
		if(isSongsLoading) {
			return <Loading/>;
		}

		return <div className="home--songs">
			{
				topSongs.map((song, index) => (
					<SongCard
						key={song.getTitle()}
						position={index+1}
						artists={song.getArtists()}
						title={song.getTitle()}
						albumName={song.getAlbumName()}
						urlImage={song.getImage()}
					/>
				))
			}
		</div>; 
	}

	function displayHomePage() {
		if(hasError) {
			return (<NotFoundError />);
		}

		return (
			<>
				<span className='home--title'> Discover <span className="home--username">{user?.getName()}</span>'s Musical Journey: Unveiling the Most Played Tracks and Artists on Spotify </span>
				<Select selection={setSelectedOptions} options={selectOptions}/>
				{displaySongCards()}
			</>
		);
	}

	return (
		<div className="home">
			{displayHomePage()}
		</div>
	);
}