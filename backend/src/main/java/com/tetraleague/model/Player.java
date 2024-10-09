package com.tetraleague.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document("users")
@TypeAlias("player")
public class Player extends User {


    // set default values for rating, deviation and volatility
    @Field
    private double eloRating = 1000.00; 

    @Field
    private double ratingDeviation = 200.00;

    @Field
    private double volatility = 0.06;

    @Field
    private List<Tournament> tournaments = new ArrayList<>();

    // set to default values as 0 for game stats 0 
    @Field
    private int gamesWon = 0;

    @Field
    private int gamesLost = 0;

    // All players start with Unranked
    @Field
    private Rank rank = Rank.UNRANKED;


    public Player(String username, String email, String password, double eloRating) {
        super(username, email, password);
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
        return gamesWon / (gamesLost + gamesWon) * 100.0;
    }

    // Method to format a value to 2 decimal places
    public double formatToTwoDecimalPlaces(double value) {
        return Double.parseDouble(String.format("%.2f", value));
    }

    // Modified Setter for eloRating to 2dp
    public void setEloRating(double eloRating) {
        this.eloRating = formatToTwoDecimalPlaces(eloRating);
    }

    // Modified Setter for ratingDeviation to 2dp
    public void setRatingDeviation(double ratingDeviation) {
        this.ratingDeviation = formatToTwoDecimalPlaces(ratingDeviation);
    }

    // Modified Setter for volatility to 2dp
    public void setVolatility(double volatility) {
        this.volatility = formatToTwoDecimalPlaces(volatility);
    }
}
