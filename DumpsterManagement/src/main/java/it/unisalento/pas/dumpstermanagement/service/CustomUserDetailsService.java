package it.unisalento.pas.dumpstermanagement.service;

import it.unisalento.pas.dumpstermanagement.domain.Citizen;
import it.unisalento.pas.dumpstermanagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    /* L'email rappresenta lo username in questo contesto */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserDetails userDetails = null;

        final Citizen citizen = userRepository.findByEmail(email);

        if(citizen == null) {
            //throw new UsernameNotFoundException(email);
        }else{
            userDetails = org.springframework.security.core.userdetails.User.withUsername(citizen.getEmail()).password(citizen.getPassword()).roles("CITIZEN").build();
        }

        return userDetails;
    }
}
