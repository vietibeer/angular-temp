import { Booking } from "./booking";

export class Rental {

    static readonly CATEGORIES = ['house', 'apartment', 'condo'];

    id?: string;
    image: string;
    title: string;
    desc: string;
    footerTitle: string;
    position: string;
    city: string;
    dailyRate: number;
    bedrooms: number;
    shared: boolean;
    category: string;
    bookings?: Booking[];
    createdAt?: string;

    constructor(rental) {

        this.id = rental.id;
        this.image = rental.image;
        this.title = rental.title;
        this.desc = rental.desc;
        this.footerTitle = rental.footerTitle;
        this.position = rental.position;
        this.city = rental.city;
        this.dailyRate = rental.dailyRate;
        this.shared =  rental.shared;
        this.bedrooms =  rental.bedrooms;
        this.category = rental.category;
        this.bookings = rental.bookings;
        this.createdAt = rental.createdAt;
        
    }
}
