package com.tetraleague.service;

import com.tetraleague.Admin;
import com.tetraleague.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerAdmin(String id, String firstName, String lastName, String username, String email, String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            return "Passwords do not match";
        }
        Admin admin = new Admin(id, firstName, lastName, username, email, password, confirmPassword);
        admin.setPassword(passwordEncoder.encode(password));
        adminRepository.save(admin);
        return "Registration successful";
    }

    public Admin login(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null;
    }
}
