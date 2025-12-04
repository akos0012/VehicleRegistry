package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.carbrand.CarBrandCreateDTO;
import hu.spring.akos0012.server.dto.carbrand.CarBrandResponseDTO;
import hu.spring.akos0012.server.mapper.CarBrandMapper;
import hu.spring.akos0012.server.model.CarBrand;
import hu.spring.akos0012.server.repository.CarBrandRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarBrandService {

    private final CarBrandRepository carBrandRepository;
    private final CarBrandMapper carBrandMapper;

    public CarBrandService(CarBrandRepository carBrandRepository, CarBrandMapper carBrandMapper) {
        this.carBrandRepository = carBrandRepository;
        this.carBrandMapper = carBrandMapper;
    }

    public List<CarBrandResponseDTO> findAll() {
        return carBrandMapper.toDtoList(carBrandRepository.findAll());
    }

    public CarBrandResponseDTO create(CarBrandCreateDTO brandCreateDTO) {
        CarBrand newBrand = carBrandMapper.fromCreateDto(brandCreateDTO);
        return carBrandMapper.toDto(carBrandRepository.save(newBrand));
    }
}
