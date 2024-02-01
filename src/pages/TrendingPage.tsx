import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { PlaylistDataDTO } from "@dto/playlistDataDTO";
import { useAppStore } from "@store/store";
import { GetSpotifyDataAsJSON } from "@services/getApiData";
import { SkeletonVerticalSongCard, VerticalSongCard } from "@components/SongCard";
import { DetailsPageBanner } from "@components/DetailsPageBanner/DetailsPageBanner";
import { DetailsPageBannerSkeleton } from "@components/DetailsPageBanner/DetailsPageBannerSkeleton";

export const TrendingPage = () => {
  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDataDTO | null>(null);
  const { playlistid } = useParams();
  const { setPlaylistSongs, setOpenPlaylist, setCurrentTrack } = useAppStore();
  const [loadingState, setLoadingState] = useState<"loading" | "fulfilled" | "default">("default");

  const getTrendingData = async (playlistID: string) => {
    setLoadingState("loading");
    const trendingResponse = await GetSpotifyDataAsJSON<PlaylistDataDTO>(
      `/playlists/${playlistID}`,
      {
        params: {},
      }
    );
    setPlaylistDetails(trendingResponse);
    setOpenPlaylist(trendingResponse);
    setLoadingState("fulfilled");
    return trendingResponse;
  };

  useEffect(() => {
    getTrendingData(`${playlistid}`);
  }, [playlistid]);

  const getBannerData = (playlistDetails: any) => {
    return {
      imageUrl: playlistDetails?.images[0].url ? playlistDetails?.images[0].url : "",
      name: playlistDetails?.name ? playlistDetails?.name : "",
      description: playlistDetails?.description ? playlistDetails?.description : "",
      itemsLength: playlistDetails?.tracks.items.length ? playlistDetails?.tracks.items.length : 0,
      followers: playlistDetails?.followers.total ? playlistDetails?.followers.total : 0,
    };
  };

  const getTracksItemsData = (items: any) => {
    const tracksItems = items.map((item) => {
      return {
        title: item.track.name,
        url: item.track?.preview_url ? item.track?.preview_url : "",
        image: item.track.album.images[0].url,
        id: item.track.id,
        artists: item.track.artists,
        release_year: item.track.album.release_date,
        album: item.track.album.name,
      };
    });
    return tracksItems;
  };

  return (
    <Box
      sx={{
        background: "azure",
      }}
    >
      {loadingState === "fulfilled" && (
        <DetailsPageBanner
          bannerDetails={getBannerData(playlistDetails)}
          onClick={() => {
            const tracksItems = getTracksItemsData(playlistDetails?.tracks.items);
            setPlaylistSongs(tracksItems ? tracksItems : null);
            setCurrentTrack(0);
          }}
        />
      )}
      {loadingState === "loading" && <DetailsPageBannerSkeleton />}
      <Box className="px-8 py-2">
        {loadingState === "loading" &&
          Array(20)
            .fill(0)
            .map((_, i) => {
              return <SkeletonVerticalSongCard key={i} />;
            })}
        {loadingState === "fulfilled" &&
          playlistDetails &&
          playlistDetails?.tracks?.items.map((item, i) => {
            return <VerticalSongCard key={i} songDetails={item} listRank={i} />;
          })}
      </Box>
    </Box>
  );
};

export default TrendingPage;
