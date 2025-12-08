package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.carimage.CarImageCreateDTO;
import hu.spring.akos0012.server.dto.carimage.CarImageResponseDTO;
import hu.spring.akos0012.server.model.CarImage;
import hu.spring.akos0012.server.service.CarImageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-image")
public class CarImageController {

    private final CarImageService carImageService;

    public CarImageController(CarImageService carImageService) {
        this.carImageService = carImageService;
    }

    @GetMapping
    public ResponseEntity<List<CarImageResponseDTO>> findAll() {
        return ResponseEntity.ok(carImageService.findAll());
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id) {
        CarImage image = carImageService.getById(id);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getContentType()))
                .body(image.getImageData());
    }

    @GetMapping("/favorite/{favCarId}")
    public ResponseEntity<List<CarImageResponseDTO>> findAllByFavCarId(@PathVariable Long favCarId) {
        return ResponseEntity.ok(carImageService.findAllByFavCarId(favCarId));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CarImageResponseDTO> createByFavCarId(@ModelAttribute @Valid CarImageCreateDTO imageCreateDTO) {
        CarImageResponseDTO newImage = carImageService.createByFavCarId(imageCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newImage);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        carImageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
