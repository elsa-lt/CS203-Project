package com.tetraleague.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Player extends User {
    private int eloRating;
    private Role role;  // Optional: Add a role field or any other attributes specific to players

    public Player(String username, String email, String password, Role role) {
        super(username, email, password);  // Fix: Matching the User constructor
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
