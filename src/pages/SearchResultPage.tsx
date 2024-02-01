import { useSearchParams } from "react-router-dom";
import { data } from "@components/Header/data";
import { SearchResultSection } from "@components/SearchResultSection/SearchResultSection";
import { Box } from "@mui/material";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";
import { SearchFilterTabs } from "@components/SearchFilterTabs/SearchFIlterTabs";
import { useEffect } from "react";

const getFilterDataArray = (valueArray) => {
  const valueFilter = valueArray.map((details) => {
    const imageUrl = details.images ? details?.images[0]?.url : details?.album.images[0]?.url;
    const artists = details.artists ? details.artists.map((item) => item.name) : [details?.type];
    const release_year = details.album
      ? getReleaseYearValue(details.album.release_date)
      : details.release_date
      ? getReleaseYearValue(details.release_date)
      : "";
    const albumName = details.album ? details.album.name : "";
    const previewUrl = "";

    const filterdDeatils = {
      title: details?.name,
      id: details.id,
      artists,
      release_year,
      albumName,
      image: imageUrl ? imageUrl : "",
      ...(previewUrl ? { previewUrl } : {}),
    };

    return filterdDeatils;
  });

  return valueFilter;
};

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
          songDeatils={getFilterDataArray(searchData.albums.items)}
        />
        <SearchResultSection
          searchCategoryTitle="Tracks"
          songDeatils={getFilterDataArray(searchData.tracks.items)}
          cardType={"Tracks"}
        />
        <SearchResultSection
          searchCategoryTitle="Playlists"
          songDeatils={getFilterDataArray(searchData.playlists.items)}
          cardType={"Playlists"}
        />
        <SearchResultSection
          searchCategoryTitle="Artists"
          songDeatils={getFilterDataArray(searchData.artists.items)}
        />
      </Box>
    </div>
  );
};
