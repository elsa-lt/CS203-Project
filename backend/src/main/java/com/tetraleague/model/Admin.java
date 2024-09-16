package com.tetraleague.model;

public class Admin extends User {

    // Constructor for registration
    public Admin(String id, String firstName, String lastName, String username, String email, String password, String confirmPassword) {
        super(id, firstName, lastName, username, email, password, confirmPassword, "admin");
    }

    // Constructor for login
    public Admin(String username, String password) {
        super(null, null, null, username, null, password, null, "admin");
    }
}
