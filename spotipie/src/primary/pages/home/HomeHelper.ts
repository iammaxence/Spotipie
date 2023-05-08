import { useEffect, useState } from 'react';
import { HttpPort } from '../../../domain/HttpPort';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Song } from '../../../domain/Song';

interface HomeHelperProps {
  axiosHttp: HttpPort
}

export function useHomeHelper({ axiosHttp }: HomeHelperProps) {
	const { user, isConnected } = useAuth();
	const navigate = useNavigate();
	const [topSongs, setTopSongs] = useState<Song[]>([Song.of('wejdene', 'coco', 12), Song.of('wejdene', 'tati', 12), Song.of('wejdene', 'toto', 12)]);

	useEffect(() => {
		if(!isConnected()) {
			navigate('/login');		
		}
	}, [user]);

	return {
		topSongs
	};
}