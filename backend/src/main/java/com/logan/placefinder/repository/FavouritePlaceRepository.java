package com.logan.placefinder.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.logan.placefinder.entity.FavouritePlace;

public interface FavouritePlaceRepository
        extends JpaRepository<FavouritePlace, Long> {

    boolean existsByPlaceId(String placeId);

    Optional<FavouritePlace> findByPlaceId(String placeId);

    List<FavouritePlace> findAllByOrderByCreatedAtDesc();

    long deleteByPlaceId(String placeId);
}