package com.tetraleague.service;

import com.tetraleague.model.User;
import com.tetraleague.repository.UserRepository;
import com.tetraleague.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public String registerUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new Exception("Email is already in use");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Return the JWT token after successful registration
        return jwtUtils.generateJwtToken(user.getUsername());
    }

    public String loginUser(String email, String password) throws Exception {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Return JWT token if login is successful
                return jwtUtils.generateJwtToken(user.getUsername());
            }
        }
        throw new Exception("Invalid login credentials");
    }
}
