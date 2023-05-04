import React from 'react';
import './Login.scss';
import { useLoginHelper } from './LoginHelper';
import { AuthorizationPort } from '../../../domain/AuthorizationPort';

interface LoginProps {
	authorizationAdapter: AuthorizationPort
}

export function Login({ authorizationAdapter }: LoginProps) {

	const { connexion } = useLoginHelper({ authorizationAdapter });
  
	return (
		<div className='login'>
			<h1 className="title">Welcome to SpotiPie</h1>
			<button className="button" onClick={connexion}>Login</button>
		</div>
	);
}