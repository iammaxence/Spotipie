import React from 'react';
import './Link.scss';

interface LinkProps{
  name: string,
  logo: string,
  navigation: () => void;
	disabled?: boolean,
}

export function Link({ name, logo, navigation, disabled = false }: LinkProps) {
	return(
		<div className={`link ${disabled ? 'disabled' : ''}`}>
			<img src={logo} height={20} width={23} alt='home-logo' onClick={navigation}/>
			<span>{name}</span>
		</div>
	);
}