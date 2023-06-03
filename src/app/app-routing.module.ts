import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {LoginadminComponent} from "./components/loginadmin/loginadmin.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeCitizenComponent} from "./components/home-citizen/home-citizen.component";


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {path: 'login' , component : LoginComponent},
      {path:'loginadmin', component: LoginadminComponent},
      {path:'signup', component: SignupComponent}
    ]
  },
  {
    path:'citizen',
    component: HomeCitizenComponent
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
