package com.tetraleague;

import com.mongodb.internal.connection.Stream;
import com.tetraleague.controller.AuthController;
import com.tetraleague.model.ERole;
import com.tetraleague.model.Match;
import com.tetraleague.model.Player;
import com.tetraleague.model.Role;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.payload.request.SignupRequest;
import com.tetraleague.payload.response.MessageResponse;
import com.tetraleague.repository.RoleRepository;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.UserRepository;
import com.tetraleague.service.MatchmakingService;
import com.tetraleague.service.TournamentService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.matches;
import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;


class MatchmakingServiceTest {
    @Mock
    private Tournament tournament;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MatchmakingService matchmakingService; // Inject mocked dependencies

    @Mock
    private TournamentRepository tournamentRepository;

    @InjectMocks
    private AuthController authController;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder encoder;
    
    @InjectMocks
    private TournamentService tournamentService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createMatchups_EvenNumber_Success() throws Exception {
        // Arrange
        Tournament tournament = new Tournament();
        List<Player> participants = new ArrayList<Player>(tournament.getParticipants());

        for (int i = 0; i < 8; i++) {
            Player player = new Player("username" + i, "name" + i, "email" + i, "password" + i, 0);
            player.setEloRating(1000 + i * 100);
            participants.add(player);
        }
        tournament.setParticipants(participants);

        // Act
        java.util.List<Match> matches = matchmakingService.createMatchups(tournament);

        // Assert
        assertEquals(4, matches.size());
        for (int i = 0; i < 4; i++) {
            Match match = matches.get(i);
            assertEquals(1, match.getRoundNumber());
            assertEquals(participants.get(7 - i).getEloRating(), match.getPlayer1().getEloRating());
            assertEquals(participants.get(3 - i).getEloRating(), match.getPlayer2().getEloRating());
        }
    }

    // @Test
    // void createMatchups_OddNumber_Success() throws Exception{
    // // Arrange
    // Tournament tournament = new Tournament();
    // List<Player> participants = new
    // ArrayList<Player>(tournament.getParticipants());
    // for (int i = 0; i < 7; i++) {
    // Player player = new Player("username"+i, "name"+i, "email"+i,
    // "password"+i,0);
    // player.setEloRating(1000 + i * 100);
    // participants.add(player);
    // }
    // tournament.setParticipants(participants);

    // // Act
    // java.util.List<Match> matches =
    // matchmakingService.createMatchups(tournament);

    // // Assert
    // assertEquals(3, matches.size());
    // for (int i = 0; i < 3; i++) {
    // Match match = matches.get(i);
    // assertEquals(1, match.getRoundNumber());
    // assertEquals(participants.get(i), match.getPlayer1());
    // assertEquals(participants.get(i + 3), match.getPlayer2());
    // }
    // }

    @Test
    void createNextRoundMatches_AddWinner_Complete() throws Exception {
        // Arrange
        List<Player> winners = new ArrayList<Player>(tournament.getParticipants());
        Player singleWinner = new Player("username", "name", "email", "password", 3);
        singleWinner.setEloRating(1500);
        winners.add(singleWinner);
        int roundNumber = 2;

        // Act
        List<Match> nextRoundMatches = matchmakingService.createNextRoundMatches(winners, roundNumber);

        // Assert
        assertTrue(nextRoundMatches.isEmpty());
    }

