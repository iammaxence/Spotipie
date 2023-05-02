import React, { ReactElement, createContext, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Token } from '../domain/token/Token';
import { HttpPort } from '../config/axios/HttpPort';

export interface AuthContextType {
	user: Token | null;
	setUser: (user: Token |null) => void,
	getToken: (authorization_code: string, state: string) => Promise<void>;
}
 

interface AuthContextProviderProps {
  axiosHttp: HttpPort
  children: ReactElement
}

const CLIENT_ID = '1d41a7bc4b7e491eb7951830ba5d4756';
const REDIRECT_URI = 'http://localhost:1420/home';

export const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => null, getToken: () => Promise.resolve() });

export const AuthContextProvider = ({ axiosHttp, children }: AuthContextProviderProps) => {
	const [user, setUser] = useState<Token|null>(() => {
		if (localStorage.getItem('tokens')) {
			const tokens = JSON.parse(localStorage.getItem('tokens')!);
			return jwt_decode(tokens.access_token);
		}
		return null;
	});
 
	const navigate = useNavigate();
  
	const getToken = async (authorization_code: string, state: string): Promise<void> => {
		const response: AxiosResponse = await axiosHttp.post('/token', {
			clientId: CLIENT_ID,
			redirectUri: REDIRECT_URI,
			state: state,
			code: authorization_code
		});

		localStorage.setItem('tokens',  JSON.stringify(response.data));
		setUser(jwt_decode(response.data.access_token));
		navigate('/');
	};
  
	const value = useMemo(() => ({ user, setUser, getToken }), []);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);

	
};