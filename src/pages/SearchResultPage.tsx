import { useSearchParams } from "react-router-dom";
import { data } from "@components/Header/data";
import { SearchResultSection } from "@components/SearchResultSection/SearchResultSection";
import { Box } from "@mui/material";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

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
  const searchString = searchParams.get("q");
  const searchData = data;

  console.log(getFilterDataArray(searchData.albums.items));
  console.log(getFilterDataArray(searchData.tracks.items));
  console.log(getFilterDataArray(searchData.playlists.items));
  console.log(getFilterDataArray(searchData.artists.items));

  return (
    <div>
      <h1>THis is a search page</h1>
      <p>filter</p>
      <Box>
        <SearchResultSection
          searchCategoryTitle="Albums"
          songDeatils={getFilterDataArray(searchData.albums.items)}
          onClick={() => {}}
        />
        <SearchResultSection
          searchCategoryTitle="Songs"
          songDeatils={getFilterDataArray(searchData.tracks.items)}
          isSong={true}
        />
        <SearchResultSection
          searchCategoryTitle="Playlist"
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
