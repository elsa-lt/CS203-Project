package com.tetraleague.controller;

import com.tetraleague.model.*;
import com.tetraleague.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private PlayerService playerService;

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @GetMapping("/health")
    public String healthCheck() {
        return "Application is up and running!";
    }    

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        logger.info("Register request received: {}", user);
        String role = user.getRole().toLowerCase();
        String result;
        
        if ("admin".equals(role)) {
        // Create Admin instance and register
            Admin admin = new Admin(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername(), user.getEmail(), user.getPassword(), user.getConfirmPassword());
            result = adminService.registerAdmin(admin, user.getConfirmPassword());        
        } else {
            // Create Player instance and register
            Player player = new Player(user.getId(), user.getFirstName(), user.getLastName(), user.getUsername(), user.getEmail(), user.getPassword(), user.getConfirmPassword(), 1000); // Default eloRating set to 1000
            result = playerService.registerPlayer(player, user.getConfirmPassword());
        }
        return result;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        
        // Check if the user exists in the admin repository first
        Admin validAdmin = adminService.login(username, password);
        if (validAdmin != null) {
            return "Admin login successful!";
        }

        // If not an admin, check if the user exists in the player repository
        Player validPlayer = playerService.login(username, password);
        return validPlayer != null ? "Player login successful!" : "Invalid credentials.";
    }
}
