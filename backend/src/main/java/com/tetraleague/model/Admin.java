package com.tetraleague.model;

import java.sql.Date;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@TypeAlias("admin")
public class Admin extends User {

    public Admin(String username, String name, String email, String password) {
        super(username, name, email, password);
    }
}