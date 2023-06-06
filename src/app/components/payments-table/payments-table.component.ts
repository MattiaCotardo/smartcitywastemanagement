import { Component } from '@angular/core';
import {CitizensService} from "../../services/citizens.service";
import {ResearchCitizenComponent} from "../research-citizen/research-citizen.component";
import {Payment} from "../../models/payment";
import {AdminsService} from "../../services/admins.service";

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss']
})
export class PaymentsTableComponent {

  paymentsArray: Payment[] | null = [];

  constructor(private citizensService:CitizensService, private adminsService:AdminsService) {
  }
  async ngOnInit() {
    if(localStorage.getItem("searchedEmail") !== "") {
      this.paymentsArray = await this.citizensService.getPaymentsByEmail(localStorage.getItem("searchedEmail"))
    } else{
      this.paymentsArray = await this.adminsService.getPaymentsByComune(localStorage.getItem("currentAdminCity"))
    }
    localStorage.setItem("searchedEmail", "")
  }

}
