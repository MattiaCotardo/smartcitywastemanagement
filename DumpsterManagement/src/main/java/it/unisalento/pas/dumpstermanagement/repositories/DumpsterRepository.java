package it.unisalento.pas.dumpstermanagement.repositories;

import it.unisalento.pas.dumpstermanagement.domain.Dumpster;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DumpsterRepository extends MongoRepository<Dumpster, String> {

    public List<Dumpster> findByComune(String comune);

}
