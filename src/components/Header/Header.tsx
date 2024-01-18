import { useNavigate } from "react-router";
import {
  useScrollTrigger,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import { cloneElement, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from "@hooks/useDebounce";
import { spotifySearchApi } from "@hooks/useSpotifySearchApi";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const Header = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState(" ")

  const suggestionSearchhandler = useDebounce(() => spotifySearchApi(searchString));
  suggestionSearchhandler()

  return (
    <ElevationScroll>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background: "white",
          color: "purple",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters className="p-6" sx={{
            width: "100%",
          }}>
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
                onClick={() => {
                  navigate("/");
                }}
                data-testid="pageTitle"
              >
                Yfitops
              </Typography>
            </Box>
            <Box>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => {
                    setSearchString(e.target.value)
                  }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};
