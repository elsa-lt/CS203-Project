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
    private String winnerId;  // initially null
    private int roundNumber;
    private boolean isCompleted;  // initially false

    // Constructor
    public Match(String player1Id, String player2Id, int roundNumber) {
        this.player1Id = player1Id;
        this.player2Id = player2Id;
        this.roundNumber = roundNumber;
        this.isCompleted = false; // new matches are not completed
    }

    // Setter for winner
    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
        this.isCompleted = true; // mark as completed
        System.out.println("Winner set to: " + winnerId + ", Match completed: " + isCompleted);
    }

    public String getMatchup() {
        return "Match " + getId() + ": " + player1Id + " vs " + player2Id;
    }

    public String getId() {
        return id; 
    }
}
