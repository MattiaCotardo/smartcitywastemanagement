import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import axios from "axios";
import {Router} from "@angular/router";
import {Citizen} from "../models/citizen";
import {Admin} from "../models/admin";
import {Payment} from "../models/payment";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private http:HttpClient, private router:Router) {

  }

  async loginAdmin(email: string, password: string): Promise<number> {
    try {
      const data = {email: email, password: password};
      const response = await axios.post('http://localhost:8081/api/admins/authenticate', data);
      const responseString = JSON.stringify(response.data);

      // Verifica se la richiesta è andata bene
      if (response.status === 200) {
        const jsonObject = JSON.parse(responseString);
        localStorage.setItem('tokenAdmin', JSON.stringify(jsonObject))
        localStorage.setItem('emailAdmin', email)
        localStorage.setItem('searchedEmail', "")

        await this.getCityAdmin(email)
        if(localStorage.getItem("currentAdminCity") === "") {
          this.router.navigate(['adminAziendale'])
        } else {
          this.router.navigate(['adminComunale'])
        }
        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
  }

  async getCityAdmin(email: string|null)  : Promise<null> {
    const apiUrl = 'http://localhost:8081/api/admins/find/'+ email

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: ``,
        },
      });
      const admin: Admin = response.data;
      var infoComune = admin.comune;
      if(infoComune === ""){
        localStorage.setItem("currentAdminCity", "")
      } else {
        localStorage.setItem("currentAdminCity", infoComune)
      }
      return null
    } catch (error) {
      return null;
    }
  }

  async getPaymentsByComune(comune: string|null)  : Promise<Payment[]|null> {
    const apiUrl = 'http://localhost:8084/api/payments/find?comune='+ comune

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

  async addPayment(payment: Payment|undefined): Promise<number> {
    try {
      const data = payment;
      var token = JSON.parse(localStorage.getItem('tokenAdmin')!)
      const response = await axios.post('http://localhost:8084/api/payments/', data, {
        headers: {
          'Authorization': `Bearer `+token.jwt,
        },
      });
      // Verifica se la richiesta è andata bene
      if (response.status === 200) {
        window.alert("Pagamento aggiunto con successo");
        this.router.navigate(['adminComunale'])
        return 0; // Restituisce 0 se la richiesta è andata bene
      } else {
        return 1; // Restituisce 1 se la richiesta ha avuto esito negativo
      }
    } catch (error) {
      return 1; // Restituisce 1 se si è verificato un errore durante la richiesta
    }
  }

  async getAdminByEmail(email: string|null)  : Promise<Admin|null> {
    const apiUrl = 'http://localhost:8081/api/admins/find/'+ email

    try {
      const response = await axios.get(apiUrl);
      const admin: Admin = response.data;
      return admin;

    } catch (error) {
      return null;
    }
  }
}
