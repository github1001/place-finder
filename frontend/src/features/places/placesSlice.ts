import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlaceResult, PlacesState } from "./placeTypes";

const initialState: PlacesState = {
  selectedPlace: null,
  searchHistory: [],
  mapCenter: {
    latitude: 3.139,
    longitude: 101.6869,
  },
  mapZoom: 11,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    selectPlace: (state, action: PayloadAction<PlaceResult>) => {
      const place = action.payload;

      state.selectedPlace = place;
      state.mapCenter = {
        latitude: place.latitude,
        longitude: place.longitude,
      };
      state.mapZoom = 16;

      state.searchHistory.unshift(place);
    },

    selectPlaceFromHistory: (
      state,
      action: PayloadAction<PlaceResult>,
    ) => {
      const place = action.payload;

      state.selectedPlace = place;
      state.mapCenter = {
        latitude: place.latitude,
        longitude: place.longitude,
      };
      state.mapZoom = 16;
    },

    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },

    clearSelectedPlace: (state) => {
      state.selectedPlace = null;
    },
  },
});

export const {
  selectPlace,
  selectPlaceFromHistory,
  clearSearchHistory,
  clearSelectedPlace,
} = placesSlice.actions;

export default placesSlice.reducer;