import axios from "axios";

import type {
  CreateFavouriteRequest,
  FavouritePlace,
} from "./favouriteTypes";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8080/api";

const favouriteApiClient = axios.create({
  baseURL: `${apiBaseUrl}/favourites`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const favouriteApi = {
  async getAll(): Promise<FavouritePlace[]> {
    const response =
      await favouriteApiClient.get<FavouritePlace[]>("");

    return response.data;
  },

  async create(
    request: CreateFavouriteRequest,
  ): Promise<FavouritePlace> {
    const response =
      await favouriteApiClient.post<FavouritePlace>(
        "",
        request,
      );

    return response.data;
  },

  async removeByPlaceId(
    placeId: string,
  ): Promise<void> {
    await favouriteApiClient.delete(
      `/place/${encodeURIComponent(placeId)}`,
    );
  },
};