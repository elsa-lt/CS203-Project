package com.tetraleague.service;

import com.tetraleague.Player;
import com.tetraleague.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public Player login(String username, String password) {
        return playerRepository.findByUsername(username);
    }

    public Player registerPlayer(Player player) {
        return playerRepository.save(player);
    }
}
