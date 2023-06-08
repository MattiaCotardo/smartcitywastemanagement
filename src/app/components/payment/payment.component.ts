import { Component } from '@angular/core';
import {AdminsService} from "../../services/admins.service";
import {HomeComponent} from "../home/home.component";
import {CitizensService} from "../../services/citizens.service";
import {HomeCitizenComponent} from "../home-citizen/home-citizen.component";
import {Citizen} from "../../models/citizen";
import {Payment} from "../../models/payment";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  paymentsArray: Payment[] | null = [];

  btnDisabled: boolean = false;


  constructor(private citizensService:CitizensService) {
  }
  async ngOnInit() {
    this.btnDisabled = false;
    this.paymentsArray = await this.citizensService.getPaymentsByEmail(localStorage.getItem("emailCitizen"))
  }

  async pay(id: string|undefined) {
    this.btnDisabled = true;
    await this.citizensService.payById(id)
    this.paymentsArray = await this.citizensService.getPaymentsByEmail(localStorage.getItem("emailCitizen"));
    this.btnDisabled = false;
  }
}
