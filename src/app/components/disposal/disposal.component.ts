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

  dumpsters: Dumpster[]|null = []

  dumpster: Dumpster = {} as Dumpster;

  btnDisabled: boolean = false;

  async ngOnInit() {
    this.dumpsters = await this.dumpstersService.getAllDumpsters();
    this.btnDisabled = false;
  }

  async onSubmit(addWasteForm: any) {

    this.btnDisabled = true;

    this.disposal.idCassonetto = addWasteForm.form.value.id;
    if(this.dumpsters!=null) {
      for (let i = 0; i < this.dumpsters.length; i++) {
        if (this.dumpsters[i].id === this.disposal.idCassonetto) {
          this.disposal.tipologia = this.dumpsters[i].tipologia;
          break; // Interrompi il ciclo quando viene trovato l'oggetto desiderato
        }
      }
    }
    this.disposal.peso = addWasteForm.form.value.peso;
    const currentDate = new Date();
    this.disposal.giorno = currentDate.getDate();
    this.disposal.mese = currentDate.getMonth() + 1;
    this.disposal.anno = currentDate.getFullYear();
    this.disposal.emailCittadino = localStorage.getItem("emailCitizen");

    var code = await this.dumpstersService.addDisposal(this.disposal);

    this.btnDisabled = false;
  }
}
