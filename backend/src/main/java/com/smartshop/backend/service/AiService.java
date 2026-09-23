
package com.smartshop.backend.service;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.responses.Response;
import com.openai.models.responses.ResponseCreateParams;
import com.smartshop.backend.dto.PlanRequest;

@Service
public class AiService {

    private final OpenAIClient client;

    public AiService() {
        this.client = OpenAIOkHttpClient.fromEnv();
    }

    public String generatePlan(PlanRequest planRequest) {
        {

            String prompt = "Create a meal plan for SmartShop.\n" +
                    "Budget: £" + planRequest.getBudget() + "\n" +
                    "Days: " + planRequest.getDays() + "\n" +
                    "People: " + planRequest.getPeople() + "\n" +
                    "Supermarket: " + planRequest.getSupermarket() + "\n" +
                    "Calories per day: " + planRequest.getCalories() + "\n" +
                    "Protein per day: " + planRequest.getProtein() + "g\n" +
                    "Allergies: " + planRequest.getAllergies();

            ResponseCreateParams params = ResponseCreateParams.builder()
                    .model("gpt-5-mini")
                    .input(prompt)
                    .build();

            Response response = client.responses().create(params);

            String aiText = response.output().stream()
                    .flatMap(item -> item.message().stream())
                    .flatMap(message -> message.content().stream())
                    .flatMap(content -> content.outputText().stream())
                    .map(text -> text.text())
                    .collect(Collectors.joining());

            return aiText;
        }
    }
}
