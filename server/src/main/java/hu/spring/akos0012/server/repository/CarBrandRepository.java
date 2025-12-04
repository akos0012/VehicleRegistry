package hu.spring.akos0012.server.repository;

import hu.spring.akos0012.server.model.CarBrand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarBrandRepository extends JpaRepository<CarBrand, Long> {
    boolean existsByName(String name);
}
