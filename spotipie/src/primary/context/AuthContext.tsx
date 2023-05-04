import React, { ReactElement, createContext, useEffect, useMemo, useState } from 'react';
import { User } from '../../domain/User';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface AuthContextType {
	user: User | null;
	setUser: (user: User |null) => void,
}

interface AuthContextProviderProps {
  children: ReactElement
}

export const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => null });

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [user, setUser] = useState<User|null>(null);
	const { getItem, token } = useLocalStorage();

	useEffect(() => {
		if (getItem('user')) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const user = JSON.parse(getItem('user')!);
			setUser(user);
		}
	}, [token]);
 
	const value = useMemo(() => ({ user, setUser }), [user]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};