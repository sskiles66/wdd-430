export class Band {
    public id: string;
    public bandTitle: string;
    public genre: string;
    public imageUrl: string;

    constructor(id: string, bandTitle: string, genre: string, imageUrl: string ){
        this.id = id;
        this.bandTitle = bandTitle;
        this.genre = genre;
        this.imageUrl = imageUrl
    }
}