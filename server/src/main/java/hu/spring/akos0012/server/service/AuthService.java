package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.config.SecurityProperties;
import hu.spring.akos0012.server.dto.login.LoginResponseDTO;
import hu.spring.akos0012.server.dto.register.RegisterDTO;
import hu.spring.akos0012.server.exception.InvalidCredentialsException;
import hu.spring.akos0012.server.exception.UserInactiveException;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.security.JwtService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final SecurityProperties securityProperties;

    public AuthService(UserService userService,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       SecurityProperties securityProperties) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.securityProperties = securityProperties;
    }

    public void register(RegisterDTO registerDTO) {
        userService.register(registerDTO);
    }

    public LoginResponseDTO login(String username, String password) {
        User user = findActiveOrFail(username);

        validatePasswordOrHandleFailure(user, password);

        resetFailedAttempts(user);

        UserDetails userDetails = createUserDetails(user);

        String token = jwtService.createJwt(userDetails, user.getId(), user.getFullName());

        return new LoginResponseDTO(token);
    }

    private User findActiveOrFail(String username) {
        User user = userService.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);

        if (!user.isActive()) {
            throw new UserInactiveException();
        }

        return user;
    }

    private void validatePasswordOrHandleFailure(User user, String rawPassword) {
        if (passwordEncoder.matches(rawPassword, user.getPassword())) {
            System.out.println("HELLO THERE!");
            return;
        }

        int attempts = user.getFailedLoginAttempts() + 1;
        user.setFailedLoginAttempts(attempts);

        if (attempts >= securityProperties.getMaxFailedAttempts()) {
            user.setActive(false);
        }

        userService.save(user);

        throw new InvalidCredentialsException();
    }

    private void resetFailedAttempts(User user) {
        user.setFailedLoginAttempts(0);
        userService.save(user);
    }

    private UserDetails createUserDetails(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}
