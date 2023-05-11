import { useEffect, useState } from 'react';
import { HttpPort } from '../../../domain/HttpPort';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Song } from '../../../domain/Song';
import { Artist } from '../../../domain/Artist';
import { TimeRangeEnum } from '../../../domain/TimeRange';
import { Option } from './select/Option';

interface HomeHelperProps {
  axiosHttp: HttpPort
}

export function useHomeHelper({ axiosHttp }: HomeHelperProps) {
	const { user, isConnected } = useAuth();
	const navigation = useNavigate();

	const selectOptions: Option[] = [
		{ id: TimeRangeEnum.Long, name: 'All time' },
		{ id: TimeRangeEnum.Medium, name: 'Last 6 months' },
		{ id: TimeRangeEnum.Short, name: 'Last 4 weeks' }
	];
	const [selectedOption, setSelectedOptions] = useState<Option>(selectOptions[0]);

	const [topSongs, setTopSongs] = useState<Song[]>([
		Song.of([Artist.of('Drake')], 'God\'s Plan', 'Scorpion', ''),
		Song.of([Artist.of('Drake')], 'One dance', 'Views', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
		Song.of([Artist.of('Drake')], 'One dance', 'Views', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
		Song.of([Artist.of('Drake')], 'Rich Flex', 'Her Loss', ''),
	]);

	useEffect(() => {
		if(!isConnected()) {
			navigation('/login');		
		}
	}, [user]);

	useEffect(() => {
		console.log(selectedOption);
	}, [selectedOption]);

	return {
		topSongs,
		selectOptions,
		setSelectedOptions
	};
}