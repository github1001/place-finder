import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from
  "@mui/icons-material/FavoriteBorder";
import {
  Button,
  CircularProgress,
} from "@mui/material";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/hooks";
import {
  deleteFavourite,
  saveFavourite,
  selectFavouriteDeleteStatus,
  selectFavouriteSaveStatus,
  selectIsPlaceFavourite,
} from "../favouritesSlice";
import type { PlaceResult } from
  "../../places/placeTypes";

interface FavouriteButtonProps {
  place: PlaceResult;
}

function roundCoordinate(value: number): number {
  return Number(value.toFixed(7));
}

function FavouriteButton({
  place,
}: FavouriteButtonProps) {
  const dispatch = useAppDispatch();

  const isFavourite = useAppSelector(
    selectIsPlaceFavourite(place.placeId),
  );

  const saveStatus = useAppSelector(
    selectFavouriteSaveStatus,
  );

  const deleteStatus = useAppSelector(
    selectFavouriteDeleteStatus,
  );

  const isSaving = saveStatus === "loading";
  const isDeleting = deleteStatus === "loading";
  const isBusy = isSaving || isDeleting;

  const handleClick = async () => {
    if (isFavourite) {
      await dispatch(
        deleteFavourite(place.placeId),
      );

      return;
    }

    await dispatch(
    saveFavourite({
        placeId: place.placeId,
        name: place.name,
        address: place.address,
        latitude: roundCoordinate(place.latitude),
        longitude: roundCoordinate(place.longitude),
    }),
    );
  };

  return (
    <Button
      variant={isFavourite ? "contained" : "outlined"}
      color="error"
      fullWidth
      disabled={isBusy}
      onClick={handleClick}
      startIcon={
        isBusy ? (
          <CircularProgress
            size={18}
            color="inherit"
          />
        ) : isFavourite ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )
      }
    >
      {isDeleting
        ? "Removing…"
        : isSaving
          ? "Saving…"
          : isFavourite
            ? "Remove from favourites"
            : "Mark as favourite"}
    </Button>
  );
}

export default FavouriteButton;