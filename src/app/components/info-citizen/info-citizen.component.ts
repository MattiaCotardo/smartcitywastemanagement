import { Component } from '@angular/core';
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";

@Component({
  selector: 'app-info-citizen',
  templateUrl: './info-citizen.component.html',
  styleUrls: ['./info-citizen.component.scss']
})
export class InfoCitizenComponent {

  citizenOrNull: Citizen | null = null;

  constructor(private citizensService:CitizensService) {
  }
  async ngOnInit() {
    this.citizenOrNull = await this.citizensService.getCitizenByEmail(localStorage.getItem("emailCitizen"))
    if(this.citizenOrNull!=null){
    this.citizenOrNull.performance = parseFloat(this.citizenOrNull.performance.toFixed(2))
    }
  }
}
