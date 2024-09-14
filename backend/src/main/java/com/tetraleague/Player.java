package com.tetraleague;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class Player extends User {
    private int eloRating;

    public Player() {}

    public Player(String id, String firstName, String lastName, String username, String email, String password, String role, int eloRating) {
        super(id, firstName, lastName, username, email, password, "player");
        this.eloRating = eloRating;
    }

    // Getters and setters
    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int eloRating) {
        this.eloRating = eloRating;
    }
}
