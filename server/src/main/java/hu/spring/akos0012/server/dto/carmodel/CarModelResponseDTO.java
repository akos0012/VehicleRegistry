package hu.spring.akos0012.server.dto.carmodel;

public record CarModelResponseDTO(
        Long id,
        Long brandId,
        String name
) {
}
