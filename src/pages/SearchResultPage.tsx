import { useSearchParams } from "react-router-dom";
import { SearchResultSection } from "@components/SearchResultSection/SearchResultSection";
import { Box } from "@mui/material";
import { SearchFilterTabs } from "@components/SearchFilterTabs/SearchFIlterTabs";
import { useEffect } from "react";
import { getSongsFilteredData } from "@utils/getSongsFilteredData";
import { useSearchBar } from "@components/SearchBar/useSearchBar";
import { useQuery } from "@tanstack/react-query";
import { spotifySearchApi } from "@hooks/spotifySearchApi";

export const SearchResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { suggestionSearchList, isFocused } = useSearchBar();
  const searchData = suggestionSearchList;

  useEffect(() => {
    const param = searchParams.get("category");
    if (param) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  }, []);

  const searchQueryParam = searchParams.get("q");
  console.log(searchQueryParam);
  const searchListQuery = useQuery({
    queryKey: ["search-query", searchQueryParam],
    queryFn: async () => {
      if (searchQueryParam) {
        const albumsData = await spotifySearchApi(searchQueryParam, 10);
        return albumsData;
      }
    },
    refetchOnWindowFocus: false,
  });

  console.log(searchData, isFocused, searchListQuery, "search data");

  return (
    <Box>
      <Box>
        <SearchFilterTabs />
        {searchListQuery.data && (
          <Box>
            <SearchResultSection
              searchCategoryTitle="albums"
              songDeatils={getSongsFilteredData(searchListQuery.data?.albums.items)}
              cardType={"albums"}
            />
            <SearchResultSection
              searchCategoryTitle="tracks"
              songDeatils={getSongsFilteredData(searchListQuery.data?.tracks.items)}
              cardType={"tracks"}
            />
            <SearchResultSection
              searchCategoryTitle="playlists"
              songDeatils={getSongsFilteredData(searchListQuery.data?.playlists.items)}
              cardType={"playlists"}
            />
            <SearchResultSection
              searchCategoryTitle="artists"
              songDeatils={getSongsFilteredData(searchListQuery.data?.artists.items)}
              cardType={"artists"}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
