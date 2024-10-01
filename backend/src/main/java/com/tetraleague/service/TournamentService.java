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
        tournament.setImageUrl(updatedTournament.getImageUrl());

        return tournamentRepository.save(tournament);
    }

    public String uploadImage(String tournamentId, MultipartFile file) throws IOException {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        String folder = "tournament-images";
        Files.createDirectories(Paths.get(folder)); // Create directory if it doesn't exist
        Path path = Paths.get(folder, file.getOriginalFilename());

        Files.write(path, file.getBytes());

        String imageUrl = "/api/images/" + file.getOriginalFilename(); // Return a more accessible URL
        tournament.setImageUrl(imageUrl);
        tournamentRepository.save(tournament);

        return imageUrl;
    }

    public Tournament addParticipant(String tournamentId, String playerId) {
        // Fetch the tournament
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

        User user = userRepository.findById(playerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isPlayer = user.getRoles().stream()
                .anyMatch(role -> role.getName().equals(ERole.ROLE_PLAYER));

        if (!isPlayer) {
            throw new RuntimeException("User is not a player");
        }

        if (user instanceof Player player) {
            // Check both relationships separately
            if (!tournament.getParticipants().contains(player)) {
                tournament.addParticipant(player);  // Add player to tournament
            }

            return tournamentRepository.save(tournament);

        } else {
            throw new ClassCastException("User is a player but cannot be cast to Player.");
        }
    }

    public Tournament removeParticipant(String tournamentId, String playerId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        // Assuming you have a method to fetch the player
        Player player = userRepository.findById(playerId)
                .filter(u -> u instanceof Player)
                .map(u -> (Player) u)
                .orElseThrow(() -> new RuntimeException("Player not found"));

        tournament.getParticipants().remove(player);
        return tournamentRepository.save(tournament);
    }

    public void deleteTournament(String tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));

        tournamentRepository.delete(tournament);
    }
}
