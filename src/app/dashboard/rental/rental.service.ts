import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from 'app/models/rental';
import * as CONFIG from "../../models/config";
import { Booking } from 'app/models/booking';
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    // urlDataRental = './assets/data/mock-rental.json';

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
     * Function get all rental
     */
    getRental(): Observable<Rental[]> {

        const url = `${CONFIG.BASE_URL}/rentals`;

        return new Observable<Rental[]>(obs => {
            this.httpClient.get(url).subscribe((data: any) => {
                obs.next(data);
                obs.complete();
            }, err => {
                obs.error(err);
            });
        });
    }

    /**
     * Function get rental by id
     * @param {string} id 
     */
    getRentalById(id): Observable<Rental> {

        const url = `${CONFIG.BASE_URL}/rentals/${id}`;

        return new Observable<Rental>(obs => {
            this.httpClient.get(url).subscribe((rental: any) => {
                obs.next(new Rental(rental));
                obs.complete();

            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function create booking rental
     * @param {Booking} booking 
     */
    createBooking(booking: Booking): Observable<Rental> {

        const url = `${CONFIG.BASE_URL}/bookings`;

        return new Observable<Rental>(obs => {
            this.httpClient.post(url, booking).subscribe((res: any) => {
                obs.next(res);
            }, err => {
                obs.error(err);
            })
        })
    }
}
