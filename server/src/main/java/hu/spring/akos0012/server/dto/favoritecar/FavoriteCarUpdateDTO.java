package hu.spring.akos0012.server.dto.favoritecar;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record FavoriteCarUpdateDTO(

        @Min(1886) // the first car was invented around 1886
        int year,

        String color,
        String fuel
) {
}
