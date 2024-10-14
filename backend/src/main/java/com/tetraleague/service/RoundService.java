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

        List<Match> matches = new ArrayList<>();
        for (int i = 0; i < half; i++) {
            Match match = new Match(participants.get(i).getId(), participants.get(i + half).getId(), 1);
            matchRepository.save(match);
            matches.add(match);
        }

        return new Round(1, matches);
    }

    public Round createNextRound(List<String> winnersId, int roundNumber) {
        int half = winnersId.size() / 2;
        List<Match> nextRoundMatches = new ArrayList<>();

        for (int i = 0; i < half; i++) {
            Match match = new Match(winnersId.get(i), winnersId.get(i + half), roundNumber);
            matchRepository.save(match);
            nextRoundMatches.add(match);
        }

        winnersId.clear();
        return new Round(roundNumber, nextRoundMatches);
    }

    public boolean isRoundComplete(Round round) {
        return round.isComplete();
    }

    public void completeMatch(Match match, String winnerId) {
        matchService.completeMatch(match.getId(), winnerId);
    }
}
