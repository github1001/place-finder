package com.logan.placefinder.exception;

public class DuplicateFavouriteException
        extends RuntimeException {

    public DuplicateFavouriteException(String placeId) {
        super(
            "The place with Google Place ID '" +
            placeId +
            "' is already marked as a favourite."
        );
    }
}