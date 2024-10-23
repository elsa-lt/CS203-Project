package com.tetraleague.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import com.tetraleague.model.User;
import com.tetraleague.model.Role;
import com.tetraleague.model.Admin;
import com.tetraleague.model.Player;
import com.tetraleague.model.ERole;
import com.tetraleague.payload.request.LoginRequest;
import com.tetraleague.payload.request.SignupRequest;
import com.tetraleague.payload.response.JwtResponse;
import com.tetraleague.payload.response.MessageResponse;
import com.tetraleague.repository.RoleRepository;
import com.tetraleague.repository.UserRepository;
import com.tetraleague.security.jwt.JwtUtils;
import com.tetraleague.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.tetraleague.service.OTPService;

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

    @Autowired
    private OTPService otpService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Check if user is verified
        if (!userDetails.isVerified()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Please verify your email before logging in."));
        }

        String jwt = jwtUtils.generateJwtToken(authentication);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        
        // Log OTP verification attempt
        System.out.println("Verifying OTP for email: " + email + ", OTP: " + otp);
        
        boolean isValid = otpService.validateOTP(email, otp);
        System.out.println("Is OTP valid? " + isValid);

        if (isValid) {
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                user.setVerified(true); // Mark user as verified
                userRepository.save(user); // Save the updated user
                return ResponseEntity.ok("OTP verified successfully!");
            } else {
                return ResponseEntity.badRequest().body("Error: User not found.");
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid OTP. Please try again.");
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            strRoles = new HashSet<>();
            strRoles.add("player");
        }
        User user = null;

        for (String role : strRoles) {
            switch (role) {
                case "admin":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                    user = new Admin(signUpRequest.getUsername(), signUpRequest.getName(), signUpRequest.getEmail(),
                            encoder.encode(signUpRequest.getPassword()), adminRole);
                    break;
                case "player":
                    Role playerRole = roleRepository.findByName(ERole.ROLE_PLAYER)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(playerRole);
                    user = new Player(signUpRequest.getUsername(), signUpRequest.getName(), signUpRequest.getEmail(),
                            encoder.encode(signUpRequest.getPassword()), 0);
                    break;
            }
        }

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: User could not be created due to invalid roles!"));
        }

        user.setRoles(roles);
        user.setVerified(false); // Set isVerified to false
        userRepository.save(user);

        // Generate and send OTP after user registration
        otpService.generateAndSendOTP(signUpRequest.getEmail());

        return ResponseEntity
                .ok(new MessageResponse("User registered successfully! An OTP has been sent to your email."));
    }

    @GetMapping("/get-email")
    public ResponseEntity<?> getEmailByUsername(@RequestParam String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username); // Fetch user by username

        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().body("User not found"); // User not found
        }

        User user = optionalUser.get(); // Retrieve the User object
        return ResponseEntity.ok(Map.of("email", user.getEmail())); // Return the email
    }

    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Check if the user exists
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.badRequest().body("Error: Email is not registered.");
        }

        // Generate and send OTP
        try {
            otpService.generateAndSendOTP(email);
            return ResponseEntity.ok("OTP sent successfully to " + email);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending OTP: " + e.getMessage());
        }
    }

}