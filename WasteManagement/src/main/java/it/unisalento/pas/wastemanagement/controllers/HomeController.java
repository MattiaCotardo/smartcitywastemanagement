package it.unisalento.pas.wastemanagement.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("/registrazione")
    public String registrazione(){

        return "registrazione";
    }

    @RequestMapping("/login")
    public String login(){

        return "login";
    }

    @RequestMapping("/")
    public String home(){

        return "home";
    }

}
