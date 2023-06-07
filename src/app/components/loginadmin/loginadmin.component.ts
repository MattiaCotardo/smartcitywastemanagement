import {Component, ViewChild} from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Router} from "@angular/router";
import {Admin} from "../../models/admin";
import {AdminsService} from "../../services/admins.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.scss']
})
export class LoginadminComponent {

  @ViewChild('adminForm') form:any;

  admin:Admin = {} as Admin

  statusCode: number = 0


  constructor(private adminsService:AdminsService, private homeComponent:HomeComponent) {
  }

  async onSubmit(citizenForm: any) {
    //let res = this.citizensService.loginCitizen(this.citizen.email, this.citizen.password);
    this.statusCode = await this.adminsService.loginAdmin(this.admin.email, this.admin.password)
    console.log(this.statusCode)
  }


}