package hu.spring.akos0012.server.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "favorite_cars")
public class FavoriteCar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_model_id", nullable = false)
    private CarModel carModel;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int year;

    private String color;

    private String fuel;

    public FavoriteCar() {
    }

    public FavoriteCar(CarModel carModel, User user, int year, String color, String fuel) {
        this.carModel = carModel;
        this.user = user;
        this.year = year;
        this.color = color;
        this.fuel = fuel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CarModel getCarModel() {
        return carModel;
    }

    public void setCarModel(CarModel carModel) {
        this.carModel = carModel;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getFuel() {
        return fuel;
    }

    public void setFuel(String fuel) {
        this.fuel = fuel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FavoriteCar that)) return false;
        return year == that.year && Objects.equals(carModel, that.carModel) && Objects.equals(user, that.user) && Objects.equals(color, that.color) && Objects.equals(fuel, that.fuel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(carModel, user, year, color, fuel);
    }
}
