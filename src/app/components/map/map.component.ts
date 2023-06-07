import { Component } from '@angular/core';
import {Dumpster} from "../../models/dumpster";
import {DumpstersService} from "../../services/dumpsters.service";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  dumpsters: Dumpster[] | null = []; // Array per contenere i dumpsters
  cities: string[] = ["Lecce", "Milano", "Roma"];
  selectedCity: string = {} as string;
  imagePath: string = {} as string;
  dumpstersToClean: string[] = []

  isInfoVisible: boolean = false;
  infoContent: string = '';
  infoWindowLeft: number = 0;
  infoWindowTop: number = 0;

  constructor(private dumpstersService: DumpstersService) { }

  async ngOnInit() {
    this.selectedCity="Lecce";
    this.imagePath = "/assets/lecce.png";
    this.dumpsters = await this.dumpstersService.getDumpstersByComune(this.selectedCity);
  }

  async onCityChange(){
    if (this.selectedCity == "Lecce"){
      this.imagePath = "/assets/lecce.png";
    }else if(this.selectedCity == "Milano"){
      this.imagePath = "/assets/milano.png";
    }else{
      this.imagePath = "/assets/roma.png";
    }

    this.dumpsters = await this.dumpstersService.getDumpstersByComune(this.selectedCity);

  }

  onMarkerClick(dumpster: any){
    if(!this.dumpstersToClean.includes(dumpster.id)){
      this.dumpstersToClean.push(dumpster.id);
    }
  }

  onMarkerMouseOver(event: MouseEvent, dumpster: any) {
    this.isInfoVisible = true;
    this.infoContent = "ID: " + dumpster.id + "\nStato: " + dumpster.stato + "\nTipologia: " + dumpster.tipologia;
    this.infoWindowLeft = event.clientX + 10; // Aggiungi un offset di 10px per spostare la finestra delle informazioni leggermente a destra del cursore
    this.infoWindowTop = event.clientY + 10; // Aggiungi un offset di 10px per spostare la finestra delle informazioni leggermente sotto il cursore
  }

  onMarkerMouseOut() {
    this.isInfoVisible = false;
    this.infoContent = '';
  }

  async clean(){
    await this.dumpstersService.clean(this.dumpstersToClean);
  }
}
