import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//components
import { FigurecardComponent } from './figurecard/figurecard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImagecardComponent } from './imagecard/imagecard.component';
import { LoadingComponent } from './loading/loading.component';
import { MsgIconBtnComponent } from './msgiconbtn/msgiconbtn.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatRadioModule, MatInputModule, MatMenuModule, MatCheckboxModule } from '@angular/material';

// import { CustomerComponent } from './customer.component';
// import { NewItemDirective } from './new-item.directive';
// import { OrdersPipe } from './orders.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
    ],
    declarations: [
        FigurecardComponent,
        FooterComponent,
        HeaderComponent,
        ImagecardComponent,
        LoadingComponent,
        MsgIconBtnComponent,
        NavbarComponent
    ],
    exports: [
        FigurecardComponent,
        FooterComponent,
        HeaderComponent,
        ImagecardComponent,
        LoadingComponent,
        MsgIconBtnComponent,
        NavbarComponent,
        CommonModule,
        FormsModule,
        RouterModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatMenuModule,
        MatCheckboxModule,
    ]
})
export class SharedModule { }