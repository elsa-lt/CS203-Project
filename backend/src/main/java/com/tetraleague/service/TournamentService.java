package com.tetraleague.service;

import com.tetraleague.model.Tournament;
import com.tetraleague.model.Player;
import com.tetraleague.model.Rank;
import com.tetraleague.model.User;
import com.tetraleague.model.ERole;
import com.tetraleague.model.Round;
import com.tetraleague.model.Match;
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
    private RoundService roundService;

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

            //Validate rank and elo rating together
            if (tournament.getRank() != null) {
                Rank rank = tournament.getRank();
                int minElo = tournament.getMinElo();
                int maxElo = tournament.getMaxElo();
        
                switch (rank) {
                    case PLATINUM:
                        if (minElo < 4500 || maxElo < 4500) {
                            throw new IllegalArgumentException("Platinum tournaments must have a minimum Elo of 4500.");
                        }
                        break;
                    case GOLD:
                        if (minElo < 3500 || maxElo >= 4500) {
                            throw new IllegalArgumentException("Gold tournaments must have a minimum Elo of 3500 and maximum Elo less than 4500.");
                        }
                        break;
                    case SILVER:
                        if (minElo < 2500 || maxElo >= 3500) {
                            throw new IllegalArgumentException("Silver tournaments must have a minimum Elo of 2500 and maximum Elo less than 3500.");
                        }
                        break;
                    case BRONZE:
                        if (minElo >= 1500 || maxElo >= 2500) {
                            throw new IllegalArgumentException("Bronze tournaments must have a minimum Elo of 1500 and a maximum Elo less than 2500.");
                        }
                        break;
                    case UNRANKED:
                        if (minElo >= 1500 || maxElo >= 1500) {
                            throw new IllegalArgumentException("Unranked tournaments must have an Elo range less than 1500.");
                        }
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid rank specified.");
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

        //Do not need this, we can check with the above
        if(tournament.getRank() != null && (player.getRank() != tournament.getRank())) {
            throw new RuntimeException("Player's Rank is not the allowed rank for this tournament");
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

    public Tournament removeParticipant (String tournamentId, String playerId) {
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

    public void advanceTournament(Tournament tournament) {
        List<Round> rounds = tournament.getRounds();
        Round currentRound = rounds.get(rounds.size() - 1);

        if (roundService.isRoundComplete(currentRound)) {
            List<Player> winners = currentRound.getWinners();

            if (winners.size() == 1) {
                tournament.setWinner(winners.get(0));
                tournament.setEnded(true);
                tournamentRepository.save(tournament);
                return;
            }

            Round nextRound = roundService.createNextRound(winners, currentRound.getRoundNumber() + 1);
            tournament.addRound(nextRound);
            tournamentRepository.save(tournament);
        }
    }

    public List<Match> getCurrentBrackets(Tournament tournament) {
        Round currentRound = tournament.getCurrentRound();
        return currentRound.getMatches();
    }
}
