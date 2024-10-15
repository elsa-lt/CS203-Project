package com.tetraleague.service;

import com.tetraleague.model.Tournament;
import com.tetraleague.model.Player;
import com.tetraleague.model.User;
import com.tetraleague.model.ERole;
import com.tetraleague.model.Round;
import com.tetraleague.model.Match;
import com.tetraleague.exception.TournamentNotFoundException;
import com.tetraleague.repository.RoundRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;


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
    private MatchService matchService;

    @Autowired
    private RoundRepository roundRepository;

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

    public Tournament addParticipant(String tournamentId, String participantIds) {
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

        String[] playerIds = participantIds.split(",");

        for (String playerId : playerIds) {
            Player player = validateAndGetPlayer(playerId);

            if (tournament.getPlayerIds().stream().anyMatch(p -> p.equals(playerId))) {
                throw new RuntimeException("Player " + playerId + " is already participating in the tournament");
            }

            if (player.getRank() != tournament.getRank()) {
                throw new RuntimeException("Player's Rank is not the allowed rank for this tournament");
            }

            tournament.addParticipant(playerId);
        }

        return tournamentRepository.save(tournament);
    }

    public void removeParticipant(String tournamentId, String participantId) {
        Tournament tournament = getTournamentById(tournamentId);
        
        // Check if the tournament has already started or ended
        if (tournament.hasStarted()) {
            throw new RuntimeException("Cannot remove participant from a tournament that has already started");
        }
        
        // Remove the participant from the tournament
        tournament.removeParticipant(participantId);
        
        // Save the updated tournament back to the repository
        tournamentRepository.save(tournament);
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

        Round firstRound = roundService.createFirstRound(tournament.getPlayerIds());
        tournament.addRound(firstRound.getId());

        tournament.setStarted(true);
        tournamentRepository.save(tournament);
    }

    public void completeMatch(String matchId, String winnerId) {
        matchService.completeMatch(matchId, winnerId);
    }

    public void advanceTournament(String tournamentId, int roundNumber) {
        Tournament tournament = getTournamentById(tournamentId);
        List<String> rounds = tournament.getRoundIds();

        // Check if rounds is empty
        if (rounds.isEmpty()) {
            throw new RuntimeException("No rounds available in the tournament.");
        }

        Round currentRound = roundService.getRoundById(rounds.get(roundNumber++ - 1));

        if (roundService.isRoundComplete(currentRound)) {
            List<String> currentMatchIds = currentRound.getMatchIds();
            List<Match> currentMatches = new ArrayList<>();

            List<String> winnersId = new ArrayList<>();
            for (String id : currentMatchIds) {
                Match match = matchService.getMatchById(id);
                winnersId.add(match.getWinnerId());
            }

            if (winnersId.size() == 1) {
                tournament.setWinner(winnersId.get(0));
                System.out.println(winnersId);
                System.out.println("Winner: " + winnersId.get(0));
                tournament.setEnded(true);
            } else {
                Round nextRound = roundService.createNextRound(winnersId, currentRound.getRoundNumber());
                tournament.addRound(nextRound.getId());
            }

            tournamentRepository.save(tournament);
        } else {
            throw new RuntimeException("Current round is not complete, cannot advance the tournament.");
        }
    }

    public List<String> getCurrentMatches(String tournamentId) {
        Tournament tournament = getTournamentById(tournamentId);
        String currentRoundId = tournament.getCurrentRoundId(); 
        Round currentRound = roundService.getRoundById(currentRoundId);
        
        return currentRound.getMatchIds().stream()
                .map(matchService::getMatchById) // Use a method that returns Optional<Match>
                .map(Match::getId) // Assuming Match has a getId method
                .collect(Collectors.toList());
    }

    public void completeAllMatchesInRound(String tournamentId, int roundNumber) {
        Tournament tournament = getTournamentById(tournamentId);
        List<String> rounds = tournament.getRoundIds();

        Round currentRound = roundService.getRoundById(rounds.get(roundNumber - 1));

        // Retrieve match IDs from the round and complete them
        for (String matchId : currentRound.getMatchIds()) { // Assuming getMatchIds() returns List<String>
            Match match = matchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found with ID: " + matchId));
            
            match.setCompleted(true);
            matchRepository.save(match); // Save the updated match
        }

        roundRepository.save(currentRound);
        tournamentRepository.save(tournament); // Save tournament state
    }
}
