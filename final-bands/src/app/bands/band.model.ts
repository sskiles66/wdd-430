export class Band {
    public _id: string;
    public bandTitle: string;
    public genre: string;
    public imageUrl: string;

    constructor(_id: string, bandTitle: string, genre: string, imageUrl: string ){
        this._id = _id;
        this.bandTitle = bandTitle;
        this.genre = genre;
        this.imageUrl = imageUrl
    }
}