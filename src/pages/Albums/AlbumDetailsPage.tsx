import { Box } from "@mui/material";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import useALbumDetailsPage from "./useAlbumDetailsPage";

export const AlbumDetailsPage = () => {
  const { albumDetailsQuery, onBannerClick } = useALbumDetailsPage();

  console.log(albumDetailsQuery.data, albumDetailsQuery.isLoading);

  return (
    <Box sx={{ background: "azure" }}>
      {albumDetailsQuery.isSuccess && (
        <DetailsPageBanner
          bannerDetails={albumDetailsQuery?.data?.bannerData}
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
          albumDetailsQuery.data?.tracksData.map((item, i) => {
            return <VerticalSongCard key={i} songDetails={item} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};
