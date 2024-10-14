package com.tetraleague.controller;

import com.tetraleague.model.Player;
import com.tetraleague.service.MatchService;
import com.tetraleague.service.TournamentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tournaments/{tournamentId}/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PostMapping("/{matchId}/result")
    public String completeMatch(@PathVariable String tournamentId, @PathVariable String matchId, @RequestBody String winnerId) {
        matchService.completeMatch(matchId, winnerId);
        return "Match " + matchId + " completed. Winner: " + winnerId;
    }
}

