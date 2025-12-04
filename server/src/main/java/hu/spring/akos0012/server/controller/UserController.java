package hu.spring.akos0012.server.controller;

import hu.spring.akos0012.server.dto.user.UserCreateDTO;
import hu.spring.akos0012.server.dto.user.UserResponseDTO;
import hu.spring.akos0012.server.dto.user.UserUpdateDTO;
import hu.spring.akos0012.server.mapper.UserMapper;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    private ResponseEntity<List<UserResponseDTO>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    private ResponseEntity<UserResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    private ResponseEntity<UserResponseDTO> create(@RequestBody @Valid UserCreateDTO userCreateDTO) {
        UserResponseDTO newUser = userService.create(userCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PutMapping("/{id}")
    private ResponseEntity<UserResponseDTO> updateById(@PathVariable Long id, @RequestBody @Valid UserUpdateDTO userUpdateDTO) {
        UserResponseDTO updatedUser = userService.updateById(id, userUpdateDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Void> deleteById(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
