package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.login.LoginDTO;
import hu.spring.akos0012.server.dto.login.LoginResponseDTO;
import hu.spring.akos0012.server.dto.register.RegisterDTO;
import hu.spring.akos0012.server.dto.user.UserCreateDTO;
import hu.spring.akos0012.server.dto.user.UserResponseDTO;
import hu.spring.akos0012.server.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO registerDTO) {
        authService.register(registerDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginDTO loginDTO) {
        LoginResponseDTO loginResponseDTO = authService.login(loginDTO.username(), loginDTO.password());
        return ResponseEntity.ok(loginResponseDTO);
    }
}
