import React from 'react';
import './TermsAndConditions.scss';

export function TermsAndConditions() {
	return (
		<div className='termsAndConditions'>
			<div className='summary'></div>
			<div className='termsAndConditions--block'>
				<h1 className='termsAndConditions--title'> Terms and Conditions of Spotipie website</h1>
				<div className="content">
					<span>
          Welcome to our website. If you continue to browse and use this website,
          you are agreeing to comply with and be bound by the following terms and conditions of use,
          which together with our privacy policy govern spotipie's relationship with you in relation
          to this website. If you disagree with any part of these terms and conditions, please do not use our website.
					</span>
					<span>
          The term 'spotipie' or 'us' or 'we' refers to the owner of the website whose registered office is Paris.
          The term 'you' refers to the user or viewer of our website.
					</span>
					<span> The use of this website is subject to the following terms of use: </span>
				</div>
				<div className="content--list">
					<li className='content--item'>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
					<li className='content--item'>
            This website uses cookies to monitor browsing preferences. If you do allow cookies to be used,
            the following personal information may be stored by us for use by third parties: 
            [insert list of information].
					</li>
					<li className='content--item'>
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
            performance, completeness or suitability of the information and materials found or offered on this website
            for any particular purpose. You acknowledge that such information and materials may contain inaccuracies
            or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
					</li>
					<li className='content--item'>
            Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.
            It shall be your own responsibility to ensure that any products, services or information available through this website
            meet your specific requirements.
					</li>
					<li className='content--item'>
            This website contains material which is owned by or licensed to us. This material includes, but is not limited to,
            the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice,
            which forms part of these terms and conditions.
					</li>
					<li className='content--item'>
            All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
					</li>
					<li className='content--item'>
            Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
					</li>
					<li className='content--item'>
            From time to time this website may also include links to other websites.
            These links are provided for your convenience to provide further information.
            They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
					</li>
					<li className='content--item'>
            Your use of this website and any dispute arising out of such use of the website is subject to the laws of France.
					</li>
				</div>
			</div>
		</div>
	);
}