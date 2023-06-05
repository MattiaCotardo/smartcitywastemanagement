import {Component, ViewChild} from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {HomeComponent} from "../home/home.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('citizenForm') form:any;

  citizen:Citizen = {} as Citizen

  statusCode: number = 0

  constructor(private citizensService:CitizensService, private homeComponent:HomeComponent) {
  }

  async onSubmit(citizenForm: any) {
    //let res = this.citizensService.loginCitizen(this.citizen.email, this.citizen.password);
    this.statusCode = await this.citizensService.loginCitizen(this.citizen.email, this.citizen.password)
    console.log(this.statusCode)
  }



}
