package it.unisalento.pas.smartdumpsters.restcontroller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import it.unisalento.pas.smartdumpsters.context.DumpsterContext;
import it.unisalento.pas.smartdumpsters.domain.Dumpster;
import it.unisalento.pas.smartdumpsters.service.ProducerService;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/smartdumpsters")
public class SmartDumpsterRestController {

    @Autowired
    ConnectionFactory connectionFactory;
    @Autowired
    RabbitTemplate rabbitTemplate;
    @Autowired
    ProducerService producerService;
    private DumpsterContext dumpsterContext;

    Date currentDate;
    SimpleDateFormat dateFormat;
    String formattedDate;


    @Autowired
    public SmartDumpsterRestController(DumpsterContext dumpsterContext) {
        this.dumpsterContext = dumpsterContext;
    }


    @RequestMapping(value="/initialize", method = RequestMethod.GET)
    public String initialize() {

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


        return "";
    }


    @RequestMapping(value="/status/update/{idCassonetto}", method = RequestMethod.POST)
    public String updateStatusById(@PathVariable String idCassonetto, @RequestBody String statusJson) {

        Dumpster[] dumpsters = dumpsterContext.getDumpsters();

        for(int i = 0; i < dumpsters.length; i++){

            if(dumpsters[i].getId().equals(idCassonetto)){
                JsonObject jsonObject = new Gson().fromJson(statusJson, JsonObject.class);
                String statusString = jsonObject.get("stato").getAsString();
                int status = Integer.parseInt(statusString);
                dumpsters[i].setStato(status + dumpsters[i].getStato());

                if(dumpsters[i].getStato() >= 100){
                    currentDate = new Date();

                    // Definisci il formato desiderato per la data e l'ora
                    dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

                    // Formatta la data e l'ora corrente secondo il formato definito
                    formattedDate = dateFormat.format(currentDate);

                    String testo_allarme = "ALLARME CASSONETTO CON ID: " + dumpsters[i].getId() + "\n\n"
                                            + "IN DATA E ORA: " + formattedDate + "\n"
                                            + "NEL COMUNE DI: " + dumpsters[i].getComune() + "\n"
                                            + "STATO PARI A " + dumpsters[i].getStato();

                    producerService.sendMessage(testo_allarme);
                }
            }
        }

        dumpsterContext.setDumpsters(dumpsters);


        return "";
    }

    @RequestMapping(value="/clean", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String cleanDumpsters(@RequestBody String dumpstersIDs) {

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(dumpstersIDs, JsonObject.class);
        JsonArray jsonArray = jsonObject.getAsJsonArray("IDs");

        Dumpster[] dumpsters = dumpsterContext.getDumpsters();

        for (JsonElement element : jsonArray) {

            String id = element.getAsString();

            for(int i = 0; i < dumpsters.length; i++){

                if(dumpsters[i].getId().equals(id)){

                    dumpsters[i].setStato(0);

                }
            }
        }

        dumpsterContext.setDumpsters(dumpsters);


        return "";
    }


    @RequestMapping(value="/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String addDumpster(@RequestBody Dumpster dumpster) {

        Dumpster newDumpster = new Dumpster();
        newDumpster.setStato(dumpster.getStato());
        newDumpster.setTipologia(dumpster.getTipologia());
        newDumpster.setX(dumpster.getX());
        newDumpster.setY(dumpster.getY());
        newDumpster.setComune(dumpster.getComune());
        newDumpster.setId(dumpster.getId());


        Dumpster[] dumpsters = dumpsterContext.getDumpsters();
        Dumpster[] nuovoArray = new Dumpster[dumpsters.length + 1];
        System.arraycopy(dumpsters, 0, nuovoArray, 0, dumpsters.length);
        nuovoArray[dumpsters.length] = newDumpster;

        dumpsterContext.setDumpsters(nuovoArray);


        return "";
    }

}
