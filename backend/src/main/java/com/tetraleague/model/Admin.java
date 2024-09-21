package com.tetraleague.model;

import org.springframework.data.mongodb.core.mapping.Document;

public class Admin extends User {
    private Role role;  // Fix: Adding the missing role variable

    public Admin(String username, String email, String password, Role role) {
        super(username, email, password);  // Fix: Matching the User constructor
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
