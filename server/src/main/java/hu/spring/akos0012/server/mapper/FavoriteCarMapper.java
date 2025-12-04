package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarCreateDTO;
import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarResponseDTO;
import hu.spring.akos0012.server.model.FavoriteCar;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FavoriteCarMapper {

    @Mapping(source = "carModel.id", target = "carModelId")
    @Mapping(source = "user.id", target = "userId")
    FavoriteCarResponseDTO toDto(FavoriteCar favoriteCar);

    List<FavoriteCarResponseDTO> toDtoList(List<FavoriteCar> favoriteCars);

    @Mapping(target = "carModel", ignore = true)
    @Mapping(target = "user", ignore = true)
    FavoriteCar fromCreateDto(FavoriteCarCreateDTO favoriteCarCreateDTO);
}
