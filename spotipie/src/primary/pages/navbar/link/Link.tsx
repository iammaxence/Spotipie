import React from 'react';
import './Link.scss';

interface LinkProps{
  name: string,
  logo: string,
  navigation: () => void;
}

export function Link({ name, logo, navigation }: LinkProps) {
  
	return(
		<div className="link">
			<img src={logo} height={20} width={23} alt='home-logo' onClick={navigation}/>
			<span>{name}</span>
		</div>
	);
}