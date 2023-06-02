package it.unisalento.pas.dumpstermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DumpsterManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(DumpsterManagementApplication.class, args);

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://SmartDumpsters:8080/api/smartdumpsters/initialize";

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
    }


}
