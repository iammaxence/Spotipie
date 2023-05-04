import { User } from '../../domain/User';
import { UserPort } from '../../domain/UserPort';

export class UserAdapter implements UserPort{
  
	getUserProfile(): Promise<User> {
		throw new Error('Method not implemented.');
	}

}