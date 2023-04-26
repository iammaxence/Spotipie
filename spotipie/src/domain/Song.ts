export class Song {
  constructor(private artistName: string, private title: string, private numberOfListening: number){};

  public static of(artistName: string, title: string, numberOfListening: number): Song {
    this.assertBlankSongAttribut(artistName, title);
    return new Song(artistName, title, numberOfListening);
  }

  public getArtistName(): string {
    return this.artistName;
  }

  public getTitle(): string {
    return this.title;
  }

  public getNumberOfListenning(): number {
    return this.numberOfListening;
  }

  private static assertBlankSongAttribut(artistName: string, title: string) {
    if(artistName === '' || title === '') {
      throw new Error('Song attribut is missing');
    }
  }
}