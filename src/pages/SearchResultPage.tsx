import { useSearchParams } from "react-router-dom";
import { data } from "@components/Header/data";
import { SearchResultSection } from "@components/SearchResultSection/SearchResultSection";
import { Box } from "@mui/material";

export const SearchResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get("q");
  const searchData = data;

  return (
    <div>
      <h1>THis is a search page</h1>
      <Box>
        <SearchResultSection searchCategoryTitle="Albums" songDeatils={searchData.albums} />
        <SearchResultSection searchCategoryTitle="Songs" songDeatils={searchData.tracks} />
        <SearchResultSection searchCategoryTitle="Playlist" songDeatils={searchData.playlists} />
        <SearchResultSection searchCategoryTitle="Artists" songDeatils={searchData.artists} />
      </Box>
    </div>
  );
};
