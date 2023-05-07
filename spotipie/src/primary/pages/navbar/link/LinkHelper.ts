import { useNavigate } from 'react-router';

export function useLinkHelper() {
	const navigate = useNavigate();

	function goToHome(): void {
		navigate('/home');
	}

	return {
		goToHome
	};
}