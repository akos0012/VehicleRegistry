package hu.spring.akos0012.server.dto.carimage;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CarImageCreateDTO(
        @NotNull
        Long favoriteCarId,

        @NotNull
        byte[] imageData,

        @NotBlank
        String contentType
) {
}
