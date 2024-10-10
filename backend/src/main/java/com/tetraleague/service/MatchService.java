package com.tetraleague.service;

import com.tetraleague.model.Match;
import com.tetraleague.model.Player;

import org.springframework.stereotype.Service;

@Service
public class MatchService {

    public void completeMatch(Match match, Player winner) {
        match.completeMatch(winner);
        // Logic for updating Elo ratings, setting match status, etc.
    }
}
