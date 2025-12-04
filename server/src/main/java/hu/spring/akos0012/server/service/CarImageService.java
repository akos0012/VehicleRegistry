package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.carimage.CarImageCreateDTO;
import hu.spring.akos0012.server.dto.carimage.CarImageResponseDTO;
import hu.spring.akos0012.server.mapper.CarImageMapper;
import hu.spring.akos0012.server.repository.CarImageRepository;
import hu.spring.akos0012.server.repository.FavoriteCarRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CarImageService {

    private final CarImageRepository carImageRepository;
    private final CarImageMapper carImageMapper;
    private final FavoriteCarRepository favoriteCarRepository;

    public CarImageService(CarImageRepository carImageRepository,
                           CarImageMapper carImageMapper,
                           FavoriteCarRepository favoriteCarRepository) {
        this.carImageRepository = carImageRepository;
        this.carImageMapper = carImageMapper;
        this.favoriteCarRepository = favoriteCarRepository;
    }

    public List<CarImageResponseDTO> findAll() {
        return carImageMapper.toDtoList(carImageRepository.findAll());
    }

    public List<CarImageResponseDTO> findAllByFavCarId(Long favCarId) {
        return carImageMapper.toDtoList(carImageRepository.findByFavoriteCar_Id(favCarId));
    }

    public CarImageResponseDTO create(MultipartFile file) {
        return null;
    }

    public void deleteById(Long id) {
        carImageRepository.deleteById(id);
    }
}
