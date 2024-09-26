package com.tetraleague.service;

import com.tetraleague.model.Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TournamentService tournamentService;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public void joinTournament(Player player, String tournamentId) {
        Tournament tournament = tournamentService.getTournamentById(tournamentId);
        tournamentService.addParticipant(tournamentId, player.getId());
    }

    public void withdrawFromTournament(Player player, String tournamentId) {
        tournamentService.removeParticipant(tournamentId, player.getId());
    }


    public List<Tournament> getTournaments(String username) {
        Optional<Player> playerOptional = userRepository.findByUsername(username)
                .filter(user -> user instanceof Player)
                .map(user -> (Player) user);

        if (playerOptional.isPresent()) {
            return playerOptional.get().getTournaments();
        } else {
            throw new RuntimeException("Player not found!");
        }
    }
}
