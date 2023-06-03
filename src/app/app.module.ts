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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoginadminComponent,
    SignupComponent,
    HomeCitizenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [CitizensService],
  bootstrap: [AppComponent]
})
export class AppModule { }
