package com.smartshop.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartshop.backend.service.AiService;

@RestController
public class AiController {

    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/api/ai-test")
    public String testAi() {
        aiService.testAi();
        return "AI request sent. Check the backend terminal.";
    }
}