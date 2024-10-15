package com.tetraleague.repository;

import com.tetraleague.model.Round;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface RoundRepository extends MongoRepository<Round, String> {
    Optional<Round> findById(String id);
}
