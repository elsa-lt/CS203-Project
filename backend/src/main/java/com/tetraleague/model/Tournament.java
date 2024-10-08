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

    @NotNull(message = "Minimum Elo range is required")
    private Integer minElo;

    @NotNull(message = "Maximum Elo range is required")
    private Integer maxElo;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    private LocalDateTime endDate;

    private List<Player> participants = new ArrayList<>();
    private List<Round> rounds = new ArrayList<>();

    private String imageUrl;

    @NotNull(message = "Prize pool is required")
    private Double prizePool;

    private Player winner;
    private boolean started = false;
    private boolean ended = false;

    public void addParticipant(Player player) {
        participants.add(player);
    }

    public void removeParticipant(Player player) {
        participants.remove(player);
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
        return rounds.get(rounds.size() - 1);
    }

    public void setWinner(Player winner) {
        this.winner = winner;
        this.ended = true;
    }

    public int getCurrentRoundNumber() {
        return rounds.size();
    }

    public boolean hasRounds() {
        return !rounds.isEmpty();
    }
}