    @Test
    void completeMatch_TournamentNotFound_ThrowException() throws Exception {
        // Arrange
        String tournamentId = "nonexistent-id";
        String matchId = "match-id";
        Player winner = new Player("username", "name", "email", "password", 3);
        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            matchmakingService.completeMatch(tournamentId, matchId, winner);
        });
        verify(tournamentRepository).findById(tournamentId);
        verifyNoMoreInteractions(tournamentRepository);
    }

    @Test
    void completeMatch_MatchNotFound_ThrowsException() throws Exception {
        // Arrange
        String tournamentId = "tournament123";
        String matchId = "nonexistent_match";
        Player winner = new Player("username", "name", "email", "password", 3);
        Tournament mockTournament = mock(Tournament.class);
        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.getMatches()).thenReturn(new ArrayList<>());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            matchmakingService.completeMatch(tournamentId, matchId, winner);
        }, "Match not found");

        verify(tournamentRepository).findById(tournamentId);
        verify(mockTournament).getMatches();
        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void completeMatch_MatchAndTournamentFound_UpdateTournament() throws Exception {
        // Arrange
        String tournamentId = "tournament123";
        String matchId = "match456";
        Player winner = new Player("username", "name", "email", "password", 3);
        winner.setId("winner789");

        Tournament mockTournament = mock(Tournament.class);
        Match mockMatch = mock(Match.class);
        ArrayList<Match> matches = new ArrayList<>();
        matches.add(mockMatch);

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.getMatches()).thenReturn(matches);
        when(mockMatch.getId()).thenReturn(matchId);

        // Act
        matchmakingService.completeMatch(tournamentId, matchId, winner);

        // Assert
        verify(mockMatch).completeMatch(winner);
        verify(tournamentRepository).save(mockTournament);
    }

    @Test
    void createTournament_ValidTournament_SavedSuccessfully() {
        // Arrange
        Tournament validTournament = new Tournament();
        validTournament.setName("Valid Tournament");
        validTournament.setMaxParticipants(8);
        validTournament.setStartDate(LocalDateTime.now());
        validTournament.setEndDate(LocalDateTime.now().plusDays(7));
        validTournament.setMinElo(1000);
        validTournament.setMaxElo(2000);

        when(tournamentRepository.save(any(Tournament.class))).thenReturn(validTournament);

        // Act
        Tournament result = tournamentService.createTournament(validTournament);

        // Assert
        verify(tournamentRepository).save(validTournament);
        assertEquals(validTournament, result);
    }

    @Test
    void createTournament_LessThan2_ThrowsException() {
        // Arrange
        Tournament invalidTournament = new Tournament();
        invalidTournament.setMaxParticipants(1); // Invalid number of participants

        TournamentService mockTournamentService = mock(TournamentService.class);
        when(tournamentRepository.save(any(Tournament.class))).thenReturn(invalidTournament);
        doThrow(new IllegalArgumentException("Number of participants cannot be less than 2."))
                .when(mockTournamentService).validateTournament(invalidTournament);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            tournamentService.createTournament(invalidTournament);
        });

        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void createTournament_NotPower2_ThrowsException() {
        // Arrange
        Tournament invalidTournament = new Tournament();
        invalidTournament.setMaxParticipants(7); // Not a power of 2

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            tournamentService.createTournament(invalidTournament);
        });

        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void createTournament_StartDateAfterEndDate_ThrowsException() {
        // Arrange
        Tournament invalidTournament = new Tournament();
        invalidTournament.setName("Invalid Tournament");
        invalidTournament.setMaxParticipants(8);
        invalidTournament.setStartDate(LocalDateTime.now().plusDays(7));
        invalidTournament.setEndDate(LocalDateTime.now());
        invalidTournament.setMinElo(1000);
        invalidTournament.setMaxElo(2000);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            tournamentService.createTournament(invalidTournament);
        }, "Start date cannot be after end date.");

        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void createTournament_MinEloGreaterThanMaxElo_ThrowsException() {
        // Arrange
        Tournament invalidTournament = new Tournament();
        invalidTournament.setName("Invalid Tournament");
        invalidTournament.setMaxParticipants(8);
        invalidTournament.setStartDate(LocalDateTime.now());
        invalidTournament.setEndDate(LocalDateTime.now().plusDays(7));
        invalidTournament.setMinElo(2000);
        invalidTournament.setMaxElo(1000);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            tournamentService.createTournament(invalidTournament);
        }, "Minimum Elo cannot be greater than maximum Elo.");

        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void createTournament_OverlappingTournament_ThrowsException() {
        // Arrange
        Tournament existingTournament = new Tournament();
        existingTournament.setName("Overlapping Tournament");
        existingTournament.setStartDate(LocalDateTime.now());
        existingTournament.setEndDate(LocalDateTime.now().plusDays(7));

        Tournament newTournament = new Tournament();
        newTournament.setName("Overlapping Tournament");
        newTournament.setStartDate(LocalDateTime.now().plusDays(3));
        newTournament.setEndDate(LocalDateTime.now().plusDays(10));
        newTournament.setMaxParticipants(8);
        newTournament.setMinElo(1000);
        newTournament.setMaxElo(2000);

        List<Tournament> existingTournaments = new ArrayList<>();
        existingTournaments.add(existingTournament);

        when(tournamentRepository.findAll()).thenReturn(existingTournaments);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            tournamentService.createTournament(newTournament);
        }, "Another tournament with the same name overlaps in time frame");

        verify(tournamentRepository).findAll();
        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void addParticipant_TournamentEnded_ThrowsException() {
        // Arrange
        String tournamentId = "ended-tournament-id";
        String playerId = "player-id";
        Tournament endedTournament = mock(Tournament.class);
        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(endedTournament));
        when(endedTournament.hasEnded()).thenReturn(true);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            tournamentService.addParticipant(tournamentId, playerId);
        }, "Tournament has already ended");

        verify(tournamentRepository).findById(tournamentId);
        verify(endedTournament).hasEnded();
        verifyNoMoreInteractions(tournamentRepository, endedTournament);
    }

    @Test
    void addParticipant_TournamentAlreadyStarted_ThrowsException() {
        // Arrange
        String tournamentId = "tournament123";
        String playerId = "player456";
        Tournament mockTournament = mock(Tournament.class);
        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.hasStarted()).thenReturn(true);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            tournamentService.addParticipant(tournamentId, playerId);
        }, "Tournament has already started");

        verify(tournamentRepository).findById(tournamentId);
        verify(mockTournament).hasStarted();

    }

    @Test
    void addParticipant_FullTournament_ThrowsException() {
        // Arrange
        String tournamentId = "tournament123";
        String playerId = "player456";
        Tournament fullTournament = new Tournament();
        fullTournament.setMaxParticipants(8);
        for (int i = 0; i < 8; i++) {
            fullTournament
                    .addParticipant(new Player("username" + i, "name" + i, "email" + i, "password" + i, 1000 + i));
        }

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(fullTournament));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            tournamentService.addParticipant(tournamentId, playerId);
        }, "Tournament is full");

        verify(tournamentRepository).findById(tournamentId);
        verifyNoMoreInteractions(tournamentRepository);
    }

    @Test
    void addParticipant_PlayerAlreadyParticipating_ThrowsException() {
        // Arrange
        String tournamentId = "tournament123";
        String playerId = "player456";
        Tournament mockTournament = mock(Tournament.class);
        Player mockPlayer = mock(Player.class);
        when(mockPlayer.getRoles()).thenReturn(Set.of(new Role(ERole.ROLE_PLAYER)));

        // Mock tournament repository to return the tournament
        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));

        // Mock tournament conditions
        when(mockTournament.hasEnded()).thenReturn(false);
        when(mockTournament.hasStarted()).thenReturn(false);
        when(mockTournament.isFull()).thenReturn(false);

        // Mock player retrieval
        when(userRepository.findById(playerId)).thenReturn(Optional.of(mockPlayer));
        when(mockPlayer.getId()).thenReturn(playerId); // Ensure the mock returns the correct ID

        // Mock participants to include the mock player
        when(mockTournament.getParticipants()).thenReturn(List.of(mockPlayer));

        // Act & Assert
        // Expecting a RuntimeException when trying to add a player already
        // participating
        assertThrows(RuntimeException.class, () -> {
            tournamentService.addParticipant(tournamentId, playerId);
        }, "Player is already participating in the tournament");

        // Verify interactions
        verify(tournamentRepository).findById(tournamentId);
        verify(userRepository).findById(playerId);
        verify(mockTournament).getParticipants(); // This should be called
        verify(tournamentRepository, never()).save(any(Tournament.class)); // Ensure save is never called
    }

    @Test
    void addParticipant_PlayerWithEloRatingBelowMinimum_ThrowsRuntimeException() {
        // Arrange
        String tournamentId = "tournament123";
        String playerId = "player456";
        Tournament mockTournament = mock(Tournament.class);
        Player mockPlayer = mock(Player.class);

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.hasEnded()).thenReturn(false);
        when(mockTournament.hasStarted()).thenReturn(false);
        when(mockTournament.isFull()).thenReturn(false);
        when(userRepository.findById(playerId)).thenReturn(Optional.of(mockPlayer));
        when(mockPlayer.getEloRating()).thenReturn(900);
        when(mockTournament.getMinElo()).thenReturn(1000);
        when(mockTournament.getMaxElo()).thenReturn(2000);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> tournamentService.addParticipant(tournamentId, playerId),
                "Player's Elo rating is not within the allowed range for this tournament");

        verify(tournamentRepository).findById(tournamentId);
        verify(userRepository).findById(playerId);
        verify(mockTournament, never()).addParticipant(any(Player.class));
        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void addParticipant_PlayerEloAboveMax_ThrowsException() {
        // Arrange
        String tournamentId = "tournament123";
        String playerId = "player456";
        Tournament mockTournament = mock(Tournament.class);
        Player mockPlayer = mock(Player.class);

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.hasEnded()).thenReturn(false);
        when(mockTournament.hasStarted()).thenReturn(false);
        when(mockTournament.isFull()).thenReturn(false);
        when(mockTournament.getMaxElo()).thenReturn(2000);
        when(mockPlayer.getEloRating()).thenReturn(2100);
        when(userRepository.findById(playerId)).thenReturn(Optional.of(mockPlayer));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            tournamentService.addParticipant(tournamentId, playerId);
        }, "Player's Elo rating is not within the allowed range for this tournament");

        verify(tournamentRepository).findById(tournamentId);
        verify(userRepository).findById(playerId);
        verify(mockTournament, never()).addParticipant(any(Player.class));
        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void addParticipant_ValidConditions_Success() {
        // Arrange
        String tournamentId = "validTournamentId";
        String playerId = "validPlayerId";
        Tournament mockTournament = mock(Tournament.class);
        Player mockPlayer = mock(Player.class);

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.hasEnded()).thenReturn(false);
        when(mockTournament.hasStarted()).thenReturn(false);
        when(mockTournament.isFull()).thenReturn(false);
        when(userRepository.findById(playerId)).thenReturn(Optional.of(mockPlayer));
        when(mockTournament.getParticipants()).thenReturn(new ArrayList<>());
        when(mockPlayer.getEloRating()).thenReturn(1500);
        when(mockPlayer.getRoles()).thenReturn(Set.of(new Role(ERole.ROLE_PLAYER)));
        when(mockTournament.getMinElo()).thenReturn(1000);
        when(mockTournament.getMaxElo()).thenReturn(2000);
        when(tournamentRepository.save(mockTournament)).thenReturn(mockTournament);

        // Act
        Tournament result = tournamentService.addParticipant(tournamentId, playerId);

        // Assert
        verify(mockTournament).addParticipant(mockPlayer);
        verify(tournamentRepository).save(mockTournament);
        assertEquals(mockTournament, result);
    }

    @Test
    void addParticipant_InvalidPlayerId_ThrowsRuntimeException() {
        // Arrange
        String tournamentId = "validTournamentId";
        String invalidPlayerId = "invalidPlayerId";
        Tournament mockTournament = mock(Tournament.class);
        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(userRepository.findById(invalidPlayerId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            tournamentService.addParticipant(tournamentId, invalidPlayerId);
        }, "User not found");

        verify(tournamentRepository).findById(tournamentId);
        verify(userRepository).findById(invalidPlayerId);
        verifyNoMoreInteractions(tournamentRepository, userRepository);
    }

    @Test
    void registerUser_UsernameAlreadyExists_ReturnsBadRequest() {
        // Arrange
        SignupRequest signUpRequest = new SignupRequest();
        signUpRequest.setUsername("existingUsername");
        signUpRequest.setEmail("newuser@example.com");
        signUpRequest.setPassword("password123");
        signUpRequest.setName("New User");
        Set<String> roles = new HashSet<>();
        roles.add("player");
        signUpRequest.setRole(roles);
        MockitoAnnotations.openMocks(this);
        when(userRepository.existsByUsername("existingUsername")).thenReturn(true);

        // Act
        ResponseEntity<?> response = authController.registerUser(signUpRequest);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals("Error: Username is already taken!", ((MessageResponse) response.getBody()).getMessage());

        verify(userRepository).existsByUsername("existingUsername");
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    void registerUser_EmailAlreadyInUse_ReturnsBadRequest() {
        // Arrange
        SignupRequest signUpRequest = new SignupRequest();
        signUpRequest.setEmail("existing@email.com");
        signUpRequest.setUsername("newuser");
        signUpRequest.setPassword("password123");
        signUpRequest.setName("New User");
        Set<String> roles = new HashSet<>();
        roles.add("player");
        signUpRequest.setRole(roles);

        when(userRepository.existsByEmail(signUpRequest.getEmail())).thenReturn(true);

        // Act
        ResponseEntity<?> response = authController.registerUser(signUpRequest);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals("Error: Email is already in use!", ((MessageResponse) response.getBody()).getMessage());
        verify(userRepository).existsByEmail(signUpRequest.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void registerUser_SuccessfulRegistration_ReturnsOkResponse() {
        // Arrange
        SignupRequest signUpRequest = new SignupRequest();
        signUpRequest.setUsername("newuser");
        signUpRequest.setName("New User");
        signUpRequest.setEmail("newuser@example.com");
        signUpRequest.setPassword("password123");
        Set<String> roles = new HashSet<>();
        roles.add("player");
        signUpRequest.setRole(roles);

        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(roleRepository.findByName(ERole.ROLE_PLAYER)).thenReturn(Optional.of(new Role(ERole.ROLE_PLAYER)));
        when(encoder.encode("password123")).thenReturn("encodedPassword"); // Mock the encode method


        // Act
        ResponseEntity<?> response = authController.registerUser(signUpRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals("User registered successfully!", ((MessageResponse) response.getBody()).getMessage());

        verify(userRepository).existsByUsername("newuser");
        verify(userRepository).existsByEmail("newuser@example.com");
        verify(roleRepository).findByName(ERole.ROLE_PLAYER);
        verify(userRepository).save(any(Player.class));
    }
}