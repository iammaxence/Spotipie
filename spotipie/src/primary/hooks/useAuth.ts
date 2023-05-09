import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../../domain/User';
import { UserFromLocalStorage } from '../../domain/UserFromLocalStorage';

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser();
	const { getItem } = useLocalStorage();

	useEffect(() => {
		if (user) {
			const { email, name, country, access_token }: UserFromLocalStorage = JSON.parse(getItem('user')!);
			addUser(User.of(email, name, country, access_token));
		}
	}, []);

	const login = (user: User) => {
		addUser(user);
	};

	const logout = () => {
		removeUser();
		//const spotifyLogoutUrl = 'https://accounts.spotify.com/fr/logout';
		//document.location.href = spotifyLogoutUrl+'?continue=http://localhost:8080/';
		// I need to call this url to really logout
	};

	const isConnected = () => {
		return user!=null;
	};

	return { user, login, logout, isConnected };
};