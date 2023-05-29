import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Song } from '../../../domain/Song';
import { TimeRangeEnum } from '../../../domain/TimeRange';
import { Option } from './select/Option';
import { UserPort } from '../../../domain/UserPort';

interface HomeHelperProps {
  userAdapter: UserPort
}

export function useHomeHelper({ userAdapter }: HomeHelperProps) {
	const { user, isConnected, logout } = useAuth();
	const navigation = useNavigate();

	const NUMBER_OF_SONGS = 10;
	const OFFSET = 0;

	const selectOptions: Option[] = [
		{ id: TimeRangeEnum.Long, name: 'All time' },
		{ id: TimeRangeEnum.Medium, name: 'Last 6 months' },
		{ id: TimeRangeEnum.Short, name: 'Last 4 weeks' }
	];
	const [selectedOption, setSelectedOptions] = useState<Option>(selectOptions[0]);

	const [topSongs, setTopSongs] = useState<Song[]>([]);
	const [isSongsLoading, setIsSongsLoading] = useState(true);
	const [hasError, setError] = useState(false);

	useEffect(() => {
		if(!isConnected()) {
			navigation('/login');		
		}
	}, [user]);

	useEffect(() => {
		if(user) {
			getTopSongs();
		}
	}, [selectedOption]);

	async function getTopSongs(): Promise<void> {
		setIsSongsLoading(true);
		const topSongs = await userAdapter.getTopSongs(user!.getAccessToken(),selectedOption.id, NUMBER_OF_SONGS, OFFSET).catch((error) =>{
			if(error.response && error.response.status === 401){
				logout();
			}
			setError(true);
		});
		
		if(topSongs) {
			setTopSongs(topSongs);
			setIsSongsLoading(false);
		}
	}

	return {
		user,
		topSongs,
		selectOptions,
		setSelectedOptions,
		hasError,
		isSongsLoading
	};
}