package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.carimage.CarImageCreateDTO;
import hu.spring.akos0012.server.dto.carimage.CarImageResponseDTO;
import hu.spring.akos0012.server.model.CarImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CarImageMapper {

    @Mapping(source = "favoriteCar.id", target = "favoriteCarId")
    @Mapping(target = "url", expression = "java(\"/api/car-image/\" + carImage.getId() + \"/file\")")
    CarImageResponseDTO toDto(CarImage carImage);

    List<CarImageResponseDTO> toDtoList(List<CarImage> carImages);

    @Mapping(target = "favoriteCar", ignore = true)
    CarImage fromCreateDto(CarImageCreateDTO carImageCreateDTO);

    default byte[] map(MultipartFile file) {
        try {
            return file != null ? file.getBytes() : null;
        } catch (Exception e) {
            throw new RuntimeException("Failed to read file bytes", e);
        }
    }
}
