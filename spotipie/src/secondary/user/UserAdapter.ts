import { HttpPort } from '../../domain/HttpPort';
import { User } from '../../domain/User';
import { UserPort } from '../../domain/UserPort';
import { UserResponse, toUser } from './UserResponse';

export class UserAdapter implements UserPort {

	constructor(private axiosHttp: HttpPort){}
  
	async getUserProfile(access_token: string): Promise<User> {
		const userResponse = (await this.axiosHttp.get<UserResponse>('/user?token='+access_token)).data;
		return toUser(userResponse, access_token);
	}

}