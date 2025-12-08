package hu.spring.akos0012.server.repository;

import hu.spring.akos0012.server.model.CarModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarModelRepository extends JpaRepository<CarModel, Long> {

    List<CarModel> findAllByBrand_Id(Long brandId);

    CarModel findByName(String name);

    boolean existsByNameAndBrand_Id(String name, Long brand_id);

}
