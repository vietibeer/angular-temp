import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    private url: string;

    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    private handleAuthState() {
        if (this.isLoginOrRegister()) {
            this.router.navigate(['/dashboard/rental']);
            return false;
        }
        return true;
    }

    private handleNotAuthState() {
        if (this.isLoginOrRegister()) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }

    private isLoginOrRegister(): boolean {
        if (this.url.includes('login') || this.url.includes('register')) {
            return true;
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.url = state.url;

        if (this.auth.isAuthenticated()) {
           return this.handleAuthState();       
        }

        return this.handleNotAuthState();
    }
}