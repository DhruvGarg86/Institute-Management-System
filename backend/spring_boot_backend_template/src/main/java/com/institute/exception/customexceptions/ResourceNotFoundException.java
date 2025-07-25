package com.institute.exception.customexceptions;

@SuppressWarnings("serial")
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String errMesg) {
        super(errMesg);
    }
}
