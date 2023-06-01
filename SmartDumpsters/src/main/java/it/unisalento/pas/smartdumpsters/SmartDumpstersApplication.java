package it.unisalento.pas.smartdumpsters;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import it.unisalento.pas.smartdumpsters.domain.Dumpster;
import it.unisalento.pas.smartdumpsters.restcontroller.SmartDumpsterRestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class SmartDumpstersApplication {


    public static void main(String[] args) {
        SpringApplication.run(SmartDumpstersApplication.class, args);
    }

}
