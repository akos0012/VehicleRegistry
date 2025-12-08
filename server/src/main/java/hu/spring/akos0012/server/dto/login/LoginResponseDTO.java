package hu.spring.akos0012.server.dto.login;

import hu.spring.akos0012.server.dto.user.UserResponseDTO;

public record LoginResponseDTO(
        String token
) {
}
