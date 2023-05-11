import { HttpPort } from '../../domain/HttpPort';
import { Song } from '../../domain/Song';
import { User } from '../../domain/User';
import { UserPort } from '../../domain/UserPort';
import { TopSongResponse, toSongList } from './TopSongResponse';
import { UserResponse, toUser } from './UserResponse';

export class UserAdapter implements UserPort {

	constructor(private axiosHttp: HttpPort){}
  
	async getUserProfile(access_token: string): Promise<User> {
		const userResponse = (await this.axiosHttp.get<UserResponse>('/user?token='+access_token)).data;
		return toUser(userResponse, access_token);
	}

	async getTopSongs(timeRange: string, limit: string, offset: string): Promise<Song[]> {
		const topSongResponseList = (await this.axiosHttp.get<TopSongResponse[]>(`/user/top?time_range=${timeRange}&limit=${limit}&offset=${offset}`)).data;
		return toSongList(topSongResponseList);
	}
}