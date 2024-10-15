package com.tetraleague.exception;

public class RoundNotFoundException extends RuntimeException {
    public RoundNotFoundException(String message) {
        super(message);
    }
}