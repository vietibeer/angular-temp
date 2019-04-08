import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CONFIG from "../../models/config";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    public url = `${CONFIG.BASE_URL}/payments`;

    constructor(
        private httpClient: HttpClient
    ) { }

    /**
     * Function get all rental
     */
    getPendingPayment(): Observable<any[]> {
        return new Observable<any[]>(obs => {
            this.httpClient.get(this.url).subscribe((data: any) => {
                obs.next(data);
                obs.complete();
            }, err => {
                obs.error(err);
            });
        });
    }

    /**
     * Function get all rental
     */
    acceptPayment(payment): Observable<any[]> {
        return new Observable<any[]>(obs => {
            this.httpClient.post(`${this.url}/accept`, payment).subscribe((data: any) => {
                obs.next(data);
                obs.complete();
            }, err => {
                obs.error(err);
            });
        });
    }

    /**
     * Function get all rental
     */
    declinePayment(payment): Observable<any[]> {
        return new Observable<any[]>(obs => {
            this.httpClient.post(`${this.url}/decline`, payment).subscribe((data: any) => {
                obs.next(data);
                obs.complete();
            }, err => {
                obs.error(err);
            });
        });
    }
}
