package com.smartshop.backend;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello from SmartShop!";
    }

    @GetMapping("/api/recipe")
    public Map<String, Object> recipe() {
        Map<String, Object> recipe = new HashMap<>();

        recipe.put("name", "Chicken Fajita Bowl");
        recipe.put("calories", 620);
        recipe.put("protein", 48);

        return recipe;
    }
}