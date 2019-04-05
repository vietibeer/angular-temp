import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Booking } from 'app/models/booking';
import { AuthService } from 'app/services/auth.service';
import { HelperService } from 'app/services/helper.service';
import * as moment from "moment";
import { Rental } from 'app/models/rental';
import { RentalService } from '../rental.service';
import { MatDialog } from '@angular/material';
import { PaymentComponent } from 'app/dashboard/payment/payment.component';

declare var swal;

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-rental-booking',
    templateUrl: './rental-booking.component.html',
    styleUrls: ['./rental-booking.component.scss']
})
export class RentalBookingComponent implements OnInit {

    @Input() rental: Rental;
    @Output() changeRental: EventEmitter<Rental> = new EventEmitter<Rental>();

    newBooking: Booking;
    bookedOutDates: any[] = [];
    options: any = {};
    errors: any[] = [];
    constructor(
        private auth: AuthService,
        private helpS: HelperService,
        private rentalS: RentalService,
        private dialog: MatDialog
    ) {
        this.newBooking = new Booking();
        this.options = {
            locale: { format: Booking.DATE_FORMAT },
            alwaysShowCalendars: false,
            opens: "left",
            isInvalidDate: this.checkInvalidDates.bind(this)
        };
    }

    ngOnInit() {
        this.getBookingOutDates();
    }

    /**
     * Function get booking out dates
     */
    getBookingOutDates() {
        const bookings: Booking[] = this.rental.bookings;
        if (bookings && bookings.length > 0) {
            bookings.forEach((booking: Booking) => {
                const dateRange = this.helpS.getBookingRangeDates(booking.startAt, booking.endAt)
                this.bookedOutDates.push(...dateRange);
            });
        }
    }

    checkInvalidDates(date) {
        // dates inside array bookedOutDates is invalid, because that dates did booked. 
        // date.diff(moment(), 'days') < 0  // date booking must be before today
        return this.bookedOutDates.includes(date.format(Booking.DATE_FORMAT)) || date.diff(moment(), 'days') < 0;
    }

    selectedDate(value: any, datePicker?: any) {
        this.newBooking.startAt = moment(value.start).format(Booking.DATE_FORMAT);
        this.newBooking.endAt = moment(value.end).format(Booking.DATE_FORMAT);
        this.newBooking.days = -value.start.diff(value.end, 'days');
        this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
        console.log(this.newBooking);
    }

    /**
     * Function reserve rental
     */
    reserveRental() {
        this.newBooking.rental = this.rental;
        console.log(this.newBooking);

        this.createPopupConfirmBooking();
    }

    /**
     * Function make popup confirm booking
     */
    createPopupConfirmBooking() {

        const self = this;

        swal({
            title: 'Confirm Booking',
            text: `${this.newBooking.startAt} to ${this.newBooking.endAt}`,
            html: `<p><b>${this.newBooking.days}</b> nights / <b>${this.rental.dailyRate}</b>$ per Night</p>
                   <p>Guests: <b>${this.newBooking.guests}</b></p>
                   <p>Price: <b>${this.newBooking.totalPrice}$</b></p><hr>
                   <p>Do you confirm booking for selected days?</p>`,
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'YES!'
        }).then(function () {
            self.showPopupPayment();
        });

    }

    /**
     * Function create booking
     * @param {Booking} booking 
     */
    createBooking(booking: Booking) {

        /**
         * Function make sweet alert
         * @param {string} title 
         * @param {string} text 
         * @param {string} html 
         * @param {string} type 
         * @param {string} confirmBtn 
         */
        const makeSwal = (title, text, html, type, confirmBtn) => {
            return swal({
                title: title,
                text: text,
                html: html,
                type: type,
                confirmButtonClass: confirmBtn
            });
        }

        this.rentalS.createBooking(booking).subscribe((res: any) => {

            const startAt = moment(res.startAt).format(Booking.DATE_FORMAT);
            const endAt = moment(res.endAt).format(Booking.DATE_FORMAT);

            // const dateRange = this.helpS.getBookingRangeDates(res.startAt, res.endAt)
            // this.bookedOutDates.push(...dateRange);
            makeSwal('Booking success!', `${startAt} to ${endAt}`, '', 'success', 'btn btn-info');

            this.getRentalDetail(this.rental.id);

        }, err => {
            this.errors = err.error.errors;
            let html = `<div class='alert alert-danger'>`;

            this.errors.forEach((err, i) => {

                html += `<p style="color: #fff">${err.detail}</p>`;

                if (i === this.errors.length - 1) {
                    html += '</div>';
                }
            });

            makeSwal('Cancelled', null, html, 'error', 'btn btn-info');
        });
    }

    /**
     * Function get rental detail
     * @param {string} id
     */
    getRentalDetail(id) {
        this.rentalS.getRentalById(id).subscribe((rental: Rental) => {
            this.rental = rental;
            this.changeRental.emit(this.rental);
            this.getBookingOutDates();
        });
    }

    /**
     * Function show popup payment
     */
    showPopupPayment() {
        const dialogRef = this.dialog.open(PaymentComponent, {
            width: '550px',
            data: { booking: this.newBooking }
        });

        dialogRef.afterClosed().subscribe(token => {
            if (token) {
                this.newBooking.paymentToken = token;
                this.createBooking(this.newBooking);
            }
        });
    }
}
