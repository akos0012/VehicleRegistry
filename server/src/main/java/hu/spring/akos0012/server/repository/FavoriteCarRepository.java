package hu.spring.akos0012.server.repository;

import hu.spring.akos0012.server.model.FavoriteCar;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteCarRepository extends JpaRepository<FavoriteCar, Long> {

    @EntityGraph(attributePaths = {"carModel", "carModel.brand"})
    @NonNull
    List<FavoriteCar> findAll();

    @EntityGraph(attributePaths = {"carModel", "carModel.brand"})
    List<FavoriteCar> findAllByUser_Id(Long userId);

    @Query("SELECT f.id FROM FavoriteCar f WHERE f.user.id = :userId")
    List<Long> findIdsByUserId(Long userId);

    void deleteAllByUser_Id(Long userId);
}
