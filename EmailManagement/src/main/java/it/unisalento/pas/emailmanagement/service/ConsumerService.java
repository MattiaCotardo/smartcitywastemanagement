package it.unisalento.pas.emailmanagement.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerService {


    @Autowired
    private EmailSenderService senderService;
    @Autowired
    public ConsumerService() {
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(String message) {
        senderService.sendMail("dadorollo@gmail.com", "Allarme di sovrabbondanza", message);
    }

}