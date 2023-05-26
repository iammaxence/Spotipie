import React from 'react';
import './PrivacyPolicy.scss';

export function PrivacyPolicy() {

	const WEBSITE_URL = 'www.spotipie.com';

	return (
		<div className="privacy">
			<h1> Privacy Policy </h1>
			<p>
        If you require any more information or have any questions about our privacy policy,
        please feel free to contact me by email at maxencebrunet91@gmail.com
			</p>
			<p>
        At Spotipie we consider the privacy of our visitors to be extremely important.
        This privacy policy document describes in detail the types of personal information is
        collected and recorded by { WEBSITE_URL }
			</p>
			<p>
				<b>Log Files</b>
				<br />
        Like many other Web sites, { WEBSITE_URL } makes use of log files.
        These files merely logs visitors to the site - usually a standard procedure
        for hosting companies and a part of hosting services's analytics.
        The information inside the log files includes internet protocol (IP) addresses,
        browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages.
        This information is used to analyze trends, administer the site, track user's movement
        around the site, and gather demographic information. IP addresses, and other such information
        are not linked to any information that is personally identifiable.
			</p>
			<p>
				<b>Cookies and Web Beacons</b>
				<br />
				{ WEBSITE_URL } uses cookies to store information about visitors' preferences,
        to record user-specific information on which pages the site visitor accesses or visits,
        and to personalize or customize our web page content based upon visitors' browser type
        or other information that the visitor sends via their browser.
			</p>
			<p>
				<em>
          While each of these advertising partners has their own Privacy Policy for their site,
          an updated and hyperlinked resource is maintained here:
					<a href="https://www.privacypolicyonline.com/privacy-policy-links/"> Privacy Policy Links</a>.
					<br /> <br />
        You may consult this listing to find the privacy policy for each of the advertising partners of { WEBSITE_URL }.
				</em>
			</p>
			<p>
        These third-party ad servers or ad networks use technology in their respective advertisements
        and links that appear on { WEBSITE_URL } and which are sent directly to your browser.
        They automatically receive your IP address when this occurs.
        Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by
        our site's third-party ad networks to measure the effectiveness of their advertising campaigns
        and/or to personalize the advertising content that you see on the site.
			</p>
			<p> { WEBSITE_URL } has no access to or control over these cookies that are used by third-party advertisers. </p>
		</div>
	);
}