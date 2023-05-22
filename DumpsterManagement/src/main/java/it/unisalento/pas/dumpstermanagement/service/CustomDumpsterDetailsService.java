package it.unisalento.pas.dumpstermanagement.service;

import it.unisalento.pas.dumpstermanagement.domain.Dumpster;
import it.unisalento.pas.dumpstermanagement.repositories.DumpsterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomDumpsterDetailsService implements UserDetailsService {

    @Autowired
    DumpsterRepository dumpsterRepository;

    /* L'email rappresenta lo username in questo contesto */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserDetails userDetails = null;

        final Dumpster dumpster = dumpsterRepository.findByEmail(email);

        if(dumpster == null) {
            //throw new UsernameNotFoundException(email);
        }else{
            userDetails = org.springframework.security.core.userdetails.User.withUsername(dumpster.getEmail()).password(dumpster.getPassword()).roles("CITIZEN").build();
        }

        return userDetails;
    }
}
