import type { PlaceResult } from "../places/placeTypes";

export interface FavouritePlace {
  id: number;
  placeId: string;
  name: string;
  address: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
}

export interface CreateFavouriteRequest {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type FavouriteRequestSource = PlaceResult;

export type RequestStatus =
  | "idle"
  | "loading"
  | "succeeded"
  | "failed";

export interface FavouritesState {
  items: FavouritePlace[];
  fetchStatus: RequestStatus;
  saveStatus: RequestStatus;
  deleteStatus: RequestStatus;
  error: string | null;
}