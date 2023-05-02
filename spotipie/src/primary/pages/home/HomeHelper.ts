import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HttpPort } from '../../../config/axios/HttpPort';

interface HomeHelperProps {
  axiosHttp: HttpPort
}

export function useHomeHelper({ axiosHttp }: HomeHelperProps) {
	const { search } = useLocation();

	useEffect(() => {
		const urlParams = new URLSearchParams(search);
		const code = urlParams.get('code');
		const state = urlParams.get('state');

		console.log(`code: ${code}, state: ${state}`);
	}, []);
}