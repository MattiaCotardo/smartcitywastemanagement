import {Component, ViewChild} from '@angular/core';
import {Disposal} from "../../models/disposal";
import {Dumpster} from "../../models/dumpster";
import {DumpstersService} from "../../services/dumpsters.service";

@Component({
  selector: 'app-create-dumpster',
  templateUrl: './create-dumpster.component.html',
  styleUrls: ['./create-dumpster.component.scss']
})
export class CreateDumpsterComponent {

  constructor(private dumpstersService: DumpstersService) {}

  @ViewChild('addDumpsterForm') form:any;
  dumpster:Dumpster = {} as Dumpster

  types: string[] = ["carta", "indifferenziata", "plastica", "vetro", "metalli", "umido"];
  btnDisabled: boolean = false;

  ngOnInit() {
    this.dumpster.comune = localStorage.getItem("currentAdminCity");
    this.btnDisabled = false;
  }

  async onSubmit(addDumpsterForm: any) {

    this.btnDisabled = true;

    this.dumpster.tipologia = addDumpsterForm.form.value.typeSelect;
    this.dumpster.x = addDumpsterForm.form.value.x;
    this.dumpster.y = addDumpsterForm.form.value.y;
    this.dumpster.stato=0;

    var code = await this.dumpstersService.addDumpster(this.dumpster);

    this.btnDisabled = false;
  }
}
