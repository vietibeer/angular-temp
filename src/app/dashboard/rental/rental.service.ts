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
    getRentalById(id: string): Observable<Rental> {

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
     * Function get rentals by city
     * @param {string} position 
     */
    getRentalsByCity(position: string): Observable<Rental[]> {

        const url = `${CONFIG.BASE_URL}/rentals?position=${position}`;

        return new Observable(obs => {
            this.httpClient.get(url).subscribe((data: any) => {
                obs.next(data);
                obs.complete();

            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function create rental
     * @param {Rental} rental 
     */
    createRental(rental: Rental): Observable<any> {

        const url = `${CONFIG.BASE_URL}/rentals`;

        return new Observable(obs => {
            this.httpClient.post(url, rental).subscribe((rental: any) => {
                obs.next(rental);
                obs.complete();
            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function get user rentals
     */
    getUserRentals(): Observable<Rental[]> {

        const url = `${CONFIG.BASE_URL}/rentals/manage`;

        return new Observable<Rental[]>(obs => {
            this.httpClient.get(url).subscribe((rental: any) => {
                obs.next(rental);
                obs.complete();

            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function delete rental
     * @param {string} id 
     */
    deleteRental(id: string): Observable<any> {

        const url = `${CONFIG.BASE_URL}/rentals/${id}`;

        return new Observable(obs => {
            this.httpClient.delete(url).subscribe((rental: any) => {
                obs.next(rental);
                obs.complete();

            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function update rental
     * @param {string} id 
     * @param {any} data 
     */
    updateRental(id: string, data: any): Observable<any> {

        const url = `${CONFIG.BASE_URL}/rentals/${id}`;

        return new Observable(obs => {
            this.httpClient.patch(url, data).subscribe((rental: any) => {
                obs.next();
                obs.complete();

            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function verify rental user
     * @param {string} id 
     */
    verifyRentalUser(id): Observable<any> {

        const url = `${CONFIG.BASE_URL}/rentals/${id}/verify-user`;

        return new Observable(obs => {
            this.httpClient.get(url).subscribe((rental: any) => {
                obs.next();
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

        return new Observable(obs => {
            this.httpClient.post(url, booking).subscribe((res: any) => {
                obs.next(res);
            }, err => {
                obs.error(err);
            })
        })
    }

    /**
     * Function get user bookings
     */
    getUserBookings(): Observable<Booking[]> {

        const url = `${CONFIG.BASE_URL}/bookings/manage`;

        return new Observable(obs => {
            this.httpClient.get(url).subscribe((booking: Booking[]) => {
                obs.next(booking);
            }, err => {
                obs.error(err);
            })
        })
    }

}
