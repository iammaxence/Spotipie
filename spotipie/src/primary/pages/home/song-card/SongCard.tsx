import React from 'react';
import './SongCard.scss';

interface SongCardProps {
  artistName: string,
  title: string,
  numberOfListenning: number,
}

export function SongCard({ artistName, title, numberOfListenning }: SongCardProps) {
	return (
		<div className="song-card">
			<img className="song-card--img" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/music-logo-design-template-6140b09bce93da1f0244afc40640839f_screen.jpg?ts=1566982979" alt="song-card-image"/>
			<div className="song-card--text">
				<span>{title}</span>
				<span>{artistName}</span>
				<span>{numberOfListenning} coutes</span>
			</div>
		</div>);
}