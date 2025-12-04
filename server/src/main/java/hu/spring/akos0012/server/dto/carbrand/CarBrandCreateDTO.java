package hu.spring.akos0012.server.dto.carbrand;

import jakarta.validation.constraints.NotBlank;

public record CarBrandCreateDTO(
        @NotBlank
        String name
) {
}
