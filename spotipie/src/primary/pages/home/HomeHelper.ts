import { useEffect } from 'react';
import { HttpPort } from '../../../config/axios/HttpPort';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface HomeHelperProps {
  axiosHttp: HttpPort
}

export function useHomeHelper({ axiosHttp }: HomeHelperProps) {
	const { user, isConnected } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if(!isConnected()) {
			navigate('/login');		
		}
	}, [user]);
}