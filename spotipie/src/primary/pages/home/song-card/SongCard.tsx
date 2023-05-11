import React from 'react';
import './SongCard.scss';
import { Artist } from '../../../../domain/Artist';

interface SongCardProps {
  artists: Artist[],
  title: string,
  albumName: string,
	urlImage: string,
}

export function SongCard({ artists, title, albumName, urlImage }: SongCardProps) {
	return (
		<div className="song-card">
			<img className="song-card--img" src={urlImage} alt="song-card-image"/>
			<div className="song-card--text">
				<span>Title: {title}</span>
				<span>Artist: {artists[0].getName()}</span>
				<span>Album: {albumName}</span>
			</div>
		</div>);
}