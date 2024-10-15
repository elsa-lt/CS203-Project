package com.tetraleague.model;

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
    private List<String> playerIds = new ArrayList<>();
    private List<String> roundIds = new ArrayList<>();
    private String imageUrl;
    private Double prizePool;
    private Rank rank;
    private String winnerId;
    private boolean started = false;
    private boolean ended = false;

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
        return playerIds.size() >= maxParticipants;
    }

    public void setWinner(String winnerId) {
        this.winnerId = winnerId;
    }

    public String getCurrentRoundId() {
        if (roundIds.isEmpty()) {
            throw new RuntimeException("No rounds available");
        }
        return roundIds.get(roundIds.size() - 1);
    }

    public List<Round> getRounds() {
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
