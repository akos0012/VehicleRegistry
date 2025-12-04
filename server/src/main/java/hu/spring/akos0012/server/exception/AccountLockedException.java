package hu.spring.akos0012.server.exception;

public class AccountLockedException extends RuntimeException {
    public AccountLockedException() {
        super("Account is locked due to too many failed login attempts");
    }
}
