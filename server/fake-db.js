const Rental = require('./models/rental');

class FakeDB {

    constructor() {
        this.rentals = [
            {
                "image": "../../../assets/img/card-2.jpeg",
                "title": "Cozy 5 Stars Apartment",
                "desc": "The place is close to Barceloneta Beach and bus stop just 2 min by walk and...",
                "footerTitle": "$899/night",
                "position": "Barcelona, Spain",
                "dailyRate": 32,
                "shared": true,
                "category": "apartment"
            },
            {
                "image": "../../../assets/img/card-3.jpeg",
                "title": "Office Studio",
                "desc": "The place is close to Metro Station and bus stop just 2 min by walk and near...",
                "footerTitle": "$1,119/night",
                "position": "London, UK",
                "dailyRate": 72,
                "shared": true,
                "category": "condo"
            },
            {
                "image": "../../../assets/img/card-1.jpeg",
                "title": "Beautiful Castle",
                "desc": "The place is close to Metro Station and bus stop just 2 min by walk and near...",
                "footerTitle": "$1221/night",
                "position": "London, UK",
                "dailyRate": 42,
                "shared": false,
                "category": "house"
            }
        ]
    }

    async cleanRental() {
        await Rental.deleteMany();
    }

    storeRental() {
        this.rentals.forEach(rental => {
            const newRental = new Rental(rental)
            newRental.save();
        })
    }

    seedDb() {
        this.cleanRental();
        this.storeRental();
    }
}

module.exports = FakeDB;