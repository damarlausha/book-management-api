package com.bookapi.controller;

import com.bookapi.entity.User;
import com.bookapi.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(
            @RequestBody User user) {

        User registeredUser = userService.registerUser(user);

        return new ResponseEntity<>(
                registeredUser,
                HttpStatus.CREATED
        );
    }
}