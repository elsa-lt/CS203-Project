package com.tetraleague;

import com.tetraleague.controller.AuthController;
import com.tetraleague.controller.UserController;
import com.tetraleague.dto.PlayerRankingDTO;
import com.tetraleague.model.ERole;
import com.tetraleague.model.Match;
import com.tetraleague.model.Player;
import com.tetraleague.model.Rank;
import com.tetraleague.model.Role;
import com.tetraleague.model.Round;
import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.payload.request.SignupRequest;
import com.tetraleague.payload.response.MessageResponse;
import com.tetraleague.repository.RoleRepository;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.UserRepository;
import com.tetraleague.service.MatchService;
import com.tetraleague.service.RankingService;
import com.tetraleague.service.RoundService;
import com.tetraleague.service.TournamentService;
import com.tetraleague.service.UserService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

class MatchmakingServiceTest {
    private static final Rank GOLD = null;

    @Mock
    private Tournament tournament;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MatchService matchmakingService;

    @Mock
    private TournamentRepository tournamentRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder encoder;

    @InjectMocks
    private TournamentService tournamentService;

    @Mock
    private RankingService rankingService;

    @InjectMocks
    private RoundService roundService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createFirstRound_EvenNumber_Success() throws Exception {
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
        Round round1 = roundService.createFirstRound(participants);

        // Assert
        assertEquals(4, round1.getMatches().size());
        for (int i = 0; i < 4; i++) {
            assertEquals(1, round1.getRoundNumber());
            assertEquals(participants.get(i).getEloRating(),
                    round1.getMatches().get(i).getPlayer1().getEloRating());
            assertEquals(participants.get(4 + i).getEloRating(),
                    round1.getMatches().get(i).getPlayer2().getEloRating());
        }
    }

    @Test
    void updateTournament_NonExistentTournament_ThrowsException() {
        // Arrange
        String nonExistentId = "nonexistent123";
        Tournament updatedTournament = new Tournament();
        updatedTournament.setName("Updated Tournament");
        when(tournamentRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            tournamentService.updateTournament(nonExistentId, updatedTournament);
        }, "Tournament not found");

