package com.tetraleague.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class Round {

    @Id
    private String id;
    private int roundNumber;
    private List<String> matchesIds = new ArrayList<>(); // Initialize list to avoid null pointer issues

    // Constructor to accept match IDs
    public Round(int roundNumber, List<String> matchIds) {
        this.roundNumber = roundNumber;
        this.matchesIds = matchesIds;
    }

    // Add a match by ID
    public void addMatch(String matchId) {
        matchesIds.add(matchId); // Fix variable name to matchIds
    }

//    // Dummy method to check if match is complete (in reality you'd fetch match info from database)
//    public boolean isComplete() {
//        // Replace this with actual fetching logic for the match object
//        return matchIds.stream().allMatch(matchId -> {
//            // Dummy check, assumes all matches are completed
//            return true; // Replace with actual logic (e.g., MatchService.isMatchCompleted(matchId))
//        });
//    }

    // Get the winners' IDs from completed matches
    public List<String> getWinnersId() {
        if (!isComplete()) {
            return new ArrayList<>();
        }
        return matchesIds.stream().map(matchId -> {
            // Dummy map function, replace with actual fetch logic to get match winner
            return "winnerId"; // Replace with actual logic (e.g., MatchService.getWinnerId(matchId))
        }).collect(Collectors.toList());
    }
}
