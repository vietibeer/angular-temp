import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as CONFIG from "../models/config";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

export class DecodedToken {
    exp: number = 0;
    username: string = '';
}

@Injectable()
export class AuthService {
    private decodedToken;
    constructor(
        private http: HttpClient
    ) {
        this.decodedToken = JSON.parse(localStorage.getItem('user_data')) || new DecodedToken();
     }

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
            this.http.post(url, data).subscribe((token: string) => {
                this.saveToken(token);
                obs.next({ login: "success" });
            }, err => {
                obs.error(err);
            })
        });
    }

    logout() {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        this.decodedToken = new DecodedToken();
    }

    private saveToken(token: string): string {
        this.decodedToken = jwt.verify(token, CONFIG.SECRET_JWT);
        localStorage.setItem('user_token', token);
        localStorage.setItem('user_data', JSON.stringify(this.decodedToken));
        return token;
    }

    isAuthenticated(): boolean {
        return moment().isBefore(moment.unix(this.decodedToken.exp)); // moment('2010-10-20 10:05:00').isBefore('2010-10-20 11:00:00'); return true. What mean not expired
    }

    getUserToken() {
        return localStorage.getItem('user_token');
    }

    getUserName() {
        return this.decodedToken.username;
    }
}