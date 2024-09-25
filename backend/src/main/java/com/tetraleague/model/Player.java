package com.tetraleague.model;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Document("users")
@TypeAlias("player")
public class Player extends User {
    private int eloRating;

    public Player(String username, String email, String password, int eloRating) {
        super(username, email, password);
        this.eloRating = eloRating;
    }

}
