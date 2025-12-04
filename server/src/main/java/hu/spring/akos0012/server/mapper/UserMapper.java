package hu.spring.akos0012.server.mapper;

import hu.spring.akos0012.server.dto.user.UserCreateDTO;
import hu.spring.akos0012.server.dto.user.UserResponseDTO;
import hu.spring.akos0012.server.model.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponseDTO toDto(User user);

    List<UserResponseDTO> toDtoList(List<User> users);

    User fromCreateDto(UserCreateDTO userCreateDTO);


}
