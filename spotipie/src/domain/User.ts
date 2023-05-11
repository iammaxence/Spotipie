export class User {
	constructor(private email: string, private name: string, private country: string, private accessToken: string) {}

	public static of(email: string, name: string, country: string, accessToken: string): User {
		return new User(email, name, country, accessToken);
	}

	public getName(): string {
		return this.name;
	}

	public getEmail(): string {
		return this.email;
	}

	public getAccessToken(): string {
		return this.accessToken;
	}
}