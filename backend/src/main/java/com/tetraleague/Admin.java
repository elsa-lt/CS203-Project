package com.tetraleague;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

public class Admin extends User {
    public Admin() {}

    public Admin(String id, String firstName, String lastName, String username, String email, String password) {
        super(id, firstName, lastName, username, email, password);
    }
}
