// models
const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');

// assets
const fakeDBData = require('./assets/data/data.json');

class FakeDB {

    constructor() {
        this.rentals = fakeDBData.rentals;
        this.users = fakeDBData.users;
    }

    async cleanRental() {
        await Rental.deleteMany({});
        await User.deleteMany({});
        await Booking.deleteMany({});
    }

    storeRental() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach(rental => {
            const newRental = new Rental(rental);
            newRental.user = user; // add owner of rental user

            user.rentals.push(newRental);
            newRental.save();
        });

        user.save();
        user2.save();
    }

    async seedDb() {
        await this.cleanRental();
        this.storeRental();
    }
}

module.exports = FakeDB;