package com.tetraleague.service;

import com.tetraleague.model.*;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private UserRepository userRepository;

    private Role role;

    // Retrieve all tournaments
    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    // Retrieve tournament by ID
    public Tournament getTournamentById(String id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
    }

    // Create new tournament
    public Tournament createTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    // Add a participant to the tournament
    public Tournament addParticipant(String tournamentId, String playerId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        User user = userRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isPlayer = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals(ERole.ROLE_PLAYER));

        if (isPlayer) {
            if (user instanceof Player) {
                Player player = (Player) user;
                tournament.addParticipant(player); // to add: elo check before adding to tournament
            } else {
                throw new ClassCastException("User is a player but cannot be cast to Player.");
            }
        } else {
            throw new RuntimeException("User is not a player");
        }

        return tournamentRepository.save(tournament);
    }

    // Update existing tournament
    public Tournament updateTournament(String id, Tournament updatedTournament) {
        Tournament tournament = tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        // Update fields
        tournament.setName(updatedTournament.getName());
        tournament.setDescription(updatedTournament.getDescription());
        tournament.setNumParticipants(updatedTournament.getNumParticipants());
        tournament.setStartDate(updatedTournament.getStartDate());
        tournament.setEndDate(updatedTournament.getEndDate());
        tournament.setMinElo(updatedTournament.getMinElo());
        tournament.setMaxElo(updatedTournament.getMaxElo());

        return tournamentRepository.save(tournament);
    }
}
