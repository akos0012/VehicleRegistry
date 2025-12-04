package hu.spring.akos0012.server.repository;

import hu.spring.akos0012.server.model.CarImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarImageRepository extends JpaRepository<CarImage, Long> {

    List<CarImage> findByFavoriteCar_Id(Long favCarId);

    void deleteAllByFavoriteCar_Id(Long favCarId);

    void deleteAllByFavoriteCar_IdIn(List<Long> favoriteCarIds);
}
