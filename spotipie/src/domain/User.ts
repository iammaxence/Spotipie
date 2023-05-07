export class User {
	constructor(private email: string, private name: string, private country: string, private access_token: string) {}

	public static of(email: string, name: string, country: string, access_token: string): User {
		return new User(email, name, country, access_token);
	}

	public getName(): string {
		return this.name;
	}

	public getEmail(): string {
		return this.email;
	}
}