package com.tetraleague.controller;

import com.tetraleague.dto.PlayerRankingDTO;
import com.tetraleague.model.User;
import com.tetraleague.model.UserExistsResponse;
import com.tetraleague.model.Player; 
import com.tetraleague.model.Tournament;
import com.tetraleague.model.Rank;
import com.tetraleague.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.Comparator; 

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
    public ResponseEntity<?> updateUser(@PathVariable("id") String userId, @RequestBody User updatedUser) {
        Optional<User> existingUserOpt = userService.getUserById(userId);
    
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
    
            if (!existingUser.getUsername().equals(updatedUser.getUsername()) && userService.existsByUsername(updatedUser.getUsername())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Error: Username is already taken!");
            }
    
            if (!existingUser.getEmail().equals(updatedUser.getEmail()) && userService.existsByEmail(updatedUser.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Error: Email is already in use!");
            }
    
            Optional<User> updatedUserOpt = userService.updateUser(userId, updatedUser);
            if (updatedUserOpt.isPresent()) {
                return ResponseEntity.ok(updatedUserOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
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

    @GetMapping("/check")
    public ResponseEntity<?> checkUserExists(@RequestParam(required = false) String username, 
                                              @RequestParam(required = false) String email) {
        boolean usernameExists = (username != null && userService.existsByUsername(username));
        boolean emailExists = (email != null && userService.existsByEmail(email));
        
        return ResponseEntity.ok().body(new UserExistsResponse(usernameExists, emailExists));
    }
    
    @GetMapping("/info")
    public ResponseEntity<User> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> optionalUser = userService.findByUsername(userDetails.getUsername());
        return optionalUser.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{username}/joinTournament")
    public ResponseEntity<String> joinTournament(@PathVariable String username, @RequestBody String tournamentId) {
        try {
            Player player = (Player) userService.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Player not found!"));
            userService.joinTournament(player, tournamentId);
            return ResponseEntity.ok("Player joined the tournament successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{username}/withdrawTournament/{tournamentId}")
    public ResponseEntity<String> withdrawFromTournament(@PathVariable String username, @PathVariable String tournamentId) {
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
    public ResponseEntity<List<Tournament>> getRegisteredTournaments(@PathVariable String username) {
        List<Tournament> tournaments = userService.getTournaments(username);
        return ResponseEntity.ok(tournaments);
    }

    @GetMapping("/global-ranking")
    public ResponseEntity<List<PlayerRankingDTO>> getGlobalRanking() {
        
        List<Player> players = userService.getAllUsers().stream()
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user)
                .collect(Collectors.toList());

        players.sort(Comparator.comparing(Player::getRank)
                .thenComparing(Player::getEloRating, Comparator.reverseOrder())
                .thenComparing(player -> {
                    int gamesWon = player.getGamesWon();
                    int gamesLost = player.getGamesLost();
                    int totalGames = gamesWon + gamesLost;
                    return totalGames == 0 ? 0.0 : (double) gamesWon / totalGames;
                }, Comparator.reverseOrder())
                .thenComparing(Player::getId));

        List<PlayerRankingDTO> playerRankingDTOs = IntStream.range(0, players.size())
                .mapToObj(i -> {
                    Player player = players.get(i);
                    return new PlayerRankingDTO(
                            player.getUsername(),
                            player.getEloRating(),
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

    @GetMapping("/bracket-ranking/{rank}")
    public ResponseEntity<List<PlayerRankingDTO>> getBracketRanking(@PathVariable Rank rank) {
        
        List<Player> players = userService.getAllUsers().stream()
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user)
                .filter(player -> player.getRank() == rank)
                .collect(Collectors.toList());

        players.sort(Comparator.comparing(Player::getEloRating, Comparator.reverseOrder())
                .thenComparing(player -> {
                    int gamesWon = player.getGamesWon();
                    int gamesLost = player.getGamesLost();
                    int totalGames = gamesWon + gamesLost;
                    return totalGames == 0 ? 0.0 : (double) gamesWon / totalGames;
                }, Comparator.reverseOrder())
                .thenComparing(Player::getId)); 
       
        List<PlayerRankingDTO> playerRankingDTOs = IntStream.range(0, players.size())
                .mapToObj(i -> {
                    Player player = players.get(i);
                    return new PlayerRankingDTO(
                            player.getUsername(),
                            player.getEloRating(),
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