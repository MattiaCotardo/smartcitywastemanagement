import {Component, ViewChild} from '@angular/core';

import {Payment} from "../../models/payment";
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Admin} from "../../models/admin";
import {AdminsService} from "../../services/admins.service";

@Component({
  selector: 'app-emit-payment',
  templateUrl: './emit-payment.component.html',
  styleUrls: ['./emit-payment.component.scss']
})
export class EmitPaymentComponent {
  constructor(private adminService: AdminsService, private citizenService: CitizensService) {
  }

  @ViewChild('addPaymentForm') form:any;

  citizen: Citizen = {} as Citizen;

  citizens: Citizen[]|null = [];

  payment: Payment = {} as Payment;

  btnDisabled: boolean = false;

  async ngOnInit() {

    this.btnDisabled = false;

    this.citizens = await this.citizenService.getCitizensByComune(localStorage.getItem("currentAdminCity"));

    const currentDate = new Date();
    this.payment.giornoScadenza = currentDate.getDate();
    this.payment.meseScadenza = currentDate.getMonth() + 1;
    this.payment.annoScadenza = currentDate.getFullYear() + 1;
  }

  async onSubmit(addPaymentForm: any) {

    this.btnDisabled = true;

    this.payment.emailCittadino = addPaymentForm.form.value.citizenSelect;
    this.payment.importo = addPaymentForm.form.value.amount;
    this.payment.daPagare = 1;

    var code = await this.adminService.addPayment(this.payment);

    this.btnDisabled = false;
  }

}
