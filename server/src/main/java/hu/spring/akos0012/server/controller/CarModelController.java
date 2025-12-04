package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.carmodel.CarModelCreateDTO;
import hu.spring.akos0012.server.dto.carmodel.CarModelResponseDTO;
import hu.spring.akos0012.server.service.CarModelService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private ResponseEntity<List<CarModelResponseDTO>> findAll() {
        return ResponseEntity.ok(carModelService.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    private ResponseEntity<CarModelResponseDTO> create(@RequestBody @Valid CarModelCreateDTO carModelDTO) {
        CarModelResponseDTO newCarModel = carModelService.create(carModelDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCarModel);
    }
}
