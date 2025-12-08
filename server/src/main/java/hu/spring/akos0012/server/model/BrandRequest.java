package hu.spring.akos0012.server.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "brand_requests")
public class BrandRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brandName;

    private String message;

    private LocalDateTime requestedAt;

    @Enumerated(EnumType.STRING)
    private BrandRequestStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public BrandRequest() {
    }

    public BrandRequest(String brandName, String message, User user) {
        this.brandName = brandName;
        this.message = message;
        this.requestedAt = LocalDateTime.now();
        this.status = BrandRequestStatus.PENDING;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(LocalDateTime requestedAt) {
        this.requestedAt = requestedAt;
    }

    public BrandRequestStatus getStatus() {
        return status;
    }

    public void setStatus(BrandRequestStatus status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
