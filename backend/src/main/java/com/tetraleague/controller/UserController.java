package com.tetraleague.controller;

import com.tetraleague.model.Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        Optional<User> existingUser = userService.getUserById(id);
        if (existingUser.isPresent()) {
            updatedUser.setId(id); // Keep the same ID
            return ResponseEntity.ok(userService.saveUser(updatedUser));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        if (userService.getUserById(id).isPresent()) {
            userService.deleteUserById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{username}/joinTournament")
    public ResponseEntity<String> joinTournament(@PathVariable String username, @RequestBody String tournamentId) {
        Optional<Player> player = userService.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (player.isPresent()) {
            try {
                userService.joinTournament(player.get(), tournamentId);
                return ResponseEntity.ok("Player joined the tournament successfully!");
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{username}/withdrawTournament")
    public ResponseEntity<String> withdrawFromTournament(@PathVariable String username, @RequestBody String tournamentId) {
        try {
            Player player = (Player) userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Player not found!"));

            userService.withdrawFromTournament(player, tournamentId);

            return ResponseEntity.ok("Player withdrew from the tournament successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{username}/tournaments")
    public ResponseEntity<List<Tournament>> getTournaments(@PathVariable String username) {
        List<Tournament> tournaments = userService.getTournaments(username);
        return ResponseEntity.ok(tournaments);
    }
}