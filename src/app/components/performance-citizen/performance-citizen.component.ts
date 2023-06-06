import { Component } from '@angular/core';
import {Payment} from "../../models/payment";
import {Citizen} from "../../models/citizen";
import {CitizensService} from "../../services/citizens.service";

@Component({
  selector: 'app-performance-citizen',
  templateUrl: './performance-citizen.component.html',
  styleUrls: ['./performance-citizen.component.scss']
})
export class PerformanceCitizenComponent {
  citizenArray: Citizen[] | null = [];
  numeratore: number = 0
  denominatore: number = 0
  performanceAggregate: number = 0
  comune: string|null = "";

  constructor(private citizensService:CitizensService) {
  }

  async ngOnInit() {
    this.citizenArray = await this.citizensService.getCitizensByComune(localStorage.getItem("currentAdminCity"))
    this.comune = localStorage.getItem("currentAdminCity")
    if(this.citizenArray!= null){

      for (let i = 0; i < this.citizenArray.length; i++) {
        this.numeratore = this.citizenArray[i].performance + this.numeratore;
        this.denominatore = this.denominatore + 100;
        this.citizenArray[i].performance = parseFloat(this.citizenArray[i].performance.toFixed(2))
      }
      this.performanceAggregate = (this.numeratore / this.denominatore) * 100
      this.performanceAggregate = parseFloat(this.performanceAggregate.toFixed(2))
    }
  }
}
