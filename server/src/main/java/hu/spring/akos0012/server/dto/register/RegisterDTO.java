package hu.spring.akos0012.server.dto.register;

import jakarta.validation.constraints.NotBlank;

public record RegisterDTO(
        @NotBlank
        String username,

        @NotBlank
        String password,

        @NotBlank
        String fullName
) {
}
