import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from 'app/models/rental';
@Injectable({
    providedIn: 'root'
})
export class RentalService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getRental(): Observable<Rental[]> {
        return new Observable(obs => {
            this.httpClient.get<Rental[]>('./assets/data/mock-rental.json').subscribe((data: any) => {
                obs.next(data.rental);
                obs.complete();
            }, err => {
                obs.error([]);
            });
        });
    }
}
