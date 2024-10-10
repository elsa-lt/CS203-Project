package com.tetraleague.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlayerRankingDTO {
    private String username;
    private int eloRating;
    private int gamesWon;
    private int gamesLost;
    private double winRate;
    private Rank rank;
    private int globalRank; 

    //this constructor is used for displaying player game stats
    public PlayerRankingDTO(String username, int eloRating, int gamesWon, int gamesLost, double winRate, Rank rank) {
        this.username = username;
        this.eloRating = eloRating;
        this.gamesWon = gamesWon;
        this.gamesLost = gamesLost;
        this.winRate = winRate;
        this.rank = rank;
    }

    //this constructor used for player ranking (both global and bracket)
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
