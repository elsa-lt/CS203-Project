package com.tetraleague.repository;

import com.tetraleague.model.Match;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoundRepository extends MongoRepository<Match, String> {

}
