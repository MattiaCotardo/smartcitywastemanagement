import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Citizen} from "../models/citizen";
import {Router} from "@angular/router";
import axios from 'axios';
import {Payment} from "../models/payment";


@Injectable({
  providedIn: 'root'
})
export class CitizensService {

  citizen:Citizen = {} as Citizen

  constructor(private http:HttpClient, private router: Router) {

  }

  async loginCitizen(email: string, password: string): Promise<number> {
    try {
      const data = {email: email, password: password};
      const response = await axios.post('http://localhost:8080/api/citizens/authenticate', data);
      const responseString = JSON.stringify(response.data);

      // Verifica se la richiesta è andata bene
      if (response.status === 200) {
        const jsonObject = JSON.parse(responseString);
        localStorage.setItem('tokenCitizen', JSON.stringify(jsonObject))
        localStorage.setItem('emailCitizen', email)
        this.router.navigate(['citizen'])
        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
  }


  async getCitizenByEmail(email: string|null)  : Promise<Citizen|null> {
    const apiUrl = 'http://localhost:8080/api/citizens/findByEmail?email='+ email

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: ``,
        },
      });
      const citizen: Citizen = response.data;
      return citizen;

    } catch (error) {
      return null;
    }
  }

  async getPaymentsByEmail(email: string|null)  : Promise<Payment[]|null> {
    const apiUrl = 'http://localhost:8084/api/payments/findByEmail?email='+ email

    try {
      var token = JSON.parse(localStorage.getItem('tokenCitizen')!)
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });
      const payments: Payment[] = response.data;
      console.log(payments)
      return payments;

    } catch (error) {
      return null;
    }
  }

  async payById(id: string|undefined): Promise<number> {
    try {
      const data = {id: id};
      var token = JSON.parse(localStorage.getItem('tokenCitizen')!)
      const response = await axios.post('http://localhost:8084/api/payments/pay', data, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });
      // Verifica se la richiesta è andata bene
      if (response.status === 200) {

        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
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


        this.router.navigate([''])
      },
      error => {
        console.error('Errore durante la richiesta POST', error);
        // Gestisci l'errore qui
      }
    );

  }



}
