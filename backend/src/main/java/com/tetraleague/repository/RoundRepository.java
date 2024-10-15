package com.tetraleague.repository;

import com.tetraleague.model.Round;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoundRepository extends MongoRepository<Round, String> {

}
