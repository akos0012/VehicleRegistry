package hu.spring.akos0012.server.dto.user;

import hu.spring.akos0012.server.model.Role;

public record UserResponseDTO(
        Long id,
        String username,
        Role role,
        String fullName,
        Boolean active,
        int failedLoginAttempts
) {
}
