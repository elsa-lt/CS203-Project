package com.tetraleague.model;

import java.sql.Date;

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

    public Player(String username, String email, String password, String name,
            int eloRating) {
        super(username, name, email, password);
        this.eloRating = eloRating;
    }

}
