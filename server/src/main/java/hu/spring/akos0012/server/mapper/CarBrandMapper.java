package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.carbrand.CarBrandCreateDTO;
import hu.spring.akos0012.server.dto.carbrand.CarBrandResponseDTO;
import hu.spring.akos0012.server.model.CarBrand;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CarBrandMapper {
    
    CarBrandResponseDTO toDto(CarBrand carBrand);

    List<CarBrandResponseDTO> toDtoList(List<CarBrand> carBrands);

    CarBrand fromCreateDto(CarBrandCreateDTO carBrandCreateDTO);
}
