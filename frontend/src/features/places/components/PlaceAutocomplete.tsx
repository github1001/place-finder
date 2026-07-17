import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";

import { usePlaceAutocomplete } from "../hooks/usePlaceAutocomplete";

function PlaceAutocomplete() {
  const {
    containerRef,
    error,
    isProcessing,
  } = usePlaceAutocomplete();

  return (
    <Stack spacing={2}>
      <Box>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
        >
          Search location
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.paper",
            px: 1.5,
            py: 0.5,
          }}
        >
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>

          <Box
            ref={containerRef}
            sx={{
              flex: 1,

              "& gmp-place-autocomplete": {
                width: "100%",
                border: 0,
              },
            }}
          />
        </Box>
      </Box>

      {isProcessing && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CircularProgress size={18} />

          <Typography variant="body2">
            Loading place details…
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
    </Stack>
  );
}

export default PlaceAutocomplete;