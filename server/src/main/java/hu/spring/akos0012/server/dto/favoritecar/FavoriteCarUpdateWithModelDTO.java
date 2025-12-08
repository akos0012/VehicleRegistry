package hu.spring.akos0012.server.dto.favoritecar;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FavoriteCarUpdateWithModelDTO(
        @NotBlank
        String carModelName,

        @NotNull
        Long brandId,

        @Min(1886) // the first car was invented around 1886
        int year,

        String color,
        String fuel
) {
}
