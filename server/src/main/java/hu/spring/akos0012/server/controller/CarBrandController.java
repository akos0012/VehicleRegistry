package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.carbrand.CarBrandCreateDTO;
import hu.spring.akos0012.server.dto.carbrand.CarBrandResponseDTO;
import hu.spring.akos0012.server.service.CarBrandService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-brand")
public class CarBrandController {
    private final CarBrandService carBrandService;

    public CarBrandController(CarBrandService carBrandService) {
        this.carBrandService = carBrandService;
    }

    @GetMapping
    public ResponseEntity<List<CarBrandResponseDTO>> findAll() {
        return ResponseEntity.ok(carBrandService.findAll());
    }

    @PostMapping
    public ResponseEntity<CarBrandResponseDTO> create(@RequestBody @Valid CarBrandCreateDTO carBrandDTO) {
        CarBrandResponseDTO newCarBrand = carBrandService.create(carBrandDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCarBrand);
    }
}
