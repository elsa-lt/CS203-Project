package com.tetraleague.service;

import com.tetraleague.model.Player;
import com.tetraleague.model.Rank;
import com.tetraleague.model.Glicko2Player;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RankingService {

    @Autowired
    private UserRepository userRepository;

    public int getPlayerEloRating(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        return playerOptional.map(Player::getEloRating).orElseThrow(() -> new RuntimeException("Player not found!"));
    }

    public Rank getPlayerRank(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        return playerOptional.map(Player::getRank).orElseThrow(() -> new RuntimeException("Player not found!"));
    }

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
    
            Glicko2Player glickoPlayer = new Glicko2Player(player.getEloRating(), player.getRatingDeviation(), player.getVolatility());
            Glicko2Player glickoOpponent = new Glicko2Player(opponent.getEloRating(), opponent.getRatingDeviation(), opponent.getVolatility());
    
            glickoPlayer.updateRating(opponent.getEloRating(), opponent.getRatingDeviation(), outcome);
            glickoOpponent.updateRating(player.getEloRating(), player.getRatingDeviation(), 1 - outcome);
    
            player.setEloRating(glickoPlayer.getRating());
            player.setRatingDeviation(glickoPlayer.getRatingDeviation());
            player.setVolatility(glickoPlayer.getVolatility());
    
            opponent.setEloRating(glickoOpponent.getRating());
            opponent.setRatingDeviation(glickoOpponent.getRatingDeviation());
            opponent.setVolatility(glickoOpponent.getVolatility());
    
            userRepository.save(player);
            userRepository.save(opponent);

            updatePlayerRank(username);
            updatePlayerRank(opponentUsername);

        } else {
            throw new RuntimeException("Player or opponent not found!");
        }
    }

    public void updatePlayerRank(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        playerOptional.ifPresent(player -> {
            int eloRating = player.getEloRating();
            Rank newRank;

            if (eloRating >= 4500) {
                newRank = Rank.PLATINUM;
            } else if (eloRating >= 3000) {
                newRank = Rank.GOLD;
            } else if (eloRating >= 2000) {
                newRank = Rank.SILVER;
            } else if ((player.getGamesLost() + player.getGamesWon()) < 10 || eloRating < 1000) {
                newRank = Rank.UNRANKED;
            } else {
                newRank = Rank.BRONZE;
            }

            player.setRank(newRank);
            userRepository.save(player);
        });
    }

    public void updatePlayerStats(String username, double outcome) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        playerOptional.ifPresent(player -> {
            if (outcome == 1) {
                player.setGamesWon(player.getGamesWon() + 1);
            } else {
                player.setGamesLost(player.getGamesLost() + 1);
            }
            userRepository.save(player);
        });
    }
}
