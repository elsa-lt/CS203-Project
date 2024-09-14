package com.tetraleague.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
public class Admin extends User {
    // Default constructor
    public Admin() {
        super();
    }

    // Constructor for registration
    public Admin(String id, String firstName, String lastName, String username, String email, String password, String confirmPassword) {
        super(id, firstName, lastName, username, email, password, confirmPassword, "admin");
    }

    // Constructor for login
    public Admin(String username, String password) {
        super(username, password);
    }
}
