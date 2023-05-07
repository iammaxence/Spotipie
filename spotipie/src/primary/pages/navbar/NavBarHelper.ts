import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export function useNavBarHelper() {
	const { user, isConnected, logout } = useAuth();
	const navigate = useNavigate();

	function goToHome(): void {
		navigate('/home');
	}

	return {
		user,
		isConnected,
		logout,
		goToHome
	};
}