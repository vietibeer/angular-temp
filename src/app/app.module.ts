import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import 'hammerjs';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationComponent } from './dashboard/notification/notification.component';
import { SweetAlertComponent } from './dashboard/sweetalert/sweetalert.component';
import { LoginComponent } from './page/login/login.component';
import { RootComponent } from './dashboard/root/root.component';
import { RegisterComponent } from './page/register/register.component';
import { LockComponent } from './page/lock/lock.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { PriceTableComponent } from './dashboard/component/pricetable/pricetable.component';
import { PanelsComponent } from './dashboard/component/panels/panels.component';
import { WizardComponent } from './dashboard/component/wizard/wizard.component';
import { SettingsService } from './services/settings.service';
import { RentalService } from './dashboard/rental/rental.service';
import { RentalModule } from './dashboard/rental/rental.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { RentalComponent } from './dashboard/rental/rental.component';
import { RentalListComponent } from './dashboard/rental/rental-list/rental-list.component';
import { RentalDetailComponent } from './dashboard/rental/rental-detail/rental-detail.component';
import { RentalListItemComponent } from './dashboard/rental/rental-list-item/rental-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ProfileComponent,
    TableComponent,
    NotificationComponent,
    SweetAlertComponent,
    LoginComponent,
    RootComponent,
    RegisterComponent,
    LockComponent,
    SettingsComponent,
    PriceTableComponent,
    PanelsComponent,
    WizardComponent,
    // RentalComponent,
    // RentalListComponent,
    // RentalDetailComponent,
    // RentalListItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    RentalModule,
    SharedModule,
  ],
  providers: [
    SettingsService,
    RentalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
