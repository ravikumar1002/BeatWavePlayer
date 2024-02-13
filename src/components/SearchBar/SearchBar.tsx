import { useSearchBar } from "@components/SearchBar/useSearchBar";
import { Box, IconButton, InputBase, Paper, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { SearchSuggestion } from "@components/SearchSuggestion/SearchSuggestion";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useRef,
} from "react";
import {
  SearchResultAlbumItems,
  SearchResultArtistsItem,
  SearchResultPlaylistsItem,
  SearchResultTracksItem,
} from "@dto/searchResultDTO";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

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
};

export const SearchBar = () => {
  const navigate = useNavigate();
  const { searchString, setSearchString, isFocused, setIsFocused, suggestionSearchList } =
    useSearchBar();

  const dataAssemble = suggestionSearchList;
  const searchSuggestionRef = useRef<HTMLInputElement>(null);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
  };

  const inputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@ts-expect-error mujhe nhi pta
    if (e.key === "Enter" && e.target.value.length > 0) {
      navigate(`/search?q=${searchString}`);
      setIsFocused(false);
    }
  };

  const inputFocusHandler = () => {
    setIsFocused(true);
  };

  const closeButtonHandler = () => {
    setSearchString("");
    setIsFocused(false);
  };

  const getAlbumSearchCategoryData = (albumsList: SearchResultAlbumItems[]) => {
    const albumsFilter = albumsList.map((album) => ({
      image: album.images[2].url,
      id: album.id,
      title: album.name,
    }));

    return albumsFilter;
  };

  const getArtistsSearchCategoryData = (artistsList: SearchResultArtistsItem[]) => {
    const artistsFilter = artistsList.map((artist) => {
      return {
        image: artist.images.length > 0 ? artist.images[2].url : "",
        id: artist.id,
        title: artist.name,
      };
    });

    return artistsFilter;
  };

  const getPlaylistsSearchCategoryData = (playlistsList: SearchResultPlaylistsItem[]) => {
    const playlistsFilter = playlistsList.map((playlist) => ({
      image: playlist.images[0].url,
      id: playlist.id,
      title: playlist.name,
    }));

    return playlistsFilter;
  };

  const getTracksSearchCategoryData = (tracksList: SearchResultTracksItem[]) => {
    const tracksFilter = tracksList.map((track) => {
      return {
        image: track.album.images[2].url,
        id: track.id,
        title: track.name,
        url: track.preview_url,
        artists: track.artists.map((artist) => artist.name),
        //@ts-expect-error mujhe nhi pta
        release_year: getReleaseYearValue(track.album.release_date),
        album: track.album.name,
      };
    });
    return tracksFilter;
  };

  const handleClickOutside =
    (searchSuggestionRef: RefObject<HTMLElement>, setIsFocused: (isFocused: boolean) => void) =>
    (event: MouseEvent<Document>) => {
      if (
        searchSuggestionRef.current &&
        !searchSuggestionRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

  useEffect(() => {
    document.addEventListener(
      "click",
      () => handleClickOutside(searchSuggestionRef, setIsFocused),
      true,
    );
    return () => {
      document.removeEventListener(
        "click",
        () => handleClickOutside(searchSuggestionRef, setIsFocused),
        true,
      );
    };
  }, []);

  return (
    <Box>
      <Paper
        component="div"
        sx={{
          p: "2px 4px",
          width: {
            xs: 200,
            sm: 350,
            md: 400,
            lg: 450,
            xl: 600,
          },
        }}
        className="relative"
        ref={searchSuggestionRef}
      >
        <Box className="flex items-center justify-between">
          <InputBase
            sx={{ ml: 1, flexGrow: 2 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            onChange={inputChangeHandler}
            onKeyDown={inputKeyDownHandler}
            value={searchString}
            onFocus={inputFocusHandler}
          />
          {searchString.length > 0 && (
            <IconButton
              type="button"
              className="p-3"
              aria-label="clear"
              onClick={closeButtonHandler}
            >
              <CloseIcon />
            </IconButton>
          )}
          <IconButton
            type="button"
            className="p-3"
            aria-label="search"
            onClick={() => {
              if (searchString.length > 0) navigate(`/search?q=${searchString}`);
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
        <Box>
          {searchString.length > 0 && isFocused && dataAssemble && (
            <Box sx={styles.searchSuggestionWrapperStyle} id="scrollBarDesign">
              {dataAssemble.albums.items &&
                getAlbumSearchCategoryData(dataAssemble.albums.items).map((item) => {
                  return (
                    <SearchSuggestion
                      key={item.id}
                      suggestionData={item}
                      suggestionResultCategory="Albums"
                    />
                  );
                })}

              {dataAssemble.artists.items &&
                getArtistsSearchCategoryData(dataAssemble.artists.items).map((item) => {
                  return (
                    <SearchSuggestion
                      key={item.id}
                      suggestionData={item}
                      suggestionResultCategory="Artists"
                    />
                  );
                })}
              {dataAssemble.playlists.items &&
                getPlaylistsSearchCategoryData(dataAssemble.playlists.items).map((item) => {
                  return (
                    <SearchSuggestion
                      key={item.id}
                      suggestionData={item}
                      suggestionResultCategory="Playlists"
                    />
                  );
                })}
              {dataAssemble.tracks.items &&
                getTracksSearchCategoryData(dataAssemble.tracks.items).map((item) => {
                  return (
                    <SearchSuggestion
                      key={item.id}
                      suggestionData={item}
                      suggestionResultCategory="Tracks"
                    />
                  );
                })}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
