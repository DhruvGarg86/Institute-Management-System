package com.institute.exception.customexceptions;

public class ApiException extends RuntimeException {
    public ApiException(String mesg) {
        super(mesg);
    }
}
