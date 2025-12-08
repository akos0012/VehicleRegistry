package hu.spring.akos0012.server.dto.brandrequest;

import hu.spring.akos0012.server.model.BrandRequestStatus;
import jakarta.validation.constraints.NotNull;

public record BrandRequestUpdateDTO(
        @NotNull
        BrandRequestStatus status
) {
}
