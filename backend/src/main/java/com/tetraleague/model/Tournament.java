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
    private Integer numParticipants;

    @NotNull(message = "Minimum Elo range is required")
    private Integer minElo;

    @NotNull(message = "Maximum Elo range is required")
    private Integer maxElo;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    private LocalDateTime endDate;

    private List<Player> participants = new ArrayList<>();

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
        if (player == null) {
            throw new IllegalArgumentException("Player cannot be null");
        }

        if (participants.size() >= numParticipants) {
            throw new IllegalStateException("Tournament is full");
        }

        if (player.getEloRating() > maxElo || player.getEloRating() < minElo) {
            throw new IllegalArgumentException("Player is ineligible for this tournament");
        }

        participants.add(player);
    }
}
