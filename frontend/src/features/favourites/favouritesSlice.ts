import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { favouriteApi } from "./favouriteApi";
import type {
  CreateFavouriteRequest,
  FavouritePlace,
  FavouritesState,
} from "./favouriteTypes";

function getErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
    if (axios.isAxiosError(error)) {

        /*
        * Request never reached Spring Boot.
        */
        if (!error.response) {

        if (
            error.code === "ECONNABORTED"
        ) {
            return "Backend API timed out. Please ensure the Spring Boot server is running.";
        }

        return "Backend API is not running. Start the Spring Boot server on http://localhost:8080.";
        }

        switch (error.response.status) {

        case 400:
            return error.response.data?.message ??
            "Invalid request.";

        case 404:
            return "Backend endpoint was not found.";

        case 409:
            return error.response.data?.message ??
            "This place has already been saved.";

        case 500:
            return error.response.data?.message ??
            "Backend server encountered an unexpected error.";

        default:
            return error.response.data?.message ??
            fallbackMessage;
        }
    }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}

export const fetchFavourites = createAsyncThunk<
  FavouritePlace[],
  void,
  { rejectValue: string }
>(
  "favourites/fetchAll",
  async (_, thunkApi) => {
    try {
      return await favouriteApi.getAll();
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(
        getErrorMessage(
          error,
          "Favourite places could not be loaded.",
        ),
      );
    }
  },
);

export const saveFavourite = createAsyncThunk<
  FavouritePlace,
  CreateFavouriteRequest,
  { rejectValue: string }
>(
  "favourites/save",
  async (request, thunkApi) => {
    try {
      return await favouriteApi.create(request);
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(
        getErrorMessage(
          error,
          "The place could not be saved as a favourite.",
        ),
      );
    }
  },
);

export const deleteFavourite = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "favourites/delete",
  async (placeId, thunkApi) => {
    try {
      await favouriteApi.removeByPlaceId(placeId);
      return placeId;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(
        getErrorMessage(
          error,
          "The favourite place could not be removed.",
        ),
      );
    }
  },
);

const initialState: FavouritesState = {
  items: [],
  fetchStatus: "idle",
  saveStatus: "idle",
  deleteStatus: "idle",
  error: null,
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    clearFavouriteError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(
        fetchFavourites.fulfilled,
        (state, action) => {
          state.fetchStatus = "succeeded";
          state.items = action.payload;
        },
      )
      .addCase(
        fetchFavourites.rejected,
        (state, action) => {
          state.fetchStatus = "failed";
          state.error =
            action.payload ??
            "Favourite places could not be loaded.";
        },
      )

      .addCase(saveFavourite.pending, (state) => {
        state.saveStatus = "loading";
        state.error = null;
      })
      .addCase(
        saveFavourite.fulfilled,
        (state, action) => {
          state.saveStatus = "succeeded";

          const alreadyExists = state.items.some(
            (item) =>
              item.placeId === action.payload.placeId,
          );

          if (!alreadyExists) {
            state.items.unshift(action.payload);
          }
        },
      )
      .addCase(
        saveFavourite.rejected,
        (state, action) => {
          state.saveStatus = "failed";
          state.error =
            action.payload ??
            "The place could not be saved.";
        },
      )

      .addCase(deleteFavourite.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(
        deleteFavourite.fulfilled,
        (state, action) => {
          state.deleteStatus = "succeeded";
          state.items = state.items.filter(
            (item) => item.placeId !== action.payload,
          );
        },
      )
      .addCase(
        deleteFavourite.rejected,
        (state, action) => {
          state.deleteStatus = "failed";
          state.error =
            action.payload ??
            "The favourite could not be removed.";
        },
      );
  },
});

export const { clearFavouriteError } =
  favouritesSlice.actions;

export const selectFavourites = (
  state: RootState,
) => state.favourites.items;

export const selectFavouriteError = (
  state: RootState,
) => state.favourites.error;

export const selectFavouriteFetchStatus = (
  state: RootState,
) => state.favourites.fetchStatus;

export const selectFavouriteSaveStatus = (
  state: RootState,
) => state.favourites.saveStatus;

export const selectFavouriteDeleteStatus = (
  state: RootState,
) => state.favourites.deleteStatus;

export const selectIsPlaceFavourite =
  (placeId: string | undefined) =>
  (state: RootState): boolean => {
    if (!placeId) {
      return false;
    }

    return state.favourites.items.some(
      (item) => item.placeId === placeId,
    );
  };

export default favouritesSlice.reducer;