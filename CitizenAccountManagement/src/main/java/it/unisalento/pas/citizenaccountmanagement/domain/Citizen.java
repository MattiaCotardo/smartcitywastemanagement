package it.unisalento.pas.citizenaccountmanagement.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("citizens")
public class Citizen {

    @Id
    String id;
    String nome;
    String cognome;
    String email;
    String comune;
    int da_sensibilizzare; /* 1 True, 0 False*/
    float performance; /* in percentuale */
    String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getComune() {
        return comune;
    }

    public void setComune(String comune) {
        this.comune = comune;
    }

    public int getDa_sensibilizzare() {
        return da_sensibilizzare;
    }

    public void setDa_sensibilizzare(int da_sensibilizzare) {
        this.da_sensibilizzare = da_sensibilizzare;
    }

    public float getPerformance() {
        return performance;
    }

    public void setPerformance(float performance) {
        this.performance = performance;
    }
}
