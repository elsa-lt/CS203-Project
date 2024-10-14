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

    private List<String> participants = new ArrayList<>();
    private List<Round> rounds = new ArrayList<>();

    private String imageUrl;

    @NotNull(message = "Prize pool is required")
    private Double prizePool;

    @NotNull(message = "Rank is required")
    private Rank rank;

    private String winnerId;
    private boolean started = false;
    private boolean ended = false;

    public void addParticipant(String playerId) {
        participants.add(playerId);
    }

    public void removeParticipant(String playerId) {
        participants.add(playerId);
    }

    public boolean isFull() {
        return participants.size() >= maxParticipants;
    }

    public boolean hasEnded() {
        return ended || LocalDateTime.now().isAfter(endDate);
    }

    public boolean hasStarted() {
        return started || LocalDateTime.now().isAfter(startDate);
    }

    public void startTournament() {
        this.started = true;
    }

    public void addRound(Round round) {
        rounds.add(round);
    }
    
    
    public Round getCurrentRound() {
        return rounds.isEmpty() ? null : rounds.get(rounds.size() - 1);
    }
    
    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
        this.ended = true;
    }
    
    public List<String> getWinnersFromRounds() {
        List<String> winners = new ArrayList<>();
        for (Round round : rounds) {
            if (round.isComplete()) {
                winners.addAll(round.getWinnersId());
            }
        }
        return winners;
    }

    public int getCurrentRoundNumber() {
        return rounds.size();
    }

    public boolean hasRounds() {
        return !rounds.isEmpty();
    }
}
