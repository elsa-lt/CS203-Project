package com.tetraleague.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tetraleague.model.ERole;
import com.tetraleague.model.Role;
import com.tetraleague.model.User;
import com.tetraleague.payload.request.LoginRequest;
import com.tetraleague.payload.request.SignupRequest;
import com.tetraleague.payload.response.JwtResponse;
import com.tetraleague.payload.response.MessageResponse;
import com.tetraleague.repository.RoleRepository;
import com.tetraleague.repository.UserRepository;
import com.tetraleague.security.jwt.JwtUtils;
import com.tetraleague.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponse(jwt,
        userDetails.getId(),
        userDetails.getUsername(),
        userDetails.getEmail(),
        roles));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    // Check if username or email already exists
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }

    if (!signUpRequest.getPassword().trim().equals(signUpRequest.getConfirmPassword().trim())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Error: Passwords do not match!"));
    }

    // Create new user's account
    User user = new User(signUpRequest.getUsername(),
        signUpRequest.getEmail(),
        encoder.encode(signUpRequest.getPassword()));

    Set<String> strRoles = signUpRequest.getRoles();
    Set<Role> roles = new HashSet<>();

    // Automatically assign ROLE_PLAYER if no roles are provided
    if (strRoles == null || strRoles.isEmpty()) {
      Role playerRole = roleRepository.findByName(ERole.ROLE_PLAYER)
          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(playerRole);
    } else {
      // Assign roles based on provided role(s)
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);
            break;
          case "player":
            Role playerRole = roleRepository.findByName(ERole.ROLE_PLAYER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(playerRole);
            break;
          default:
            Role defaultRole = roleRepository.findByName(ERole.ROLE_PLAYER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(defaultRole);
        }
      });
    }

    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }

}