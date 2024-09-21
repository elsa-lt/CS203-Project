package com.tetraleague.service;

import com.tetraleague.model.Tournament;
import com.tetraleague.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;

    // Retrieve all tournaments
    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    // Retrieve tournament by ID
    public Tournament getTournamentById(String id) {
        return tournamentRepository.findById(id).orElseThrow(() -> new RuntimeException("Tournament not found"));
    }

    // Create a new tournament
    public Tournament createTournament(Tournament tournament) {
        return tournamentRepository.save(tournament);
    }

    // Update an existing tournament
    public Tournament updateTournament(String id, Tournament updatedTournament) {
        Tournament existingTournament = getTournamentById(id);
        existingTournament.setName(updatedTournament.getName());
        existingTournament.setDescription(updatedTournament.getDescription());
        existingTournament.setNumParticipants(updatedTournament.getNumParticipants());
        existingTournament.setEloRange(updatedTournament.getEloRange());
        existingTournament.setStartDate(updatedTournament.getStartDate());
        existingTournament.setEndDate(updatedTournament.getEndDate());
        return tournamentRepository.save(existingTournament);
    }
}
