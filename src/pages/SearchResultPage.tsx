import { useSearchParams } from "react-router-dom";
import { data } from "@components/Header/data";
import { SearchResultSection } from "@components/SearchResultSection/SearchResultSection";
import { Box } from "@mui/material";
import { SearchFilterTabs } from "@components/SearchFilterTabs/SearchFIlterTabs";
import { useEffect } from "react";
import { getSongsFilteredData } from "@utils/getSongsFilteredData";

export const SearchResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchData = data;

  useEffect(() => {
    const param = searchParams.get("category");
    if (param) {
      searchParams.delete("category");
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <div>
      <SearchFilterTabs />
      <Box>
        <SearchResultSection
          searchCategoryTitle="Albums"
          songDeatils={getSongsFilteredData(searchData.albums.items)}
        />
        <SearchResultSection
          searchCategoryTitle="Tracks"
          songDeatils={getSongsFilteredData(searchData.tracks.items)}
          cardType={"Tracks"}
        />
        <SearchResultSection
          searchCategoryTitle="Playlists"
          songDeatils={getSongsFilteredData(searchData.playlists.items)}
          cardType={"Playlists"}
        />
        <SearchResultSection
          searchCategoryTitle="Artists"
          songDeatils={getSongsFilteredData(searchData.artists.items)}
        />
      </Box>
    </div>
  );
};
