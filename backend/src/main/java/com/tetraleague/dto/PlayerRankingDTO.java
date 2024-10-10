package com.tetraleague.dto;

import com.tetraleague.model.Rank;

import lombok.Data;

@Data
public class PlayerRankingDTO {
    private String username;
    private int eloRating;
    private int gamesWon;
    private int gamesLost;
    private double winRate;
    private Rank rank;
    private int globalRank; 

    public PlayerRankingDTO(String username, int eloRating, int gamesWon, int gamesLost, double winRate, Rank rank) {
        this.username = username;
        this.eloRating = eloRating;
        this.gamesWon = gamesWon;
        this.gamesLost = gamesLost;
        this.winRate = winRate;
        this.rank = rank;
    }

    public PlayerRankingDTO(String username, int eloRating, int gamesWon, int gamesLost, double winRate, Rank rank, int globalRank) {
        this.username = username;
        this.eloRating = eloRating;
        this.gamesWon = gamesWon;
        this.gamesLost = gamesLost;
        this.winRate = winRate;
        this.rank = rank;
        this.globalRank = globalRank;
    }
}
