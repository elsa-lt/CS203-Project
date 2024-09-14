package com.tetraleague.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.tetraleague.model.Player;

@Repository
public interface PlayerRepository extends MongoRepository<Player, String> {
    Player findByUsername(String username);

    // To find players by Elo rating range
    List<Player> findByEloRatingBetween(int minElo, int maxElo);
}