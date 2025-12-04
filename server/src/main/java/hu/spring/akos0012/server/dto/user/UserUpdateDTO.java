package hu.spring.akos0012.server.dto.user;

import hu.spring.akos0012.server.model.Role;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserUpdateDTO(
        @NotBlank
        String username,

        @NotNull
        Role role,

        @NotBlank
        String fullName,

        @NotNull
        Boolean active,
        
        @Min(0)
        int failedLoginAttempts
) {
}
