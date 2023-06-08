import {Component, ViewChild} from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Router} from "@angular/router";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @ViewChild('signUpForm') form:any;

  citizen:Citizen = {} as Citizen;

  cities: string[] = ["Lecce", "Milano", "Roma"];

  btnDisabled: boolean = false;

  constructor(private citizensService:CitizensService, private homeComponent:HomeComponent) {
  }

  ngOnInit(){
    this.btnDisabled = false;
  }
  onSubmit(citizenForm: any) {
    this.btnDisabled = true;

    this.citizen.performance = 100;
    this.citizen.daSensibilizzare = 0;
    this.citizensService.signUpCitizen(this.citizen);

    this.btnDisabled = false;

  }

}
