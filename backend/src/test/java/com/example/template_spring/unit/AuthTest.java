package com.example.template_spring.unit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@PropertySource("classpath:application.properties ")
public class AuthTest {

    @Autowired
    private WebTestClient client;

    @Value("${spring.data.rest.base-path}")
    private String rootApi;

    private final ObjectMapper OM = new ObjectMapper();

    @Test
    public void validPass() throws JsonProcessingException {
        Map<String, Object> params = new HashMap<>();
        params.put("username", "user@gmail.com");
        params.put("password", 123);

        EntityExchangeResult<Map> response = client.post()
                .uri(rootApi + "/login")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .body(BodyInserters.fromObject(OM.writeValueAsString(params)))
                .exchange()
                .expectStatus().isOk()
                .expectBody(Map.class)
                .returnResult();

        Map<String, Object> map = response.getResponseBody();

        assertNotNull(map);
        assertNotNull(map.get("token"));
    }

    @Test
    public void notValidPass() throws JsonProcessingException {
        Map<String, Object> params = new HashMap<>();
        params.put("username", "user1@gmail.com");
        params.put("password", 456);

        client.post()
                .uri(rootApi + "/login")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .body(BodyInserters.fromObject(OM.writeValueAsString(params)))
                .exchange()
                .expectStatus().is4xxClientError();
    }
}
