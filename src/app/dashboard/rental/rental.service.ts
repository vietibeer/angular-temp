import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from 'app/models/rental';
import * as CONFIG from "../../models/config";
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    // urlDataRental = './assets/data/mock-rental.json';
    urlDataRental = `${CONFIG.BASE_URL}/rentals`;

    constructor(
        private httpClient: HttpClient
    ) { }

    getRental(): Observable<Rental[]> {
        return new Observable<Rental[]>(obs => {
            this.httpClient.get(this.urlDataRental).subscribe((data: any) => {
                obs.next(data);
                obs.complete();
            }, err => {
                obs.error(err);
            });
        });
    }

    getRentalById(id): Observable<Rental> {
        return new Observable<Rental>(obs => {
            this.httpClient.get(`${this.urlDataRental}/${id}`).subscribe((rental: any) => {
                obs.next(new Rental(rental));
                obs.complete();
                
            }, err => {
                obs.error(err);
            })
        })
    }
}
