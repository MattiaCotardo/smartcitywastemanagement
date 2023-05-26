package it.unisalento.pas.paymentmanagement.repositories;

import it.unisalento.pas.paymentmanagement.domain.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {

    public List<Payment> findByEmailCittadino(String emailCittadino);

    public List<Payment> findAll();

    public List<Payment> findPaymentByEmailCittadino();


}
