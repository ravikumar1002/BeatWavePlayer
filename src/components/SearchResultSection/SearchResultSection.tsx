import { Box, Button, Typography } from "@mui/material";
import { SearchResultCard } from "./SearchResultCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSearchParams } from "react-router-dom";

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
  isSong?: boolean;
}

export const SearchResultSection = (props: ISearchResultSetion) => {
  const { searchCategoryTitle, songDeatils, isSong } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSelected = searchParams.get("filterType");
  console.log(searchCategoryTitle);

  if (
    searchCategoryTitle &&
    searchCategoryTitle !== filterSelected &&
    filterSelected !== "All" &&
    filterSelected === undefined
  )
    return null;
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
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
          onClick={() => {
            setSearchParams({ filterType: searchCategoryTitle });
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};
