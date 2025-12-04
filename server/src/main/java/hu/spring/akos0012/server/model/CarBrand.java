package hu.spring.akos0012.server.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "car_brands")
public class CarBrand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    public CarBrand() {
    }

    public CarBrand(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
        if (!(o instanceof CarBrand carBrand)) return false;
        return Objects.equals(name, carBrand.name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }
}
