/**
 * Created by wangdi on 26/5/17.
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent } from './dashboard/component/panels/panels.component';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';
import { RootComponent } from './dashboard/root/root.component';
import { LoginComponent } from './page/login/login.component';
import { LockComponent } from './page/lock/lock.component';
import { RegisterComponent } from './page/register/register.component';
import { RentalComponent } from './dashboard/rental/rental.component';
import { RentalListComponent } from './dashboard/rental/rental-list/rental-list.component';
import { RentalDetailComponent } from './dashboard/rental/rental-detail/rental-detail.component';
import { RentalSearchResultComponent } from './dashboard/rental/rental-search-result/rental-search-result.component';
import { RentalCreateComponent } from './dashboard/rental/rental-create/rental-create.component';
import { ManageComponent } from './dashboard/manage/manage.component';
import { ManageRentalsComponent } from './dashboard/manage/manage-rentals/manage-rentals.component';
import { ManageBookingsComponent } from './dashboard/manage/manage-bookings/manage-bookings.component';

import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'lock', component: LockComponent, canActivate: [AuthGuard] },
    {
        path: 'dashboard', component: RootComponent, canActivate: [AuthGuard], children: [
            { path: '', component: HomeComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'table', component: TableComponent },
            { path: 'notification', component: NotificationComponent },
            { path: 'alert', component: SweetAlertComponent },
            { path: 'settings', component: SettingsComponent },
            {
                path: 'components', children: [
                    { path: 'price-table', component: PriceTableComponent },
                    { path: 'panels', component: PanelsComponent },
                    { path: 'wizard', component: WizardComponent },
                ]
            },
            {
                path: 'rental', component: RentalComponent, children: [
                    { path: '', component: RentalListComponent },
                    { path: 'detail/:id', component: RentalDetailComponent },
                    { path: ':id/edit', component: RentalDetailComponent },
                    { path: ':position/homes', component: RentalSearchResultComponent },
                    { path: 'new', component: RentalCreateComponent },
                ]
            },
            {
                path: 'manage', component: ManageComponent, children: [
                    { path: 'rentals', component: ManageRentalsComponent },
                    { path: 'bookings', component: ManageBookingsComponent }
                ]
            }
        ]
    },
    { path: '**', redirectTo: 'dashboard' }
];

