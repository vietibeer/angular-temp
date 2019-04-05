import { Component, OnInit } from '@angular/core';
import { RentalService } from 'app/dashboard/rental/rental.service';
import { Rental } from 'app/models/rental';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { ManageRentalBookingComponent } from './manage-rental-booking/manage-rental-booking.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-manage-rentals',
    templateUrl: './manage-rentals.component.html',
    styleUrls: ['./manage-rentals.component.scss']
})
export class ManageRentalsComponent implements OnInit {

    rentals: Rental[] = [];
    rentalDeleteIndex: number;
    constructor(
        private rentalService: RentalService,
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit() {
        this.getUserRentals();
    }

    /**
     * Function get user rentals
     */
    getUserRentals() {
        this.rentalService.getUserRentals().subscribe(
            (rentals: Rental[]) => {
                this.rentals = rentals;
            },
            () => {

            })

    }

    /**
     * Function delete rental
     * @param {string} rentalId 
     */
    deleteRental(rentalId: string) {
        this.rentalService.deleteRental(rentalId).subscribe(
            () => {
                this.rentals.splice(this.rentalDeleteIndex, 1);
                this.rentalDeleteIndex = undefined;
            },
            (errorResponse: HttpErrorResponse) => {
                // this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!');
            })
    }

    /**
     * Function show popup rental bookings
     * @param {Booking[]} bookings 
     */
    showPopup(bookings) {
        const dialogRef = this.dialog.open(ManageRentalBookingComponent, {
            width: '550px',
            data: { bookings: bookings }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    goEditRental(id) {
        this.router.navigateByUrl(`/dashboard/rental/${id}/edit`);
    }

}
