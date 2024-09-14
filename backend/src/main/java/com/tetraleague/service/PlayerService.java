package com.tetraleague.service;

import com.tetraleague.model.Player;
import com.tetraleague.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerPlayer(Player player, String confirmPassword) {
        if (!player.getPassword().equals(confirmPassword)) {
            return "Passwords do not match";
        }
        player.setPassword(passwordEncoder.encode(player.getPassword()));
        playerRepository.save(player);
        return "Registration successful";
    }

    public Player login(String username, String password) {
        Player player = playerRepository.findByUsername(username);
        if (player != null && passwordEncoder.matches(password, player.getPassword())) {
            return player;
        }
        return null;
    }
}