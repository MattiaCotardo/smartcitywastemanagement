import {Component, ViewChild} from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('citizenForm') form:any;

  citizen:Citizen = {} as Citizen

  constructor(private citizensService:CitizensService, private route:Router) {
  }

  onSubmit(citizenForm: any) {
    //let res = this.citizensService.loginCitizen(this.citizen.email, this.citizen.password);
    console.log(this.citizensService.loginCitizen(this.citizen.email, this.citizen.password))
  }

}
