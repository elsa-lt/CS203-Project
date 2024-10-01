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
    private String imageUrl; // Field to store the image URL

    public void validate() {
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }
        if (minElo > maxElo) {
            throw new IllegalArgumentException("Minimum Elo cannot be more than maximum Elo.");
        }
        if (numParticipants < 2) {
            throw new IllegalArgumentException("Number of participants cannot be less than 2.");
        }
    }

    public void addParticipant(Player player) {
        if (!participants.contains(player)) {
            participants.add(player);
            // No need to call player.addTournament(this) here
        }
    }

    public void removeParticipant(Player player) {
        if (participants.contains(player)) {
            participants.remove(player);
            // No need to call player.removeTournament(this) here
        }
    }

    public boolean hasEnded() {
        return LocalDateTime.now().isAfter(endDate);
    }

    public boolean hasStarted() {
        return LocalDateTime.now().isAfter(startDate);
    }

    public boolean isFull() {
        return participants.size() >= maxParticipants;
    }
}
