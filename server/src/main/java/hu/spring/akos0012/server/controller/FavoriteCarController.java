package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarCreateDTO;
import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarResponseDTO;
import hu.spring.akos0012.server.dto.favoritecar.FavoriteCarUpdateDTO;
import hu.spring.akos0012.server.service.FavoriteCarService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fav-car")
public class FavoriteCarController {

    private final FavoriteCarService favoriteCarService;

    public FavoriteCarController(FavoriteCarService favoriteCarService) {
        this.favoriteCarService = favoriteCarService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<FavoriteCarResponseDTO>> findAll() {
        return ResponseEntity.ok(favoriteCarService.findAll());
    }

    @GetMapping("/user-id/{userId}")
    public ResponseEntity<List<FavoriteCarResponseDTO>> findAllByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteCarService.findAllByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoriteCarResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(favoriteCarService.findById(id));
    }

    @PostMapping
    public ResponseEntity<FavoriteCarResponseDTO> create(@RequestBody @Valid FavoriteCarCreateDTO favCarCreateDTO) {
        FavoriteCarResponseDTO newFavCar = favoriteCarService.create(favCarCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFavCar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FavoriteCarResponseDTO> updateById(@PathVariable Long id, @RequestBody @Valid FavoriteCarUpdateDTO favCarUpdateDTO) {
        FavoriteCarResponseDTO updatedFavCar = favoriteCarService.updateById(id, favCarUpdateDTO);
        return ResponseEntity.ok(updatedFavCar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        favoriteCarService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
