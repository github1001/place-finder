package com.logan.placefinder.exception;

public class FavouritePlaceNotFoundException
        extends RuntimeException {

    public FavouritePlaceNotFoundException(Long id) {
        super("Favourite place with ID " + id + " was not found.");
    }

    public static FavouritePlaceNotFoundException forPlaceId(
            String placeId) {

        return new FavouritePlaceNotFoundException(
            "Favourite place with Google Place ID '" +
            placeId +
            "' was not found."
        );
    }

    private FavouritePlaceNotFoundException(String message) {
        super(message);
    }
}