import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export function useNavBarHelper() {
	const { user, isConnected, logout } = useAuth();
	const navigate = useNavigate();

	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	function goToHome(): void {
		navigate('/home');
	}

	function actionBurgerMenu(): void {
		setIsBurgerMenuOpen((prevValue) => !prevValue);
	}

	return {
		user,
		isConnected,
		logout,
		goToHome,
		isBurgerMenuOpen,
		actionBurgerMenu
	};
}