package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.carmodel.CarModelCreateDTO;
import hu.spring.akos0012.server.dto.carmodel.CarModelResponseDTO;
import hu.spring.akos0012.server.service.CarModelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-model")
public class CarModelController {
    private final CarModelService carModelService;

    public CarModelController(CarModelService carModelService) {
        this.carModelService = carModelService;
    }

    @GetMapping
    public ResponseEntity<List<CarModelResponseDTO>> findAll() {
        return ResponseEntity.ok(carModelService.findAll());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<CarModelResponseDTO> findByName(@PathVariable String name) {
        return ResponseEntity.ok(carModelService.findByName(name));
    }

    @GetMapping("/brand-id/{brandId}")
    public ResponseEntity<List<CarModelResponseDTO>> findAllByBrandId(@PathVariable Long brandId) {
        return ResponseEntity.ok(carModelService.findAllByBrandId(brandId));
    }

    @PostMapping
    public ResponseEntity<CarModelResponseDTO> create(@RequestBody @Valid CarModelCreateDTO carModelDTO) {
        CarModelResponseDTO newCarModel = carModelService.create(carModelDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCarModel);
    }
}
