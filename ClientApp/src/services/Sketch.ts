//Domain object Sketch.
export class Sketch {
    name: string;

    imageData: string;

    dateCreated: Date;

    constructor(name: string, imageData: string, dateCreated: Date) {
        this.name = imageData;
        this.imageData = imageData;
        this.dateCreated = dateCreated;
    }
}