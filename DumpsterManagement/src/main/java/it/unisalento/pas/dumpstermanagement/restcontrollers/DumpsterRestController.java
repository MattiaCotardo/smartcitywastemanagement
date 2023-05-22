package it.unisalento.pas.dumpstermanagement.restcontrollers;

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

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtilities jwtUtilities;


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

}
