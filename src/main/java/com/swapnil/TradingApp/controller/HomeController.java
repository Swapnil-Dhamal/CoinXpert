package com.swapnil.TradingApp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/home")
    public String home() {
        return "Welcome to trading App";
    }

    @GetMapping("/api")
    public String secure(){
        return "Welcome to trading App secure";
    }
}
