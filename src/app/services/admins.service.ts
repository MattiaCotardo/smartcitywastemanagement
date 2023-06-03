import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http:HttpClient) {

  }

  loginAdmin(email: string, password: string){

    const url = 'http://localhost:8081/api/admins/authenticate'; // URL di destinazione
    const data = { email: email, password: password }; // Dati da inviare come corpo della richiesta
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    }

    this.http.post(url, data, httpOptions).subscribe(
      response => {
        console.log('Richiesta POST effettuata con successo', response);

        localStorage.setItem('currentAdmin', JSON.stringify(response))
      },
      error => {
        console.error('Errore durante la richiesta POST', error);
        // Gestisci l'errore qui
      }
    );

  }
}
