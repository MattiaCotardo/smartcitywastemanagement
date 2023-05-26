package it.unisalento.pas.dumpstermanagement.restcontrollers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import it.unisalento.pas.dumpstermanagement.domain.Dumpster;
import it.unisalento.pas.dumpstermanagement.dto.DumpsterDTO;
import it.unisalento.pas.dumpstermanagement.exceptions.UserNotFoundException;
import it.unisalento.pas.dumpstermanagement.repositories.DumpsterRepository;
import it.unisalento.pas.dumpstermanagement.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static it.unisalento.pas.dumpstermanagement.configuration.SecurityConfig.passwordEncoder;

@RestController
@RequestMapping("/api/dumpsters")
public class DumpsterRestController {

    @Autowired
    DumpsterRepository dumpsterRepository;


   @PreAuthorize("hasRole('ADMIN_AZIENDALE')")
   @RequestMapping(value="/find", method = RequestMethod.GET)
   public List<DumpsterDTO> findDumpsterByComune(@RequestParam String comune) {


        List<DumpsterDTO> dumpsters = new ArrayList<>();

        for(Dumpster dumpster : dumpsterRepository.findByComune(comune)) {
            DumpsterDTO dumpsterDTO = new DumpsterDTO();
            dumpsterDTO.setId(dumpster.getId());
            dumpsterDTO.setTipologia(dumpster.getTipologia());
            dumpsterDTO.setStato(dumpster.getStato());
            dumpsterDTO.setX(dumpster.getX());
            dumpsterDTO.setY(dumpster.getY());
            dumpsterDTO.setComune(dumpster.getComune());
            dumpsters.add(dumpsterDTO);
        }

        return dumpsters;
    }


    @PreAuthorize("hasRole('ADMIN_COMUNALE')")
    @RequestMapping(value="/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public DumpsterDTO addDumpster(@RequestBody DumpsterDTO dumpsterDTO) {

        Dumpster newDumpster = new Dumpster();
        newDumpster.setStato(dumpsterDTO.getStato());
        newDumpster.setTipologia(dumpsterDTO.getTipologia());
        newDumpster.setX(dumpsterDTO.getX());
        newDumpster.setY(dumpsterDTO.getY());
        newDumpster.setComune(dumpsterDTO.getComune());


        newDumpster = dumpsterRepository.save(newDumpster);

        dumpsterDTO.setId(newDumpster.getId());

        return dumpsterDTO;
    }

    @RequestMapping(value="/status/update/{idCassonetto}", method = RequestMethod.POST)
    public String updateStatusById(@PathVariable String idCassonetto, @RequestBody String statusJson) {

        Optional<Dumpster> optionalDumpster = dumpsterRepository.findById(idCassonetto);

        Dumpster dumpster = optionalDumpster.get();
        DumpsterDTO dumpsterDTO = new DumpsterDTO();
        dumpsterDTO.setId(dumpster.getId());


        JsonObject jsonObject = new Gson().fromJson(statusJson, JsonObject.class);
        String statusString = jsonObject.get("stato").getAsString();
        int status = Integer.parseInt(statusString);

        dumpster.setStato(status + dumpster.getStato());
        dumpsterRepository.save(dumpster);

        return statusString;
    }


    @PreAuthorize("hasRole('ADMIN_AZIENDALE')")
    @RequestMapping(value="/clean", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public String cleanDumpsters(@RequestBody String dumpstersIDs) {

        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(dumpstersIDs, JsonObject.class);
        JsonArray jsonArray = jsonObject.getAsJsonArray("IDs");

        Optional<Dumpster> optionalDumpster;
        Dumpster dumpster;

        for (JsonElement element : jsonArray) {
            String id = element.getAsString();

            //Pulizia cassonetto per ogni id
            optionalDumpster = dumpsterRepository.findById(id);

            dumpster = optionalDumpster.get();

            dumpster.setStato(0);
            dumpsterRepository.save(dumpster);
        }

        return "";
    }

}
