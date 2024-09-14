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

    public String registerPlayer(String username, String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            return "Passwords do not match";
        }
        Player player = new Player(username, password);
        player.setPassword(passwordEncoder.encode(password));
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
