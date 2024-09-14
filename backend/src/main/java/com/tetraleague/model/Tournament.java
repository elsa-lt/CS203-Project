package com.tetraleague.model;

import java.time.LocalDateTime;
import java.util.List;

public class Tournament {
    private String id;
    private String name;
    private String description;
    private int numParticipants;
    private int eloRange;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<Player> participants;

    // Default constructor
    public Tournament() {}

    // Constructor to create a tournament
    public Tournament(String id, String name, String description, int numParticipants, int eloRange, LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.numParticipants = numParticipants;
        this.eloRange = eloRange;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void addParticipant(Player player) {
        if (participants.size() < numParticipants && player.getEloRating() <= eloRange) {
            participants.add(player);
        }
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNumParticipants() {
        return numParticipants;
    }

    public void setNumParticipants(int numParticipants) {
        this.numParticipants = numParticipants;
    }

    public int getEloRange() {
        return eloRange;
    }

    public void setEloRange(int eloRange) {
        this.eloRange = eloRange;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public List<Player> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Player> participants) {
        this.participants = participants;
    }
}
