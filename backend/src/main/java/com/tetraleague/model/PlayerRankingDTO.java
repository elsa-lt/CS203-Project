package com.tetraleague.model;

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

    // Getters and Setters for all the fields
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getEloRating() {
        return eloRating;
    }

    public void setEloRating(int eloRating) {
        this.eloRating = eloRating;
    }

    public int getGamesWon() {
        return gamesWon;
    }

    public void setGamesWon(int gamesWon) {
        this.gamesWon = gamesWon;
    }

    public int getGamesLost() {
        return gamesLost;
    }

    public void setGamesLost(int gamesLost) {
        this.gamesLost = gamesLost;
    }

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }

    public int getGlobalRank() {
        return globalRank;
    }

    public void setGlobalRank(int globalRank) {
        this.globalRank = globalRank;
    }

    //needed as player class does not calculate this
    public double getWinRate() {
        if((gamesLost + gamesWon) == 0) {
            return 0.0;
        }
        return gamesWon / (gamesLost + gamesWon) * 100.0;
    }

    //testing - not needed
    @Override
    public String toString() {
        return "PlayerRankingDTO{" +
                "username='" + username + '\'' +
                ", eloRating=" + eloRating +
                ", gamesWon=" + gamesWon +
                ", gamesLost=" + gamesLost +
                ", winRate=" + winRate + 
                ", rank=" + rank +
                ", globalRank=" + globalRank +
                '}';
    }
}
