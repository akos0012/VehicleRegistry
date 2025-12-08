package hu.spring.akos0012.server.dto.carmodel;

public record CarModelResponseDTO(
        Long id,
        String name,
        Long brandId,
        String brandName
) {
}
