import { useSearchBar } from "@components/SearchBar/useSearchBar";
import { Box, SxProps, Typography } from "@mui/material";
import { useAppStore } from "@store/store";
import { useNavigate } from "react-router-dom";

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

export const SearchSuggestion = (props) => {
  const navigate = useNavigate();

  const { setPlayingSongId, setCurrentTrack, setPlaylistSongs } = useAppStore();
  const { setShowSearchSuggestion } = useSearchBar();

  const { dataAssemble } = props;

  const searchSuggestionHandler = (item) => {
    if (item?.preview_url) {
      const songDetails = [
        {
          title: item.name,
          url: item?.preview_url ? item?.preview_url : "",
          image: item.album.images[0].url,
          id: item.id,
          artists: item.artists,
          release_year: item.album.release_date,
          album: item.album.name,
        },
      ];
      setPlayingSongId(item.id);
      setPlaylistSongs(songDetails ? songDetails : null);
      setCurrentTrack(0);
    } else {
      navigate(`/playlist/${item.id}`);
      setShowSearchSuggestion(false);
    }
  };

  return (
    <Box sx={styles.searchSuggestionWrapperStyle} id="scrollBarDesign">
        
      {dataAssemble.map((item, i) => {
        return (
          <Box
            key={i}
            sx={{
              ...styles.searchSuggestionContentStyle,
              backgroundColor: item?.preview_url ? "lavender" : "initial",
            }}
            onClick={() => searchSuggestionHandler(item)}
          >
            <Box>
              <img
                src={item?.images ? item?.images[0]?.url : item?.album?.images[0]?.url}
                alt={item?.name}
                width={40}
                height={40}
                style={{ borderRadius: "5px" }}
              />
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "600" }}>
                {item?.name}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
