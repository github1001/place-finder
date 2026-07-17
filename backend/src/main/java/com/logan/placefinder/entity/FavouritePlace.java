package com.logan.placefinder.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(
    name = "favourite_places",
    schema = "dbo"
)
public class FavouritePlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "place_id",
        nullable = false,
        unique = true,
        length = 255
    )
    private String placeId;

    @Column(
        name = "name",
        nullable = false,
        length = 255
    )
    private String name;

    @Column(
        name = "address",
        length = 1000
    )
    private String address;

    @Column(
        name = "latitude",
        nullable = false,
        precision = 10,
        scale = 7
    )
    private BigDecimal latitude;

    @Column(
        name = "longitude",
        nullable = false,
        precision = 10,
        scale = 7
    )
    private BigDecimal longitude;

    @Column(
        name = "created_at",
        nullable = false,
        insertable = false,
        updatable = false
    )
    private LocalDateTime createdAt;

    protected FavouritePlace() {
        // Required by JPA.
    }

    public FavouritePlace(
            String placeId,
            String name,
            String address,
            BigDecimal latitude,
            BigDecimal longitude) {

        this.placeId = placeId;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Long getId() {
        return id;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}