package hu.spring.akos0012.server.dto.brandrequest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BrandRequestCreateDTO(
        @NotBlank
        String brandName,

        String message,

        @NotNull
        Long userId
) {
}
