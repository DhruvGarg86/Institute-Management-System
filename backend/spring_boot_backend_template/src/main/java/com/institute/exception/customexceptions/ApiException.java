package com.institute.exception.customexceptions;

public class ApiException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ApiException(String mesg) {
        super(mesg);
    }
}
