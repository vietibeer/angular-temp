import { Component, OnInit } from '@angular/core';
import { RentalService } from 'app/dashboard/rental/rental.service';
import { Rental } from 'app/models/rental';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-manage-rentals',
    templateUrl: './manage-rentals.component.html',
    styleUrls: ['./manage-rentals.component.scss']
})
export class ManageRentalsComponent implements OnInit {

    rentals: Rental[] = [];
    rentalDeleteIndex: number = 0;
    constructor(
        private rentalService: RentalService
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

}
