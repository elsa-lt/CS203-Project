package com.tetraleague.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Player extends User {
    // Getter and setter
    private int eloRating;

    // Constructor for registration
    public Player(String id, String firstName, String lastName, String username, String email, String password, String confirmPassword, int eloRating) {
        super(id, firstName, lastName, username, email, password, confirmPassword, "player");
        this.eloRating = eloRating;
    }

    // Constructor for login
    public Player(String username, String password) {
        super(null, null, null, username, null, password, null, "player");
    }
}
