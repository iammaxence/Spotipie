import React from 'react';
import './SongCard.scss';
import { Artist } from '../../../../domain/Artist';

interface SongCardProps {
  artists: Artist[],
  title: string,
  albumName: string,
	urlImage: string,
	position: number
}

export function SongCard({ artists, title, albumName, urlImage, position }: SongCardProps) {
	return (
		<div className="song-card">
			<span className="song-card--position">{position}</span>
			<img className="song-card--img" src={urlImage} alt="song-card-image"/>
			<div className="song-card--text">
				<span className='song-card--text--max-length'>Title: {title}</span>
				<span className='song-card--text--max-length'>Artist: {artists[0].getName()}</span>
				<span className='song-card--text--max-length'>Album: {albumName}</span>
			</div>
		</div>);
}