package com.tetraleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private AdminRepository adminRepository;

    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
