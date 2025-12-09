package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.carmodel.CarModelCreateDTO;
import hu.spring.akos0012.server.dto.favoritecar.*;
import hu.spring.akos0012.server.exception.AlreadyExistsException;
import hu.spring.akos0012.server.mapper.FavoriteCarMapper;
import hu.spring.akos0012.server.model.CarModel;
import hu.spring.akos0012.server.model.FavoriteCar;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.repository.FavoriteCarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteCarService {

    private final FavoriteCarRepository favoriteCarRepository;
    private final FavoriteCarMapper favoriteCarMapper;

    private final CarModelService carModelService;
    private final UserService userService;
    private final CarImageService carImageService;

    public FavoriteCarService(FavoriteCarRepository favoriteCarRepository,
                              FavoriteCarMapper favoriteCarMapper,
                              CarModelService carModelService,
                              UserService userService,
                              CarImageService carImageService) {

        this.favoriteCarRepository = favoriteCarRepository;
        this.favoriteCarMapper = favoriteCarMapper;
        this.carModelService = carModelService;
        this.userService = userService;
        this.carImageService = carImageService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<FavoriteCarResponseDTO> findAll() {
        return favoriteCarMapper.toDtoList(favoriteCarRepository.findAll());
    }

    public List<FavoriteCarResponseDTO> findAllByUserId(Long userId) {
        if (!userService.existsById(userId))
            throw new EntityNotFoundException("User not found with ID: " + userId);

        return favoriteCarMapper.toDtoList(favoriteCarRepository.findAllByUser_Id(userId));
    }

    public FavoriteCarResponseDTO findById(Long id, String username) {
        FavoriteCar favCar = favoriteCarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID: " + id));

        boolean isAdmin = userService.isAdmin(username);

        if (!isAdmin && !favCar.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You are not allowed to access this resource");
        }

        return favoriteCarMapper.toDto(favCar);
    }

    public FavoriteCarResponseDTO create(FavoriteCarCreateDTO favCarCreateDTO) {
        if (!userService.existsById(favCarCreateDTO.userId()))
            throw new EntityNotFoundException("User not found with ID: " + favCarCreateDTO.userId());

        CarModel model = carModelService.findById(favCarCreateDTO.carModelId())
                .orElseThrow(() -> new EntityNotFoundException("Model not found with ID: " + favCarCreateDTO.carModelId()));

        FavoriteCar favCar = favoriteCarMapper.fromCreateDto(favCarCreateDTO);

        User user = new User();
        user.setId(favCarCreateDTO.userId());

        favCar.setCarModel(model);
        favCar.setUser(user);

        return favoriteCarMapper.toDto(favoriteCarRepository.save(favCar));
    }

    @Transactional
    public FavoriteCarResponseDTO createWithModel(FavoriteCarCreateWithModelDTO favCarCreateDTO) {
        if (!userService.existsById(favCarCreateDTO.userId()))
            throw new EntityNotFoundException("User not found with ID: " + favCarCreateDTO.userId());

        String carModelName = favCarCreateDTO.carModelName();
        if (carModelService.existsByNameAndBrandId(carModelName, favCarCreateDTO.brandId()))
            throw new AlreadyExistsException("Car model already exists: " + carModelName);

        CarModelCreateDTO modelCreateDTO = new CarModelCreateDTO(favCarCreateDTO.brandId(), carModelName);
        CarModel newModel = carModelService.save(modelCreateDTO);

        User user = new User();
        user.setId(favCarCreateDTO.userId());

        int year = favCarCreateDTO.year();
        String color = favCarCreateDTO.color();
        String fuel = favCarCreateDTO.fuel();

        FavoriteCar favCar = new FavoriteCar(newModel, user, year, color, fuel);

        return favoriteCarMapper.toDto(favoriteCarRepository.save(favCar));
    }

    public FavoriteCarResponseDTO updateById(Long id, FavoriteCarUpdateDTO favCarUpdateDTO) {
        FavoriteCar favCar = favoriteCarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID:" + id));

        CarModel model = carModelService.findById(favCarUpdateDTO.carModelId())
                .orElseThrow(() -> new EntityNotFoundException("Model not found with ID: " + favCarUpdateDTO.carModelId()));

        favCar.setCarModel(model);
        favCar.setYear(favCarUpdateDTO.year());
        favCar.setColor(favCarUpdateDTO.color());
        favCar.setFuel(favCarUpdateDTO.fuel());

        return favoriteCarMapper.toDto(favoriteCarRepository.save(favCar));
    }

    @Transactional
    public FavoriteCarResponseDTO updateByIdWithModel(Long id, FavoriteCarUpdateWithModelDTO favCarUpdateDTO) {
        FavoriteCar favCar = favoriteCarRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID:" + id));

        String carModelName = favCarUpdateDTO.carModelName();
        if (carModelService.existsByNameAndBrandId(carModelName, favCarUpdateDTO.brandId()))
            throw new AlreadyExistsException("Car model already exists: " + carModelName);

        CarModelCreateDTO modelCreateDTO = new CarModelCreateDTO(favCarUpdateDTO.brandId(), carModelName);
        CarModel newModel = carModelService.save(modelCreateDTO);

        favCar.setCarModel(newModel);
        favCar.setYear(favCarUpdateDTO.year());
        favCar.setColor(favCarUpdateDTO.color());
        favCar.setFuel(favCarUpdateDTO.fuel());

        return favoriteCarMapper.toDto(favoriteCarRepository.save(favCar));
    }

    @Transactional
    public void deleteById(Long id) {
        carImageService.deleteAllByFavoriteCar_Id(id);
        favoriteCarRepository.deleteById(id);
    }

    public int countByUserId(Long id) {
        return favoriteCarRepository.countByUser_Id(id);
    }
}
