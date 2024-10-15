package com.tetraleague.service;

import com.tetraleague.model.Match;
import com.tetraleague.model.Player;

import com.tetraleague.repository.MatchRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private RankingService rankingService;

    @Autowired
    private MatchRepository matchRepository;

    public Match getMatchById(String matchId) {
        return matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Round not found with ID: " + matchId));
    }

    @Transactional
    public void completeMatch(String matchId, String winnerId) {
        Match match = getMatchById(matchId);
        
        if (match.isCompleted()) {
            throw new IllegalStateException("Match has already been completed");
        }
        
        if (!match.getPlayer1Id().equals(winnerId) && !match.getPlayer2Id().equals(winnerId)) {
            throw new IllegalArgumentException("Winner must be one of the players in the match.");
        }
        
        match.setWinner(winnerId);
        matchRepository.save(match);
    }
    
}