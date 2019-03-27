import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//components
import { FigurecardComponent } from './figurecard/figurecard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImagecardComponent } from './imagecard/imagecard.component';
import { LoadingComponent } from './loading/loading.component';
import { MsgIconBtnComponent } from './msgiconbtn/msgiconbtn.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MapComponent } from './map/map.component';

//module
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { NgPipesModule } from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
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
        AgmCoreModule,
        NgPipesModule
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
        NgPipesModule,
        AgmCoreModule
    ],
    providers: [CamelizePipe]
})
export class SharedModule { }