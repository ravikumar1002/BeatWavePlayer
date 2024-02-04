import { useSearchBar } from "@components/SearchBar/useSearchBar";
import { Box, IconButton, InputBase, Paper, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { SearchSuggestion } from "@components/SearchSuggestion/SearchSuggestion";
import { data } from "@components/Header/data";
import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
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
  const {
    searchSuggestionRef,
    showSuggestionFn,
    searchString,
    setSearchString,
    setShowSearchSuggestion,
    showSearchSuggestion,
  } = useSearchBar();

  const dataAssemble = data;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    showSuggestionFn(e.target.value.trim().length);
    setSearchString(e.target.value);
  };

  const inputKeyDownHandler = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@ts-expect-error mujhe nhi pta
    if (e.key === "Enter" && e.target.value.length > 0) {
      navigate(`/search?q=${searchString}`);
      setShowSearchSuggestion(false);
    }
  };

  const inputFocusHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    showSuggestionFn(e.target.value.trim().length);
  };

  const closeButtonHandler = () => {
    setSearchString("");
    showSuggestionFn(0);
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
      image: playlist.images[2].url,
      id: playlist.id,
      title: playlist.name,
    }));

    return playlistsFilter;
  };

  const getTracksSearchCategoryData = (tracksList: SearchResultTracksItem[]) => {
    console.log(tracksList);
    const tracksFilter = tracksList.map((track) => {
      // console.log(track);
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

  return (
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
          onChange={inputChangeHandler}
          onKeyDown={inputKeyDownHandler}
          value={searchString}
          onFocus={inputFocusHandler}
        />
        {searchString.length > 0 && (
          <IconButton type="button" className="p-3" aria-label="clear" onClick={closeButtonHandler}>
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
        {showSearchSuggestion && (
          <Box sx={styles.searchSuggestionWrapperStyle} id="scrollBarDesign">
            {dataAssemble.albums.items &&
              // @ts-expect-error mujhe nhi pta
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
              //@ts-expect-error mujhe nhi pta
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
              //@ts-expect-error mujhe nhi pta
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
              //@ts-expect-error mujhe nhi pta
              getTracksSearchCategoryData(dataAssemble.tracks.items).map((item) => {
                console.log(item, "nnnn");
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
      </Paper>
    </Box>
  );
};
