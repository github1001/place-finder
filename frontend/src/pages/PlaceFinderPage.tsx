import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import {
  useAppDispatch,
} from "../app/hooks";
import FavouriteList from
  "../features/favourites/components/FavouriteList";

import {
  fetchFavourites,
} from "../features/favourites/favouritesSlice";

import PlaceAutocomplete from "../features/places/components/PlaceAutocomplete";
import PlaceDetails from "../features/places/components/PlaceDetails";
import PlaceMap from "../features/places/components/PlaceMap";
import SearchHistory from "../features/places/components/SearchHistory";
import { useGoogleMaps } from "../features/places/hooks/useGoogleMaps";

function PlaceFinderPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchFavourites());
  }, [dispatch]);
  const { isLoaded, error } = useGoogleMaps();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
      >
        Find a place
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Search for a location and view it on the map.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!isLoaded && !error && (
        <Paper sx={{ p: 6, textAlign: "center" }}>
          <CircularProgress />

          <Typography sx={{ mt: 2 }}>
            Loading Google Maps…
          </Typography>
        </Paper>
      )}

      {isLoaded && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Place search
                </Typography>

                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ mb: 2 }}
                >
                  Enter a place name, address or landmark.
                </Typography>

                <PlaceAutocomplete />
              </Paper>

              <PlaceDetails />

              <SearchHistory />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 8 }}>
                <Paper sx={{ p: 1.5 }}>
                  <PlaceMap />
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, lg: 4 }}>
                <FavouriteList />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default PlaceFinderPage;