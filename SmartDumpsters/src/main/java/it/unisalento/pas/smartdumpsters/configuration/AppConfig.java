package it.unisalento.pas.smartdumpsters.configuration;

import com.google.gson.Gson;
import it.unisalento.pas.smartdumpsters.context.DumpsterContext;
import it.unisalento.pas.smartdumpsters.domain.Dumpster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;


@Configuration
public class AppConfig {
    private DumpsterContext dumpsterContext;

    @Autowired
    public AppConfig(DumpsterContext dumpsterContext) {
        this.dumpsterContext = dumpsterContext;
        initializeDumpsters(); // Metodo per inizializzare l'array di oggetti Dumpster
    }

    private void initializeDumpsters() {

        // Inizializza l'array di oggetti Dumpster
        Dumpster[] dumpsters;

        // Assegna i valori agli oggetti Dumpster

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://DumpsterManagement:8080/api/dumpsters/findAll";

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

        String responseBody = response.getBody();

        // Creazione dell'istanza di Gson
        Gson gson = new Gson();

        // Conversione della stringa JSON in un array di oggetti Dumpster
        dumpsters = gson.fromJson(responseBody, Dumpster[].class);

        // Imposta l'array di oggetti Dumpster all'interno di DumpsterContext
        dumpsterContext.setDumpsters(dumpsters);

    }
}
