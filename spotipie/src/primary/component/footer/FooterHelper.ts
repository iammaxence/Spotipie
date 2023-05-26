import { useNavigate } from 'react-router-dom';

export function useFooterHelper() {
	const navigate = useNavigate();

  
	function goToTermsAndConditions() {
		navigate('/termsAndConditions');
	}

	function goToPrivacyPolicy() {
		navigate('/privacyPolicy');
	}

	return {
		goToTermsAndConditions,
		goToPrivacyPolicy
	};
}