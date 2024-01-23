import { useNavigate } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  SxProps,
  Box,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "@hooks/useDebounce";
import { spotifySearchApi } from "@hooks/spotifySearchApi";
import { data } from "./data";
import CloseIcon from "@mui/icons-material/Close";
import { ElevationScroll } from "@hooks/useElevationSroll";
import { useAppStore } from "@store/store";

const styles: Record<string, SxProps> = {
  searchSuggestionWrapperStyle: {
    position: "absolute",
    top: "3.5rem",
    borderRadius: "5px",
    left: 0,
    zIndex: "20",
    height: 400,
    overflowY: "scroll",
    background: "white",
    width: "100%",
  },
  searchSuggestionContentStyle: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.5rem",
    cursor: "pointer",
    margin: "2px",
    "&:hover": {
      background: "lavender",
    },
  },
};

export const Header = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState<string>("");
  const [showSearchSuggestion, setShowSearchSuggestion] = useState<boolean>(false);
  const { setPlayingSongId, setCurrentTrack, setPlaylistSongs } = useAppStore();
  const searchSuggestionRef = useRef(null);

  const suggestionSearchhandler = useDebounce(() =>
    spotifySearchApi(searchString, 5)
  );
  suggestionSearchhandler();

  const dataAssemble = [
    ...data.albums.items,
    ...data.artists.items,
    ...data.playlists.items,
    ...data.tracks.items,
  ];

  const showSuggestionFn = (searchLength: number) => {
    if (searchLength > 0) {
      setShowSearchSuggestion(true);
    } else {
      setShowSearchSuggestion(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchSuggestionRef.current &&
      !searchSuggestionRef.current.contains(event.target)
    ) {
      setShowSearchSuggestion(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

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
          <Toolbar
            disableGutters
            className="p-3"
            sx={{
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#"
                sx={{
                  color: "inherit",
                  fontWeight: 700,
                }}
                className="mr-2 no-underline"
                onClick={() => {
                  navigate("/");
                }}
                data-testid="pageTitle"
              >
                Yfitops
              </Typography>
            </Box>
            <Box className="flex flex-shrink flex-grow justify-center">
              <Box ref={searchSuggestionRef}>
                <Paper
                  component="div"
                  sx={{ p: "2px 4px", width: 600 }}
                  className="flex items-center relative"
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => {
                      showSuggestionFn(e.target.value.trim().length);
                      setSearchString(e.target.value);
                    }}
                    value={searchString}
                    onFocus={(e) => {
                      showSuggestionFn(e.target.value.trim().length);
                    }}
                  />
                  {searchString.length > 0 && (
                    <IconButton
                      type="button"
                      className="p-3"
                      aria-label="clear"
                      onClick={() => {
                        setSearchString("");
                        showSuggestionFn(0);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                  <IconButton type="button" className="p-3" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  {showSearchSuggestion && (
                    <Box
                      sx={styles.searchSuggestionWrapperStyle}
                      id="scrollBarDesign"
                    >
                      {dataAssemble.map((item, i) => {
                        return (
                          <Box key={i} sx={{
                            ...styles.searchSuggestionContentStyle,
                            backgroundColor: item?.preview_url ? "lavender" : "initial",
                          }}
                            onClick={() => {
                              if (item?.preview_url) {
                                const songDetails = [{
                                  title: item.name,
                                  url: item?.preview_url ? item?.preview_url : "",
                                  image: item.album.images[0].url,
                                  id: item.id,
                                  artists: item.artists,
                                  release_year: item.album.release_date,
                                  album: item.album.name,
                                }]
                                setPlayingSongId(item.id)
                                setPlaylistSongs(songDetails ? songDetails : null)
                                setCurrentTrack(0)
                              }
                            }}
                          >
                            <Box>
                              <img
                                src={
                                  item?.images
                                    ? item?.images[0]?.url
                                    : item?.album?.images[0]?.url
                                }
                                alt={item?.name}
                                width={40}
                                height={40}
                                style={{ borderRadius: "5px" }}
                              />
                            </Box>
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: "600" }}
                              >
                                {item?.name}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar >
    </ElevationScroll >
  );
};
