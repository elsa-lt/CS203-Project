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

@Document(collection = "tournaments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    @Id
    private String id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "Number of participants is required")
    private Integer maxParticipants;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    private LocalDateTime endDate;

    private List<String> playerIds = new ArrayList<>(); // Initialize to avoid null pointer issues
    private List<String> roundIds = new ArrayList<>(); // List of round IDs

    private String imageUrl;

    @NotNull(message = "Prize pool is required")
    private Double prizePool;

    @NotNull(message = "Rank is required")
    private Rank rank;

    private String winnerId;
    private boolean started = false;
    private boolean ended = false;

    // Add a participant
    public void addParticipant(String playerId) {
        playerIds.add(playerId); // Correct the list name to playerIds
    }

    // Remove a participant
    public void removeParticipant(String playerId) {
        playerIds.remove(playerId); // Correct list to playerIds and use remove
    }

    // Check if the tournament is full
    public boolean isFull() {
        return playerIds.size() >= maxParticipants;
    }

    // Check if the tournament has ended
    public boolean hasEnded() {
        return ended || LocalDateTime.now().isAfter(endDate);
    }

    // Check if the tournament has started
    public boolean hasStarted() {
        return started || LocalDateTime.now().isAfter(startDate);
    }

    // Start the tournament
    public void startTournament() {
        this.started = true;
    }

    // Add a round by ID
    public void addRound(String roundId) {
        roundIds.add(roundId);
    }

    // Set the winner of the tournament
    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
        this.ended = true;
    }
}