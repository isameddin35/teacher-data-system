package com.pms.controller;

import com.pms.models.User;
import com.pms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User credentials) {
        String username = credentials.getUsername();
        String password = credentials.getPassword();


        boolean authenticated = authService.authenticate(username, password);


        if (authenticated) {
            return ResponseEntity.ok("Login successful");
        } else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

    }

    @PostMapping("/get-user")
    public User getUser(@RequestParam(name = "firstName") String username) {
        return authService.getUser(username);
    }
}