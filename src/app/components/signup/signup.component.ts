import {Component, ViewChild} from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @ViewChild('signUpForm') form:any;

  citizen:Citizen = {} as Citizen

  constructor(private citizensService:CitizensService, private route:Router) {
  }

  onSubmit(citizenForm: any) {
    this.citizen.performance = 100;
    this.citizen.daSensibilizzare = 0;
    this.citizensService.signUpCitizen(this.citizen);
  }

}
