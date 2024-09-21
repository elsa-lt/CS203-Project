package com.tetraleague.repository;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tetraleague.model.ERole;
import com.tetraleague.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}