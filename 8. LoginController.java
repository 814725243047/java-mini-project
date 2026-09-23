package com.attendance.controller;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin
public class LoginController {

    @PostMapping
    public Map<String, Object> login(
            @RequestBody Map<String, String> request) {

        String username = request.get("username");
        String password = request.get("password");

        Map<String, Object> response =
                new HashMap<>();

        if ("admin".equals(username)
                && "admin123".equals(password)) {

            response.put("success", true);
            response.put("message", "Login successful");
            response.put("role", "ADMIN");

        } else {

            response.put("success", false);
            response.put("message",
                    "Invalid username or password");
        }

        return response;
    }
}
