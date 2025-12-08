package hu.spring.akos0012.server.dto.user;

import hu.spring.akos0012.server.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserCreateDTO(
        @NotBlank
        String username,

        @NotBlank
        String password,

        @NotNull
        Role role,

        @NotBlank
        String fullName,

        @NotNull
        boolean active
) {
}
