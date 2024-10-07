package com.tetraleague.model;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@TypeAlias("admin")
public class Admin extends User {

    //removed role from constructor
    public Admin(String username, String email, String password) {
        super(username, email, password);
    }
}
