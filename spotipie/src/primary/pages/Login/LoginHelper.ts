import { HttpPort } from '../../../config/HttpPort';

interface LoginHelperProps {
  axiosHttp: HttpPort
}

export interface LoginResponse {
	data: string;
}

export function useLoginHelper({ axiosHttp }: LoginHelperProps) {
	const login = async () => {
		const response: LoginResponse = await axiosHttp.post('/login', {
			clientId: '1d41a7bc4b7e491eb7951830ba5d4756',
			scope: 'user-read-private user-read-email',
			redirectUri: 'http://localhost:1420/home'
		});

		window.location.replace(response.data);
	};

	return {
		login,
	};
} 