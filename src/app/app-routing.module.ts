import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {LoginadminComponent} from "./components/loginadmin/loginadmin.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeCitizenComponent} from "./components/home-citizen/home-citizen.component";
import {PaymentComponent} from "./components/payment/payment.component";
import {DisposalComponent} from "./components/disposal/disposal.component";
import {InfoCitizenComponent} from "./components/info-citizen/info-citizen.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

import {HomeAdminAziendaleComponent} from "./components/home-admin-aziendale/home-admin-aziendale.component";
import {InfoAdminAziendaleComponent} from "./components/info-admin-aziendale/info-admin-aziendale.component";
import {HomeAdminComunaleComponent} from "./components/home-admin-comunale/home-admin-comunale.component";
import {InfoAdminComunaleComponent} from "./components/info-admin-comunale/info-admin-comunale.component";
import {EmitPaymentComponent} from "./components/emit-payment/emit-payment.component";
import {CreateDumpsterComponent} from "./components/create-dumpster/create-dumpster.component";
import {PerformanceCitizenComponent} from "./components/performance-citizen/performance-citizen.component";
import {ResearchCitizenComponent} from "./components/research-citizen/research-citizen.component";
import {PaymentsTableComponent} from "./components/payments-table/payments-table.component";
import {MapComponent} from "./components/map/map.component";


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {path: 'login' , component : LoginComponent},
      {path:'loginadmin', component: LoginadminComponent},
      {path:'signup', component: SignupComponent},
      {path:'', component: WelcomeComponent}
    ]
  },
  {
    path:'citizen',
    component: HomeCitizenComponent,
    children: [
      {path: 'payments' , component : PaymentComponent},
      {path:'disposals', component: DisposalComponent},
      {path: '' , component : InfoCitizenComponent}
    ]
  },
  {
    path:'adminAziendale',
    component: HomeAdminAziendaleComponent,
    children: [
        {path: '' , component : InfoAdminAziendaleComponent},
        {path: 'map' , component : MapComponent}
    ]
  },
  {
    path:'adminComunale',
    component: HomeAdminComunaleComponent,
    children: [
      {path: '' , component : InfoAdminComunaleComponent},
      {path: 'payment' , component : EmitPaymentComponent},
      {path: 'payments' , component : ResearchCitizenComponent, children: [{path: '' , component : PaymentsTableComponent}]},
      {path: 'dumpster' , component : CreateDumpsterComponent},
      {path: 'citizens' , component : PerformanceCitizenComponent}
    ]
  }
  ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
