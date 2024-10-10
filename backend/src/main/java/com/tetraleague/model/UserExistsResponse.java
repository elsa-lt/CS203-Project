package com.tetraleague.model;

public class UserExistsResponse {
    private boolean usernameExists;
    private boolean emailExists;

    public UserExistsResponse(boolean usernameExists, boolean emailExists) {
        this.usernameExists = usernameExists;
        this.emailExists = emailExists;
    }

    public boolean isUsernameExists() {
        return usernameExists;
    }

    public void setUsernameExists(boolean usernameExists) {
        this.usernameExists = usernameExists;
    }

    public boolean isEmailExists() {
        return emailExists;
    }

    public void setEmailExists(boolean emailExists) {
        this.emailExists = emailExists;
    }
}
