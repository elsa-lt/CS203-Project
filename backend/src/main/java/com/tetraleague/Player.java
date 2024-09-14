package com.tetraleague;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "players")
public class Player extends User {
    private int eloRating;

    // Default constructor
    public Player() {
        super();
    }

    // Constructor for registration
    public Player(String id, String firstName, String lastName, String username, String email, String password, String confirmPassword, int eloRating) {
        super(id, firstName, lastName, username, email, password, confirmPassword, "player");
        this.eloRating = 400;
    }

    // Constructor for login
    public Player(String username, String password) {
        super(username, password);
    }

    // Getters and setters
    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int eloRating) {
        this.eloRating = eloRating;
    }
}
