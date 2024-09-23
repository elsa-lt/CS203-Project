package com.tetraleague.service;

import com.tetraleague.model.Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
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

        System.out.println("Searching for player with ID: " + playerId);
        User user = userRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!(user instanceof Player)) {
            throw new RuntimeException("User is not a player");
        }

        Player player = (Player) user;

        tournament.addParticipant(player);
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
