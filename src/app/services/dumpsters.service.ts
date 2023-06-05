import { Injectable } from '@angular/core';
import {Citizen} from "../models/citizen";
import axios from "axios";
import {Dumpster} from "../models/dumpster";

@Injectable({
  providedIn: 'root'
})
export class DumpstersService {

  constructor() { }

  async getAllDumpsters()  : Promise<Dumpster[]|null> {
    const apiUrl = 'http://localhost:8082/api/dumpsters/findAll'

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: ``,
        },
      });
      const dumpsters: Dumpster[] = response.data;
      return dumpsters;

    } catch (error) {
      var dumpsters: Dumpster[]|null = null
      return dumpsters

    }
  }

  async addDisposal(dumpsterSelezionato: Dumpster, pesoInserito: number)  {
    console.log(dumpsterSelezionato.tipologia)
    console.log(pesoInserito)
    console.log(dumpsterSelezionato.id)
  }
    /*
    const apiUrl = 'http://localhost:8082/api/dumpsters/findAll'

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: ``,
        },
      });
      const dumpsters: Dumpster[] = response.data;
      return dumpsters;

    } catch (error) {
      var dumpsters: Dumpster[]|null = null
      return dumpsters

    }
  }
  */


}
