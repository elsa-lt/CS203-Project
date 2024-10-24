package com.tetraleague.service;

import com.tetraleague.model.Round;
import com.tetraleague.model.Match;
import com.tetraleague.repository.MatchRepository;
import com.tetraleague.repository.RoundRepository;
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

    public Round createRound(List<String> participantsId, int roundNumber) {
        int half = participantsId.size() / 2;
        List<String> matchIds = new ArrayList<>();

        for (int i = 0; i < half; i++) {
            Match match = new Match(participantsId.get(i), participantsId.get(i + half), roundNumber);
            matchRepository.save(match);
            matchIds.add(match.getId());
        }

        Round round = new Round(roundNumber, matchIds);
        roundRepository.save(round);
        return round;
    }


    public boolean isRoundComplete(Round round) {
        return round.getMatchIds().stream()
                .allMatch(matchId -> {
                    Match match = matchService.getMatchById(matchId);
                    return match != null && match.isCompleted();
                });
    }
}
