import { Injectable } from '@angular/core';
import {Citizen} from "../models/citizen";
import axios from "axios";
import {Dumpster} from "../models/dumpster";
import {Disposal} from "../models/disposal";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DumpstersService {

  constructor(private http:HttpClient, private router: Router) { }

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

  async addDisposal(disposal:Disposal): Promise<number> {
    try {
      const data = {tipologia: disposal.tipologia, idCassonetto:disposal.idCassonetto, giorno:disposal.giorno, mese:disposal.mese, anno:disposal.anno, peso:disposal.peso, emailCitizen:disposal.emailCittadino};
      var token = JSON.parse(localStorage.getItem('tokenCitizen')!)
      const response = await axios.post('http://localhost:8083/api/wastes/', data, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });

      // Verifica se la richiesta è andata bene
      if (response.status === 200) {
        this.router.navigate(['citizen'])
        window.alert("Conferimento aggiunto con successo");
        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
  }

  async addDumpster(dumpster:Dumpster): Promise<number> {
    try {
      const data = {tipologia: dumpster.tipologia, stato:dumpster.stato, x:dumpster.x, y:dumpster.y, comune:dumpster.comune};
      var token = JSON.parse(localStorage.getItem('tokenAdmin')!)
      const response = await axios.post('http://localhost:8082/api/dumpsters/', data, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });

      // Verifica se la richiesta è andata bene
      if (response.status === 200) {
        this.router.navigate(['adminComunale'])
        window.alert("Cassonetto aggiunto con successo");
        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
  }

}
