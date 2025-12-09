package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.brandrequest.BrandRequestCreateDTO;
import hu.spring.akos0012.server.dto.brandrequest.BrandRequestResponseDTO;
import hu.spring.akos0012.server.model.BrandRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BrandRequestMapper {

    @Mapping(target = "user", source = "user")
    BrandRequestResponseDTO toDto(BrandRequest brandRequest);

    List<BrandRequestResponseDTO> toDtoList(List<BrandRequest> brandRequest);
}
