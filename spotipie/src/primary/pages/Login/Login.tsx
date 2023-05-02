import React from 'react';
import './Login.scss';
import { useLoginHelper } from './LoginHelper';
import { HttpPort } from '../../../config/axios/HttpPort';

interface LoginProps {
  axiosHttp: HttpPort
}

export function Login({ axiosHttp }: LoginProps) {

	const { login } = useLoginHelper({ axiosHttp });
  
	return (
		<div className='login'>
			<h1 className="title">Welcome to SpotiPie</h1>
			<button className="button" onClick={login}>Login</button>
		</div>
	);
}