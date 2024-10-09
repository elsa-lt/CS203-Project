package com.tetraleague.service;

import com.tetraleague.model.Match;
import com.tetraleague.model.Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.repository.TournamentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MatchmakingService {

    @Autowired
    private TournamentRepository tournamentRepository;

    public List<Match> createMatchups(Tournament tournament) {
        List<Player> participants = new ArrayList<>(tournament.getParticipants());
        
        participants.sort((p1, p2) -> Integer.compare(p2.getEloRating(), p1.getEloRating()));
        
        List<Match> matches = new ArrayList<>();
        int half = participants.size() / 2;
        
        for (int i = 0; i < half; i++) {
            Match match = new Match();
            match.setPlayer1(participants.get(i));
            match.setPlayer2(participants.get(i + half));
            match.setRoundNumber(1);
            matches.add(match);
        }
        
        return matches;
    }

    public List<Match> createNextRoundMatches(List<Player> winners, int roundNumber) {
        List<Match> nextRoundMatches = new ArrayList<>();
        int half = winners.size() / 2;
        
        for (int i = 0; i < half; i++) {
            Match match = new Match();
            match.setPlayer1(winners.get(i));
            match.setPlayer2(winners.get(i + half));
            match.setRoundNumber(roundNumber);
            nextRoundMatches.add(match);
        }
        
        return nextRoundMatches;
    }

    public void completeMatch(String tournamentId, String matchId, Player winner) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
        .orElseThrow(() -> new RuntimeException("Tournament not found"));
        
        Match match = tournament.getMatches().stream()
                .filter(m -> m.getId().equals(matchId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Match not found"));

        match.completeMatch(winner);
        tournamentRepository.save(tournament);
    }
}
