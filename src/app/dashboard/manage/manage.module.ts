import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';

//components
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { ManageComponent } from './manage.component';
import { ManageRentalBookingComponent } from './manage-rentals/manage-rental-booking/manage-rental-booking.component';

//services
import { ManageService } from './manage.service';

@NgModule({
    declarations: [
        ManageBookingsComponent,
        ManageRentalsComponent,
        ManageComponent,
        ManageRentalBookingComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        ManageService
    ],
    entryComponents: [
        ManageRentalBookingComponent
    ]
})

export class ManageModule { }

