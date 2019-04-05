import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from 'app/models/rental';
import * as CONFIG from "../../models/config";
import { Booking } from 'app/models/booking';

@Injectable({
    providedIn: 'root'
})
export class ManageService {

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

}
