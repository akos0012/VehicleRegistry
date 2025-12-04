package hu.spring.akos0012.server.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "car_models")
public class CarModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_brand_id", nullable = false)
    private CarBrand brand;

    @Column(nullable = false)
    private String name;

    public CarModel() {
    }

    public CarModel(CarBrand brand, String name) {
        this.brand = brand;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CarBrand getBrand() {
        return brand;
    }

    public void setBrand(CarBrand brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CarModel carModel)) return false;
        return Objects.equals(brand, carModel.brand) && Objects.equals(name, carModel.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(brand, name);
    }
}
