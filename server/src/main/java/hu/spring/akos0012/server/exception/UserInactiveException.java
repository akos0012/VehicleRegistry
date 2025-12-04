package hu.spring.akos0012.server.exception;

public class UserInactiveException extends RuntimeException {
    public UserInactiveException() {
        super("User account is deactivated");
    }
}
