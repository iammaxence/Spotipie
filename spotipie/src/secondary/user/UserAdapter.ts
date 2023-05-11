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

	async getTopSongs(accessToken: string, timeRange: string, limit: number, offset: number): Promise<Song[]> {
		const topSongResponseList = (await this.axiosHttp.get<TopSongResponse[]>(
			`/user/top?timeRange=${timeRange}&numberOfItems=${limit}&offset=${offset}`,
			{
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			})).data;
		return toSongList(topSongResponseList);
	}
}