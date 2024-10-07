package com.tetraleague.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.TypeAlias;
// import org.springframework.data.mongodb.core.aggregation.DocumentOperators.Rank;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document("users")
@TypeAlias("player")
public class Player extends User {
    
    @Field
    private int eloRating;

    @Field
    private List<Tournament> tournaments = new ArrayList<>();

    // set to default values 0 inside constructor
    @Field
    private int gamesWon = 0;

    @Field
    private int gamesLost = 0;

    @Field
    // All players start with Unranked
    private Rank rank = Rank.UNRANKED;

    //do not need game stats in constructor as they have default values
    public Player(String username, String email, String password, int eloRating) {
        super(username, email, password);
        this.eloRating = eloRating;
    }

    //Getter and Setter for tournaments
    public void addTournament(Tournament tournament) {
        tournaments.add(tournament);
    }

    public void removeTournament(Tournament tournament) {
        tournaments.remove(tournament);
    }

    //Getter and setter for elo-rating (for update)
    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int newEloRating) {
        eloRating = newEloRating; 
    }

    // Update games won and games lost
    //if player wins - value true
    public void updateGameResults(boolean won) {
        if (won) {
            gamesWon++;
        } else {
            gamesLost++;
        }
    }

    // Update the rank - takes in elorating
    public void updateRank(int eloRating) {
        if (eloRating >= 4500) {
            rank = Rank.PLATINUM;
        } else if (eloRating >= 3000) {
            rank =  Rank.GOLD;
        } else if (eloRating >= 2000) {
            rank =  Rank.SILVER;
        } else if ((gamesWon + gamesLost) < 10) {
            rank =  Rank.UNRANKED;
        } else {
            rank =  Rank.BRONZE;
        }
    }

    // //Calculate winRate for playerDTO to display
    // public double getWinRate() {
    //     if((gamesLost + gamesWon) == 0) {
    //         return 0.0;
    //     }
    //     return gamesWon / (gamesLost + gamesWon) * 100.0;
    // }
}
