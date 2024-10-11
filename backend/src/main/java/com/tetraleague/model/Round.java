package com.tetraleague.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class Round {
    private int roundNumber;
    private List<Match> matches = new ArrayList<>();

    public Round(int roundNumber, List<Match> matches) {
        this.roundNumber = roundNumber;
        this.matches = matches;
    }

    public void addMatch(Match match) {
        matches.add(match);
    }

    public boolean isComplete() {
        return matches.stream().allMatch(Match::isCompleted);
    }

    public List<Player> getWinners() {
        if (!isComplete()) {
            throw new IllegalStateException("Cannot get winners from an incomplete round.");
        }
        return matches.stream().map(Match::getWinner).collect(Collectors.toList());
    }
}
