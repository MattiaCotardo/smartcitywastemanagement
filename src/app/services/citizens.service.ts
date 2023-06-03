import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Citizen} from "../models/citizen";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  constructor(private http:HttpClient, private router: Router) {

  }

  loginCitizen(email: string, password: string) {

    const url = 'http://localhost:8080/api/citizens/authenticate'; // URL di destinazione
    const data = {email: email, password: password}; // Dati da inviare come corpo della richiesta
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    }

    this.http.post(url, data, httpOptions).subscribe(
      response => {
        console.log('Richiesta POST effettuata con successo', response);
        localStorage.setItem('currentCitizen', JSON.stringify(response))
      },
      error => {
        console.error('Errore durante la richiesta POST', error);
      }
    );

  }

  signUpCitizen(citizen: Citizen){

    const url = 'http://localhost:8080/api/citizens/'; // URL di destinazione
    const data = { nome: citizen.nome, cognome: citizen.cognome, email: citizen.email, comune: citizen.comune, password: citizen.password, performance: citizen.performance, da_sensibilizzare: citizen.daSensibilizzare }; // Dati da inviare come corpo della richiesta
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    }

    this.http.post(url, data, httpOptions).subscribe(
      response => {

        console.log('Richiesta POST effettuata con successo', response);

        localStorage.setItem('currentCitizen', JSON.stringify(response))
        //this.router.navigate(['']);
        // Cambio component

      },
      error => {
        console.error('Errore durante la richiesta POST', error);
        // Gestisci l'errore qui
      }
    );

  }

}
