package com.smartshop.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.smartshop.backend.service.AiService;

import com.smartshop.backend.dto.PlanRequest;

@RestController
@CrossOrigin(origins = "*")
public class PlanController {

    private final AiService aiService;
    
    public PlanController(AiService aiService) {
    this.aiService = aiService;
}

    @PostMapping("/api/plans")
    public ResponseEntity<?> createPlan(@RequestBody PlanRequest planRequest) {

        try {
            double budget = Double.parseDouble(planRequest.getBudget());
            int days = Integer.parseInt(planRequest.getDays());
            int calories = Integer.parseInt(planRequest.getCalories());
            int protein = Integer.parseInt(planRequest.getProtein());
            int people = Integer.parseInt(planRequest.getPeople());

            if (budget < 1) {
                return ResponseEntity.badRequest().body("Budget must be greater than 0.");
            }

            if (days < 1 || days > 7) {
                return ResponseEntity.badRequest().body("Days must be between 1 and 7.");
            }

            if (calories < 1) {
                return ResponseEntity.badRequest().body("Calories must be greater than 0.");
            }

            if (protein < 1) {
                return ResponseEntity.badRequest().body("Protein must be greater than 0.");
            }

            if (people < 1) {
                return ResponseEntity.badRequest().body("People must be greater than 0.");
            }

            return ResponseEntity.ok(planRequest);

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body("Budget, days, calories, protein and people must contain valid numbers.");
        }
    }
}
