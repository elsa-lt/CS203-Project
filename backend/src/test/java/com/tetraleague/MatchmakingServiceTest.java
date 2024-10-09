package com.tetraleague;

import com.mongodb.internal.connection.Stream;
import com.tetraleague.model.Match;
import com.tetraleague.model.Player;
import com.tetraleague.model.Tournament;
import com.tetraleague.repository.TournamentRepository;
import com.tetraleague.repository.UserRepository;
import com.tetraleague.service.MatchmakingService;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.matches;
import static org.mockito.Mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;




class MatchmakingServiceTest {
    @Mock
    private Tournament tournament;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MatchmakingService matchmakingService;  // Inject mocked dependencies
    @Mock
    private TournamentRepository tournamentRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }





    @Test
void createMatchups_EvenNumber_Success() throws Exception{
    // Arrange
    Tournament tournament = new Tournament();
    ArrayList<Player> participants = new ArrayList<Player>(tournament.getParticipants());

    for (int i = 0; i < 8; i++) {
        Player player = new Player("username"+i, "name"+i, "email"+i, "password"+i,0);
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
//     // Arrange
//     Tournament tournament = new Tournament();
//     ArrayList<Player> participants = new ArrayList<Player>(tournament.getParticipants());
//     for (int i = 0; i < 7; i++) {
//         Player player = new Player("username"+i, "name"+i, "email"+i, "password"+i,0);
//         player.setEloRating(1000 + i * 100);
//         participants.add(player);
//     }
//     tournament.setParticipants(participants);

//     // Act
//     java.util.List<Match> matches = matchmakingService.createMatchups(tournament);

//     // Assert
//     assertEquals(3, matches.size());
//     for (int i = 0; i < 3; i++) {
//         Match match = matches.get(i);
//         assertEquals(1, match.getRoundNumber());
//         assertEquals(participants.get(i), match.getPlayer1());
//         assertEquals(participants.get(i + 3), match.getPlayer2());
//     }
// }

// @Test
// void createNextRoundMatchesWithSingleWinner() throws Exception{
//     // Arrange
//     List<Player> winners = new ArrayList<>();
//     Player singleWinner = new Player("username", "name", "email", "password",3);
//     singleWinner.setEloRating(1500);
//     winners.add(singleWinner);
//     int roundNumber = 2;

//     // Act
//     List<Match> nextRoundMatches = matchmakingService.createNextRoundMatches(winners, roundNumber);

//     // Assert
//     assertTrue(nextRoundMatches.isEmpty());
// }

@Test
void completeMatch_TournamentNotFound_ThrowException() throws Exception{
    // Arrange
    String tournamentId = "nonexistent-id";
    String matchId = "match-id";
    Player winner = new Player("username", "name", "email", "password",3);
    when(tournamentRepository.findById(tournamentId)).thenReturn(Optional.empty());

    // Act & Assert
    assertThrows(RuntimeException.class, () -> {
        matchmakingService.completeMatch(tournamentId, matchId, winner);
    });
    verify(tournamentRepository).findById(tournamentId);
    verifyNoMoreInteractions(tournamentRepository);
}

@Test
void completeMatch_MatchNotFound_ThrowsException() throws Exception{
    // Arrange
    String tournamentId = "tournament123";
    String matchId = "nonexistent_match";
    Player winner = new Player("username", "name", "email", "password",3);
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
void completeMatch_MatchAndTournamentFound_UpdateTournament() throws Exception{
    // Arrange
    String tournamentId = "tournament123";
    String matchId = "match456";
    Player winner = new Player("username", "name", "email", "password",3);
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





}