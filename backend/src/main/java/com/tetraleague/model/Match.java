package com.tetraleague.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
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

    public void completeMatch(Player winner) {
        if (this.isCompleted) {
            throw new IllegalStateException("Match has already been completed");
        }
        if (!player1.equals(winner) && !player2.equals(winner)) {
            throw new IllegalArgumentException("Winner must be one of the players in the match.");
        }
        this.winner = winner;
        this.isCompleted = true;
    }

    public String getMatchup() {
        return player1.getUsername() + " vs " + player2.getUsername();
    }
}
