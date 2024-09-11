package com.tetraleague;

public class Player extends User {
    private int eloRating;
    private int rank;

    // Getters and setters
    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int eloRating) {
        this.eloRating = eloRating;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }
}
