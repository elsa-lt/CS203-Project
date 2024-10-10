package com.tetraleague.model;

import lombok.Getter;

public class Glicko2Player {

    //OLD CODE, NOT THE NEW ONE, NEW ONE GOT OVERWRITTEN

    private double rating;          // Player's rating (R)
    @Getter
    private double ratingDeviation; // Rating Deviation (RD)
    private double volatility;      // Volatility (σ)

    // Constants for the Glicko-2 system
    private static final double GLICKO_SCALE = 173.7178;
    private static final double Q = Math.log(10) / 400; // q = ln(10)/400

    // Constructor initialising rating, rating deviation, and volatility
    public Glicko2Player(double rating, double ratingDeviation, double volatility) {
        this.rating = rating;
        this.ratingDeviation = ratingDeviation;
        this.volatility = volatility;
    }

    // Convert from normal rating scale to Glicko-2 scale
    private double convertToGlickoScale(double rating) {
        return (rating - 1500) / GLICKO_SCALE;
    }

    // Convert back from Glicko-2 scale to normal scale
    private double convertToNormalScale(double glickoRating) {
        return glickoRating * GLICKO_SCALE + 1500;
    }

    // g(RD) function as per Glicko-2
    private double g(double rd) {
        return 1.0 / Math.sqrt(1.0 + 3.0 * Math.pow(rd, 2) / Math.pow(Math.PI, 2));
    }

    // E function to calculate the expected score
    private double E(double opponentRating, double rdOpponent) {
        return 1.0 / (1.0 + Math.pow(10, -g(rdOpponent) * (convertToGlickoScale(rating) - convertToGlickoScale(opponentRating)) / 400));
    }

    // Update rating after a match
    public void updateRating(double opponentRating, double opponentRD, double outcome) {
        double gRD = g(opponentRD);
        double E = E(opponentRating, opponentRD);
        double dSquared = 1.0 / (Q * Q * gRD * gRD * E * (1 - E));

        // Delta calculation
        double delta = Q / ((1.0 / Math.pow(ratingDeviation, 2)) + (1.0 / dSquared)) * (gRD * (outcome - E));

        // New RD
        ratingDeviation = Math.sqrt(1.0 / ((1.0 / Math.pow(ratingDeviation, 2)) + (1.0 / dSquared)));

        // New Rating
        rating += delta;
    }

    public double getRating() {
        return convertToNormalScale(rating);
    }

    public double getVolatility() {
        return volatility;
    }

    // public static void main(String[] args) {
    //     // Example usage
    //     Glicko2Player player1 = new Glicko2Player(1500, 200, 0.06);
    //     Glicko2Player player2 = new Glicko2Player(1400, 30, 0.06);

    //     // Player 1 wins against Player 2
    //     player1.updateRating(player2.getRating(), player2.getRatingDeviation(), 1);

    //     System.out.println("Player 1 new rating: " + player1.getRating());
    //     System.out.println("Player 1 new rating deviation: " + player1.getRatingDeviation());
    // }
}