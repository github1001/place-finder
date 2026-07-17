package com.logan.placefinder.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.logan.placefinder.entity.FavouritePlace;

public record FavouritePlaceResponse(
    Long id,
    String placeId,
    String name,
    String address,
    BigDecimal latitude,
    BigDecimal longitude,
    LocalDateTime createdAt
) {

    public static FavouritePlaceResponse fromEntity(
            FavouritePlace favouritePlace) {

        return new FavouritePlaceResponse(
            favouritePlace.getId(),
            favouritePlace.getPlaceId(),
            favouritePlace.getName(),
            favouritePlace.getAddress(),
            favouritePlace.getLatitude(),
            favouritePlace.getLongitude(),
            favouritePlace.getCreatedAt()
        );
    }
}