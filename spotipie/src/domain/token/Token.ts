export class Token {
	constructor(private value: string) {}
  
	public get(): string {
		return this.value;
	}
}