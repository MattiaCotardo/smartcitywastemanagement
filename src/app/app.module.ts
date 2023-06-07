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
import { HomeAdminAziendaleComponent } from './components/home-admin-aziendale/home-admin-aziendale.component';
import { InfoAdminAziendaleComponent } from './components/info-admin-aziendale/info-admin-aziendale.component';
import { HomeAdminComunaleComponent } from './components/home-admin-comunale/home-admin-comunale.component';
import { InfoAdminComunaleComponent } from './components/info-admin-comunale/info-admin-comunale.component';
import { EmitPaymentComponent } from './components/emit-payment/emit-payment.component';
import { CreateDumpsterComponent } from './components/create-dumpster/create-dumpster.component';
import { PerformanceCitizenComponent } from './components/performance-citizen/performance-citizen.component';
import { ResearchCitizenComponent } from './components/research-citizen/research-citizen.component';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { MapComponent } from './components/map/map.component';
import {StatusComponent} from "./components/status/status.component";

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
    WelcomeComponent,
    HomeAdminAziendaleComponent,
    InfoAdminAziendaleComponent,
    HomeAdminComunaleComponent,
    InfoAdminComunaleComponent,
    EmitPaymentComponent,
    CreateDumpsterComponent,
    PerformanceCitizenComponent,
    ResearchCitizenComponent,
    PaymentsTableComponent,
    MapComponent,
    StatusComponent
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
