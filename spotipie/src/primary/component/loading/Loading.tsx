import React from 'react';
import './Loading.scss';

export function Loading() {
	return (
		<div className='wrapper'>
			<button>
				<span>Loading ... </span>
				<svg>
					<rect x="1" y="1"></rect>
				</svg>
			</button>
		</div>
	);
}