package hu.spring.akos0012.server.service;

import hu.spring.akos0012.server.dto.register.RegisterDTO;
import hu.spring.akos0012.server.dto.user.UserCreateDTO;
import hu.spring.akos0012.server.dto.user.UserResponseDTO;
import hu.spring.akos0012.server.dto.user.UserUpdateDTO;
import hu.spring.akos0012.server.exception.AlreadyExistsException;
import hu.spring.akos0012.server.mapper.UserMapper;
import hu.spring.akos0012.server.model.Role;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.repository.CarImageRepository;
import hu.spring.akos0012.server.repository.FavoriteCarRepository;
import hu.spring.akos0012.server.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final FavoriteCarRepository favoriteCarRepository;
    private final CarImageRepository carImageRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       UserMapper userMapper,
                       FavoriteCarRepository favoriteCarRepository,
                       CarImageRepository carImageRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.favoriteCarRepository = favoriteCarRepository;
        this.carImageRepository = carImageRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponseDTO> findAll() {
        return userMapper.toDtoList(userRepository.findAll());
    }

    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));

        return userMapper.toDto(user);
    }

    public void register(RegisterDTO registerDTO) {
        if (userRepository.existsByUsername(registerDTO.username())) {
            throw new AlreadyExistsException("User already exists: " + registerDTO.username());
        }

        User user = userMapper.fromRegisterDto(registerDTO);
        user.setPassword(passwordEncoder.encode(registerDTO.password()));
        user.setRole(Role.USER);
        user.setActive(true);

        userRepository.save(user);
    }

    public UserResponseDTO create(UserCreateDTO userCreateDTO) {
        if (userRepository.existsByUsername(userCreateDTO.username())) {
            throw new AlreadyExistsException(userCreateDTO.username());
        }

        User user = userMapper.fromCreateDto(userCreateDTO);
        user.setPassword(passwordEncoder.encode(userCreateDTO.password()));

        return userMapper.toDto(userRepository.save(user));
    }

    public UserResponseDTO updateById(Long id, UserUpdateDTO userUpdateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));

        user.setUsername(userUpdateDTO.username());
        user.setRole(userUpdateDTO.role());
        user.setFullName(userUpdateDTO.fullName());
        user.setActive(userUpdateDTO.active());
        user.setFailedLoginAttempts(user.getFailedLoginAttempts());

        return userMapper.toDto(userRepository.save(user));
    }

    @Transactional
    public void deleteById(Long id) {

        if (!userRepository.existsById(id))
            throw new EntityNotFoundException("User not found with ID: " + id);

        List<Long> favCarIds = favoriteCarRepository.findIdsByUserId(id);

        if (!favCarIds.isEmpty())
            carImageRepository.deleteAllByFavoriteCar_IdIn(favCarIds);

        favoriteCarRepository.deleteAllByUser_Id(id);
        userRepository.deleteById(id);
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public void setUserActiveFalse(Long id, String username) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));

        if (!isAdmin(username) && !user.getUsername().equals(username)) {
            throw new AccessDeniedException("You are not allowed to access this resource");
        }

        user.setActive(false);
        userRepository.save(user);
    }

    protected User save(User user) {
        return userRepository.save(user);
    }

    protected Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    protected boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    protected boolean isAdmin(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return false;

        return user.getRole() == Role.ADMIN;
    }
}
