package com.institute.exception.customexceptions;

public class AuthenticationException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AuthenticationException(String mesg) {
        super(mesg);
    }
}