import type { RootState } from "../../app/store";

export const selectSelectedPlace = (
  state: RootState,
) => state.places.selectedPlace;

export const selectSearchHistory = (
  state: RootState,
) => state.places.searchHistory;

export const selectMapCenter = (
  state: RootState,
) => state.places.mapCenter;

export const selectMapZoom = (
  state: RootState,
) => state.places.mapZoom;

export const selectSearchCount = (
  state: RootState,
) => state.places.searchHistory.length;