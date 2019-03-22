import { Component, OnInit } from '@angular/core';
import { RentalService } from '../rental.service';
import { Rental } from 'app/models/rental';

@Component({
    selector: 'app-rental-list',
    templateUrl: './rental-list.component.html',
    styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
    title: string;
    rentalData: Rental[] = [];

    constructor(
        private rentalService: RentalService
    ) {
        this.title = 'Rental';
    }

    ngOnInit() {
        this.getRendal();
    }

    getRendal() {
        this.rentalService.getRental().subscribe(rentals => this.rentalData = rentals);
    }
}
