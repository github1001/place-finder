import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

import PlaceFinderPage from "./pages/PlaceFinderPage";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="static">
        <Toolbar>
          <PlaceIcon sx={{ mr: 1 }} />

          <Typography variant="h6" component="h1">
            Place Finder
          </Typography>
        </Toolbar>
      </AppBar>

      <PlaceFinderPage />
    </Box>
  );
}

export default App;