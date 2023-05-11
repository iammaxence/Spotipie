export class Artist {
	constructor(private name: string){}

	public static of(name: string) {
		return new Artist(name);
	}

	public getName(): string {
		return this.name;
	}
}