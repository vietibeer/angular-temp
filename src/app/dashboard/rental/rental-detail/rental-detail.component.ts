import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../rental.service';
import { Rental } from 'app/models/rental';
import { switchMap } from "rxjs/operators";
import { of } from 'rxjs';

@Component({
    selector: 'app-rental-detail',
    templateUrl: './rental-detail.component.html',
    styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
    rental_id: string;
    rental: Rental;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private rentalService: RentalService

    ) {
        this.activatedRoute.paramMap.pipe(
            switchMap(param => {
                return of(param.get("id"));
            })
        ).subscribe(id => {
            this.getRentalDetail(id);
        })
            
    }

    ngOnInit() { }

    getRentalDetail(id) {
        this.rentalService.getRentalById(id).subscribe(data => this.rental = data);
    }
}
