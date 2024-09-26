package com.tetraleague.model;

import com.tetraleague.service.TournamentService;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
@Document("users")
@TypeAlias("player")
public class Player extends User {
    private int eloRating;
    private List<Tournament> tournaments;

    public Player(String username, String email, String password, int eloRating) {
        super(username, email, password);
        this.eloRating = eloRating;
    }

    public void addTournament(Tournament tournament) {
        tournaments.add(tournament);
    }

    public void removeTournament(Tournament tournament) {
        tournaments.remove(tournament);
    }
}
