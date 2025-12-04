package hu.spring.akos0012.server.dto.favoritecar;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

public record FavoriteCarCreateDTO(
        @NotNull
        Long carModelId,

        @NotNull
        Long userId,
        
        @Min(1886) // the first car was invented around 1886
        int year,

        String color,
        String fuel
) {
}
