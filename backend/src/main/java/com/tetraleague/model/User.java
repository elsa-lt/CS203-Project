package com.tetraleague.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data

public abstract class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String role;

    // Constructor for login
    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
