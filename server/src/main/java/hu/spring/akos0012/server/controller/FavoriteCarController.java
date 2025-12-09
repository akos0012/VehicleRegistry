package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.favoritecar.*;
import hu.spring.akos0012.server.service.FavoriteCarService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/fav-car")
public class FavoriteCarController {

    private final FavoriteCarService favoriteCarService;

    public FavoriteCarController(FavoriteCarService favoriteCarService) {
        this.favoriteCarService = favoriteCarService;
    }

    @GetMapping
    public ResponseEntity<List<FavoriteCarResponseDTO>> findAll() {
        return ResponseEntity.ok(favoriteCarService.findAll());
    }

    @GetMapping("/user-id/{userId}")
    public ResponseEntity<List<FavoriteCarResponseDTO>> findAllByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(favoriteCarService.findAllByUserId(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoriteCarResponseDTO> findById(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(favoriteCarService.findById(id, principal.getName()));
    }

    @GetMapping("/count/{id}")
    public ResponseEntity<Integer> countByUserId(@PathVariable Long id) {
        int count = favoriteCarService.countByUserId(id);
        return ResponseEntity.ok(count);
    }

    @PostMapping
    public ResponseEntity<FavoriteCarResponseDTO> create(@RequestBody @Valid FavoriteCarCreateDTO favCarCreateDTO) {
        FavoriteCarResponseDTO newFavCar = favoriteCarService.create(favCarCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFavCar);
    }

    @PostMapping("/createWithModel")
    public ResponseEntity<FavoriteCarResponseDTO> createWithModel(@RequestBody @Valid FavoriteCarCreateWithModelDTO favCarCreateDTO) {
        FavoriteCarResponseDTO newFavCar = favoriteCarService.createWithModel(favCarCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFavCar);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FavoriteCarResponseDTO> updateById(@PathVariable Long id, @RequestBody @Valid FavoriteCarUpdateDTO favCarUpdateDTO) {
        FavoriteCarResponseDTO updatedFavCar = favoriteCarService.updateById(id, favCarUpdateDTO);
        return ResponseEntity.ok(updatedFavCar);
    }

    @PutMapping("/updateWithModel/{id}")
    public ResponseEntity<FavoriteCarResponseDTO> updateByIdWithModel(@PathVariable Long id, @RequestBody @Valid FavoriteCarUpdateWithModelDTO favCarUpdateDTO) {
        FavoriteCarResponseDTO updatedFavCar = favoriteCarService.updateByIdWithModel(id, favCarUpdateDTO);
        return ResponseEntity.ok(updatedFavCar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        favoriteCarService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