        verify(tournamentRepository).findById(nonExistentId);
        verifyNoMoreInteractions(tournamentRepository);
    }

    @Test
    void updateTournament_AlreadyStartedNotEnded_UpdatesAllowedFields() {
        // Arrange
        String tournamentId = "tournament123";
        Tournament existingTournament = new Tournament();
        existingTournament.setId(tournamentId);
        existingTournament.setStarted(true);
        existingTournament.setEnded(false);
        existingTournament.setName("Original Tournament");
        existingTournament.setDescription("Original Description");
        existingTournament.setMaxParticipants(8);
        existingTournament.setStartDate(LocalDateTime.now().minusDays(1));
        existingTournament.setEndDate(LocalDateTime.now().plusDays(6));
        existingTournament.setImageUrl("original-image-url");
        existingTournament.setPrizePool(500.0);
        existingTournament.setRank(Rank.GOLD);
        List<Player> participants = new ArrayList<>(existingTournament.getParticipants());

        for (int i = 0; i < 8; i++) {
            Player player = new Player("username" + i, "name" + i, "email" + i, "password" + i, 0);
            player.setEloRating(1000 + i * 100);
            participants.add(player);
        }
        existingTournament.setParticipants(participants);

        Tournament updatedTournament = new Tournament();
        updatedTournament.setName("Updated Tournament");
        updatedTournament.setDescription("Updated Description");
        updatedTournament.setMaxParticipants(8); // Set maxParticipants
        updatedTournament.setStartDate(existingTournament.getStartDate());
        updatedTournament.setEndDate(LocalDateTime.now().plusDays(7));
        updatedTournament.setImageUrl("updated-image-url");
        updatedTournament.setPrizePool(1000.0);
        updatedTournament.setRank(Rank.GOLD);

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(existingTournament));
        when(tournamentRepository.save(any(Tournament.class))).thenReturn(existingTournament);

        // Act
        Tournament result = tournamentService.updateTournament(tournamentId, updatedTournament);

        // Assert
        assertEquals("Updated Tournament", result.getName());
        assertEquals("Updated Description", result.getDescription());
        assertEquals(8, result.getMaxParticipants());
        assertEquals(existingTournament.getStartDate(), result.getStartDate());
        assertEquals(updatedTournament.getEndDate(), result.getEndDate());
        assertEquals("updated-image-url", result.getImageUrl());
        assertEquals(1000.0, result.getPrizePool());
        assertEquals(Rank.GOLD, result.getRank());

        verify(tournamentRepository).findById(tournamentId);
        verify(tournamentRepository).save(existingTournament);
    }

    @Test
    void createTournament_ValidTournament_SavedSuccessfully() {
        // Arrange
        Tournament validTournament = new Tournament();
        validTournament.setName("Valid Tournament");
        validTournament.setMaxParticipants(8);
        validTournament.setStartDate(LocalDateTime.now());
        validTournament.setEndDate(LocalDateTime.now().plusDays(7));
        validTournament.setRank(Rank.GOLD);

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
        invalidTournament.setRank(GOLD);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            tournamentService.createTournament(invalidTournament);
        }, "Start date cannot be after end date.");

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
        mockTournament.setRank(GOLD);

        // Act & Assert
        assertThrows(RuntimeException.class, () -> tournamentService.addParticipant(tournamentId, playerId),
                "Player's Elo rating is not within the allowed range for this tournament");

        verify(tournamentRepository).findById(tournamentId);
        verify(userRepository).findById(playerId);
        verify(mockTournament, never()).addParticipant(any(Player.class));
        verify(tournamentRepository, never()).save(any(Tournament.class));
    }

    @Test
    void addParticipant_PlayerRankAboveMax_ThrowsException() {
        // Arrange
        String tournamentId = "tournament123";
        String playerId = "player456";
        Tournament mockTournament = mock(Tournament.class);
        Player mockPlayer = mock(Player.class);

        when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.of(mockTournament));
        when(mockTournament.hasEnded()).thenReturn(false);
        when(mockTournament.hasStarted()).thenReturn(false);
        when(mockTournament.isFull()).thenReturn(false);
        when(mockTournament.getRank()).thenReturn(GOLD);
        when(mockPlayer.getEloRating()).thenReturn(2000);
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
        when(mockTournament.getRank()).thenReturn(GOLD);
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
        signUpRequest.setRoles(roles);
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
        signUpRequest.setRoles(roles);

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
        signUpRequest.setRoles(roles);

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

    @Test
    void completeMatch_UpdatesEloRatingsForBothPlayers() {
        // Arrange
        Match mockMatch = mock(Match.class);
        Player winner = new Player("winner", "Winner", "winner@example.com", "password", 1000);
        Player loser = new Player("loser", "Loser", "loser@example.com", "password", 1000);
        when(mockMatch.isCompleted()).thenReturn(false);
        when(mockMatch.getPlayer1()).thenReturn(winner);
        when(mockMatch.getPlayer2()).thenReturn(loser);

        // Act
        matchmakingService.completeMatch(mockMatch, winner);

        // Assert
        verify(mockMatch).completeMatch(winner);
        verify(rankingService).updatePlayerEloRating(winner.getUsername(), loser.getUsername(), 1.0);
        verify(rankingService).updatePlayerStats(winner.getUsername(), 1.0);
        verify(rankingService).updatePlayerStats(loser.getUsername(), 0.0);
    }

    @Test
    void getBracketRanking_ShouldAssignCorrectRankingPositions() {
        // Arrange
        Rank testRank = Rank.GOLD;
        List<User> users = new ArrayList<>();
        Player player1 = new Player("user1", "Player 1", "email1@test.com", "password", 1500);
        player1.setRank(testRank);
        player1.setGamesWon(10);
        player1.setGamesLost(5);
        Player player2 = new Player("user2", "Player 2", "email2@test.com", "password", 1600);
        player2.setRank(testRank);
        player2.setGamesWon(15);
        player2.setGamesLost(3);
        Player player3 = new Player("user3", "Player 3", "email3@test.com", "password", 1400);
        player3.setRank(testRank);
        player3.setGamesWon(8);
        player3.setGamesLost(7);
        users.add(player1);
        users.add(player2);
        users.add(player3);

        when(userService.getAllUsers()).thenReturn(users);

        // Act
        ResponseEntity<List<PlayerRankingDTO>> response = userController.getBracketRanking(testRank);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<PlayerRankingDTO> rankings = response.getBody();
        assertNotNull(rankings);
        assertEquals(3, rankings.size());
        assertEquals(1, rankings.get(0).getGlobalRank());
        assertEquals(2, rankings.get(1).getGlobalRank());
        assertEquals(3, rankings.get(2).getGlobalRank());
        assertEquals("user2", rankings.get(0).getUsername());
        assertEquals("user1", rankings.get(1).getUsername());
        assertEquals("user3", rankings.get(2).getUsername());
    }
}