import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { ROUTES, ROUTES_CHILD_NO_SIDEBAR } from './sidebar-routes.config';
import { Router, ChildActivationStart, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
    public color: string;
    public menuItems: object;
    public activeFontColor: string;
    public normalFontColor: string;
    public dividerBgColor: string;
    public childPath: string = '';
    constructor(
        public settingsService: SettingsService,
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) {
        this.menuItems = ROUTES;
        this.activeFontColor = 'rgba(0,0,0,.6)';
        this.normalFontColor = 'rgba(255,255,255,.8)';
        this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';

        router.events.subscribe((event: any) => {
            if (event instanceof ChildActivationStart) {

                if (event.snapshot.routeConfig === null) {
                    return;
                }

                const parentPath = event.snapshot.routeConfig.path;
                const childPath = event.snapshot.routeConfig.children;

                if (this.childPath && this.childPath !== parentPath) {
                    this.childPath = '';
                    return;
                }

                for (const path of childPath) {
                    const convertChildPath = path.path ? `/${path.path}` : '';
                    const fullPath = `${parentPath}${convertChildPath}`;
                    if (ROUTES_CHILD_NO_SIDEBAR.indexOf(fullPath) > -1) {
                        this.childPath = parentPath;
                        break;
                    }
                }
            }
        });
    }

    ngOnInit() {
        this.color = this.settingsService.getSidebarFilter();
        this.settingsService.sidebarFilterUpdate.subscribe((filter: string) => {
            this.color = filter;
            if (filter === '#fff') {
                this.activeFontColor = 'rgba(0,0,0,.6)';
            } else {
                this.activeFontColor = 'rgba(255,255,255,.8)';
            }
        });
        this.settingsService.sidebarColorUpdate.subscribe((color: string) => {
            if (color === '#fff') {
                this.normalFontColor = 'rgba(0,0,0,.6)';
                this.dividerBgColor = 'rgba(0,0,0,.1)';
            } else {
                this.normalFontColor = 'rgba(255,255,255,.8)';
                this.dividerBgColor = 'rgba(255, 255, 255, 0.5)';
            }
        });
    }
    ngOnDestroy() {
        // this.settingsService.sidebarFilterUpdate.unsubscribe();
        // this.settingsService.sidebarColorUpdate.unsubscribe();
    }

    ngAfterViewInit() {
    }
}
