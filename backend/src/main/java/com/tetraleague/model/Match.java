package com.tetraleague.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "matches")
public class Match {
    @Id
    private String id;
    private Player player1;
    private Player player2;
    private Player winner;
    private int roundNumber;
    private boolean isCompleted;

    public Match(Player player1, Player player2, int roundNumber) {
        this.player1 = player1;
        this.player2 = player2;
        this.roundNumber = roundNumber;
        this.isCompleted = false;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
        this.isCompleted = true;
    }

    public String getMatchup() {
        return "Match " + getId() + ": " + player1.getUsername() + " vs " + player2.getUsername();
    }
}