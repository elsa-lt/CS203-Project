package com.tetraleague.payload.request;
import java.sql.Date;
import java.util.Set;

import jakarta.validation.constraints.*;
 
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;

     @NotBlank
    @Size(max = 20)
    private String name;

    @NotBlank
    @Size(max = 20)
    private String location;

    @NotBlank
    @Size(max = 20)
    private Date dateofbirth;
 
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    
    private Set<String> roles;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(min = 6, max = 40)
    private String confirmPassword;
  
    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDOB() {
        return dateofbirth;
    }

    public void setDOB(Date dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }
 
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
    
    public Set<String> getRoles() {
      return this.roles;
    }
    
    public void setRole(Set<String> roles) {
      this.roles = roles;
    }
}