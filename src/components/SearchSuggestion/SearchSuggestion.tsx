import { useSearchBar } from "@components/SearchBar/useSearchBar";
import { Box, SxProps, Typography } from "@mui/material";
import { useAppStore } from "@store/store";
// import { useNavigate } from "react-router-dom";

const styles: Record<string, SxProps> = {
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

interface ISearchSuggestionDataProps {
  title: string;
  url?: string | null;
  image: string;
  id: string;
  artists?: string[] | (string | undefined)[];
  release_year?: string;
  album?: string;
}

export const SearchSuggestion = (props: {
  suggestionData: ISearchSuggestionDataProps;
  suggestionResultCategory: string;
}) => {
  // const navigate = useNavigate();

  const { setPlayingSongId, setCurrentTrack, setPlaylistSongs } = useAppStore();
  const { setShowSearchSuggestion } = useSearchBar();

  const { suggestionData, suggestionResultCategory } = props;

  const { title, image } = suggestionData;

  const searchSuggestionClickHandler = (
    item: ISearchSuggestionDataProps,
    suggestionResultCategory: string,
  ) => {
    if (suggestionResultCategory === "Tracks") {
      console.log(item, 'm---------------------------------------------------------------------------------------');
      setPlayingSongId(item.id);
      //@ts-expect-error mujhe nhi pta
      setPlaylistSongs([item]);
      setCurrentTrack(0);
      setShowSearchSuggestion(false);
    } else {
      console.log(item);
      // navigate(`/playlist/${item.id}`);
      setShowSearchSuggestion(false);
    }
  };

  return (
    <Box
      sx={{
        ...styles.searchSuggestionContentStyle,
        backgroundColor: suggestionResultCategory === "Tracks" ? "lavender" : "initial",
      }}
      onClick={() => searchSuggestionClickHandler(suggestionData, suggestionResultCategory)}
    >
      <Box>
        <img src={image} alt={title} width={40} height={40} style={{ borderRadius: "5px" }} />
      </Box>
      <Box>
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
