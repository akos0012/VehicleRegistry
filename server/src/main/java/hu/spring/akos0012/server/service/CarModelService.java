package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.carmodel.CarModelCreateDTO;
import hu.spring.akos0012.server.dto.carmodel.CarModelResponseDTO;
import hu.spring.akos0012.server.mapper.CarModelMapper;
import hu.spring.akos0012.server.model.CarBrand;
import hu.spring.akos0012.server.model.CarModel;
import hu.spring.akos0012.server.repository.CarBrandRepository;
import hu.spring.akos0012.server.repository.CarModelRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarModelService {

    private final CarBrandRepository carBrandRepository;
    private final CarModelRepository carModelRepository;
    private final CarModelMapper carModelMapper;

    public CarModelService(CarModelRepository carModelRepository, CarModelMapper carModelMapper, CarBrandRepository carBrandRepository) {
        this.carModelRepository = carModelRepository;
        this.carModelMapper = carModelMapper;
        this.carBrandRepository = carBrandRepository;
    }

    public List<CarModelResponseDTO> findAll() {
        return carModelMapper.toDtoList(carModelRepository.findAll());
    }

    public CarModelResponseDTO create(CarModelCreateDTO modelCreateDTO) {
        CarBrand brand = carBrandRepository.findById(modelCreateDTO.brandId())
                .orElseThrow(() -> new EntityNotFoundException("Allergen not found with ID: " + modelCreateDTO.brandId()));

        CarModel newModel = carModelMapper.fromCreateDto(modelCreateDTO);

        newModel.setBrand(brand);

        return carModelMapper.toDto(carModelRepository.save(newModel));
    }
}
