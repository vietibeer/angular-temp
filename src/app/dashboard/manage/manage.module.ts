import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

//components
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { ManageComponent } from './manage.component';

//services
import { ManageService } from './manage.service';

@NgModule({
    declarations: [
        ManageBookingsComponent,
        ManageRentalsComponent,
        ManageComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        ManageService
    ]
})

export class ManageModule { }

