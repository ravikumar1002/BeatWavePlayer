import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useAppStore } from "@store/store";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";
import { getBannerData } from "@utils/getBannerData";
import { getTracksItemsArray, getTracksItemsData } from "@utils/getTracksItemsData";
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
    queryKey: ["playlists"],
    queryFn: async () => {
      const playlistsData = await getPlaylistsDetailsData(playlistid);
      return playlistsData;
    },
  });
  console.log(playlistsDetailsQuery);

  return (
    <Box
      sx={{
        background: "azure",
      }}
    >
      {playlistsDetailsQuery.isLoading && <DetailsPageBannerSkeleton />}
      {playlistsDetailsQuery.isSuccess && playlistsDetailsQuery?.data?.tracks.items && (
        <DetailsPageBanner
          bannerDetails={getBannerData(playlistsDetailsQuery.data)}
          onClick={() => {
            const tracksItems = getTracksItemsArray(playlistsDetailsQuery.data?.tracks.items);
            setPlaylistSongs(tracksItems ? tracksItems : null);
            setCurrentTrack(0);
          }}
        />
      )}
      <Box className="px-8 py-2">
        {playlistsDetailsQuery.isLoading &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}

        {playlistsDetailsQuery.isSuccess &&
          playlistsDetailsQuery?.data?.tracks.items &&
          playlistsDetailsQuery?.data?.tracks?.items.map((item, i) => {
            console.log(item);
            return (
              <VerticalSongCard key={i} songDetails={getTracksItemsData(item.track)} listRank={i} />
            );
          })}
      </Box>
    </Box>
  );
};
