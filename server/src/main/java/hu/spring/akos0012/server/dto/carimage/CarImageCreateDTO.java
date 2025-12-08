package hu.spring.akos0012.server.dto.carimage;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public record CarImageCreateDTO(
        @NotNull
        Long favoriteCarId,

        @NotNull
        MultipartFile imageData
) {
}
