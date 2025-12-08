package hu.spring.akos0012.server.dto.carimage;

public record CarImageResponseDTO(
        Long id,
        Long favoriteCarId,
        String contentType,
        String url
) {
}
