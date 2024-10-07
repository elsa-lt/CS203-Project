package com.tetraleague.model;

import java.sql.Date;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Document("users")
@TypeAlias("player")
public class Player extends User {
    private int eloRating;
    private List<Tournament> tournaments = new ArrayList<>();

    public Player(String username, String email, String password, String name,
            int eloRating) {
        super(username, name, email, password);
        this.eloRating = eloRating;
    }

    public void addTournament(Tournament tournament) {
        tournaments.add(tournament);
    }

    public void removeTournament(Tournament tournament) {
        tournaments.remove(tournament);
    }
}