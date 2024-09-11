package com.tetraleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new player
    @PostMapping("/players")
    public Player createPlayer(@RequestBody Player player) {
        return userService.savePlayer(player);
    }

    // Create a new admin
    @PostMapping("/admins")
    public Admin createAdmin(@RequestBody Admin admin) {
        return userService.saveAdmin(admin);
    }

    // Get all players
    @GetMapping("/players")
    public List<Player> getAllPlayers() {
        return userService.getAllPlayers();
    }

    // Get all admins
    @GetMapping("/admins")
    public List<Admin> getAllAdmins() {
        return userService.getAllAdmins();
    }
}
