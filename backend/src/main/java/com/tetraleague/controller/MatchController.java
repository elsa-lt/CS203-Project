package com.tetraleague.controller;

import com.tetraleague.service.MatchService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tournaments/{tournamentId}/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @PutMapping("/{matchId}/result")
    public String completeMatch(
            @PathVariable String tournamentId,
            @PathVariable String matchId,
            @RequestBody String winnerId) {
        matchService.completeMatch(matchId, winnerId);
        return "Match " + matchId + " completed. Winner: " + winnerId;
    }
}

