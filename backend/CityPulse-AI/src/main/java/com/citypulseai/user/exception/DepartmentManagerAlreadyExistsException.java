package com.citypulseai.user.exception;

public class DepartmentManagerAlreadyExistsException extends RuntimeException {

    public DepartmentManagerAlreadyExistsException(String message) {
        super(message);
    }
}