package it.unisalento.pas.wastemanagement.repositories;

import it.unisalento.pas.wastemanagement.domain.Waste;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WasteRepository extends MongoRepository<Waste, String> {

    public List<Waste> findByEmailCitizen(String emailCitizen);

}
