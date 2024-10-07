package com.tetraleague.service;

import com.tetraleague.model.Glicko2Player;
import com.tetraleague.model.Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.DocumentOperators.Rank;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TournamentService tournamentService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void joinTournament(Player player, String tournamentId) {
        Tournament tournament = tournamentService.getTournamentById(tournamentId);
        tournamentService.addParticipant(tournamentId, player.getId());
        if (!player.getTournaments().contains(tournament)) {
            player.addTournament(tournament);
        }

        userRepository.save(player);
    }

    public void withdrawFromTournament(Player player, String tournamentId) {
        tournamentService.removeParticipant(tournamentId, player.getId());
    }

    public List<Tournament> getTournaments(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            return playerOptional.get().getTournaments();
        } else {
            throw new RuntimeException("Player not found!");
        }
    }

    
    // Get player eloRating - to check if eligible for tournament
    public int getPlayerEloRating(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            return playerOptional.get().getEloRating(); // Call getEloRating method from Player class
        } else {
            throw new RuntimeException("Player not found!");
        }
    }

    // Get player rank - to check if eligible for tournament
    public Rank getPlayerRank(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            return playerOptional.get().getRank(); // Call getRank method from Player class
        } else {
            throw new RuntimeException("Player not found!");
        }
    }

    // // Update player eloRating - need to fix
    // public void updatePlayerEloRating(String username, String opponentUsername, double outcome) {
    //     Optional<Player> playerOptional = userRepository.findByUsername(username)
    //             .filter(user -> user instanceof Player)
    //             .map(user -> (Player) user);

    //     Optional<Player> opponentOptional = userRepository.findByUsername(opponentUsername)
    //             .filter(user -> user instanceof Player)
    //             .map(user -> (Player) user);

    //     if (playerOptional.isPresent() && opponentOptional.isPresent()) {
    //         Player player = playerOptional.get();
    //         Player opponent = opponentOptional.get();

    //         // Create a Glicko2Player instance for the player
    //         // Assuming default volatility
    //         Glicko2Player glickoPlayer = new Glicko2Player(player.getEloRating(), player.getEloRating(), 0.06); 

    //         // Update the rating based on the opponent's rating and rating deviation
    //         glickoPlayer.updateRating(opponent.getEloRating(), opponent.getEloRating(), outcome);

    //         // Update player's eloRating
    //         player.setEloRating(glickoPlayer.getRating());

    //         // Save updated player to the repository
    //         userRepository.save(player);
    //     } else {
    //         if (playerOptional.isEmpty()) {
    //             throw new RuntimeException("Player not found!");
    //         }
    //         if (opponentOptional.isEmpty()) {
    //             throw new RuntimeException("Opponent not found!");
    //         }
    //     }
    // }

    // Update player rank
    public void updatePlayerRank(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            playerOptional.get().setRank(playerOptional.getEloRating());
        } else {
            throw new RuntimeException("Player not found!");
        }
    }

    // Update player stats - if player wins --> true, if player loses --> false
    public void updatePlayerStats(String username, boolean won) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            playerOptional.get().updateGameResults(won);
        } else {
            throw new RuntimeException("Player not found!");
        }
    }
}
