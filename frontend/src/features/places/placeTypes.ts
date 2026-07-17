export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  searchedAt: string;
}

export interface PlacesState {
  selectedPlace: PlaceResult | null;
  searchHistory: PlaceResult[];
  mapCenter: Coordinates;
  mapZoom: number;
}