import React from 'react';
import './Home.scss';
import { useHomeHelper } from './HomeHelper';
import { HttpPort } from '../../../config/axios/HttpPort';

interface HomeProps {
  axiosHttp: HttpPort
}

export function Home({ axiosHttp }: HomeProps) {

	useHomeHelper({ axiosHttp });

	return (
		<div className="home">
			<h1> Top 3 listening</h1>
		</div>
	);
}