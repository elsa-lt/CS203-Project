package com.tetraleague.model;

import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class Tournament {
    @Id
    private String id;
    private String name;
    private String description;
    private int numParticipants;
    private int eloRange;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<Player> participants;

    public void addParticipant(Player player) {
        if (participants.size() < numParticipants && player.getEloRating() <= eloRange) {
            participants.add(player);
        }
    }
}