import { Component } from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";
import {Router} from "@angular/router";
import {PaymentsTableComponent} from "../payments-table/payments-table.component";

@Component({
  selector: 'app-research-citizen',
  templateUrl: './research-citizen.component.html',
  styleUrls: ['./research-citizen.component.scss']
})
export class ResearchCitizenComponent {

  citizenArray: Citizen[] | null = [];
  citizen: Citizen = {} as Citizen

  constructor(private citizensService:CitizensService, private router: Router) {
  }

  async ngOnInit() {
    this.citizenArray = await this.citizensService.getCitizensByComune(localStorage.getItem("currentAdminCity"))
  }

  onSubmit(researchForm: any) {
    localStorage.setItem('searchedEmail', researchForm.form.value.citizenSelect)
    location.reload()
  }



}
