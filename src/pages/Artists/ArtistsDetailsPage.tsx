import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { PlaylistDataDTO } from "@dto/playlistDataDTO";
import { useAppStore } from "@store/store";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import { useArtistsDetailsPage } from "./useArtistsDetailsPage";

export const ArtistDetailsPage = () => {
  const { artistDetailsQuery, onBannerClick } = useArtistsDetailsPage();

  return (
    <Box sx={{ background: "azure" }}>
      {/* {albumDetailsQuery.isSuccess && (
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
      </Box> */}
    </Box>
  );
};
