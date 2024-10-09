package com.tetraleague.controller;

import com.tetraleague.model.Player;
import com.tetraleague.model.Admin;
import com.tetraleague.model.Rank;
import com.tetraleague.model.PlayerRankingDTO;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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

    @GetMapping("/info")
    public ResponseEntity<User> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> optionalUser = userService.findByUsername(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // //the above "info" also displays game stats
    // @GetMapping("/info/gamestats")
    // public ResponseEntity<PlayerRankingDTO> getPlayerStats(@AuthenticationPrincipal UserDetails userDetails) {
    //     Optional<Player> playerOptional = userService.findByUsername(userDetails.getUsername())
    //             .filter(user -> user instanceof Player)
    //             .map(user -> (Player) user);

    //     if (playerOptional.isPresent()) {
    //         Player player = playerOptional.get();

    //         // Create PlayerRankingDto based on Player object (without global rank)
    //         PlayerRankingDTO playerDto = new PlayerRankingDTO(
    //                 player.getUsername(),
    //                 player.getEloRating(),
    //                 player.getGamesWon(),
    //                 player.getGamesLost(),
    //                 player.getWinRate(),
    //                 player.getRank());

    //         return ResponseEntity.ok(playerDto);
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }

    // get the global ranking
    @GetMapping("/global-ranking")
    public List<PlayerRankingDTO> getGlobalRanking() {
        // Fetch all users and filter for players
        List<Player> players = userService.getAllUsers().stream()
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user)
                .collect(Collectors.toList());

        // Sort players based on the criteria: Rank, EloRating, WinRate, Player ID
        players.sort(Comparator.comparing(Player::getRank) // Rank
                .thenComparing(Player::getEloRating, Comparator.reverseOrder()) // EloRating (higher first)
                .thenComparing(player -> player.getGamesWon() / (double) (player.getGamesWon() + player.getGamesLost()),
                        Comparator.reverseOrder()) // WinRate (higher first)
                .thenComparing(Player::getId)); // Player ID 

        // Create a list of PlayerRankingDTOs with ranking numbers
        List<PlayerRankingDTO> playerRankingDTOs = IntStream.range(0, players.size())
                .mapToObj(i -> {
                    Player player = players.get(i);
                    return new PlayerRankingDTO(
                            player.getUsername(),
                            (int) player.getEloRating(),
                            player.getGamesWon(),
                            player.getGamesLost(),
                            player.getWinRate(),
                            player.getRank(),
                            i + 1 // Rank
                    );
                })
                .collect(Collectors.toList());

        return playerRankingDTOs;
    }

    //Get bracket-ranking based on rank
    @GetMapping("/bracket-ranking/{rank}")
    public ResponseEntity<List<PlayerRankingDTO>> getBracketRanking(@PathVariable Rank rank) {

        List<Player> players = userService.getAllUsers().stream()
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user)
                .filter(player -> player.getRank() == rank) //Filter by rank
                .collect(Collectors.toList());

        players.sort(Comparator.comparing(Player::getEloRating, Comparator.reverseOrder())
                .thenComparing(player -> player.getGamesWon() / (double) (player.getGamesWon() + player.getGamesLost()),
                        Comparator.reverseOrder()) 
                .thenComparing(Player::getId)); 


        List<PlayerRankingDTO> playerRankingDTOs = IntStream.range(0, players.size())
                .mapToObj(i -> {
                    Player player = players.get(i);
                    return new PlayerRankingDTO(
                            player.getUsername(),
                            (int) player.getEloRating(),
                            player.getGamesWon(),
                            player.getGamesLost(),
                            player.getWinRate(),
                            player.getRank(),
                            i + 1 
                    );
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(playerRankingDTOs);
    }
}
