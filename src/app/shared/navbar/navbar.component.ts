import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    @Input() title: string;
    search: string = '';
    constructor(
        private authS: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    menuClick() {
        // document.getElementById('main-panel').style.marginRight = '260px';
    }

    logout() {
        this.authS.logout();
        this.router.navigate(['/login']);
    }

    redirectSearchResult() {
        this.router.navigate([`/dashboard/rental/${this.search}/homes`]);
    }
}
