package com.tetraleague.model;

import java.util.ArrayList;
import java.util.List;

import java.sql.Date;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("users")
@TypeAlias("player")
public class Player extends User {

    private int eloRating; 
    private List<Tournament> tournaments = new ArrayList<>();

    private int gamesWon = 0;
    private int gamesLost = 0;
    private Rank rank = Rank.UNRANKED;

    // // set default values for deviation and volatility
    // private double ratingDeviation = 200.00;
    // private double volatility = 0.06;

    public Player(String username,String name, String email, String password,
            int eloRating) {
        super(username, name, email, password);
        this.eloRating = eloRating;
    }

    // Getter and Setter for tournaments
    public void addTournament(Tournament tournament) {
        tournaments.add(tournament);
    }

    public void removeTournament(Tournament tournament) {
        tournaments.remove(tournament);
    }

    //Modified getter method for getWinRate
    public double getWinRate() {
        if ((gamesLost + gamesWon) == 0) {
            return 0.0;
        }
        return (double) gamesWon / (gamesLost + gamesWon) * 100.0;
    }

    // // Method to format a value to 2 decimal places
    // public double formatToTwoDecimalPlaces(double value) {
    //     return Double.parseDouble(String.format("%.2f", value));
    // }

    // // Modified Setter for eloRating to 2dp
    // public void setEloRating(double eloRating) {
    //     this.eloRating = formatToTwoDecimalPlaces(eloRating);
    // }

    // // Modified Setter for ratingDeviation to 2dp
    // public void setRatingDeviation(double ratingDeviation) {
    //     this.ratingDeviation = formatToTwoDecimalPlaces(ratingDeviation);
    // }

    // // Modified Setter for volatility to 2dp
    // public void setVolatility(double volatility) {
    //     this.volatility = formatToTwoDecimalPlaces(volatility);
    // }
}