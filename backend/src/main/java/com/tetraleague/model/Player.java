package com.tetraleague.model;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("users")
@TypeAlias("player")
public class Player extends User {

    private int eloRating; 
    private double ratingDeviation;
    private double volatility;

    private List<Tournament> tournaments = new ArrayList<>();

    private int gamesWon = 0;
    private int gamesLost = 0;
    private Rank rank = Rank.UNRANKED;

    public Player(String username, String name, String email, String password, int eloRating) {
        super(username, name, email, password);
        this.eloRating = eloRating;
    }

    public void addTournament(Tournament tournament) {
        tournaments.add(tournament);
    }

    public void removeTournament(Tournament tournament) {
        tournaments.remove(tournament);
    }

    public double getWinRate() {
        int totalGames = gamesLost + gamesWon;
        return totalGames == 0 ? 0.0 : (double) gamesWon / totalGames * 100.0;
    }
}
