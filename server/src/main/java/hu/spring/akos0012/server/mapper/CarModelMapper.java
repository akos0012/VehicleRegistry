package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.carmodel.CarModelCreateDTO;
import hu.spring.akos0012.server.dto.carmodel.CarModelResponseDTO;
import hu.spring.akos0012.server.model.CarModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CarModelMapper {

    @Mapping(source = "brand.id", target = "brandId")
    @Mapping(source = "brand.name", target = "brandName")
    CarModelResponseDTO toDto(CarModel carModel);

    List<CarModelResponseDTO> toDtoList(List<CarModel> carModels);

    @Mapping(target = "brand", ignore = true)
    CarModel fromCreateDto(CarModelCreateDTO CarModelCreateDTO);

}
