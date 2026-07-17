import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import {
  Box,
  Button,
  Divider,
  List,
  Paper,
  Typography,
} from "@mui/material";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/hooks";
import {
  selectSearchCount,
  selectSearchHistory,
} from "../placeSelectors";
import { clearSearchHistory } from "../placesSlice";
import SearchHistoryItem from "./SearchHistoryItem";

function SearchHistory() {
  const dispatch = useAppDispatch();

  const searchHistory = useAppSelector(
    selectSearchHistory,
  );

  const searchCount = useAppSelector(
    selectSearchCount,
  );

  const handleClear = () => {
    dispatch(clearSearchHistory());
  };

  return (
    <Paper variant="outlined">
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="h6">
            Search history
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {searchCount}{" "}
            {searchCount === 1 ? "search" : "searches"}
          </Typography>
        </Box>

        <Button
          size="small"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={handleClear}
          disabled={searchHistory.length === 0}
        >
          Clear
        </Button>
      </Box>

      <Divider />

      {searchHistory.length === 0 ? (
        <Box sx={{ p: 2 }}>
          <Typography color="text.secondary">
            Your searches will appear here.
          </Typography>
        </Box>
      ) : (
        <List disablePadding>
          {searchHistory.map((place) => (
            <SearchHistoryItem
              key={`${place.placeId}-${place.searchedAt}`}
              place={place}
            />
          ))}
        </List>
      )}
    </Paper>
  );
}

export default SearchHistory;