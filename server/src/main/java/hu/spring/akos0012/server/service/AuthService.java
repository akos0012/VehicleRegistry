package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.config.SecurityProperties;
import hu.spring.akos0012.server.dto.login.LoginResponseDTO;
import hu.spring.akos0012.server.dto.user.UserCreateDTO;
import hu.spring.akos0012.server.dto.user.UserResponseDTO;
import hu.spring.akos0012.server.exception.InvalidCredentialsException;
import hu.spring.akos0012.server.exception.UserInactiveException;
import hu.spring.akos0012.server.mapper.UserMapper;
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
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final SecurityProperties securityProperties;

    public AuthService(UserService userService,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       SecurityProperties securityProperties) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.securityProperties = securityProperties;
    }

    public UserResponseDTO register(UserCreateDTO userCreateDTO) {
        return userService.create(userCreateDTO);
    }

    public LoginResponseDTO login(String username, String password) {
        User user = findActiveOrFail(username);

        validatePasswordOrHandleFailure(user, password);

        resetFailedAttempts(user);

        UserDetails userDetails = createUserDetails(user);

        String token = jwtService.createJwt(userDetails);
        UserResponseDTO userResponseDTO = userMapper.toDto(user);

        return new LoginResponseDTO(userResponseDTO, token);
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
