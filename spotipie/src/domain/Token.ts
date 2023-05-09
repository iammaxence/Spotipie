export class Token {
	constructor(private accessToken: string, private refreshToken: string, private expiresIn: number ) {}

	public static of(accessToken: string, refreshToken: string, expiresIn: number): Token {
		return new Token(accessToken,refreshToken, expiresIn);
	}

	public getAccessToken(): string {
		return this.accessToken;
	} 
}