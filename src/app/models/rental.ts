export class Rental {
    _id: string;
    image: string;
    title: string;
    desc: string;
    footerTitle: string;
    position: string;
    dailyRate: number;
    shared?: boolean;
    category: string;
    constructor(rental) {
        this._id = rental._id;
        this.image = rental.image;
        this.title = rental.title;
        this.desc = rental.desc;
        this.footerTitle = rental.footerTitle;
        this.position = rental.position;
        this.dailyRate = rental.dailyRate;
        this.shared =  rental.shared;
        this.category = rental.category;
    }
}
