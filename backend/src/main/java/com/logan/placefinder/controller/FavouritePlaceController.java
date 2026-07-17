package com.logan.placefinder.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.logan.placefinder.dto.CreateFavouriteRequest;
import com.logan.placefinder.dto.FavouritePlaceResponse;
import com.logan.placefinder.service.FavouritePlaceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/favourites")
public class FavouritePlaceController {

    private final FavouritePlaceService service;

    public FavouritePlaceController(
            FavouritePlaceService service) {

        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<FavouritePlaceResponse>>
            getAllFavourites() {

        return ResponseEntity.ok(
            service.getAllFavourites()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavouritePlaceResponse>
            getFavouriteById(@PathVariable Long id) {

        return ResponseEntity.ok(
            service.getFavouriteById(id)
        );
    }

    @GetMapping("/place/{placeId}")
    public ResponseEntity<FavouritePlaceResponse>
            getFavouriteByPlaceId(
                @PathVariable String placeId) {

        return ResponseEntity.ok(
            service.getFavouriteByPlaceId(placeId)
        );
    }

    @GetMapping("/place/{placeId}/status")
    public ResponseEntity<Map<String, Boolean>>
            getFavouriteStatus(
                @PathVariable String placeId) {

        return ResponseEntity.ok(
            Map.of(
                "favourite",
                service.isFavourite(placeId)
            )
        );
    }

    @PostMapping
    public ResponseEntity<FavouritePlaceResponse>
            createFavourite(
                @Valid
                @RequestBody
                CreateFavouriteRequest request) {

        FavouritePlaceResponse created =
            service.createFavourite(request);

        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(created.id())
            .toUri();

        return ResponseEntity
            .created(location)
            .body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavourite(
            @PathVariable Long id) {

        service.deleteFavourite(id);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/place/{placeId}")
    public ResponseEntity<Void> deleteFavouriteByPlaceId(
            @PathVariable String placeId) {

        service.deleteFavouriteByPlaceId(placeId);

        return ResponseEntity.noContent().build();
    }
}