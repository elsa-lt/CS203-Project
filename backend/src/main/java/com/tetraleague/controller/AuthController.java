package com.tetraleague.controller;

import com.tetraleague.Admin;
import com.tetraleague.Player;
import com.tetraleague.User;
import com.tetraleague.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AdminService adminService;
    private PlayerService playerService;

    @PostMapping("/register/user")
    public String registerUser(@RequestBody User user) {
        if ("admin".equalsIgnoreCase(user.getRole())) {
            adminService.registerAdmin((Admin) user);
            return "Admin registered successfully!";
        } else {
            playerService.registerPlayer((Player) user);
            return "Player registered successfully!";
        }
    }

    @PostMapping("/login/user")
    public String login(@RequestBody User user) {
        // Check if the user exists in the admin repository first
        User validAdmin = adminService.login(user.getUsername(), user.getPassword());
        if (validAdmin != null) {
            return "Admin login successful!";
        }

        // If not an admin, check if the user exists in the player repository
        User validPlayer = playerService.login(user.getUsername(), user.getPassword());
        return validPlayer != null ? "Player login successful!" : "Invalid credentials.";
    }
}
