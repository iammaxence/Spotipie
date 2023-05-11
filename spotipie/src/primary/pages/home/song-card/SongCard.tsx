import React from 'react';
import './SongCard.scss';
import { Artist } from '../../../../domain/Artist';

interface SongCardProps {
  artists: Artist[],
  title: string,
  albumName: string,
}

export function SongCard({ artists, title, albumName }: SongCardProps) {
	return (
		<div className="song-card">
			<img className="song-card--img" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-logo-design-template-6140b09bce93da1f0244afc40640839f_screen.jpg?ts=1566982979" alt="song-card-image"/>
			<div className="song-card--text">
				<span>Title: {title}</span>
				<span>Artist: {artists[0].getName()}</span>
				<span>Album: {albumName}</span>
			</div>
		</div>);
}