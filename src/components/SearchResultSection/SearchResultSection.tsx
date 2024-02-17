import { Box, Button, Typography } from "@mui/material";
import { SearchResultCard } from "./SearchResultCard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSearchParams } from "react-router-dom";
import { spotifySearchApi } from "@hooks/spotifySearchApi";
import { useQuery } from "@tanstack/react-query";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SearchResultDTO } from "@dto/searchResultDTO";

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
  cardType?: string;
}

export const SearchResultSection = (props: ISearchResultSetion) => {
  const { searchCategoryTitle, songDeatils, cardType } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSelected = searchParams.get("category");

  const searchQueryParam = searchParams.get("q");

  const spotifyCategorySearchApi = async (searchString: string, category: string) => {
    const trendingResponse = await GetSpotifyDataAsJSON<SearchResultDTO>(
      `/search?q=${searchString}&type=${category}&limit=50`,
    );
    return trendingResponse;
  };

  const searchListQuery = useQuery({
    queryKey: ["search-query"],
    queryFn: async () => {
      console.log(searchQueryParam, filterSelected, "dd");
      if (searchQueryParam && filterSelected) {
        const albumsData = await spotifyCategorySearchApi(searchQueryParam, filterSelected);
        return albumsData;
      }
    },
    refetchOnWindowFocus: false,
  });

  console.log(cardType);

  if (filterSelected && searchCategoryTitle !== filterSelected) return null;
  return (
    <Box>
      <Box className="flex justify-between px-3">
        <Box>
          <Typography variant="h6">
            {searchCategoryTitle
              .split("")
              .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
              .join("")}
          </Typography>
        </Box>
        {!filterSelected && (
          <Box>
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={() => {
                setSearchParams({ category: searchCategoryTitle });
              }}
            >
              View More
            </Button>
          </Box>
        )}
      </Box>
      <Box>
        {songDeatils &&
          songDeatils.map((details) => {
            return (
              <Box key={details.id}>
                <SearchResultCard songDetails={details} cardType={cardType} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
