package hu.spring.akos0012.server.dto.favoritecar;

import hu.spring.akos0012.server.dto.carmodel.CarModelResponseDTO;

public record FavoriteCarResponseDTO(
        Long id,
        CarModelResponseDTO carModel,
        Long userId,
        int year,
        String color,
        String fuel
) {
}
