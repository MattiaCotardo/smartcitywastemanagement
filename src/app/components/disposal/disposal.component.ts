import {Component, ViewChild} from '@angular/core';
import {Disposal} from "../../models/disposal";
import {Dumpster} from "../../models/dumpster";
import {DumpstersService} from "../../services/dumpsters.service";

@Component({
  selector: 'app-disposal',
  templateUrl: './disposal.component.html',
  styleUrls: ['./disposal.component.scss']
})
export class DisposalComponent {
  constructor(private dumpstersService: DumpstersService) {
  }

  @ViewChild('addWasteForm') form:any;
  disposal:Disposal = {} as Disposal

  dumpsters: Dumpster[]|null = {} as Dumpster[]

  dumpster: Dumpster = {} as Dumpster;
  pesoInserito: any;
  types: string[] = ["plastica", "carta", "plastica", "umido", "vetro", "metallo", "indifferenziato"];

  async ngOnInit() {
    this.dumpsters = await this.dumpstersService.getAllDumpsters()
  }

  onSubmit(addWasteForm: any) {

    this.disposal.id = addWasteForm.form.value.id;
    if(this.dumpsters!=null) {
      for (let i = 0; i < this.dumpsters.length; i++) {
        if (this.dumpsters[i].id === this.disposal.id) {
          this.disposal.tipologia = this.dumpsters[i].tipologia
          break; // Interrompi il ciclo quando viene trovato l'oggetto desiderato
        }
      }
    }
    this.disposal.peso = addWasteForm.form.value.peso;
    const currentDate = new Date();
    this.disposal.giorno = currentDate.getDate();
    this.disposal.mese = currentDate.getMonth() + 1;
    this.disposal.anno = currentDate.getFullYear();
    this.disposal.emailCittadino = localStorage.getItem("emailCitizen")

    console.log(this.disposal.giorno+"/"+this.disposal.mese+"/"+this.disposal.anno);
    console.log(this.disposal.id)
    console.log(this.disposal.peso)
    console.log(this.disposal.emailCittadino)
    console.log(this.disposal.tipologia)
  }
}
