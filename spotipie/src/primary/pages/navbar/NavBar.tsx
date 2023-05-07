import React from 'react';
import './NavBar.scss';
import { useNavBarHelper } from './NavBarHelper';
import disconnetLogo from '../../../assets/disconnected-logo.png';
import { Link } from './link/Link';
import homeLogo from '../../../assets/home-logo.png';

export function NavBar() {

	const { user, isConnected, logout, goToHome } = useNavBarHelper();
  
	function displayUserName() {
		if(user && isConnected()) {
			return (
				<div className="userName">
					<img src={disconnetLogo} height={20} width={20} alt='sign-out-logo' onClick={logout}/>
					<span>{user.getName()}</span>
				</div>
			);
		}
	}
  
	return(
		<div className="navigation-bar">
			<div className='links'>
				<Link name="Home" logo={homeLogo} navigation={goToHome}/>
				<Link name="All songs" logo={homeLogo} navigation={goToHome}/>
				<Link name="Recommend songs" logo={homeLogo} navigation={goToHome}/>
			</div>
			<div>
				{displayUserName()}
			</div>
		</div>
	);
} 