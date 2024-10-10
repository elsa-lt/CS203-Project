package com.tetraleague.service;

import com.tetraleague.model.Match;
import com.tetraleague.model.Player;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class MatchService {

    @Autowired
    private RankingService rankingService;

    public void completeMatch(Match match, Player winner) {
        if (!match.isCompleted()) {
            match.completeMatch(winner);

            double outcomeForPlayer1 = match.getPlayer1().equals(winner) ? 1 : 0;

            rankingService.updatePlayerEloRating(match.getPlayer1().getUsername(), match.getPlayer2().getUsername(), outcomeForPlayer1);

            rankingService.updatePlayerStats(match.getPlayer1().getUsername(), outcomeForPlayer1);
            rankingService.updatePlayerStats(match.getPlayer2().getUsername(), 1 - outcomeForPlayer1);
        }
    }
}
