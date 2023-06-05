import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CitizensService} from "./services/citizens.service";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginadminComponent } from './components/loginadmin/loginadmin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeCitizenComponent } from './components/home-citizen/home-citizen.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DisposalComponent } from './components/disposal/disposal.component';
import { InfoCitizenComponent } from './components/info-citizen/info-citizen.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {DumpstersService} from "./services/dumpsters.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginadminComponent,
    SignupComponent,
    HomeCitizenComponent,
    PaymentComponent,
    DisposalComponent,
    InfoCitizenComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [CitizensService, DumpstersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
