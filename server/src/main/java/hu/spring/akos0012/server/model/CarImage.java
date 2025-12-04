package hu.spring.akos0012.server.model;

import jakarta.persistence.*;

@Entity
@Table(name = "car_images")
public class CarImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "favorite_car_id", nullable = false)
    private FavoriteCar favoriteCar;

    @Lob
    @Column(name = "image_data", nullable = false)
    private byte[] imageData;

    @Column(name = "content_type", nullable = false)
    private String contentType; //"image/png", "image/jpeg"

    public CarImage() {
    }

    public CarImage(FavoriteCar favoriteCar, byte[] imageData, String contentType) {
        this.favoriteCar = favoriteCar;
        this.imageData = imageData;
        this.contentType = contentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FavoriteCar getFavoriteCar() {
        return favoriteCar;
    }

    public void setFavoriteCar(FavoriteCar favoriteCar) {
        this.favoriteCar = favoriteCar;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}
