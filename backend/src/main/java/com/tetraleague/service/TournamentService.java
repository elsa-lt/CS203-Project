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

    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    public Tournament getTournamentById(String id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
    }

    public Tournament createTournament(Tournament tournament) {
        tournament.validate();
        validateTournamentOverlap(tournament);
        return tournamentRepository.save(tournament);
    }

    public void validateTournamentOverlap(Tournament newTournament) {
        List<Tournament> tournaments = tournamentRepository.findAll();
        for (Tournament existingTournament : tournaments) {
            if (existingTournament.getName().equals(newTournament.getName()) &&
                    (newTournament.getStartDate().isBefore(existingTournament.getEndDate()) &&
                            newTournament.getEndDate().isAfter(existingTournament.getStartDate()))) {
                throw new IllegalArgumentException("Another tournament with the same name overlaps in time frame");
            }
        }
    }

    public Tournament updateTournament(String id, Tournament updatedTournament) {
        Tournament tournament = tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        updatedTournament.validate();

        tournament.setName(updatedTournament.getName());
        tournament.setDescription(updatedTournament.getDescription());
        tournament.setNumParticipants(updatedTournament.getNumParticipants());
        tournament.setStartDate(updatedTournament.getStartDate());
        tournament.setEndDate(updatedTournament.getEndDate());
        tournament.setMinElo(updatedTournament.getMinElo());
        tournament.setMaxElo(updatedTournament.getMaxElo());

        return tournamentRepository.save(tournament);
    }

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
                tournament.addParticipant(player);
            } else {
                throw new ClassCastException("User is a player but cannot be cast to Player.");
            }
        } else {
            throw new RuntimeException("User is not a player");
        }

        return tournamentRepository.save(tournament);
    }

    public Tournament removeParticipant(String tournamentId, String playerId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
        return tournamentRepository.save(tournament);
    }

    public void deleteTournament(String tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        tournamentRepository.delete(tournament);
    }
}
