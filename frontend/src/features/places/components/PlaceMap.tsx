import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

import { useAppSelector } from "../../../app/hooks";

import {
  selectMapCenter,
  selectMapZoom,
  selectSelectedPlace,
} from "../placeSelectors";

const DEFAULT_CENTER = {
  lat: 3.139,
  lng: 101.6869,
};

function PlaceMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

const selectedPlace = useAppSelector(
  selectSelectedPlace,
);

const mapCenter = useAppSelector(
  selectMapCenter,
);

const mapZoom = useAppSelector(
  selectMapZoom,
);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return;
    }

    mapRef.current = new google.maps.Map(mapContainerRef.current, {
    center: DEFAULT_CENTER,
    zoom: 11,
    mapId: "DEMO_MAP_ID",
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const position = {
      lat: mapCenter.latitude,
      lng: mapCenter.longitude,
    };

    map.panTo(position);
    map.setZoom(mapZoom);

    if (!selectedPlace) {
      return;
    }

    if (!markerRef.current) {
      markerRef.current =
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position,
          title: selectedPlace.name,
        });

      return;
    }

    markerRef.current.position = position;
    markerRef.current.title = selectedPlace.name;
  }, [mapCenter, mapZoom, selectedPlace]);

  return (
    <Box
      ref={mapContainerRef}
      sx={{
        width: "100%",
        height: {
          xs: 350,
          md: 550,
        },
        borderRadius: 2,
        overflow: "hidden",
      }}
    />
  );
}

export default PlaceMap;