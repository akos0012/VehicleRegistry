package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.carimage.CarImageCreateDTO;
import hu.spring.akos0012.server.dto.carimage.CarImageResponseDTO;
import hu.spring.akos0012.server.service.CarImageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-image")
public class CarImageController {

    private final CarImageService carImageService;

    public CarImageController(CarImageService carImageService) {
        this.carImageService = carImageService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    private ResponseEntity<List<CarImageResponseDTO>> findAll() {
        return ResponseEntity.ok(carImageService.findAll());
    }

    @GetMapping("/favorite/{favCarId}")
    private ResponseEntity<List<CarImageResponseDTO>> findAllByFavCarId(@PathVariable Long favCarId) {
        return ResponseEntity.ok(carImageService.findAllByFavCarId(favCarId));
    }

    @PostMapping
    private ResponseEntity<CarImageResponseDTO> create(@RequestBody @Valid CarImageCreateDTO imageCreateDTO) {
        return null;
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteById(@PathVariable Long id) {
        carImageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
