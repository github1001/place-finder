import { configureStore } from "@reduxjs/toolkit";

import favouritesReducer from
  "../features/favourites/favouritesSlice";
import placesReducer from
  "../features/places/placesSlice";

export const store = configureStore({
  reducer: {
    places: placesReducer,
    favourites: favouritesReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;