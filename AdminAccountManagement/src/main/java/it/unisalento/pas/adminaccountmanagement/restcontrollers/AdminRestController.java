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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static it.unisalento.pas.adminaccountmanagement.configuration.SecurityConfig.passwordEncoder;

@CrossOrigin
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
    public AdminDTO addAdmin(@RequestBody AdminDTO adminDTO) {

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


    @RequestMapping(value="/find/{email}")
    public AdminDTO getAdminByEmail(@PathVariable String email) {


        Admin admin = adminRepository.findByEmail(email);

        AdminDTO adminDTO = new AdminDTO();

        adminDTO.setNome(admin.getNome());
        adminDTO.setCognome(admin.getCognome());
        adminDTO.setEmail(admin.getEmail());
        adminDTO.setComune(admin.getComune());
        adminDTO.setPassword(admin.getPassword());

        return adminDTO;
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
