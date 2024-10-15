package com.tetraleague.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Document(collection = "rounds")
public class Round {
    @Id
    private String id;
    private int roundNumber;
    private List<String> matchIds = new ArrayList<>(); // Correct the variable name

    // Constructor to accept match IDs
    public Round(int roundNumber, List<String> matchIds) {
        this.roundNumber = roundNumber;
        this.matchIds = matchIds;
    }

    public List<String> getMatches() {
        return matchIds;
    }

    // Add a match by ID
    public void addMatch(String matchId) {
        matchIds.add(matchId);
    }

    // Dummy method to check if match is complete
    public boolean isComplete() {
        return matchIds.stream().allMatch(matchId -> {
            // Replace with actual logic to check if match is complete
            return true;
        });
    }

    // Get the winners' IDs from completed matches
    public List<String> getWinnersId() {
        if (!isComplete()) {
            return new ArrayList<>();
        }
        return matchIds.stream().map(matchId -> {
            // Replace with actual logic to fetch the winner from MatchService
            return "winnerId"; // Fetch actual winnerId
        }).collect(Collectors.toList());
    }
}
