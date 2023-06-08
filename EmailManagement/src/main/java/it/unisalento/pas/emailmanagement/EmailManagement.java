package it.unisalento.pas.emailmanagement;

import it.unisalento.pas.emailmanagement.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class EmailManagement {



    public static void main(String[] args) {
        SpringApplication.run(EmailManagement.class, args);
    }



}
