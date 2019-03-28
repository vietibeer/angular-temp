import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as CONFIG from "../models/config";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

@Injectable()
export class AuthService {
    private decodedToken;
    constructor(
        private http: HttpClient
    ) { }

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

    private saveToken(token: string): string {
        this.decodedToken = jwt.verify(token, CONFIG.SECRET_JWT);
        localStorage.setItem('user_token', token);
        localStorage.setItem('user', JSON.stringify(this.decodedToken));
        return token;
    }

    isAuthenticated(): boolean {
        return moment().isBefore(moment.unix(this.decodedToken.exp));
    }
}