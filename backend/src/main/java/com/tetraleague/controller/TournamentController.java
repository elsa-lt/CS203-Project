package com.tetraleague.controller;

import com.tetraleague.model.Tournament;
import com.tetraleague.service.TournamentService;
import com.tetraleague.model.Match;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tournaments")
public class TournamentController {

    @Autowired
    private final TournamentService tournamentService;

    @Autowired
    public TournamentController(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
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

    @GetMapping("/{id}/matches")
    public ResponseEntity<List<Match>> getMatches(@PathVariable String id) {
        Tournament tournament = tournamentService.getTournamentById(id);
        List<Match> matches = tournament.getMatches();
        return ResponseEntity.ok(matches);
    }
}
