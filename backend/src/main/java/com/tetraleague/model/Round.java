package com.tetraleague.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class Round {
    private int roundNumber;
    private List<Match> matches;

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

    public List<String> getWinnersId() {
        if (!isComplete()) {
            return new ArrayList<>(); 
        }
        return matches.stream().map(Match::getWinnerId).collect(Collectors.toList());
    }
    
}
