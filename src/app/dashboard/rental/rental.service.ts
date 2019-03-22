import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from 'app/models/rental';
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    urlDataRental = './assets/data/mock-rental.json';
    constructor(
        private httpClient: HttpClient
    ) { }

    getRental(): Observable<Rental[]> {
        return new Observable<Rental[]>(obs => {
            this.httpClient.get(this.urlDataRental).subscribe((data: any) => {
                obs.next(data.rental);
                obs.complete();
            }, err => {
                obs.error(err);
            });
        });
    }

    getRentalById(id): Observable<Rental> {
        return new Observable<Rental>(obs => {
            this.httpClient.get(this.urlDataRental).subscribe((data: any) => {

                const rental: Rental = data.rental.find(res => res.id == id);
                obs.next(new Rental(rental));
                obs.complete();
                
            }, err => {
                obs.error(err);
            })
        })
    }
}
