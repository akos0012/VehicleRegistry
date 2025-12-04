package hu.spring.akos0012.server.dto.favoritecar;

public record FavoriteCarResponseDTO(
        Long id,
        Long carModelId,
        Long userId,
        int year,
        String color,
        String fuel
) {
}
