package com.tetraleague.service;

import com.tetraleague.model.Tournament;
import com.tetraleague.model.Player;
import com.tetraleague.model.User;
import com.tetraleague.model.ERole;
import com.tetraleague.model.Round;
import com.tetraleague.model.Match;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.MatchRepository;
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
    private RoundService roundService;

    @Autowired
    private MatchRepository matchRepository;

    public List<Tournament> getAllTournaments() {
        return tournamentRepository.findAll();
    }

    public Match getMatchById(String matchId) {
        return matchRepository.findById(matchId)
            .orElseThrow(() -> new RuntimeException("Match not found"));
    }

    public Tournament getTournamentById(String id) {
        logger.info("Fetching tournament with ID: {}", id);
        return tournamentRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tournament not found"));
    }

    public Tournament createTournament(Tournament tournament) {
        validateTournament(tournament);
        checkOverlap(tournament);
        return tournamentRepository.save(tournament);
    }

    private void validateTournament(Tournament tournament) {
        if (tournament.getMaxParticipants() == null || tournament.getMaxParticipants() < 2) {
            throw new IllegalArgumentException("Number of participants cannot be less than 2.");
        }
        if (!isPowerOfTwo(tournament.getMaxParticipants())) {
            throw new IllegalArgumentException("Number of participants must be a power of 2.");
        }
        if (tournament.getRegistrationStartDate().isAfter(tournament.getRegistrationEndDate())) {
            throw new IllegalArgumentException("Registration start date cannot be after registration end date.");
        }
        if (tournament.getRegistrationStartDate().isAfter(tournament.getStartDate())) {
            throw new IllegalArgumentException("Registration start date cannot be after tournament start date.");
        }
        if (tournament.getRegistrationEndDate().isAfter(tournament.getStartDate())) {
            throw new IllegalArgumentException("Registration end date cannot be after tournament start date.");
        }
        if (tournament.getStartDate().isAfter(tournament.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }
        if (tournament.getRank() == null) {
            throw new IllegalArgumentException("Tournament rank is required.");
        }
    }

    public void checkOverlap(Tournament tournament) {
        List<Tournament> tournaments = tournamentRepository.findAll();
        for (Tournament existingTournament : tournaments) {
            if (existingTournament.getName().equals(tournament.getName()) &&
                    (tournament.getStartDate().isBefore(existingTournament.getEndDate()) &&
                            tournament.getEndDate().isAfter(existingTournament.getStartDate()))) {
                throw new IllegalArgumentException("Another tournament with the same name overlaps in time frame");
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
        tournament.setRegistrationStartDate(updatedTournament.getRegistrationStartDate());
        tournament.setRegistrationEndDate(updatedTournament.getRegistrationEndDate());
        tournament.setImageUrl(updatedTournament.getImageUrl());
        tournament.setPrizePool(updatedTournament.getPrizePool());
        tournament.setRank(updatedTournament.getRank());

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

        if (tournament.registrationClosed()) {
            throw new RuntimeException("Tournament Registration has closed");
        }
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
    
        if (tournament.getParticipants().stream().anyMatch(p -> p.equals(playerId))) {
            throw new RuntimeException("Player is already participating in the tournament");
        }
    
        if (player.getRank() != tournament.getRank()) {
            throw new RuntimeException("Player's Rank is not the allowed rank for this tournament");
        }
    
        if (tournament.registrationOpen()) {
            tournament.addParticipant(playerId);
            return tournamentRepository.save(tournament);
        } else {
            throw new RuntimeException("Registration is not open yet");
        }
    }

    public Tournament removeParticipant (String tournamentId, String playerId) {
        Tournament tournament = getTournamentById(tournamentId);

        Player player = validateAndGetPlayer(playerId);

        if (tournament.getParticipants().stream().noneMatch(p -> p.equals(playerId))) {
            throw new RuntimeException("Player is not participating in the tournament");
        }

        boolean removed = tournament.getParticipants().removeIf(p -> p.equals(playerId));

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

    public void startTournament(String tournamentId) {
        Tournament tournament = getTournamentById(tournamentId);

        if (tournament.hasStarted()) {
            throw new RuntimeException("Tournament has already started");
        }

        Round firstRound = roundService.createFirstRound(tournament.getParticipants());
        tournament.addRound(firstRound);

        tournament.setStarted(true);
        tournamentRepository.save(tournament);
    }

    public void completeMatch(String matchId, String winnerId) {
        Match match = getMatchById(matchId);
        match.setCompleted(true);
        match.setWinnerId(winnerId);
        matchRepository.save(match);
    }
    

    public void advanceTournament(String tournamentId) {
        Tournament tournament = getTournamentById(tournamentId);
        List<Round> rounds = tournament.getRounds();
        Round currentRound = rounds.get(rounds.size() - 1);
    
        if (roundService.isRoundComplete(currentRound)) {
            List<String> winnersId = currentRound.getWinnersId();
    
            if (winnersId.size() == 1) {
                tournament.setWinner(winnersId.get(0));
                tournament.setEnded(true);
            } else {
                Round nextRound = roundService.createNextRound(winnersId, currentRound.getRoundNumber() + 1);
                tournament.addRound(nextRound);
            }
    
            tournamentRepository.save(tournament);
        } else {
            throw new RuntimeException("Current round is not complete, cannot advance the tournament.");
        }
    }

    public List<Match> getCurrentMatches(String tournamentId) {
        Tournament tournament = getTournamentById(tournamentId);
        Round currentRound = tournament.getCurrentRound(); 
        return currentRound.getMatches(); 
    }
    
    public void completeAllMatchesInRound(String tournamentId, int roundNumber) {
        Tournament tournament = getTournamentById(tournamentId);
        List<Round> rounds = tournament.getRounds();
    
        Round roundToComplete = rounds.stream()
            .filter(round -> round.getRoundNumber() == roundNumber)
            .findFirst()
            .orElseThrow(() -> new RuntimeException("Round not found"));
    
        for (Match match : roundToComplete.getMatches()) {
            match.setCompleted(true);  
            // i think need set winner id here match.setWinner(winnerId);
        }
    
        tournamentRepository.save(tournament);
    }
    
}
