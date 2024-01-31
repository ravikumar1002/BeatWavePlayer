import { Box, Button, Typography } from "@mui/material";
import { SearchResultCard } from "./SearchResultCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export interface ISectionSongDetails {
  title: string;
  image: string;
  id: string;
  artists: string[];
  release_year: string;
  albumName: string;
}

interface ISearchResultSetion {
  searchCategoryTitle: string;
  songDeatils: ISectionSongDetails[];
  isSong: boolean;
}

export const SearchResultSection = (props: ISearchResultSetion) => {
  const { searchCategoryTitle, songDeatils, isSong } = props;
  //   const selectedCategory: string = "album";

  //   const mediaType: string = "track";

  //   if (selectedCategory && selectedCategory !== mediaType) return null;
  return (
    <Box>
      <Box>
        <Typography variant="h6">{searchCategoryTitle}</Typography>
      </Box>
      <Box>
        {songDeatils &&
          songDeatils.map((details) => {
            return (
              <Box key={details.id}>
                <SearchResultCard songDetails={details} isSong={isSong} />
              </Box>
            );
          })}
      </Box>
      <Box>
        <Button variant="outlined" endIcon={<KeyboardArrowDownIcon />}>
          View More
        </Button>
      </Box>
    </Box>
  );
};
