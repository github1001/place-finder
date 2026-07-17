import HistoryIcon from "@mui/icons-material/History";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useAppDispatch } from "../../../app/hooks";
import { selectPlaceFromHistory } from "../placesSlice";
import type { PlaceResult } from "../placeTypes";

interface SearchHistoryItemProps {
  place: PlaceResult;
}

function SearchHistoryItem({
  place,
}: SearchHistoryItemProps) {
  const dispatch = useAppDispatch();

  const handleSelect = () => {
    dispatch(selectPlaceFromHistory(place));
  };

  return (
    <ListItemButton onClick={handleSelect}>
      <ListItemIcon sx={{ minWidth: 38 }}>
        <HistoryIcon fontSize="small" />
      </ListItemIcon>

      <ListItemText
        primary={place.name}
        secondary={place.address}
        slotProps={{
          primary: {
            noWrap: true,
          },
          secondary: {
            noWrap: true,
          },
        }}
      />
    </ListItemButton>
  );
}

export default SearchHistoryItem;