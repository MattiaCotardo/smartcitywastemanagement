package it.unisalento.pas.paymentmanagement.restcontrollers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import it.unisalento.pas.paymentmanagement.domain.Payment;
import it.unisalento.pas.paymentmanagement.dto.PaymentDTO;
import it.unisalento.pas.paymentmanagement.repositories.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
public class PaymentRestController {

    @Autowired
    PaymentRepository paymentRepository;


   @PreAuthorize("hasRole('ADMIN_COMUNALE')")
   @RequestMapping(value="/find", method = RequestMethod.GET)
   public List<PaymentDTO> findPaymentByComune(@RequestParam String comune) {


        List<PaymentDTO> payments = new ArrayList<>();
        RestTemplate restTemplate;
        String url;
        ResponseEntity<String> result;
        String responseBody;
        JsonObject jsonObject;
        String comuneCittadino;

        for(Payment payment : paymentRepository.findAll()) {


            restTemplate = new RestTemplate();

            // Effettua la richiesta GET al microservizio CitizenAccountManagement

            url = "http://CitizenAccountManagement:8080/api/citizens/find/" + payment.getEmailCittadino();

            result = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

            // Ottieni la risposta
            responseBody = result.getBody();


            jsonObject = new Gson().fromJson(responseBody, JsonObject.class);

            comuneCittadino = jsonObject.get("comune").getAsString();

            if(comune.equals(comuneCittadino))
            {
                PaymentDTO paymentDTO = new PaymentDTO();
                paymentDTO.setId(payment.getId());
                paymentDTO.setEmailCittadino(payment.getEmailCittadino());
                paymentDTO.setImporto(payment.getImporto());
                paymentDTO.setDaPagare(payment.getDaPagare());
                paymentDTO.setGiornoScadenza(payment.getGiornoScadenza());
                paymentDTO.setMeseScadenza(payment.getMeseScadenza());
                paymentDTO.setAnnoScadenza(payment.getAnnoScadenza());
                payments.add(paymentDTO);
            }

        }

        return payments;
    }


    @PreAuthorize("hasRole('ADMIN_COMUNALE')")
    @RequestMapping(value="/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public PaymentDTO addPayment(@RequestBody PaymentDTO paymentDTO) {

        Payment newPayment = new Payment();
        newPayment.setEmailCittadino(paymentDTO.getEmailCittadino());
        newPayment.setImporto(paymentDTO.getImporto());
        newPayment.setDaPagare(paymentDTO.getDaPagare());
        newPayment.setGiornoScadenza(paymentDTO.getGiornoScadenza());
        newPayment.setMeseScadenza(paymentDTO.getMeseScadenza());
        newPayment.setAnnoScadenza(paymentDTO.getAnnoScadenza());


        newPayment = paymentRepository.save(newPayment);

        paymentDTO.setId(newPayment.getId());

        return paymentDTO;
    }




}
