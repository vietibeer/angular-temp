import { Component, OnInit } from '@angular/core';
import { Booking } from 'app/models/booking';
import { RentalService } from 'app/dashboard/rental/rental.service';
import { PaymentService } from 'app/dashboard/payment/payment.service';

@Component({
    selector: 'app-manage-bookings',
    templateUrl: './manage-bookings.component.html',
    styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {

    bookings: Booking[];
    payments: any[];

    constructor(
        private rentalService: RentalService,
        private paymentService: PaymentService
    ) { }

    ngOnInit() {
        this.getUserBookings();
        this.getPendingPayment();
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

    /**
     * Function get Pending Booking
     */
    getPendingPayment() {
        this.paymentService.getPendingPayment().subscribe((payments: any) => {
            console.log(payments);
            this.payments = payments;
        }, () => {

        });
    }

    /**
     * Function accept payment
     * @param payment
     */
    acceptPayment(payment) {
        this.paymentService.acceptPayment(payment).subscribe(res => {
            payment.status = 'paid';
        }, err => {
            console.error(err);
        })
    }

    /**
     * Function decline payment
     * @param payment 
     */
    declinePayment(payment) {
        this.paymentService.declinePayment(payment).subscribe(res => {
            payment.status = 'declined';
        }, err => {
            console.error(err);
        })
    }
}
