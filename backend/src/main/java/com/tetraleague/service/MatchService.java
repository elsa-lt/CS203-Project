package com.tetraleague.service;

import com.tetraleague.model.Match;
import com.tetraleague.model.Player;

import com.tetraleague.repository.MatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private RankingService rankingService;

    @Autowired
    private MatchRepository matchRepository;

    public Optional<Match> findMatchById(String matchId) {
        return matchRepository.findById(matchId);
    }

    public void completeMatch(String matchId, String winnerId) {
        Optional<Match> optionalMatch = matchRepository.findById(matchId);

        if (optionalMatch.isEmpty()) {
            throw new IllegalArgumentException("Match with ID " + matchId + " not found.");
        }

        Match match = optionalMatch.get();

        if (match.isCompleted()) {
            throw new IllegalStateException("Match has already been completed");
        }

        if (!match.getPlayer1Id().equals(winnerId) && !match.getPlayer2Id().equals(winnerId)) {
            throw new IllegalArgumentException("Winner must be one of the players in the match.");
        }

        match.setWinner(winnerId);
        matchRepository.save(match);

//        double outcomeForPlayer1 = match.getPlayer1Id().equals(winnerId) ? 1 : 0;
//        rankingService.updatePlayerEloRating(match.getPlayer1Id(), match.getPlayer2Id(), outcomeForPlayer1);
//        rankingService.updatePlayerStats(match.getPlayer1Id(), outcomeForPlayer1);
//        rankingService.updatePlayerStats(match.getPlayer2Id(), 1 - outcomeForPlayer1);
    }
}