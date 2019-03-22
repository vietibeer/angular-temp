export class Rental {
    id: string;
    image: string;
    title: string;
    desc: string;
    footerTitle: string;
    position: string;
    constructor(rental) {
        this.id = rental.id;
        this.image = rental.image;
        this.title = rental.title;
        this.desc = rental.desc;
        this.footerTitle = rental.footerTitle;
        this.position = rental.position;
    }
}
