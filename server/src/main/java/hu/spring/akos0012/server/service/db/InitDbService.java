package hu.spring.akos0012.server.service.db;

import hu.spring.akos0012.server.model.CarBrand;
import hu.spring.akos0012.server.model.Role;
import hu.spring.akos0012.server.model.User;
import hu.spring.akos0012.server.repository.CarBrandRepository;
import hu.spring.akos0012.server.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class InitDbService {

    private final UserRepository userRepository;
    private final CarBrandRepository carBrandRepository;
    private final PasswordEncoder passwordEncoder;

    public InitDbService(UserRepository userRepository, CarBrandRepository carBrandRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.carBrandRepository = carBrandRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void insertTestData() {
        CarBrand toyota = new CarBrand("TOYOTA");
        CarBrand porsche = new CarBrand("PORSCHE");
        CarBrand audi = new CarBrand("AUDI");
        CarBrand ford = new CarBrand("FORD");

        carBrandRepository.save(toyota);
        carBrandRepository.save(porsche);
        carBrandRepository.save(audi);
        carBrandRepository.save(ford);

        String username = "ImTheBestBoss";
        String password = passwordEncoder.encode("1234");
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRole(Role.ADMIN);
        user.setFullName("Bossy McBossface");
        user.setActive(true);

        userRepository.deleteByUsername(username);
        userRepository.save(user);
    }
}
