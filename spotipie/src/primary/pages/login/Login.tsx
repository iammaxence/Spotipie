import React from 'react';
import './Login.scss';
import { useLoginHelper } from './LoginHelper';
import { AuthorizationPort } from '../../../domain/AuthorizationPort';
import { UserAdapter } from '../../../secondary/user/UserAdapter';
import { UserPort } from '../../../domain/UserPort';

interface LoginProps {
	authorizationAdapter: AuthorizationPort
	userAdapter: UserPort
}

export function Login({ authorizationAdapter, userAdapter }: LoginProps) {

	const { connexion } = useLoginHelper({ authorizationAdapter, userAdapter });
  
	return (
		<div className='login'>
			<h1 className="title">Welcome to SpotiPie</h1>
			<button className="button" onClick={connexion}>Login</button>
		</div>
	);
}