package com.tetraleague.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "matches")
public class Match {
    @Id
    private String id;
    private String player1Id;
    private String player2Id;
    private String winnerId;
    private int roundNumber;
    private boolean isCompleted;

    public Match(String player1Id, String player2Id, int roundNumber) {
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this.roundNumber = roundNumber;
        this.isCompleted = false;
    }

    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
        this.isCompleted = true;
    }

    public String getMatchup() {
        return "Match " + getId() + ": " + player1Id + " vs " + player2Id;
    }
}