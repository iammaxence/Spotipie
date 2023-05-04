import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../../domain/User';

export const useAuth = () => {
	const { user, addUser, removeUser } = useUser();
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const user = getItem('user');
		if (user) {
			addUser(JSON.parse(user));
		}
	}, []);

	const login = (user: User) => {
		addUser(user);
	};

	const logout = () => {
		removeUser();
	};

	const isConnected = () => {
		return user!=null;
	};

	return { user, login, logout, isConnected };
};