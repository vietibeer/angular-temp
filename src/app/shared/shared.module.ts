// modules core
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule, MatSelectModule, MatIconModule, MatToolbarModule, MatDividerModule, MatDialogModule } from '@angular/material';

//components
import { FigurecardComponent } from './figurecard/figurecard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImagecardComponent } from './imagecard/imagecard.component';
import { LoadingComponent } from './loading/loading.component';
import { MsgIconBtnComponent } from './msgiconbtn/msgiconbtn.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';
import { PaymentComponent } from 'app/dashboard/payment/payment.component';

// modules
import { NgPipesModule } from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { Daterangepicker } from 'ng2-daterangepicker';

// pipes
import { CamelizePipe } from "ngx-pipes";  //If you want to use pipe's transform() method in component, you also need to add CustomPipe to module's providers:
import { FormatDatePipe } from 'app/pipes/format-date.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatDialogModule,
        AgmCoreModule,
        NgPipesModule,
        Daterangepicker
    ],
    declarations: [
        FigurecardComponent,
        FooterComponent,
        HeaderComponent,
        ImagecardComponent,
        LoadingComponent,
        MsgIconBtnComponent,
        NavbarComponent,
        MapComponent,
        PaymentComponent,
        FormatDatePipe
    ],
    exports: [
        // components
        FigurecardComponent,
        FooterComponent,
        HeaderComponent,
        ImagecardComponent,
        LoadingComponent,
        MsgIconBtnComponent,
        NavbarComponent,
        MapComponent,
        PaymentComponent,

        // module
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        MatDividerModule,
        MatDialogModule,
        NgPipesModule,
        AgmCoreModule,
        Daterangepicker,
        FormatDatePipe
    ],
    providers: [CamelizePipe]
})
export class SharedModule { }