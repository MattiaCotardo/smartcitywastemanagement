package it.unisalento.pas.smartdumpsters.restcontroller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import it.unisalento.pas.smartdumpsters.context.DumpsterContext;
import it.unisalento.pas.smartdumpsters.domain.Dumpster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/smartdumpsters")
public class SmartDumpsterRestController {

    private DumpsterContext dumpsterContext;

    @Autowired
    public SmartDumpsterRestController(DumpsterContext dumpsterContext) {
        this.dumpsterContext = dumpsterContext;
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

}
