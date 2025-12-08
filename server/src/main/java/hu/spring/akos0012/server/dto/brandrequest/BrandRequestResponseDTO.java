package hu.spring.akos0012.server.dto.brandrequest;

import hu.spring.akos0012.server.dto.user.UserResponseDTO;
import hu.spring.akos0012.server.model.BrandRequestStatus;

import java.time.LocalDateTime;

public record BrandRequestResponseDTO(
        Long id,
        String brandName,
        String message,
        LocalDateTime requestedAt,
        BrandRequestStatus status,
        UserResponseDTO user
) {
}
