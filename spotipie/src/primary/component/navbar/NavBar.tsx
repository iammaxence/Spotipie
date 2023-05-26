import React from 'react';
import './NavBar.scss';
import { useNavBarHelper } from './NavBarHelper';
import disconnetLogo from '../../../assets/disconnected-logo.png';
import { Link } from './link/Link';
import homeLogo from '../../../assets/home-logo.png';
import musicalNotesLogo from '../../../assets/musical-notes.png';
import thumbLogo from '../../../assets/thumbs-up.png';

export function NavBar() {

	const { user, isConnected, logout, goToHome, isBurgerMenuOpen, actionBurgerMenu } = useNavBarHelper();
  
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
		<>
			<div className="navigation-bar">
				<div className='links'>
					<Link name="Home" logo={homeLogo} navigation={goToHome}/>
					<Link name="All songs" logo={musicalNotesLogo} navigation={goToHome} disabled={true}/>
					<Link name="Recommend songs" logo={thumbLogo} navigation={goToHome}  disabled={true}/>
				</div>
				<div className="burger-menu">
					<div className={isBurgerMenuOpen ? 'burger open': 'burger close'} onClick={actionBurgerMenu}>
						<span></span>
					</div>
				</div>
				<div>
					{displayUserName()}
				</div>
			</div>
			<div className={isBurgerMenuOpen ? 'burger-menu-open' : 'burger-menu-close'}>
				<Link name="Home" logo={homeLogo} navigation={goToHome}/>
				<Link name="All songs" logo={musicalNotesLogo} navigation={goToHome} disabled={true}/>
				<Link name="Recommend songs" logo={thumbLogo} navigation={goToHome} disabled={true}/>
			</div>
		</>
		
	);
} 