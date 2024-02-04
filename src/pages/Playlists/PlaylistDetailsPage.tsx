import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useAppStore } from "@store/store";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import { getBannerData } from "@utils/getBannerData";
import { getTracksItemsArray } from "@utils/getTracksItemsData";
import { useQuery } from "@tanstack/react-query";

export const PlaylistsDetailsPage = () => {
  const { playlistid } = useParams();
  const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore();

  const getPlaylistsDetailsData = async (playlistID: string) => {
    const trendingResponse = await GetSpotifyDataAsJSON(`/playlists/${playlistID}`, {
      params: {},
    });
    return trendingResponse;
  };

  const playlistsDetailsQuery = useQuery({
    queryKey: ["playlists_details"],
    queryFn: async () => {
      const playlistsData = await getPlaylistsDetailsData(playlistid);
      const playlistArrangeData = {
        bannerData: getBannerData(playlistsData),
        tracksData: getTracksItemsArray(playlistsData?.tracks.items),
      };
      setOpenPlaylist(playlistArrangeData.tracksData);
      return playlistArrangeData;
    },
  });

  return (
    <Box
      sx={{
        background: "azure",
      }}
    >
      {playlistsDetailsQuery.isLoading && <DetailsPageBannerSkeleton />}
      <Box className="px-8 py-2">
        {playlistsDetailsQuery.isLoading &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}
        {playlistsDetailsQuery.isSuccess && playlistsDetailsQuery?.data && (
          <DetailsPageBanner
            bannerDetails={playlistsDetailsQuery.data.bannerData}
            onClick={() => {
              const tracksItems = playlistsDetailsQuery.data.tracksData;
              setPlaylistSongs(tracksItems ? tracksItems : null);
              setCurrentTrack(0);
            }}
          />
        )}
        {playlistsDetailsQuery.isSuccess &&
          playlistsDetailsQuery?.data?.tracksData &&
          playlistsDetailsQuery?.data?.tracksData.map((item, i) => {
            return <VerticalSongCard key={i} songDetails={item} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};
