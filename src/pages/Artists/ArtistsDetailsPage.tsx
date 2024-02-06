import { Box } from "@mui/material";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import { useArtistsDetailsPage } from "./useArtistsDetailsPage";

export const ArtistDetailsPage = () => {
  const { artistDetailsQuery, onBannerClick } = useArtistsDetailsPage();

  return (
    <Box sx={{ background: "azure" }}>
      {artistDetailsQuery.isSuccess && (
        <DetailsPageBanner
          bannerDetails={artistDetailsQuery?.data?.bannerData}
          onClick={onBannerClick}
        />
      )}
      {artistDetailsQuery.isLoading && <DetailsPageBannerSkeleton />}

      <Box className="px-8 py-2">
        {artistDetailsQuery.isLoading &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}
        {artistDetailsQuery.isSuccess &&
          artistDetailsQuery.data &&
          //@ts-expect-error mujhe nhi pta
          artistDetailsQuery.data?.tracksData.map((item, i) => {
            console.log(item, "as");
            return <VerticalSongCard key={i} songDetails={item} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};
