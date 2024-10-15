package com.tetraleague.repository;

import com.tetraleague.model.Tournament;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TournamentRepository extends MongoRepository<Tournament, String> {
    Optional<Tournament> findById(String id);
}
