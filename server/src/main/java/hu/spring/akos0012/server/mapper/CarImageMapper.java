package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.carimage.CarImageCreateDTO;
import hu.spring.akos0012.server.dto.carimage.CarImageResponseDTO;
import hu.spring.akos0012.server.model.CarImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CarImageMapper {

    @Mapping(source = "favoriteCar.id", target = "favoriteCarId")
    CarImageResponseDTO toDto(CarImage carImage);

    List<CarImageResponseDTO> toDtoList(List<CarImage> carImages);

    @Mapping(target = "favoriteCar", ignore = true)
    CarImage fromCreateDto(CarImageCreateDTO carImageCreateDTO);
}
