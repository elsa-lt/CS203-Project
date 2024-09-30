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
        tournament.setImageUrl(updatedTournament.getImageUrl());
        tournament.setPrizePool(updatedTournament.getPrizePool());

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
