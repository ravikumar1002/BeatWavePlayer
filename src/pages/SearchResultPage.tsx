import { useSearchParams } from "react-router-dom";
import { data } from "@components/Header/data";
import { SearchResultSection } from "@components/SearchResultSection/SearchResultSection";
import { Box } from "@mui/material";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";
import { SearchFilterTabs } from "@components/SearchFilterTabs/SearchFIlterTabs";
import { useEffect } from "react";

export const getFilterDataArray = (valueArray) => {
  const valueFilter = valueArray.map((details) => {
    const imageUrl = details.images ? details?.images[0]?.url : details?.album.images[0]?.url;
    const artists = details.artists ? details.artists.map((item) => item.name) : [details?.type];
    const release_year = details.album
      ? getReleaseYearValue(details.album.release_date)
      : details.release_date
      ? getReleaseYearValue(details.release_date)
      : "";
    const albumName = details.album ? details.album.name : "";
    const filterdDeatils = {
      title: details?.name,
      id: details.id,
      artists,
      release_year,
      albumName,
      image: imageUrl ? imageUrl : "",
    };
    return filterdDeatils;
  });

  return valueFilter;
};

export const SearchResultPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchData = data;

  useEffect(() => {
    const param = searchParams.get("filterType");
    if (param) {
      searchParams.delete("filterType");
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <div>
      <SearchFilterTabs />
      <Box>
        <SearchResultSection
          searchCategoryTitle="Albums"
          songDeatils={getFilterDataArray(searchData.albums.items)}
        />
        <SearchResultSection
          searchCategoryTitle="Tracks"
          songDeatils={getFilterDataArray(searchData.tracks.items)}
          isSong={true}
        />
        <SearchResultSection
          searchCategoryTitle="Playlists"
          songDeatils={getFilterDataArray(searchData.playlists.items)}
        />
        <SearchResultSection
          searchCategoryTitle="Artists"
          songDeatils={getFilterDataArray(searchData.artists.items)}
        />
      </Box>
    </div>
  );
};
