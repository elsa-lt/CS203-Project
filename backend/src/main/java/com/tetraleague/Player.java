package com.tetraleague;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

public class Player extends User {
    private int eloRating;
    private String rank;

    // Getters and setters
    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int eloRating) {
        this.eloRating = eloRating;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }
}
