import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "../../../app/hooks";
import { selectPlace } from "../placesSlice";
import type { PlaceResult } from "../placeTypes";

interface UsePlaceAutocompleteResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  error: string | null;
  isProcessing: boolean;
}

export function usePlaceAutocomplete(): UsePlaceAutocompleteResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autocompleteRef =
    useRef<google.maps.places.PlaceAutocompleteElement | null>(null);

  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || autocompleteRef.current) {
      return;
    }

    const autocomplete =
      new google.maps.places.PlaceAutocompleteElement();

    autocomplete.placeholder =
      "Search for a place, address or landmark";

    /*
     * Restrict results to Malaysia.
     * Remove this line if worldwide searching is required.
     */
    autocomplete.includedRegionCodes = ["my"];

    autocomplete.style.width = "100%";

    container.appendChild(autocomplete);
    autocompleteRef.current = autocomplete;

    const handlePlaceSelect = async (event: Event) => {
      setError(null);
      setIsProcessing(true);

      try {
        const placeEvent =
          event as google.maps.places.PlacePredictionSelectEvent;

        const place = placeEvent.placePrediction.toPlace();

        await place.fetchFields({
          fields: [
            "id",
            "displayName",
            "formattedAddress",
            "location",
          ],
        });

        if (!place.location) {
          throw new Error(
            "The selected place does not contain location coordinates.",
          );
        }

        const placeResult: PlaceResult = {
          placeId: place.id ?? crypto.randomUUID(),
          name: place.displayName ?? "Unnamed place",
          address:
            place.formattedAddress ??
            "No formatted address available",
          latitude: place.location.lat(),
          longitude: place.location.lng(),
          searchedAt: new Date().toISOString(),
        };

        dispatch(selectPlace(placeResult));
      } catch (reason: unknown) {
        const message =
          reason instanceof Error
            ? reason.message
            : "The selected place could not be loaded.";

        setError(message);
      } finally {
        setIsProcessing(false);
      }
    };

    autocomplete.addEventListener(
      "gmp-select",
      handlePlaceSelect,
    );

    return () => {
      autocomplete.removeEventListener(
        "gmp-select",
        handlePlaceSelect,
      );

      autocomplete.remove();
      autocompleteRef.current = null;
    };
  }, [dispatch]);

  return {
    containerRef,
    error,
    isProcessing,
  };
}