import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalBookingComponent } from './rental-booking/rental-booking.component';

//services
import { RentalService } from './rental.service';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        RentalComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        RentalBookingComponent,
    ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
        RentalService
    ]
})

export class RentalModule { }

