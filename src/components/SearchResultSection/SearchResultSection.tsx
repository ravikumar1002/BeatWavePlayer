import { Tracks } from "@dto/playlistDataDTO";
import { Albums, Artists, Playlists } from "@dto/searchResultDTO";
import { Box, Typography } from "@mui/material";
import { SearchResultCard } from "./SearchResultCard";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";

interface ISearchResultSetion {
  searchCategoryTitle: string;
  songDeatils: Albums | Artists | Playlists | Tracks;
}

export const SearchResultSection = (props: ISearchResultSetion) => {
  const { searchCategoryTitle, songDeatils } = props;
  const { items } = songDeatils;
  return (
    <Box>
      <Box>
        <Typography variant="h6">{searchCategoryTitle}</Typography>
      </Box>
      <Box>
        {items &&
          items.map((details) => {
            const imageUrl = details.images
              ? details?.images[0]?.url
              : details?.album.images[0]?.url;
            const artists = details.artists
              ? details.artists.map((item) => item.name)
              : [details?.type];
            const release_year = details.album
              ? getReleaseYearValue(details.album.release_date)
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
            return (
              <Box>
                <SearchResultCard songDetails={filterdDeatils} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
