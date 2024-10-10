package com.tetraleague.service;

import com.tetraleague.model.*;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class TournamentService {
    private static final Logger logger = LoggerFactory.getLogger(TournamentService.class);

    @Autowired
    private TournamentRepository tournamentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MatchmakingService matchmakingService;

    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    public Tournament getTournamentById(String id) {
        logger.info("Fetching tournament with ID: {}", id);
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
        Tournament tournament = getTournamentById(id);

        validateTournament(tournament);
        validateTournament(updatedTournament);

        tournament.setName(updatedTournament.getName());
        tournament.setDescription(updatedTournament.getDescription());
        tournament.setMaxParticipants(updatedTournament.getMaxParticipants());
        tournament.setStartDate(updatedTournament.getStartDate());
        tournament.setEndDate(updatedTournament.getEndDate());
        tournament.setMinElo(updatedTournament.getMinElo());
        tournament.setMaxElo(updatedTournament.getMaxElo());
        tournament.setImageUrl(updatedTournament.getImageUrl());
        tournament.setPrizePool(updatedTournament.getPrizePool());

        return tournamentRepository.save(tournament);
    }

    public String uploadImage(String tournamentId, MultipartFile file) throws IOException {
        Tournament tournament = getTournamentById(tournamentId);

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
        Tournament tournament = getTournamentById(tournamentId);

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

    public boolean isUserRegistered(String tournamentId, String username) {
        Tournament tournament = getTournamentById(tournamentId);

        return tournament.getParticipants().stream()
                .filter(player -> player instanceof Player)
                .map(Player.class::cast) 
                .anyMatch(player -> player.getUsername().equals(username));
    }

    public Tournament removeParticipant(String tournamentId, String playerId) {
        Tournament tournament = getTournamentById(tournamentId);

        Player player = validateAndGetPlayer(playerId);

        if (!tournament.getParticipants().stream().anyMatch(p -> p.getId().equals(player.getId()))) {
            throw new RuntimeException("Player is not participating in the tournament");
        }

        boolean removed = tournament.getParticipants().removeIf(p -> p.getId().equals(player.getId()));

        if (!removed) {
            throw new RuntimeException("Failed to remove the player from the tournament");
        }

        Tournament updatedTournament = tournamentRepository.save(tournament);

        return updatedTournament;
    }

    public void deleteTournament (String tournamentId) {
        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new RuntimeException("Tournament not found"));
        tournamentRepository.delete(tournament);
    }

    public List<Match> createAndStoreMatchups(String tournamentId) {
        Tournament tournament = getTournamentById(tournamentId);
        List<Match> matchups = matchmakingService.createMatchups(tournament);
        tournament.setMatches(matchups);
        tournamentRepository.save(tournament);
        return matchups;
    }
}
