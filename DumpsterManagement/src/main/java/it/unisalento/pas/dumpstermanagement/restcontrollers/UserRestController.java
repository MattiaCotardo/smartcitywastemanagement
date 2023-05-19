package it.unisalento.pas.dumpstermanagement.restcontrollers;

import it.unisalento.pas.dumpstermanagement.domain.Citizen;
import it.unisalento.pas.dumpstermanagement.dto.AuthenticationResponseDTO;
import it.unisalento.pas.dumpstermanagement.dto.LoginDTO;
import it.unisalento.pas.dumpstermanagement.dto.CitizenDTO;
import it.unisalento.pas.dumpstermanagement.exceptions.UserNotFoundException;
import it.unisalento.pas.dumpstermanagement.repositories.UserRepository;
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
@RequestMapping("/api/citizens")
public class UserRestController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtilities jwtUtilities;

    @PreAuthorize("hasRole('ADMIN_AZIENDALE')")
    @RequestMapping(value="/", method= RequestMethod.GET)
    public List<CitizenDTO> getAll() {

        List<CitizenDTO> utenti = new ArrayList<>();

        for(Citizen citizen : userRepository.findAll()) {
            CitizenDTO citizenDTO = new CitizenDTO();
            citizenDTO.setId(citizen.getId());
            citizenDTO.setNome(citizen.getNome());
            citizenDTO.setCognome(citizen.getCognome());
            citizenDTO.setEmail(citizen.getEmail());
            citizenDTO.setComune(citizen.getComune());
            citizenDTO.setDa_sensibilizzare(citizen.getDa_sensibilizzare());
            citizenDTO.setPerformance((citizen.getPerformance()));
            utenti.add(citizenDTO);
        }

        return utenti;
    }




    @PreAuthorize("hasRole('CITIZEN')")
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public CitizenDTO getById(@PathVariable String id)  throws UserNotFoundException {


        Optional<Citizen> optUser = userRepository.findById(id);

        if(optUser.isPresent()) {
            Citizen citizen = optUser.get();

            CitizenDTO user1 = new CitizenDTO();
            user1.setNome(citizen.getNome());
            user1.setCognome(citizen.getCognome());
            user1.setEmail(citizen.getEmail());
            user1.setComune(citizen.getComune());
            user1.setPerformance(citizen.getPerformance());
            user1.setDa_sensibilizzare(citizen.getDa_sensibilizzare());
            user1.setId(citizen.getId());

            return user1;
        }
        else {
            throw new UserNotFoundException();
        }
    }


   // @PreAuthorize("hasRole('USER')")
   @RequestMapping(value="/find", method = RequestMethod.GET)
   public List<CitizenDTO> findBy(@RequestParam String comune) {


        List<CitizenDTO> utenti = new ArrayList<>();

        for(Citizen citizen : userRepository.findByComune(comune)) {
            CitizenDTO citizenDTO = new CitizenDTO();
            citizenDTO.setId(citizen.getId());
            citizenDTO.setNome(citizen.getNome());
            citizenDTO.setCognome(citizen.getCognome());
            citizenDTO.setEmail(citizen.getEmail());
            citizenDTO.setComune(citizen.getComune());
            citizenDTO.setDa_sensibilizzare(citizen.getDa_sensibilizzare());
            citizenDTO.setPerformance((citizen.getPerformance()));
            utenti.add(citizenDTO);
        }

        return utenti;
    }



    @RequestMapping(value="/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public CitizenDTO addCitizen(@RequestBody CitizenDTO citizenDTO) {

        Citizen newCitizen = new Citizen();
        newCitizen.setNome(citizenDTO.getNome());
        newCitizen.setCognome(citizenDTO.getCognome());
        newCitizen.setEmail(citizenDTO.getEmail());
        newCitizen.setComune(citizenDTO.getComune());
        newCitizen.setDa_sensibilizzare(citizenDTO.getDa_sensibilizzare());
        newCitizen.setPerformance(citizenDTO.getPerformance());
        newCitizen.setPassword(passwordEncoder().encode(citizenDTO.getPassword()));

        newCitizen = userRepository.save(newCitizen);


        citizenDTO.setId(newCitizen.getId());
        citizenDTO.setPassword(null);

        return citizenDTO;
    }


    @RequestMapping(value="/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
                  loginDTO.getEmail(),
                  loginDTO.getPassword()
          )
        );

        Citizen citizen = userRepository.findByEmail(authentication.getName());

        if(citizen == null) {
            throw new UsernameNotFoundException(loginDTO.getEmail());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String jwt = jwtUtilities.generateToken(citizen.getEmail());

        return ResponseEntity.ok(new AuthenticationResponseDTO(jwt));

    }

















}