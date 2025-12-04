package hu.spring.akos0012.server.dto.carmodel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CarModelCreateDTO(
        @NotNull
        Long brandId,

        @NotBlank
        String name
) {
}
