package com.tetraleague.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

public class Player extends User {
    private int eloRating;

    // Constructor for registration
    public Player(String id, String firstName, String lastName, String username, String email, String password, String confirmPassword, int eloRating) {
        super(id, firstName, lastName, username, email, password, confirmPassword, "player");
        this.eloRating = 400;
    }

    // Constructor for login
    public Player(String username, String password) {
        super(username, password);
    }

    // Getter and setter
    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int eloRating) {
        this.eloRating = eloRating;
    }
}
