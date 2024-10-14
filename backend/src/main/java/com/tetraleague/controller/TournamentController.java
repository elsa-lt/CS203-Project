package com.tetraleague.controller;

import com.tetraleague.model.Tournament;
import com.tetraleague.model.User;
import com.tetraleague.model.Match; 
import com.tetraleague.repository.UserRepository;
import com.tetraleague.service.TournamentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
@CrossOrigin(origins = "http://localhost:3000") 
public class TournamentController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final TournamentService tournamentService;

    @Autowired
    public TournamentController(TournamentService tournamentService, UserRepository userRepository) {
        this.tournamentService = tournamentService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<Tournament>> getAllTournaments() {
        List<Tournament> tournaments = tournamentService.getAllTournaments();
        return ResponseEntity.ok(tournaments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tournament> getTournamentById(@PathVariable String id) {
        Tournament tournament = tournamentService.getTournamentById(id);
        return ResponseEntity.ok(tournament);
    }

    @PostMapping
    public ResponseEntity<Tournament> createTournament(@RequestBody Tournament tournament) {
        Tournament createdTournament = tournamentService.createTournament(tournament);
        return ResponseEntity.status(201).body(createdTournament);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tournament> updateTournament(@PathVariable String id, @RequestBody Tournament tournament) {
        Tournament updatedTournament = tournamentService.updateTournament(id, tournament);
        return ResponseEntity.ok(updatedTournament);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable String id) {
        tournamentService.deleteTournament(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = tournamentService.uploadImage(id, file);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed: " + e.getMessage());
        }
    }
    
    @GetMapping("/{tournamentId}/participants/{username}")
    public ResponseEntity<Boolean> checkRegistrationStatus(@PathVariable String tournamentId, @PathVariable String username) {
        Tournament tournament = tournamentService.getTournamentById(tournamentId);
        User player = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Player not found"));
        
        boolean isRegistered = tournament.getParticipants().contains(player);
        return ResponseEntity.ok(isRegistered);
    }

    public static class RegistrationStatusResponse {
        private boolean isRegistered;

        public RegistrationStatusResponse(boolean isRegistered) {
            this.isRegistered = isRegistered;
        }

        public boolean isRegistered() {
            return isRegistered;
        }

        public void setRegistered(boolean registered) {
            isRegistered = registered;
        }
    }
    
    @PostMapping("/{tournamentId}/start")
    public ResponseEntity<Void> startTournament(@PathVariable String tournamentId) {
        tournamentService.startTournament(tournamentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{tournamentId}/advance")
    public ResponseEntity<Void> advanceTournament(@PathVariable String tournamentId) {
        tournamentService.advanceTournament(tournamentId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{tournamentId}/matches")
    public ResponseEntity<List<Match>> getCurrentMatches(@PathVariable String tournamentId) {
        try {
            List<Match> currentMatches = tournamentService.getCurrentMatches(tournamentId);
            return ResponseEntity.ok(currentMatches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null); 
        }
    }

    @PostMapping("/{tournamentId}/rounds/{roundNumber}/complete")
    public ResponseEntity<Void> completeRoundMatches(@PathVariable String tournamentId, @PathVariable int roundNumber) {
        tournamentService.completeAllMatchesInRound(tournamentId, roundNumber);
        return ResponseEntity.ok().build();
    }    
}
