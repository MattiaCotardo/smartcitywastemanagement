package it.unisalento.pas.paymentmanagement.dto;

import org.springframework.data.annotation.Id;

public class PaymentDTO {

    String id;

    String emailCittadino;

    float importo;

    int daPagare; // 0 false, 1 true

    int giornoScadenza;
    int meseScadenza;
    int annoScadenza;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmailCittadino() {
        return emailCittadino;
    }

    public void setEmailCittadino(String emailCittadino) {
        this.emailCittadino = emailCittadino;
    }

    public float getImporto() {
        return importo;
    }

    public void setImporto(float importo) {
        this.importo = importo;
    }

    public int getDaPagare() {
        return daPagare;
    }

    public void setDaPagare(int daPagare) {
        this.daPagare = daPagare;
    }

    public int getGiornoScadenza() {
        return giornoScadenza;
    }

    public void setGiornoScadenza(int giornoScadenza) {
        this.giornoScadenza = giornoScadenza;
    }

    public int getMeseScadenza() {
        return meseScadenza;
    }

    public void setMeseScadenza(int meseScadenza) {
        this.meseScadenza = meseScadenza;
    }

    public int getAnnoScadenza() {
        return annoScadenza;
    }

    public void setAnnoScadenza(int annoScadenza) {
        this.annoScadenza = annoScadenza;
    }
}
