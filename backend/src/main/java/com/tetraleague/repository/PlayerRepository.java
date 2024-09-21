package com.tetraleague.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tetraleague.model.Player;

import javax.swing.text.html.Option;

@Repository
public interface PlayerRepository extends MongoRepository<Player, String> {
    Player findByUsername(String username);

    // To find players by Elo rating range
    List<Player> findByEloRatingBetween(int minElo, int maxElo);
}