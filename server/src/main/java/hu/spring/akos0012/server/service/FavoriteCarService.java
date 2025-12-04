package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarCreateDTO;
import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarResponseDTO;
import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarUpdateDTO;
import hu.spring.akos0012.server.mapper.FavoriteCarMapper;
import hu.spring.akos0012.server.model.CarModel;
import hu.spring.akos0012.server.model.FavoriteCar;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.repository.CarImageRepository;
import hu.spring.akos0012.server.repository.CarModelRepository;
import hu.spring.akos0012.server.repository.FavoriteCarRepository;
import hu.spring.akos0012.server.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteCarService {

    private final FavoriteCarRepository favoriteCarRepository;
    private final FavoriteCarMapper favoriteCarMapper;
    private final CarModelRepository carModelRepository;
    private final UserRepository userRepository;
    private final CarImageRepository carImageRepository;

    public FavoriteCarService(FavoriteCarRepository favoriteCarRepository,
                              FavoriteCarMapper favoriteCarMapper,
                              CarModelRepository carModelRepository,
                              UserRepository userRepository,
                              CarImageRepository carImageRepository) {

        this.favoriteCarRepository = favoriteCarRepository;
        this.favoriteCarMapper = favoriteCarMapper;
        this.carModelRepository = carModelRepository;
        this.userRepository = userRepository;
        this.carImageRepository = carImageRepository;
    }

    public List<FavoriteCarResponseDTO> findAll() {
        return favoriteCarMapper.toDtoList(favoriteCarRepository.findAll());
    }

    public List<FavoriteCarResponseDTO> findAllByUserId(Long userId) {
        if (!userRepository.existsById(userId))
            throw new EntityNotFoundException("User not found with ID: " + userId);

        return favoriteCarMapper.toDtoList(favoriteCarRepository.findAllByUser_Id(userId));
    }

    public FavoriteCarResponseDTO findById(Long id) {
        FavoriteCar favCar = favoriteCarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID: " + id));

        return favoriteCarMapper.toDto(favCar);
    }

    public FavoriteCarResponseDTO create(FavoriteCarCreateDTO favCarCreateDTO) {
        CarModel model = carModelRepository.findById(favCarCreateDTO.carModelId())
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID: " + favCarCreateDTO.carModelId()));

        if (!userRepository.existsById(favCarCreateDTO.userId()))
            throw new EntityNotFoundException("User not found with ID: " + favCarCreateDTO.userId());

        FavoriteCar favCar = favoriteCarMapper.fromCreateDto(favCarCreateDTO);

        User user = new User();
        user.setId(favCarCreateDTO.userId());

        favCar.setCarModel(model);
        favCar.setUser(user);

        return favoriteCarMapper.toDto(favoriteCarRepository.save(favCar));
    }

    public FavoriteCarResponseDTO updateById(Long id, FavoriteCarUpdateDTO favCarUpdateDTO) {
        FavoriteCar favCar = favoriteCarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID:" + id));

        favCar.setYear(favCarUpdateDTO.year());
        favCar.setColor(favCarUpdateDTO.color());
        favCar.setFuel(favCarUpdateDTO.fuel());

        return favoriteCarMapper.toDto(favoriteCarRepository.save(favCar));
    }

    @Transactional
    public void deleteById(Long id) {
        carImageRepository.deleteAllByFavoriteCar_Id(id);
        favoriteCarRepository.deleteById(id);
    }
}
