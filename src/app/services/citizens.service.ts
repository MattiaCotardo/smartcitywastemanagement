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
      const response = await axios.post('https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/citizens/authenticate', data);
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
    const apiUrl = 'https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/citizens/findbyemail?email='+ email

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
    const apiUrl = 'https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/payments/findbyemail?email='+ email

    try {
      var token = JSON.parse(localStorage.getItem('tokenCitizen')!)
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });
      const payments: Payment[] = response.data;
      return payments;

    } catch (error) {
      return null;
    }
  }

  async adminGetPaymentsByEmail(email: string|null)  : Promise<Payment[]|null> {
    const apiUrl = 'https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/payments/findbyemail?email='+ email

    try {
      var token = JSON.parse(localStorage.getItem('tokenAdmin')!)
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });
      const payments: Payment[] = response.data;
      return payments;

    } catch (error) {
      return null;
    }
  }


  async getCitizensByComune(comune: string|null)  : Promise<Citizen[]|null> {
    const apiUrl = 'https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/citizens/find?comune='+ comune

    try {
      const response = await axios.get(apiUrl);
      const citizens: Citizen[] = response.data;
      return citizens;

    } catch (error) {
      return null;
    }
  }


  async payById(id: string|undefined): Promise<number> {
    try {
      const data = {id: id};
      var token = JSON.parse(localStorage.getItem('tokenCitizen')!)
      const response = await axios.post('https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/payments/pay', data, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });
      // Verifica se la richiesta è andata bene
      if (response.status === 200) {
        window.alert("Pagamento effettuato con successo");
        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
  }


  signUpCitizen(citizen: Citizen){

    const url = 'https://fng3ig1lah.execute-api.us-east-1.amazonaws.com/deploy/api/citizens/'; // URL di destinazione
    const data = { nome: citizen.nome, cognome: citizen.cognome, email: citizen.email, comune: citizen.comune, password: citizen.password, performance: citizen.performance, da_sensibilizzare: citizen.daSensibilizzare }; // Dati da inviare come corpo della richiesta
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ''
      })
    }

    this.http.post(url, data, httpOptions).subscribe(
      response => {

        window.alert("Nuovo account creato con successo");

        this.router.navigate(['login'])
      },
      error => {
        console.error('Errore durante la richiesta POST', error);
        // Gestisci l'errore qui
      }
    );

  }



}
