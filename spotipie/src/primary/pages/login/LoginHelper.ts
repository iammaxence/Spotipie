import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { Token } from '../../../domain/token/Token';
import { User } from '../../../domain/User';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { AuthorizationPort } from '../../../domain/AuthorizationPort';

interface LoginHelperProps {
	authorizationAdapter: AuthorizationPort
}

export interface LoginResponse {
	data: string;
}

export function useLoginHelper({ authorizationAdapter }: LoginHelperProps) {
	const { search } = useLocation();
	const navigation = useNavigate();
	const { login, logout, user } = useAuth();
	const { setItem } = useLocalStorage();

	useEffect(() => {
		const { code, state } = getUrlParams();

		if(!isUserConnected()) {
			if(code && state) {
				getAndSetToken(code, state);
			}
		} else {
			navigation('/home');
		}
	}, []);

	useEffect(() => {
		if(isUserConnected()) {
			navigation('/home');
		}
	}, [user]);

	function isUserConnected(): boolean {
		return user!=null;
	}

	const connexion = async () => {
		const redirectUrl = await authorizationAdapter.getAuthorizationCode();
		window.location.replace(redirectUrl);
	};

	function getUrlParams() {
		const urlParams = new URLSearchParams(search);

		return {
			code: urlParams.get('code'),
			state: urlParams.get('state')
		};
	}

	async function getAndSetToken(code: string, state: string): Promise<void> {
		const token: Token = await authorizationAdapter.getToken(code, state); 
		setToken(token);
		tokenExpiration();
	}

	function tokenExpiration(): void {
		setTimeout(() => logout(), 10000);
	}

	function setToken(token: Token): void {
		setItem('tokens',  JSON.stringify(token));
		login(new User('test@mail.com', 'test', 'test@mail.com', token.getAccessToken()));
	}

	return {
		connexion,
	};
} 