import { useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AuthContext } from '../../router/AuthContext';
import { Token } from '../../domain/token/Token';

export const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const { setItem } = useLocalStorage();

	const addUser = (user: Token) => {
		setUser(user);
		setItem('user', JSON.stringify(user));
	};

	const removeUser = () => {
		setUser(null);
		setItem('user', '');
	};

	const login = (user: Token) => {
		addUser(user);
	};

	const logout = () => {
		removeUser();
	};

	return { user, login, logout };
};