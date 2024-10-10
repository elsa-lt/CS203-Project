package com.tetraleague.model;

import lombok.Data;

@Data
public class Glicko2Player {
    private int rating;
    private double ratingDeviation;
    private double volatility;

    private static final double TAU = 0.5;
    private static final double GLICKO_SCALE = 173.7178;
    private static final double EPSILON = 0.000001;

    public Glicko2Player(int rating, double ratingDeviation, double volatility) {
        this.rating = rating;
        this.ratingDeviation = ratingDeviation;
        this.volatility = volatility;
    }

    public void updateRating(double opponentRating, double opponentRD, double actualScore) {
        double[] updatedValues = calculateNewRating(rating, ratingDeviation, volatility, opponentRating, opponentRD, actualScore);
        this.rating = (int) Math.round(updatedValues[0]);
        this.ratingDeviation = updatedValues[1];
        this.volatility = updatedValues[2];
    }

    public static double[] calculateNewRating(double ratingA, double rdA, double volatilityA,
                                              double ratingB, double rdB, double actualScore) {

        double glickoRatingA = (ratingA - 1500) / GLICKO_SCALE;
        double glickoRDA = rdA / GLICKO_SCALE;

        double glickoRatingB = (ratingB - 1500) / GLICKO_SCALE;
        double glickoRDB = rdB / GLICKO_SCALE;

        double gRDB = g(glickoRDB);
        double expectedScore = E(glickoRatingA, glickoRatingB, glickoRDB);

        double v = variance(glickoRDB, expectedScore);

        double delta = delta(gRDB, actualScore, expectedScore, v);

        double newVolatilityA = updateVolatility(volatilityA, delta, glickoRDA, v);

        double newRD = updateRD(glickoRDA, newVolatilityA, v);

        double newRating = updateRating(glickoRatingA, gRDB, actualScore, expectedScore, newRD);

        double newRatingA = newRating * GLICKO_SCALE + 1500;
        double newRDA = newRD * GLICKO_SCALE;

        return new double[] {newRatingA, newRDA, newVolatilityA};
    }

    private static double g(double oppRD) {
        return 1.0 / Math.sqrt(1.0 + 3.0 * oppRD * oppRD / (Math.PI * Math.PI));
    }

    private static double E(double rating, double oppRating, double oppRD) {
        return 1.0 / (1.0 + Math.exp(-g(oppRD) * (rating - oppRating)));
    }

    private static double variance(double oppRD, double expectedScore) {
        return 1.0 / (g(oppRD) * g(oppRD) * expectedScore * (1 - expectedScore));
    }

    private static double delta(double gRD, double actualScore, double expectedScore, double v) {
        return v * gRD * (actualScore - expectedScore);
    }

    private static double updateRD(double RD, double sigma, double v) {
        return 1.0 / Math.sqrt(1.0 / (RD * RD + sigma * sigma) + 1.0 / v);
    }

    private static double updateRating(double rating, double gRD, double actualScore, double expectedScore, double newRD) {
        return rating + newRD * newRD * gRD * (actualScore - expectedScore);
    }

    private static double updateVolatility(double sigma, double delta, double phi, double v) {
        double a = Math.log(sigma * sigma);
        double A = a;
        double B;
        if (delta * delta > phi * phi + v) {
            B = Math.log(delta * delta - phi * phi - v);
        } else {
            B = a - Math.log(10);
        }

        double fA = f(A, delta, phi, v, sigma);
        double fB = f(B, delta, phi, v, sigma);

        while (Math.abs(B - A) > EPSILON) {
            double C = A + (A - B) * fA / (fB - fA);
            double fC = f(C, delta, phi, v, sigma);

            if (fC * fB < 0) {
                A = B;
                fA = fB;
            } else {
                fA /= 2.0;
            }

            B = C;
            fB = fC;
        }

        return Math.exp(A / 2);
    }
    
    private static double f(double x, double delta, double phi, double v, double sigma) {
        double expX = Math.exp(x);
        double term1 = expX * (delta * delta - phi * phi - v - expX);
        double term2 = 2 * (phi * phi + v + expX) * (phi * phi + v + expX);
        double term3 = (x - Math.log(sigma * sigma)) / (TAU * TAU);
        return (term1 / term2) - term3;
    }
}