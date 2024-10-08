package com.tetraleague.service;

import com.tetraleague.model.*;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    public Tournament getTournamentById(String id) {
        return tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
    }

    public Tournament createTournament(Tournament tournament) {
        validateTournament(tournament);
        return tournamentRepository.save(tournament);
    }

    private void validateTournament(Tournament tournament) {
        if (tournament.getMaxParticipants() < 2) {
            if (tournament.getMaxParticipants() == null || tournament.getMaxParticipants() < 2) {
                throw new IllegalArgumentException("Number of participants cannot be less than 2.");
            }
            if (!isPowerOfTwo(tournament.getMaxParticipants())) {
                throw new IllegalArgumentException("Number of participants must be a power of 2.");
            }
            if (tournament.getStartDate().isAfter(tournament.getEndDate())) {
                throw new IllegalArgumentException("Start date cannot be after end date.");
            }
            if (tournament.getMinElo() > tournament.getMaxElo()) {
                throw new IllegalArgumentException("Minimum Elo cannot be greater than maximum Elo.");
            }
            List<Tournament> tournaments = tournamentRepository.findAll();
            for (Tournament existingTournament : tournaments) {
                if (existingTournament.getName().equals(tournament.getName()) &&
                        (tournament.getStartDate().isBefore(existingTournament.getEndDate()) &&
                                (tournament.getStartDate().isBefore(existingTournament.getEndDate()) ||
                                        tournament.getEndDate().isAfter(existingTournament.getStartDate())))) {
                    throw new IllegalArgumentException("Another tournament with the same name overlaps in time frame");
                }
            }
        }
    }

    private boolean isPowerOfTwo(int n) {
        return (n > 0) && ((n & (n - 1)) == 0);
    }

    public Tournament updateTournament(String id, Tournament updatedTournament) {
        Tournament tournament = tournamentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        validateTournament(tournament);
        validateTournament(updatedTournament);

        // Update fields
        tournament.setName(updatedTournament.getName());
        tournament.setDescription(updatedTournament.getDescription());
        tournament.setMaxParticipants(updatedTournament.getMaxParticipants());
        tournament.setStartDate(updatedTournament.getStartDate());
        tournament.setEndDate(updatedTournament.getEndDate());
        tournament.setMinElo(updatedTournament.getMinElo());
        tournament.setMaxElo(updatedTournament.getMaxElo());
        tournament.setImageUrl(updatedTournament.getImageUrl());

        return tournamentRepository.save(tournament);
    }

    public String uploadImage(String tournamentId, MultipartFile file) throws IOException {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        String folder = "tournament-images";
        Path path = Paths.get(folder, file.getOriginalFilename());

        // Save the file locally
        Files.write(path, file.getBytes());

        String imageUrl = path.toString();
        tournament.setImageUrl(imageUrl);
        tournamentRepository.save(tournament);

        return imageUrl;
    }

    private Player validateAndGetPlayer(String playerId) {
        User user = userRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        if (!user.getRoles().stream()
                .anyMatch(role -> role.getName().equals(ERole.ROLE_PLAYER))) {
            throw new RuntimeException("User is not a player");
        }
    
        if (user instanceof Player player) {
            return player;
        } else {
            throw new ClassCastException("User is not a valid player");
        }
    }
    
    public Tournament addParticipant(String tournamentId, String playerId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        if (tournament.hasEnded()) {
            throw new RuntimeException("Tournament has already ended");
        }
        if (tournament.hasStarted()) {
            throw new RuntimeException("Tournament has already started");
        }
        if (tournament.isFull()) {
            throw new RuntimeException("Tournament is full");
        }

        Player player = validateAndGetPlayer(playerId);

        if (tournament.getParticipants().stream().anyMatch(p -> p.getId().equals(player.getId()))) {
            throw new RuntimeException("Player is already participating in the tournament");
        }        

        if (player.getEloRating() < tournament.getMinElo() || player.getEloRating() > tournament.getMaxElo()) {
            throw new RuntimeException("Player's Elo rating is not within the allowed range for this tournament");
        }

        tournament.addParticipant(player);
        return tournamentRepository.save(tournament);
    }

    public Tournament removeParticipant (String tournamentId, String playerId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        Player player = validateAndGetPlayer(playerId);

        if (!tournament.getParticipants().contains(player)) {
            throw new RuntimeException("Player is not participating in the tournament");
        }

        tournament.removeParticipant(player);
        return tournamentRepository.save(tournament);
    }

    public void deleteTournament (String tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        tournamentRepository.delete(tournament);
    }
}
