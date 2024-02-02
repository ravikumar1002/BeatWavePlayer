import { Box } from "@mui/material";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { getBannerData } from "@utils/getBannerData";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import { getReleaseYearValue } from "@hooks/getReleaseYearValue";
import useALbumDetailsPage from "./useAlbumDetailsPage";

export const AlbumDetailsPage = () => {
  const { albumDetailsQuery, onBannerClick } = useALbumDetailsPage();

  console.log(albumDetailsQuery.data, albumDetailsQuery.isLoading);
  console.log(getBannerData(albumDetailsQuery.data));

  return (
    <Box sx={{ background: "azure" }}>
      {albumDetailsQuery.isSuccess && (
        <DetailsPageBanner
          bannerDetails={{
            ...getBannerData(albumDetailsQuery.data),
            subText3: getReleaseYearValue(albumDetailsQuery?.data?.release_date),
            subText1: albumDetailsQuery.data?.artists.map((artist) => artist.name),
          }}
          onClick={onBannerClick}
        />
      )}
      {albumDetailsQuery.isLoading && <DetailsPageBannerSkeleton />}

      <Box className="px-8 py-2">
        {albumDetailsQuery.isLoading &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}
        {albumDetailsQuery.isSuccess &&
          albumDetailsQuery.data &&
          albumDetailsQuery.data?.tracks.items.map((item, i) => {
            const songDetails = {
              title: item.name,
              image: "",
              id: item.id,
              artists: item.artists.map((artist) => artist.name),
              release_year: albumDetailsQuery?.data?.release_date,
              album: albumDetailsQuery.data.name,
              url: item.preview_url,
            };

            return <VerticalSongCard key={i} songDetails={songDetails} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};
