package com.tetraleague.controller;

import com.tetraleague.model.Match;
import com.tetraleague.service.MatchService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tournaments/{tournamentId}/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{matchId}")
    public ResponseEntity<Match> getMatchById(@PathVariable String tournamentId, @PathVariable String matchId) {
        try {
            Match match = matchService.getMatchById(matchId);
            return ResponseEntity.ok(match);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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

