import { Component, OnInit } from '@angular/core';
import { Booking } from 'app/models/booking';
import { RentalService } from 'app/dashboard/rental/rental.service';

@Component({
    selector: 'app-manage-bookings',
    templateUrl: './manage-bookings.component.html',
    styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {

    bookings: Booking[];
    payments: any[];

    constructor(
        private rentalService: RentalService
    ) { }

    ngOnInit() {
        this.getUserBookings();
    }

    /**
     * Function get user bookings
     */
    getUserBookings() {
        this.rentalService.getUserBookings().subscribe((bookings: Booking[]) => {
            console.log(bookings);
            this.bookings = bookings;
        }, () => {

        });
    }

}
