package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.carmodel.CarModelCreateDTO;
import hu.spring.akos0012.server.dto.carmodel.CarModelResponseDTO;
import hu.spring.akos0012.server.mapper.CarModelMapper;
import hu.spring.akos0012.server.model.CarBrand;
import hu.spring.akos0012.server.model.CarModel;
import hu.spring.akos0012.server.repository.CarModelRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarModelService {

    private final CarModelRepository carModelRepository;
    private final CarModelMapper carModelMapper;

    private final CarBrandService carBrandService;

    public CarModelService(CarModelRepository carModelRepository, CarModelMapper carModelMapper, CarBrandService carBrandService) {
        this.carModelRepository = carModelRepository;
        this.carModelMapper = carModelMapper;
        this.carBrandService = carBrandService;
    }

    public List<CarModelResponseDTO> findAll() {
        return carModelMapper.toDtoList(carModelRepository.findAll());
    }

    public List<CarModelResponseDTO> findAllByBrandId(Long brandId) {
        return carModelMapper.toDtoList(carModelRepository.findAllByBrand_Id(brandId));
    }

    public CarModelResponseDTO findByName(String name) {
        return carModelMapper.toDto(carModelRepository.findByName(name));
    }

    public CarModelResponseDTO create(CarModelCreateDTO modelCreateDTO) {
        CarBrand brand = carBrandService.findById(modelCreateDTO.brandId())
                .orElseThrow(() -> new EntityNotFoundException("Allergen not found with ID: " + modelCreateDTO.brandId()));

        CarModel newModel = carModelMapper.fromCreateDto(modelCreateDTO);

        newModel.setBrand(brand);

        return carModelMapper.toDto(carModelRepository.save(newModel));
    }

    protected Optional<CarModel> findById(long id) {
        return carModelRepository.findById(id);
    }

    protected boolean existsByNameAndBrandId(String name, Long brandId) {
        return carModelRepository.existsByNameAndBrand_Id(name, brandId);
    }

    protected CarModel save(CarModelCreateDTO modelCreateDTO) {
        CarBrand brand = carBrandService.findById(modelCreateDTO.brandId())
                .orElseThrow(() -> new EntityNotFoundException("Allergen not found with ID: " + modelCreateDTO.brandId()));

        CarModel newModel = carModelMapper.fromCreateDto(modelCreateDTO);

        newModel.setBrand(brand);

        return carModelRepository.save(newModel);
    }
}
