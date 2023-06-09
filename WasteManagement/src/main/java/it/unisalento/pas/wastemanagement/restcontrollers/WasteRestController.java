package it.unisalento.pas.wastemanagement.restcontrollers;

import it.unisalento.pas.wastemanagement.domain.Waste;
import it.unisalento.pas.wastemanagement.dto.WasteDTO;
import it.unisalento.pas.wastemanagement.repositories.WasteRepository;
import it.unisalento.pas.wastemanagement.security.JwtUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/wastes")
public class WasteRestController {

    @Autowired
    WasteRepository wasteRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtilities jwtUtilities;


    @PreAuthorize("hasRole('CITIZEN')")
    @RequestMapping(value = "/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public WasteDTO addWaste(@RequestBody WasteDTO wasteDTO) {

        Waste newWaste = new Waste();
        newWaste.setIdCassonetto(wasteDTO.getIdCassonetto());
        newWaste.setGiorno(wasteDTO.getGiorno());
        newWaste.setMese(wasteDTO.getMese());
        newWaste.setAnno(wasteDTO.getAnno());
        newWaste.setTipologia(wasteDTO.getTipologia());
        newWaste.setPeso(wasteDTO.getPeso());
        newWaste.setEmailCitizen(wasteDTO.getEmailCitizen());


        newWaste = wasteRepository.save(newWaste);


        wasteDTO.setId(newWaste.getId());

        //calcolo della performance per email
        float totalWeight = 0;
        float totalUnsortedWeight = 0;
        float performance;

        for (Waste waste : wasteRepository.findByEmailCitizen(wasteDTO.getEmailCitizen())) {
            totalWeight = totalWeight + waste.getPeso();
            if(waste.getTipologia().equals("indifferenziata")){
                totalUnsortedWeight = totalUnsortedWeight + waste.getPeso();
            }
        }
        performance = 100 - ((totalUnsortedWeight/totalWeight) * 100);


        //Da mandare in patch a citizen
        RestTemplate restTemplate = new RestTemplate();
        // Effettua la richiesta PATCH al microservizio dei Citizens
        String url = "http://34.197.197.67:8080/api/citizens/performance/update/" + wasteDTO.getEmailCitizen(); //CitizenManagement

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String requestBody = "{\"performance\": "+performance+"}";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);


        url = "http://3.219.246.216:8080/api/dumpsters/status/update/" + wasteDTO.getIdCassonetto(); //DumpsterManagement

        headers.setContentType(MediaType.APPLICATION_JSON);

        requestBody = "{\"stato\": "+wasteDTO.getPeso()+"}";
        requestEntity = new HttpEntity<>(requestBody, headers);
        response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);


        //il nuovo peso deve essere mandato in patch anche allo smartdumpster
        url = "http://52.205.85.27:8080/api/smartdumpsters/status/update/" + wasteDTO.getIdCassonetto(); //SmartDumpsters

        headers.setContentType(MediaType.APPLICATION_JSON);

        requestBody = "{\"stato\": "+wasteDTO.getPeso()+"}";
        requestEntity = new HttpEntity<>(requestBody, headers);
        response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);


        return wasteDTO;
    }

}
