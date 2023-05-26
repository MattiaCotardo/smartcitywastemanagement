package it.unisalento.pas.paymentmanagement.security;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtilities jwtUtilities;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            username = jwtUtilities.extractUsername(jwt);
        }


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            RestTemplate restTemplate = new RestTemplate();
            String url;
            ResponseEntity<String> result;
            String responseBody;
            JsonObject jsonObject;
            UserDetails userDetails;


            System.out.println("entrati nel controllo token");
            // Effettua la richiesta GET al microservizio CitizenAccountManagement
            url = "http://CitizenAccountManagement:8080/api/citizens/findByEmail?email=" + username;
            result = restTemplate.exchange(url, HttpMethod.GET, null, String.class);

            if(result.getBody() != null) {
                System.out.println("ha fatto bene la .exchange");
                // Ottieni la risposta
                responseBody = result.getBody();
                System.out.println("ha fatto bene la result.getBody");
                jsonObject = new Gson().fromJson(responseBody, JsonObject.class);
                System.out.println("la risposta vuota è: " + responseBody);
                userDetails = org.springframework.security.core.userdetails.User.withUsername(username).password(jsonObject.get("password").getAsString()).roles("CITIZEN").build();
            }

            else {
                // Effettua la richiesta GET al microservizio AdminAccountManagement
                url = "http://AdminAccountManagement:8080/api/admins/find/" + username;
                result = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
                // Ottieni la risposta
                responseBody = result.getBody();
                jsonObject = new Gson().fromJson(responseBody, JsonObject.class);
                String comune = jsonObject.get("comune").getAsString();

                if (comune.isEmpty()) {
                    userDetails = org.springframework.security.core.userdetails.User.withUsername(username).password(jsonObject.get("password").getAsString()).roles("ADMIN_AZIENDALE").build();
                } else {
                    userDetails = org.springframework.security.core.userdetails.User.withUsername(username).password(jsonObject.get("password").getAsString()).roles("ADMIN_COMUNALE").build();
                }
            }



            if (jwtUtilities.validateToken(jwt, userDetails)) {
                System.out.println("si rompe qua 3");

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }

}