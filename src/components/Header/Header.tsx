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
import { spotifySearchApi } from "@hooks/spotifySearchApi";
import { data } from "./data";

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
  const [searchString, setSearchString] = useState<string>("")
  const [showSearchSuggestion, setShowSearchSuggestion] = useState<boolean>(false)
  const suggestionSearchhandler = useDebounce(() => spotifySearchApi(searchString, 5));
  suggestionSearchhandler()

  const dataAssemble = [...data.albums.items, ...data.artists.items, ...data.playlists.items, ...data.tracks.items]

  const showSuggestionFn = (searchLength: number) => {
    if (searchLength > 0) {
      setShowSearchSuggestion(true);
    } else {
      setShowSearchSuggestion(false);
    }
  }


  console.log(dataAssemble)
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
          <Toolbar disableGutters className="p-3" sx={{
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
            <Box sx={{
              flexGrow: 1,
              flexShrink: 1,
              display: "flex",
              justifyContent: "center",
            }}>
              <Box
              >
                <Paper
                  component="div"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600, position: "relative" }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {
                      showSuggestionFn(e.target.value.length)
                      setSearchString(e.target.value)
                    }}
                    onFocus={(e) => {
                      showSuggestionFn(e.target.value.length)
                    }}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  {showSearchSuggestion && <Box sx={{
                    position: "absolute",
                    top: "3.5rem",
                    borderRadius: "5px",
                    left: 0,
                    zIndex: "20",
                    height: 400,
                    overflowY: "scroll",
                    background: "white",
                    width: "100%"
                  }} id="scrollBarDesign">
                    {
                      dataAssemble.map((item, i) => {
                        console.log(item)
                        return (
                          <Box key={i} sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            padding: "0.5rem",
                            cursor: "pointer",
                            "&:hover": {
                              background: "lavender"
                            }
                          }}>
                            <Box>
                              <img src={item?.images ? item?.images[0]?.url : item?.album?.images[0]?.url} alt={item?.name} width={40} height={40} style={{ borderRadius: "5px" }} />
                            </Box>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: "600" }}>{item?.name}</Typography>
                            </Box>
                          </Box>
                        )
                      })
                    }
                  </Box>}
                </Paper>
              </Box>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};
