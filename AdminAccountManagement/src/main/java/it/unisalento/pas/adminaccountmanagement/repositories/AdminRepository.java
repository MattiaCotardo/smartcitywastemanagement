package it.unisalento.pas.adminaccountmanagement.repositories;

import it.unisalento.pas.adminaccountmanagement.domain.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AdminRepository extends MongoRepository<Admin, String> {

    public List<Admin> findByCognome(String cognome);

    public List<Admin> findByComune(String comune);

    public Admin findByEmail(String email);
}
