/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './NotFoundError.scss';

export function NotFoundError() {
	return (
		<div className='error'>
			<span className="ascii">(╯°□°）╯︵ ┻━┻</span>
			<span className='text-error'>Uh oh! We can't reach for your data</span>
			<span className='sub-text-error'>Try to logout and login</span>
		</div>
	);
}