package it.unisalento.pas.wastemanagement.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("wastes")
public class Waste {

    @Id
    String id;
    String tipologia;
    int giorno;
    int mese;
    int anno;
    int peso;
    String emailCitizen;
    String idCassonetto;



    public String getIdCassonetto() {
        return idCassonetto;
    }

    public void setIdCassonetto(String idCassonetto) {
        this.idCassonetto = idCassonetto;
    }

    public String getEmailCitizen() {
        return emailCitizen;
    }

    public void setEmailCitizen(String emailCitizen) {
        this.emailCitizen = emailCitizen;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public int getGiorno() {
        return giorno;
    }

    public void setGiorno(int giorno) {
        this.giorno = giorno;
    }

    public int getMese() {
        return mese;
    }

    public void setMese(int mese) {
        this.mese = mese;
    }

    public int getAnno() {
        return anno;
    }

    public void setAnno(int anno) {
        this.anno = anno;
    }

    public int getPeso() {
        return peso;
    }

    public void setPeso(int peso) {
        this.peso = peso;
    }


}

