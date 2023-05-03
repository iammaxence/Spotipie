import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HttpPort } from '../../../config/axios/HttpPort';
import { TokenResponse } from './response/TokenResponse';

interface HomeHelperProps {
  axiosHttp: HttpPort
}

export function useHomeHelper({ axiosHttp }: HomeHelperProps) {
	const { search } = useLocation();

	useEffect(() => {
		const urlParams = new URLSearchParams(search);
		const code = urlParams.get('code');
		const state = urlParams.get('state');

		if(code && state) {
			getToken(code, state);
		}
	}, []);

	async function getToken(code: string, state: string): Promise<void> {
		const response = await axiosHttp.post('/token', {
			code,
			state,
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			redirectUri: 'http://localhost:1420/home'
		});

		if(response.status === 200) {
			const tokenResponse: TokenResponse = response.data as TokenResponse;
			console.log(tokenResponse);
		}
	}
}