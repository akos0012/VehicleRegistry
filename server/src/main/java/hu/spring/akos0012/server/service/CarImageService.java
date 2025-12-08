package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.carimage.CarImageCreateDTO;
import hu.spring.akos0012.server.dto.carimage.CarImageResponseDTO;
import hu.spring.akos0012.server.mapper.CarImageMapper;
import hu.spring.akos0012.server.model.CarImage;
import hu.spring.akos0012.server.model.FavoriteCar;
import hu.spring.akos0012.server.repository.CarImageRepository;
import hu.spring.akos0012.server.repository.FavoriteCarRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarImageService {

    private final CarImageRepository carImageRepository;
    private final CarImageMapper carImageMapper;
    private final FavoriteCarRepository favoriteCarRepository;

    public CarImageService(CarImageRepository carImageRepository, CarImageMapper carImageMapper, FavoriteCarRepository favoriteCarRepository) {
        this.carImageRepository = carImageRepository;
        this.carImageMapper = carImageMapper;
        this.favoriteCarRepository = favoriteCarRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<CarImageResponseDTO> findAll() {
        return carImageMapper.toDtoList(carImageRepository.findAll());
    }

    @Transactional(readOnly = true)
    public CarImage getById(Long id) {
        return carImageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Image not found with id: " + id));
    }

    public List<CarImageResponseDTO> findAllByFavCarId(Long favCarId) {
        List<CarImage> images = carImageRepository.findByFavoriteCar_Id(favCarId);
        return carImageMapper.toDtoList(images);
    }

    public CarImageResponseDTO createByFavCarId(CarImageCreateDTO imageCreateDTO) {
        FavoriteCar favoriteCar = favoriteCarRepository.findById(imageCreateDTO.favoriteCarId())
                .orElseThrow(() -> new EntityNotFoundException("Favorite car not found with ID:" + imageCreateDTO.favoriteCarId()));

        MultipartFile file = imageCreateDTO.imageData();
        try {
            CarImage image = new CarImage();
            image.setFavoriteCar(favoriteCar);
            image.setContentType(file.getContentType());
            image.setImageData(file.getBytes());

            return carImageMapper.toDto(carImageRepository.save(image));
        } catch (IOException e) {
            throw new RuntimeException("Error storing image", e);
        }
    }

    public void deleteById(Long id) {
        carImageRepository.deleteById(id);
    }

    protected void deleteAllByFavoriteCar_Id(Long favCarId) {
        carImageRepository.deleteAllByFavoriteCar_Id(favCarId);
    }
}
