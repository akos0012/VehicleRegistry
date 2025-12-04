package hu.spring.akos0012.server.dto.login;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record LoginDTO(
        @NotBlank
        String username,

        @NotEmpty
        String password
) {
}
