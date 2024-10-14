package com.tetraleague.service;

import com.tetraleague.model.Match;
import com.tetraleague.model.Round;
import com.tetraleague.model.Player;

import com.tetraleague.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoundService {

    @Autowired
    private MatchService matchService;

    @Autowired
    private MatchRepository matchRepository;

    public Round createFirstRound(List<Player> participants) {
        participants.sort((p1, p2) -> Integer.compare(p2.getEloRating(), p1.getEloRating()));
        int half = participants.size() / 2;

        List<Match> matches = new ArrayList<>();
        for (int i = 0; i < half; i++) {
            Match match = new Match(participants.get(i), participants.get(i + half), 1);
            matchRepository.save(match);
            matches.add(match);
        }

        return new Round(1, matches);
    }

    public Round createNextRound(List<Player> winners, int roundNumber) {
        int half = winners.size() / 2;
        List<Match> nextRoundMatches = new ArrayList<>();

        for (int i = 0; i < half; i++) {
            Match match = new Match(winners.get(i), winners.get(i + half), roundNumber);
            matchRepository.save(match);
            nextRoundMatches.add(match);
        }

        winners.clear();
        return new Round(roundNumber, nextRoundMatches);
    }

    public boolean isRoundComplete(Round round) {
        return round.isComplete();
    }

    public void completeMatch(Match match, Player winner) {
        matchService.completeMatch(match.getId(), winner);
    }
}
