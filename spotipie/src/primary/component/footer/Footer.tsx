import React from 'react';
import './Footer.scss';
import { useFooterHelper } from './FooterHelper';

export function Footer() {

	const { goToTermsAndConditions, goToPrivacyPolicy } = useFooterHelper();

	return(
		<div className='footer'>
			<span className="footer--item" onClick={goToTermsAndConditions}> Terms and Conditions </span>
			<span className="footer--item" onClick={goToPrivacyPolicy}> Personal data</span>
			<span className="footer--item"> About me</span>
		</div>);
}