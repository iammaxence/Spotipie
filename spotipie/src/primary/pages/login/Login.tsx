import React from 'react';
import './Login.scss';
import { useLoginHelper } from './LoginHelper';
import { AuthorizationPort } from '../../../domain/AuthorizationPort';
import { UserPort } from '../../../domain/UserPort';

interface LoginProps {
	authorizationAdapter: AuthorizationPort
	userAdapter: UserPort
}

export function Login({ authorizationAdapter, userAdapter }: LoginProps) {

	const { connexion } = useLoginHelper({ authorizationAdapter, userAdapter });
  
	return (
		<div className='login'>
			<div className="login--head">
				<h1 className="login--title">Welcome to SpotiPie</h1>
				<span className="login--subtitle">Gain insights into your Spotify listening habits</span>
			</div>
			<button className="button" onClick={connexion}>Login</button>
		</div>
	);
}