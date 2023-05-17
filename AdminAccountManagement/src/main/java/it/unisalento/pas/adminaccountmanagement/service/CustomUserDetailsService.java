package it.unisalento.pas.adminaccountmanagement.service;

import it.unisalento.pas.adminaccountmanagement.domain.Admin;
import it.unisalento.pas.adminaccountmanagement.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    AdminRepository adminRepository;
    UserDetails userDetails;

    /* L'email rappresenta lo username in questo contesto */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        final Admin admin = adminRepository.findByEmail(email);


        if(admin == null) {
            throw new UsernameNotFoundException(email);
        }

        if(admin.getComune().isEmpty()) {
            userDetails = org.springframework.security.core.userdetails.User.withUsername(admin.getEmail())
                    .password(admin.getPassword()).roles("ADMIN_AZIENDALE").build();
        } else {
            userDetails = org.springframework.security.core.userdetails.User.withUsername(admin.getEmail())
                    .password(admin.getPassword()).roles("ADMIN_COMUNALE").build();
        }

        return userDetails;
    }
}
