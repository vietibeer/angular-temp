import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as CONFIG from "../models/config";

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient
    ) {}

    register(data): Observable<any> {

        const url = `${CONFIG.BASE_URL}/user/register`;

        return new Observable(obs => {
            this.http.post(url, data).subscribe(res => {
                obs.next(res);
            }, err => {
                obs.error(err);
            })
        });
    }

    login(data): Observable<any> {

        const url = `${CONFIG.BASE_URL}/user/auth`;

        return new Observable(obs => {
            this.http.post(url, data).subscribe(token => {
                obs.next(token);
            }, err => {
                obs.error(err);
            })
        });
    }
}