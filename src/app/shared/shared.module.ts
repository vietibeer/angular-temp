// modules core
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule, MatSelectModule } from '@angular/material';

//components
import { FigurecardComponent } from './figurecard/figurecard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImagecardComponent } from './imagecard/imagecard.component';
import { LoadingComponent } from './loading/loading.component';
import { MsgIconBtnComponent } from './msgiconbtn/msgiconbtn.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';

// modules
import { NgPipesModule } from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { Daterangepicker } from 'ng2-daterangepicker';

// import { CustomerComponent } from './customer.component';
// import { NewItemDirective } from './new-item.directive';
// import { OrdersPipe } from './orders.pipe';

// pipes
import { CamelizePipe } from "ngx-pipes";  //If you want to use pipe's transform() method in component, you also need to add CustomPipe to module's providers:

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
        MapComponent
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
        NgPipesModule,
        AgmCoreModule,
        Daterangepicker
    ],
    providers: [CamelizePipe]
})
export class SharedModule { }