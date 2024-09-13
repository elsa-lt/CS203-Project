package com.tetraleague.service;

import com.tetraleague.Admin;
import com.tetraleague.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin login(String username, String password) {
        return adminRepository.findByUsername(username);
    }

    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
