package com.tetraleague.service;

import com.tetraleague.model.*;

import com.tetraleague.repository.MatchRepository;
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
    private UserRepository userRepository;

    public Round createFirstRound(List<String> participantsId) {
        List<Player> participants = new ArrayList<>();
        for (String p : participantsId) {
            User user = userRepository.findById(p)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (user.getRoles().stream()
                    .noneMatch(role -> role.getName().equals(ERole.ROLE_PLAYER))) {
                throw new RuntimeException("User is not a player");
            }

            if (user instanceof Player player) {
                participants.add(player);
            } else {
                throw new ClassCastException("User is not a valid player");
            }
        }
        participants.sort((p1, p2) -> Integer.compare(p2.getEloRating(), p1.getEloRating()));
        int half = participants.size() / 2;

        List<String> matchIds = new ArrayList<>();
        for (int i = 0; i < half; i++) {
            Match match = new Match(participants.get(i).getId(), participants.get(i + half).getId(), 1);
            matchRepository.save(match);
            matchIds.add(match.getId()); // Save the match ID instead of the match object
        }

        return new Round(1, matchIds); // Return Round with list of match IDs
    }

    public Round createNextRound(List<String> winnersId, int roundNumber) {
        int half = winnersId.size() / 2;
        List<String> nextRoundMatchIds = new ArrayList<>();

        for (int i = 0; i < half; i++) {
            Match match = new Match(winnersId.get(i), winnersId.get(i + half), roundNumber);
            matchRepository.save(match);
            nextRoundMatchIds.add(match.getId()); // Save the match ID instead of the match object
        }

        return new Round(roundNumber, nextRoundMatchIds); // Return Round with list of match IDs
    }

    public boolean isRoundComplete(Round round) {
        // Check if all matches in the round are completed
        return round.getMatchesIds().stream()
                .allMatch(matchId -> matchService.findMatchById(matchId)
                        .map(Match::isCompleted)
                        .orElse(false));
    }

    public void completeMatch(String matchId, String winnerId) {
        matchService.completeMatch(matchId, winnerId);
    }
}
