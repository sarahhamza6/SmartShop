package com.smartshop.backend.controller;

import com.smartshop.backend.dto.PlanRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class PlanController {

    @PostMapping("/api/plans")
    public ResponseEntity<?> createPlan(@RequestBody PlanRequest planRequest) {

        try {
            double budget = Double.parseDouble(planRequest.getBudget());
            int days = Integer.parseInt(planRequest.getDays());
            int calories = Integer.parseInt(planRequest.getCalories());
            int protein = Integer.parseInt(planRequest.getProtein());

            if (budget <= 0) {
                return ResponseEntity.badRequest().body("Budget must be greater than 0.");
            }

            if (days < 1 || days > 7) {
                return ResponseEntity.badRequest().body("Days must be between 1 and 7.");
            }

            if (calories <= 0) {
                return ResponseEntity.badRequest().body("Calories must be greater than 0.");
            }

            if (protein <= 0) {
                return ResponseEntity.badRequest().body("Protein must be greater than 0.");
            }

            return ResponseEntity.ok(planRequest);

        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest()
                    .body("Budget, days, calories and protein must contain valid numbers.");
        }
    }
}