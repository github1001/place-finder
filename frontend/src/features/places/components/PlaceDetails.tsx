import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../../../app/hooks";
import { selectSelectedPlace } from "../placeSelectors";
import FavouriteButton from
  "../../favourites/components/FavouriteButton";

function PlaceDetails() {
  const selectedPlace = useAppSelector(
    selectSelectedPlace,
  );

  if (!selectedPlace) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          bgcolor: "grey.50",
        }}
      >
        <Typography color="text.secondary">
          Select a place to view its details.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          <LocationOnIcon color="primary" />

          <Box>
            <Typography variant="h6">
              {selectedPlace.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {selectedPlace.address}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography variant="caption" color="text.secondary">
            Latitude
          </Typography>

          <Typography variant="body2">
            {selectedPlace.latitude.toFixed(6)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Longitude
          </Typography>

          <Typography variant="body2">
            {selectedPlace.longitude.toFixed(6)}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Google Place ID
          </Typography>

          <Typography
            variant="body2"
            sx={{
              wordBreak: "break-all",
            }}
          >
            {selectedPlace.placeId}
          </Typography>
        </Box>
        <Divider />

      <FavouriteButton place={selectedPlace} />
      </Stack>
    </Paper>
  );
}

export default PlaceDetails;