package com.tetraleague.service;

// import org.apache.el.stream.Optional;

import com.tetraleague.model.Player;
import com.tetraleague.model.Rank;
import com.tetraleague.model.Glicko2Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public class RankingService {

    @Autowired
    private UserRepository userRepository;

    // Get player eloRating - to check if eligible for tournament
    public int getPlayerEloRating(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            return playerOptional.get().getEloRating();
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
            return playerOptional.get().getRank();
        } else {
            throw new RuntimeException("Player not found!");
        }
    }

    // Update player eloRating
    public void updatePlayerEloRating(String username, String opponentUsername, double outcome) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);
    
        Optional<Player> opponentOptional = userRepository.findByUsername(opponentUsername)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);
    
        if (playerOptional.isPresent() && opponentOptional.isPresent()) {
            Player player = playerOptional.get();
            Player opponent = opponentOptional.get();
    
            // Create a Glicko2Player instance for the player and opponent
            Glicko2Player glickoPlayer = new Glicko2Player(player.getEloRating(), player.getRatingDeviation(), player.getVolatility());

            Glicko2Player glickoOpponent = new Glicko2Player(opponent.getEloRating(), opponent.getRatingDeviation(), opponent.getVolatility());
    
            // Update the player's and opponent's rating
            glickoPlayer.updateRating(opponent.getEloRating(), opponent.getRatingDeviation(), outcome);
            
            glickoOpponent.updateRating(player.getEloRating(), player.getRatingDeviation(), 1 - outcome); // Assuming outcome is 1 for player A win, 0 for loss
    
            // Update player's and opponent's attributes
            player.setEloRating(glickoPlayer.getRating());
            player.setRatingDeviation(glickoPlayer.getRatingDeviation());
            player.setVolatility(glickoPlayer.getVolatility());
    
            opponent.setEloRating(glickoOpponent.getRating());
            opponent.setRatingDeviation(glickoOpponent.getRatingDeviation());
            opponent.setVolatility(glickoOpponent.getVolatility());
    
            // Save both players to the repository
            userRepository.save(player);
            userRepository.save(opponent);
        } else {
            if (playerOptional.isEmpty()) {
                throw new RuntimeException("Player not found!");
            }
            if (opponentOptional.isEmpty()) {
                throw new RuntimeException("Opponent not found!");
            }
        }
    }

    // Update player rank
    public void updatePlayerRank(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            Rank rank = playerOptional.get().getRank();
            int eloRating = playerOptional.get().getEloRating();

            if (eloRating >= 4500) {
                rank = Rank.PLATINUM;
            } else if (eloRating >= 3000) {
                rank = Rank.GOLD;
            } else if (eloRating >= 2000) {
                rank = Rank.SILVER;
            } else if ((playerOptional.get().getGamesLost() + playerOptional.get().getGamesWon()) < 10
                    || eloRating < 1000) {
                rank = Rank.UNRANKED;
            } else {
                rank = Rank.BRONZE;
            }

            playerOptional.get().setRank(rank);

        } else {
            throw new RuntimeException("Player not found!");
        }
    }

    // Update player stats - if player wins --> 1, if player loses --> 0
    public void updatePlayerStats(String username, double outcome) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            if (outcome == 1) {
                playerOptional.get().getGamesWon()++;
            } else {
                playerOptional.get().getGamesLost()++;
            }
        } else {
            throw new RuntimeException("Player not found!");
        }
    }
}
