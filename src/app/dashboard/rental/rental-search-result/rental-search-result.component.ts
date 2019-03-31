import { Component, OnInit } from '@angular/core';
import { Rental } from 'app/models/rental';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../rental.service';

@Component({
    selector: 'app-rental-search-result',
    templateUrl: './rental-search-result.component.html',
    styleUrls: ['./rental-search-result.component.css']
})
export class RentalSearchResultComponent implements OnInit {

    position: string;
    rentals: Rental[] = [];
    errors: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private rentalS: RentalService
    ) {
        this.route.params.subscribe((params) => {
            this.position = params['position'];
            this.getRentals();
        })

    }

    ngOnInit() { }

    getRentals() {
        this.errors = [];
        this.rentals = [];

        this.rentalS.getRentalsByCity(this.position).subscribe(
            (rentals: Rental[]) => {
                this.rentals = rentals;
            }, (err) => {
                this.errors = err.error.errors;
            });
    }


}
