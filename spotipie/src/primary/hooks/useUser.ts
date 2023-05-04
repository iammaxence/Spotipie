import { useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User } from '../../domain/User';
import { AuthContext } from '../context/AuthContext';

export const useUser = () => {
	const { user, setUser } = useContext(AuthContext);
	const { setItem, removeItem } = useLocalStorage();

	const addUser = (user: User) => {
		setUser(user);
		setItem('user', JSON.stringify(user));
	};

	const removeUser = () => {
		setUser(null);
		removeItem('user');
		removeItem('tokens');
	};

	return { user, addUser, removeUser };
};