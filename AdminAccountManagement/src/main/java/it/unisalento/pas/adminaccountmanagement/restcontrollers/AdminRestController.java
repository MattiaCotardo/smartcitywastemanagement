package it.unisalento.pas.adminaccountmanagement.restcontrollers;

import it.unisalento.pas.adminaccountmanagement.domain.Admin;
import it.unisalento.pas.adminaccountmanagement.dto.AuthenticationResponseDTO;
import it.unisalento.pas.adminaccountmanagement.dto.LoginDTO;
import it.unisalento.pas.adminaccountmanagement.dto.AdminDTO;
import it.unisalento.pas.adminaccountmanagement.repositories.AdminRepository;
import it.unisalento.pas.adminaccountmanagement.security.JwtUtilities;
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

import static it.unisalento.pas.adminaccountmanagement.configuration.SecurityConfig.passwordEncoder;

@RestController
@RequestMapping("/api/admins")
public class AdminRestController {

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtilities jwtUtilities;



    @RequestMapping(value="/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public AdminDTO post(@RequestBody AdminDTO adminDTO) {

        Admin newAdmin = new Admin();
        newAdmin.setNome(adminDTO.getNome());
        newAdmin.setCognome(adminDTO.getCognome());
        newAdmin.setEmail(adminDTO.getEmail());
        newAdmin.setComune(adminDTO.getComune());
        newAdmin.setPassword(passwordEncoder().encode(adminDTO.getPassword()));

        newAdmin = adminRepository.save(newAdmin);

        adminDTO.setId(newAdmin.getId());
        adminDTO.setPassword(null);

        return adminDTO;
    }

    @PreAuthorize("hasRole('ADMIN_COMUNALE')")
    @RequestMapping(value="/prova_comunale")
    public String prova_comunale() {

        return "Sei un admin comunale";
    }

    @PreAuthorize("hasRole('ADMIN_AZIENDALE')")
    @RequestMapping(value="/prova_aziendale")
    public String prova_aziendale() {

        return "Sei un admin aziendale";
    }



    @RequestMapping(value="/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginDTO loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
                  loginDTO.getEmail(),
                  loginDTO.getPassword()
          )
        );

        Admin admin = adminRepository.findByEmail(authentication.getName());

        if(admin == null) {
            throw new UsernameNotFoundException(loginDTO.getEmail());
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final String jwt = jwtUtilities.generateToken(admin.getEmail());

        return ResponseEntity.ok(new AuthenticationResponseDTO(jwt));

    }

















}
