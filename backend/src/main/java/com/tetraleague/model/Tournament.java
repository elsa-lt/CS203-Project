package com.tetraleague.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tournaments")
public class Tournament {

    @Id
    private String id;
    private String name;
    private String description;
    private Integer maxParticipants;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<String> playerIds = new ArrayList<>();  // Updated field name
    private List<String> roundIds = new ArrayList<>();   // Store round IDs instead of Round objects
    private String imageUrl;
    private Double prizePool;
    private Rank rank;
    private String winnerId;
    private boolean started = false;
    private boolean ended = false;

    // Add a round by its ID
    public void addRound(String roundId) {
        roundIds.add(roundId);
    }

    public boolean hasStarted() {
        return started;
    }

    public boolean hasEnded() {
        return ended;
    }

    public boolean isFull() {
        return playerIds.size() >= maxParticipants;  // Updated to playerIds
    }

    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
    }

   // Add the method to return current round ID
// The `getCurrentRoundId()` method in the `Tournament` class is used to retrieve the ID of the current
// round in the tournament. It checks if the list of round IDs (`roundIds`) is empty and throws a
// `RuntimeException` if there are no rounds available. Otherwise, it returns the ID of the last round
// in the list, assuming it is the current round.
    public String getCurrentRoundId() {
        if (roundIds.isEmpty()) {
            return null;
        }
        return roundIds.get(roundIds.size() - 1); // Assuming last round is current
    }

    // Add a method to get all rounds
    public List<Round> getRounds() {
        // Replace this with actual logic to fetch rounds from your repository
        return new ArrayList<>();
    }


    public void addParticipant(String playerId) {
        this.playerIds.add(playerId);
    }
    public void removeParticipant(String participantId) {
        playerIds.remove(participantId);
    }

    public List<String> getPlayerIds() {
        return playerIds;
    }
    
}
