package com.tetraleague.service;

import com.tetraleague.Player;
import com.tetraleague.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Register a new player
    public void registerPlayer(Player player) {
        // Encode the password before saving
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        playerRepository.save(player);
    }

    // Log in a player by checking username and password
    public Player login(String username, String password) {
        Player player = playerRepository.findByUsername(username);
        if (player != null && passwordEncoder.matches(password, player.getPassword())) {
            return player;
        }
        return null;
    }
}
