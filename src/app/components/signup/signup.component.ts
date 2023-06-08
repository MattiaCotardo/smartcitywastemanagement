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

  citizenTestOrNull: Citizen | null = null;

  cities: string[] = ["Lecce", "Milano", "Roma"];

  btnDisabled: boolean = false;

  constructor(private citizensService:CitizensService, private homeComponent:HomeComponent) {
  }

  ngOnInit(){
    this.btnDisabled = false;
  }

  async onSubmit(citizenForm: any) {

    this.btnDisabled = true;

    this.citizenTestOrNull = await this.citizensService.getCitizenByEmail(this.citizen.email);

    if(this.citizenTestOrNull?.email == undefined){


      this.citizen.performance = 100;
      this.citizen.daSensibilizzare = 0;
      this.citizensService.signUpCitizen(this.citizen);

    }else{

      window.alert("L'email è già utilizzata");

    }

    this.btnDisabled = false;

  }

}
