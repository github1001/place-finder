package com.logan.placefinder.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateFavouriteRequest(

    @NotBlank(message = "Google Place ID is required")
    @Size(
        max = 255,
        message = "Google Place ID must not exceed 255 characters"
    )
    String placeId,

    @NotBlank(message = "Place name is required")
    @Size(
        max = 255,
        message = "Place name must not exceed 255 characters"
    )
    String name,

    @Size(
        max = 1000,
        message = "Address must not exceed 1000 characters"
    )
    String address,

    @NotNull(message = "Latitude is required")
    @DecimalMin(
        value = "-90.0",
        message = "Latitude must be at least -90"
    )
    @DecimalMax(
        value = "90.0",
        message = "Latitude must not exceed 90"
    )
    @Digits(
        integer = 3,
        fraction = 7,
        message = "Latitude may contain at most 7 decimal places"
    )
    BigDecimal latitude,

    @NotNull(message = "Longitude is required")
    @DecimalMin(
        value = "-180.0",
        message = "Longitude must be at least -180"
    )
    @DecimalMax(
        value = "180.0",
        message = "Longitude must not exceed 180"
    )
    @Digits(
        integer = 3,
        fraction = 7,
        message = "Longitude may contain at most 7 decimal places"
    )
    BigDecimal longitude

) {
}