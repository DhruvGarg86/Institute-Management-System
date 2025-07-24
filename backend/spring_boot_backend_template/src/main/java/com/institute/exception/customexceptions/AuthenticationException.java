package com.institute.exception.customexceptions;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String mesg) {
        super(mesg);
    }
}