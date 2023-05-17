package it.unisalento.pas.citizenaccountmanagement.repositories;

import it.unisalento.pas.citizenaccountmanagement.domain.Citizen;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<Citizen, String> {

    public List<Citizen> findByCognome(String cognome);

    public List<Citizen> findByComune(String comune);

    public Citizen findByEmail(String email);
}
