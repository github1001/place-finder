import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FavoriteIcon from
  "@mui/icons-material/Favorite";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/hooks";
import {
  deleteFavourite,
  selectFavouriteDeleteStatus,
  selectFavouriteError,
  selectFavouriteFetchStatus,
  selectFavourites,
} from "../favouritesSlice";

function FavouriteList() {
  const dispatch = useAppDispatch();

  const favourites = useAppSelector(
    selectFavourites,
  );

  const fetchStatus = useAppSelector(
    selectFavouriteFetchStatus,
  );

  const deleteStatus = useAppSelector(
    selectFavouriteDeleteStatus,
  );

  const error = useAppSelector(
    selectFavouriteError,
  );

  const handleDelete = (placeId: string) => {
    void dispatch(deleteFavourite(placeId));
  };

  return (
    <Paper variant="outlined">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">
          Favourite places
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {favourites.length} saved{" "}
          {favourites.length === 1
            ? "place"
            : "places"}
        </Typography>
      </Box>

      <Divider />

      {fetchStatus === "loading" && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ m: 2 }}
        >
          {error}
        </Alert>
      )}

      {fetchStatus !== "loading" &&
        favourites.length === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography color="text.secondary">
              No favourite places have been saved.
            </Typography>
          </Box>
        )}

      {favourites.length > 0 && (
        <List disablePadding>
          {favourites.map((favourite) => (
            <ListItem
              key={favourite.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label={`Remove ${favourite.name}`}
                  disabled={
                    deleteStatus === "loading"
                  }
                  onClick={() =>
                    handleDelete(
                      favourite.placeId,
                    )
                  }
                >
                  <DeleteOutlineIcon />
                </IconButton>
              }
            >
              <ListItemIcon sx={{ minWidth: 38 }}>
                <FavoriteIcon color="error" />
              </ListItemIcon>

              <ListItemText
                primary={favourite.name}
                secondary={
                  favourite.address ??
                  "No address available"
                }
                slotProps={{
                  primary: {
                    noWrap: true,
                  },
                  secondary: {
                    noWrap: true,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}

export default FavouriteList;