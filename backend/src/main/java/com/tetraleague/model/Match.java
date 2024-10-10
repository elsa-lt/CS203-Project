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

    public void completeMatch(Player winner) {
        if (this.isCompleted) {
            throw new IllegalStateException("Match has already been completed");
        }
        this.winner = winner;
        this.isCompleted = true;
    }
}
