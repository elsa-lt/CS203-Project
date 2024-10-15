package com.tetraleague.service;

import com.tetraleague.model.*;

import com.tetraleague.repository.MatchRepository;
import com.tetraleague.repository.RoundRepository;
import com.tetraleague.repository.UserRepository;
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

    @Autowired
    private RoundRepository roundRepository;

    public Round getRoundById(String roundId) {
        return roundRepository.findById(roundId)
                .orElseThrow(() -> new RuntimeException("Round not found with ID: " + roundId));
    }
    
    // Create the first round by generating match IDs
// Create the first round by generating match IDs
    public Round createFirstRound(List<String> participantsId) {
        int half = participantsId.size() / 2;
        List<String> matchIds = new ArrayList<>();

        for (int i = 0; i < half; i++) {
            Match match = new Match(participantsId.get(i), participantsId.get(i + half), 1);
            matchRepository.save(match);  // Save match to DB
            matchIds.add(match.getId());  // Store match ID instead of object
        }

        Round firstRound = new Round(1, matchIds);
        roundRepository.save(firstRound);  // Make sure to save the round
        return firstRound;  // Return round with match IDs
    }


    // Create the next round
    public Round createNextRound(List<String> winnersId, int roundNumber) {
        int half = winnersId.size() / 2;
        List<String> nextRoundMatchIds = new ArrayList<>();

        for (int i = 0; i < half; i++) {
            Match match = new Match(winnersId.get(i), winnersId.get(i + half), roundNumber);
            matchRepository.save(match);
            nextRoundMatchIds.add(match.getId());
        }

        return new Round(roundNumber, nextRoundMatchIds);
    }

    // Check if the round is complete
    public boolean isRoundComplete(Round round) {
        return round.getMatchIds().stream()
                .allMatch(matchId -> matchService.findMatchById(matchId)
                        .map(match -> match.isCompleted()) // Change method reference to lambda
                        .orElse(false));
    }

}
